import configparser
import sys
from scrapyd_api import ScrapydAPI

cfg = configparser.ConfigParser()
cfg.read('scrapy.cfg')
SCRAPYD_URL = cfg.get('deploy', 'url')

scrapyd = ScrapydAPI(SCRAPYD_URL)

def check_queue(status):
    jobs = scrapyd.list_jobs('crawler')
    for job in jobs[status]:
        print(job)

# cancell all jobs
def cancel_all():
    jobs = scrapyd.list_jobs('crawler')
    for job in jobs['pending']:
        scrapyd.cancel('crawler', job['id'])
        print(f'Job {job["id"]} was cancelled')
    for job in jobs['running']:
        scrapyd.cancel('crawler', job['id'])
        print(f'Job {job["id"]} was cancelled')


if __name__ == '__main__':
    if sys.argv[1] == '-cqp':
        check_queue('pending')
    elif sys.argv[1] == '-cqr':
        check_queue('running')
    elif sys.argv[1] == '-cqf':
        check_queue('finished')
    elif sys.argv[1] == '-stop':
        cancel_all()

    



