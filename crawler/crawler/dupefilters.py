# Define here your Duplefilters classes
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/settings.html#dupefilter-class

from scrapy.dupefilters import RFPDupeFilter
from scrapy.utils.request import request_fingerprint
from scrapy import Request


class CustomDupeFilter(RFPDupeFilter):

    def request_fingerprint(self, request: Request) -> str:
        # new_request = request.replace(url=get_base_url(request.url))
        # return request_fingerprint(new_request, keep_fragments=True)
        return request_fingerprint(request, keep_fragments=True)


def get_base_url(url):
    """Extract the base url from a complete url"""
    base, *_ = str(url).partition("?")
    return base
