# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

from crawler.models import Evaluation
from datetime import datetime
from ...api.report.ReportEditor import report_edit


class PortalEvaluationPipeline:

    def open_spider(self, spider):
        if not spider.test_execution:
            self.evaluation = Evaluation.create(
                management_unit=spider.management_unit_id,
                show=False
            )

    def process_item(self, item, spider):
        return item

    def close_spider(self, spider):

        if not spider.test_execution:
        
            Evaluation.update(
                log_path=spider.settings.get('LOG_FILE'),
                detailed_evaluation=spider.evaluation.detailed_export(),
                summary_evaluation=spider.evaluation.summary_export(),
                score=spider.evaluation.score,
                end_datetime=datetime.now(),
                status=True,
                show=True,
                
            ).where(
                Evaluation.id == self.evaluation.id
            ).execute()
            

	    
