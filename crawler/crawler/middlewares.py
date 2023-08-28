# Define here the models for your spider middleware
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/spider-middleware.html
# https://github.com/clemfromspace/scrapy-selenium

import time
import logging
from datetime import datetime
from scrapy_selenium.middlewares import SeleniumMiddleware
from selenium.common.exceptions import NoSuchElementException, WebDriverException
from scrapy_selenium import SeleniumRequest
from scrapy.exceptions import IgnoreRequest
from scrapy.http import HtmlResponse
from collections import defaultdict
from urllib.parse import urlparse, parse_qs
from crawler.util.evaluation import Evaluation, _log
from crawler.settings import (
    REQUEST_DELAY, REQUEST_DELAY_CLICK, PAGE_LOAD_DELAY, BFS_MISS_TOLERANCE,
    CLOSESPIDER_TIMEOUT, URL_IGNORE_SNIPPETS, AGREEMENT_PORTAL_DOMAINS,
    AGREEMENT_PORTAL_URLS
)

import logging

class CustomSeleniumMiddleware(SeleniumMiddleware):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.start_time = time.time()
        # Copy of evaluation only for middleware control
        self.evaluation = Evaluation()
        # Stores the total miss of the groups
        self.deny_requests = defaultdict(lambda: BFS_MISS_TOLERANCE)

    def process_request(self, request, spider):
        """Process a request using the selenium driver if applicable"""
        
        _log(f'middleware process_request url: {request.url}')

        if self.evaluation.is_complete():
            raise IgnoreRequest

        # Ignore request if it is URL has a snippet that should be ignored
        for snippet in URL_IGNORE_SNIPPETS:
            if snippet in request.url:
                _log('ignore url:', request.url, 'invalid snippet:', snippet)
                raise IgnoreRequest

        # Ignore request if it is from a agreement portal domain
        # but not from a agreement portal url
        ignore_request = False
        for domain in AGREEMENT_PORTAL_DOMAINS:
            if domain in request.url:
                ignore_request = True
                for url in AGREEMENT_PORTAL_URLS:
                    if url in request.url:
                        ignore_request = False
                        break
        
        if ignore_request:
            _log('agreement portal check', 'ignore url:', request.url, 'invalid domain:', domain)
            raise IgnoreRequest


        if CLOSESPIDER_TIMEOUT != 0:
            if time.time() - self.start_time > CLOSESPIDER_TIMEOUT:
                raise IgnoreRequest


        # Check if the url uses the parameter 'year' and ignore if it is not the current year
        _log(f'check "year" param')
        params = parse_qs(urlparse(request.url).query.lower())
        _log(f'params:', params)
        if 'year' in params:
            _log('found "year" param')
            if len(params['year']) > 0:
                _log('"year" param value:', params["year"][0])
                if int(params['year'][0]) != datetime.now().year:
                    _log('ignore url:', request.url, 'invalid "year" param')
                    raise IgnoreRequest

        if not isinstance(request, SeleniumRequest):
            return None

        # Ignores the request if the group has reached its total miss
        navigation = request.meta.get('navigation')
        if navigation and self.deny_requests[navigation.code] == 0:
            _log('middleware ignore request, total miss reached')
            raise IgnoreRequest

        # try:
        #     self.driver.get_screenshot_as_file(f'{time.time():.4f}-{request.url}-before.png'.replace('/','-').replace(':','-'))
        # except WebDriverException:
        #     _log('middleware get_screenshot_as_file error - before')

        request_start_time = time.time()

        self.driver.get(request.url)

        logging.info(f'Load time: {round(time.time() - request_start_time, 2)}')

        for cookie_name, cookie_value in request.cookies.items():
            self.driver.add_cookie(
                {
                    'name': cookie_name,
                    'value': cookie_value
                }
            )

        time.sleep(PAGE_LOAD_DELAY)

        if request.script:
            self.driver.execute_script(request.script)

        if navigation:
            _log('middleware has navigation', navigation)
            suceeded = self._follow_navigation(navigation)
            if not suceeded:
                _log('middleware navigation not suceeded, ignore request')
                raise IgnoreRequest

        body = str.encode(self.driver.page_source)

        # Expose the driver via the "meta" attribute
        request.meta.update({'driver': self.driver})

        request_total_time = round(time.time() - request_start_time, 2)
        logging.info(f'Total time on the page: {request_total_time}')

        _log(f'check if the URL changed after driver get, request url: {request.url}')
        _log(f'check if the URL changed after driver get, current url: {self.driver.current_url}')
        iframe_url = self.driver.execute_script("return window.location.toString()")
        _log(f'check if the URL changed because iframe: {iframe_url}')
        
        # try:
        #     self.driver.get_screenshot_as_file(f'{time.time():.4f}-{request.url}-after.png'.replace('/','-').replace(':','-'))
        # except WebDriverException:
        #     _log('middleware get_screenshot_as_file error - after')
        
        if iframe_url != self.driver.current_url:
            _log(f'iframe url != current url {iframe_url}')
            return HtmlResponse(
                iframe_url,
                body=body,
                encoding='utf-8',
                request=request
            )

        _log(f'regular response {self.driver.current_url}')
        return HtmlResponse(
            self.driver.current_url,
            body=body,
            encoding='utf-8',
            request=request
        )

    def process_response(self, request, response, spider):
        navigation = request.meta.get('navigation')
        was_updated = self.evaluation.evaluate(response, 'middleware')
        if was_updated:
            logging.info(f'Itemprop found in: {response.url}')
        # Controls the total miss of the groups
        if navigation and not was_updated:
            self.deny_requests[navigation.code] -= 1

        return response

    def _follow_navigation(self, navigation):
        """Follows the navigation pipeline, ie it takes care of interactions
         with tm-execute elements and context switches with iframes.

        Args:
            navigation (NavigationPipeline): navigation pipeline to follow

        Returns:
            [bool]: whether the process went well or not
        """
        _log(f'dynamic elements found in: {navigation.url}')

        tm_execute_flag = False

        # Iterate over each pipeline step
        for index, xpath in enumerate(navigation.pipeline):
            logging.info(f'Index: {index} - Element: {xpath}')
            try:
                element = self.driver.find_element_by_xpath(xpath)
                if element.tag_name == 'iframe':
                    # Switch context with iframe
                    _log(f'switch context with iframe: {element}')
                    self.driver.switch_to.frame(element)
                else:
                    _log(f'click tm-execute: {element}')
                    element.click()
                    tm_execute_flag = True
            except NoSuchElementException:
                logging.warn(f'Element ({xpath}) not found!')
                return
            except Exception as e:
                logging.warn(f'Unexpected error: {e}')
                return

            # Delay between interactions
            if tm_execute_flag:
                time.sleep(REQUEST_DELAY_CLICK)    
            else:           
                time.sleep(REQUEST_DELAY)

        return True
