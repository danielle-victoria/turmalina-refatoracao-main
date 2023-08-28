from celery import Celery
from celery.schedules import crontab
from subprocess import Popen

app = Celery('crawler_crons')

@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(
        crontab(hour=0, minute=1, day_of_week=1),
        evaluate_all.s(None),
    )

@app.task
def evaluate_all(arg):
    print("Evaluating by cronjob!")
    Popen('scrapy turmalina -a', shell=True)