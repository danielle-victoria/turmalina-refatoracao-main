# Define here your command line application setup
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/commands.html#custom-project-commands

from scrapy.commands import ScrapyCommand
from crawler.models import ManagementUnit
from crawler.util.spider_executor import SpiderExecutor
from crawler.util.suggest_similar import suggest_similar


class Command(ScrapyCommand):

    requires_project = True
    default_settings = {'LOG_ENABLED': False}

    def short_desc(self):
        return "Crawl through Turmalina"

    def add_options(self, parser):
        ScrapyCommand.add_options(self, parser)
        parser.add_option(
            '--crawl-management-unit', '-m', action="append", default=[]
        )
        parser.add_option(
            '--crawl-public-entity', '-p', action="append", default=[]
        )
        parser.add_option(
            '--crawl-all', '-a', action="store_true", default=False
        )
        parser.add_option(
            '--cancel', '-c', action="store_true", default=False
        )

    def run(self, args, opts):
        if opts.crawl_all:
            crawl_all()
        else:
            if opts.crawl_management_unit:
                crawl(opts.crawl_management_unit, ManagementUnit.name)
            if opts.crawl_public_entity:
                crawl(opts.crawl_public_entity, ManagementUnit.public_entity)


def crawl(entities, column):
    """Crawl a database instance based on a specific column

    Args:
        entities (list): list of entities to be crawled
        column (database column): Entity database column
    """
    for entity_name in entities:
        management_units = ManagementUnit.select().where(column == entity_name)

        for management_unit in management_units:
            SpiderExecutor.crawl(management_unit, False)

        if not management_units:
            print(f'\n{entity_name} was not found in the database!')
            suggest_similar(entity_name, column)


def crawl_all():
    """
    Crawl all management units in the database.

    The order of the management units is based on the last evaluation start date.
    """
    management_units = ManagementUnit.select()

    result = []
    for mu in management_units:
        # prioritize management units that have never been evaluated.
        if len(mu.evaluations) == 0:
            result.append((mu, 0))
        else:
            evaluations_start_dates = [m.start_datetime for m in mu.evaluations]
            evaluations_start_dates.sort(reverse=True)

            result.append((mu, evaluations_start_dates[0].timestamp()))

    result.sort(key=lambda x: x[1])

    for management_unit, _ in result:
        SpiderExecutor.crawl(management_unit, False)
