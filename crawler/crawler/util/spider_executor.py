import configparser
from requests.exceptions import ConnectionError
from scrapyd_api import ScrapydAPI
from datetime import datetime


# Read the Scrapyd url from config file
cfg = configparser.ConfigParser()
cfg.read('scrapy.cfg')
SCRAPYD_URL = cfg.get('deploy', 'url')


class SpiderExecutor:
    """Schedule crawler's requests"""

    scrapyd = ScrapydAPI(SCRAPYD_URL)

    @classmethod
    def crawl(cls, management_unit, test_execution):
        try:
            cls.scrapyd.schedule(
                'crawler',
                'turmalina',
                jobid=f'{management_unit.name}-{datetime.now()}',
                management_unit_id=management_unit.id,
                start_urls=management_unit.start_urls,
                test_execution=test_execution
            )
        except ConnectionError:
            print('Please, start the scrapyd server or make',
                  'sure it is listening on the proper port')
        else:
            print(f'{management_unit.name} was successfully scheduled!')

        
    
