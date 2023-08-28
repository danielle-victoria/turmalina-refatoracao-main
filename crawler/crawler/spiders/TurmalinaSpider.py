import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy_selenium import SeleniumRequest
from crawler.util.evaluation import Evaluation, _log
from crawler.util.mail_sender import MailSender
from crawler.util.navigation import NavigationPipelineExtractor
from crawler.settings import ALLOWED_DOMAINS
from scrapy.exceptions import CloseSpider
from urllib.parse import urlparse
from scrapy import signals
import logging


class TurmalinaSpider(scrapy.Spider):

    name = 'turmalina'

    navigation = NavigationPipelineExtractor()

    def __init__(self, *args, **kwargs):
        _log('starting turmalina spider')

        super().__init__(*args, **kwargs)
        self.evaluation = Evaluation()
        self.test_execution = eval(self.test_execution)
        self.start_urls = self.process_start_urls(self.start_urls)
        self.urls_domains = [urlparse(url).netloc for url in self.start_urls]
        self.link_extractor = LinkExtractor(
            allow_domains=self.urls_domains + ALLOWED_DOMAINS
        )

        _log('start urls', self.start_urls)
        _log('domains', self.urls_domains)


    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        """[overridden default from_crawler to implement close signal"""
        spider = super(TurmalinaSpider, cls).from_crawler(
            crawler, *args, **kwargs)
        # Close signal
        crawler.signals.connect(
            spider.spider_closed, signal=signals.spider_closed)
        return spider

    def start_requests(self):
        _log('start request urls:', self.start_urls)
        for url in self.start_urls:
            _log('create selenium request:', url)
            yield SeleniumRequest(url=url, callback=self.parse_webpage)

    def parse_webpage(self, response):
        _log('scheduler requests:', len(self.crawler.engine.slot.scheduler))
        _log('running requests:', self.crawler.engine.slot.inprogress)

        _log('parse webpage', response.url)
        
        self.evaluation.evaluate(response, 'parse_webpage')
        if self.evaluation.is_complete():
            _log('evaluation complete')
            raise CloseSpider('Completed the evaluation')

        # mapping of tm-execute and iframes
        _log('extract pipelines for', response.url)
        if pipelines := self.navigation.extract_pipelines(response):
            # Triggering requests to handle theses cases
            for pipeline in pipelines:
                _log('create selenium request for the pipeline:', pipeline)
                yield SeleniumRequest(
                    url=pipeline.url,
                    meta={'navigation': pipeline},
                    dont_filter=True,
                    callback=self.parse_webpage
                )

        if not self.test_execution:
            _log('extract links:')
            links = self._prioritize_links(self.link_extractor.extract_links(response))
            
            _log('prioritized links:')
            for link in links:
                _log('link found', link)

            for link in links:
                _log('yielding selenium request:', link)
                yield SeleniumRequest(
                    url=link.url, callback=self.parse_webpage
                )

    def process_start_urls(self, start_urls):
        start_urls = self.start_urls.split(',')
        return list(map(lambda x: x.strip(), start_urls))

    def spider_closed(self, spider):
        """Actions performed after the spider closes"""
        if self.test_execution:
            evaluation = spider.evaluation.detailed_export()
            MailSender(evaluation, self.start_urls).send(self.receiver_address)

    def _prioritize_links(self, links):
        """Prioritize links that have some special words in the url or in the text."""

        prioritized_words = [
            'planejamento',
            'receita',
            'despesa',
            'licitacao',
            'licitação',
            'licitacoes',
            'licitações',
            'contrato',
            'convenio',
            'convênio',
            'pagamento',
            'pessoal'
        ]

        def _is_prioritized(link):
            for word in prioritized_words:
                if word in link.url.strip().lower() or word in link.text.strip().lower():
                    return True
            return False

        return sorted(links, key=_is_prioritized, reverse=True)
