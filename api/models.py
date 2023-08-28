import os
from datetime import datetime
from peewee import Model, ForeignKeyField, TextField, DateTimeField, BooleanField, IntegerField, SqliteDatabase

# Database setup
if os.getenv('TURMALINADEV') == 'true':
    from playhouse.sqlite_ext import SqliteExtDatabase, JSONField
    db_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    db = SqliteExtDatabase(os.path.join(db_path, 'crawler', 'dbs', 'test.db'))
else:
    from playhouse.postgres_ext import PostgresqlExtDatabase, JSONField
    db = PostgresqlExtDatabase('turmalina', user='turmalina',
                            password=os.getenv('DB_PASS'), host='10.10.5.207', port=5432)


class BaseModel(Model):
    class Meta:
        database = db

class ManagementUnit(BaseModel):
    name = TextField(unique=True)
    public_entity = TextField()
    start_urls = TextField()    
    
    
class Evaluation(BaseModel):
    management_unit = ForeignKeyField(ManagementUnit, backref='evaluations')
    start_datetime = DateTimeField(default=datetime.now, formats=['%d/%m/%Y %H:%M:%S'])
    log_path = TextField(null=True, default=None)
    detailed_evaluation = JSONField(null=True, default=None)
    summary_evaluation = JSONField(null=True, default=None)
    score = IntegerField(default=0)
    end_datetime = DateTimeField(null=True, default=None, formats=['%d/%m/%Y %H:%M:%S'])
    status = BooleanField(default=False)
    show = BooleanField(default=True)

if __name__ == "__main__":
    print("Creating DB...")
    db.create_tables([ManagementUnit, Evaluation])
    print("DB created!")