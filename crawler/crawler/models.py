# Define here your database models

import os
from datetime import datetime, timedelta
from peewee import Model, ForeignKeyField, TextField, DateTimeField, BooleanField, IntegerField, SqliteDatabase, BlobField
#from crawler.settings import DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT
import sqlite3

# Database setup
if os.getenv('TURMALINADEV') == 'true':
    from playhouse.sqlite_ext import SqliteExtDatabase, JSONField
    db_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    db = SqliteExtDatabase(os.path.join(db_path, 'dbs', 'test.db'))
'''else:
    from playhouse.postgres_ext import PostgresqlExtDatabase, JSONField

    db = PostgresqlExtDatabase(
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        host=DB_HOST,
        port=DB_PORT
    )
'''

def get_evaluations():
    return [e for e in Evaluation.select()]


def get_management_units():
    return [mu for mu in ManagementUnit.select()]


def get_management_unit(name):
    return ManagementUnit.get(ManagementUnit.name == name)


def get_management_unit_evaluations(name):
    mu = get_management_unit(name)
    return [e for e in mu.evaluations]
    

def clear_stuck_evaluations():
    # get all evaluations that started at least a day ago
    stuck_evaluations = Evaluation.select().where(
        (Evaluation.start_datetime < datetime.now() - timedelta(days=1)) &
        (Evaluation.end_datetime == None)
    )

    for stuck_evaluation in stuck_evaluations:
        print(f'Removing stuck evaluation: {stuck_evaluation}')
        stuck_evaluation.delete_instance()


class BaseModel(Model):
    class Meta:
        database = db

class ManagementUnit(BaseModel):
    name = TextField(unique=True)
    public_entity = TextField()
    start_urls = TextField()

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name


class Evaluation(BaseModel):
    management_unit = ForeignKeyField(ManagementUnit, backref='evaluations')
    start_datetime = DateTimeField(
        default=datetime.now, formats=['%Y/%m/%d %H:%M:%S']
    )
    log_path = TextField(null=True, default=None)
    detailed_evaluation = JSONField(null=True, default=None)
    summary_evaluation = JSONField(null=True, default=None)
    score = IntegerField(default=0)
    end_datetime = DateTimeField(
        null=True, default=None, formats=['%Y/%m/%d %H:%M:%S']
    )
    status = BooleanField(default=False)
    show = BooleanField(default=False)
    PDFreport = BlobField(null=True)
    
    

    def __str__(self):
        return f'{self.management_unit.name} ({self.start_datetime}) - score: {self.score} - show: {self.show}'

    def __repr__(self):
        return f'{self.management_unit.name} ({self.start_datetime}) - score: {self.score} - show: {self.show}'

    def evaluation_pt(self):
        TRANSLATIONS = {
            'PlanningInstrument': 'Instrumento de planejamento',
            'multiyearPlan': 'Plano plurianual',
            'budgetGuidelinesLaw': 'Lei de diretrizes orçamentárias',
            'annualBudgetLaw': 'Lei orçamentária anual',

            'BudgetRevenue': 'Receitas Orçamentárias',
            'managementUnitName': 'Nome da unidade gestora',
            'predictedAmount': 'Valor previsto',
            'collectionAmount': 'Valor arrecadado',
            'budgetRevenueSource': 'Origem da receita',
            'budgetRevenueDescription': 'Descrição da receita',

            'ExtraBudgetRevenue': 'Receitas Extraorçamentárias',
            'managementUnitName': 'Nome da unidade gestora',
            'realizedAmount': 'Valor realizado',
            'extraBudgetRevenueSource': 'Origem da receita',
            'extraBudgetRevenueDescription': 'Descrição da receita',
            'extraBudgetRevenueID': 'Código da receita',
            'nomenclature': 'Nomenclatura',
            'extraBudgetRevenueHistory': 'Histórico da receita',

            'BudgetExpenditure': 'Despesas Orçamentárias',
            'fixedAmount': 'Valor fixado da despesa',
            'paymentAmount': 'Valor pago da despesa',
            'managementUnitName': 'Nome da unidade gestora',
            'budgetExpenditureFunction': 'Função da despesa',
            'budgetExpenditureSubfunction': 'Subfunção da despesa',
            'budgetExpenditureProgram': 'Programa da despesa',
            'budgetExpenditureAction': 'Ação da despesa',
            'economicCategory': 'Categoria econômica da despesa',
            'budgetNature': 'Grupo de natureza da despesa ',
            'budgetExpenditureModality': 'Modalidade da despesa',
            'budgetExpenditureElement': 'Elemento da despesa',
            'comittedExpenditureID': 'Código do empenho',
            'comittedExpenditureDate': 'Data do empenho',
            'creditorName': 'Favorecido',
            'identificationNumber': 'CPF/CNPJ do favorecido',
            'bidID': 'Número da licitação',
            'bidModality': 'Modalidade da licitação',
            'comittedValue': 'Valor empenhado',
            'comittedExpenditureHistory': 'Histórico do empenho',

            'ExtraBudgetExpenditure': 'Despesas Extraorçamentárias',
            'paymentAmount': 'Valor pago da despesa',
            'managementUnitName': 'Nome da unidade gestora',
            'extraBudgetExpenditureID': 'Código da despesa',
            'extraBudgetExpenditureNomenclature': 'Nomenclatura da despesa',
            'moveDate': 'Data de movimentação',
            'extraBudgetExpenditureDescription': 'Descrição da despesa',
            'tabID': 'Número da guia',
            'tabDate': 'Data da guia',
            'creditorName': 'Favorecido',
            'identificationNumber': 'CPF/CNPJ do favorecido',
            'tabHistory': 'Histórico da guia',

            'Bidding': 'Procedimentos licitatórios',
            'notice': 'Edital',
            'bidModality': 'Modalidade da licitação',
            'managementUnitName': 'Nome da unidade gestora',
            'publicationDate': 'Data de publicação',
            'realizationDate': 'Data de realização',
            'bidID': 'Número da licitação',
            'object': 'Objeto da licitação',
            'bidderName': 'Nome do participante',
            'identificationNumber': 'CNPJ do participante',
            'bidderProposalAmount': 'Valor da proposta',

            'Contract': 'Contrato',
            'managementUnitName': 'Nome da unidade gestora',
            'contractorName': 'Nome do contratado',
            'identificationNumber':  'CPF/CNPJ do contratado',
            'publicationDate': 'Data de publicação',
            'validityDate': 'Início da vigência',
            'contractAmount': 'Valor do contrato',
            'object': 'Objeto do contrato',
            'contractID': 'Código do contrato',

            'Agreement': 'Convênio',
            'agreementID': 'Número do convênio',
            'grantorName': 'Nome do concedente',
            'contractorName': 'Nome do convenente',
            'celebrationDate': 'Data de celebração',
            'publicationDate': 'Data de publicação',
            'validityDate': 'Início da vigência',
            'object': 'Objeto do convênio',
            'agreementAmount': 'Valor pactuado',
            'counterpartAmount': 'Valor da contrapartida',

            'PaymentDocument': 'Documento de Pagamento',
            'managementUnitName': 'Nome da unidade gestora',
            'bankOperationID': 'Número da operação bancária',
            'bankAccountNumber': 'Número da conta bancária',
            'paymentDate': 'Data do pagamento',
            'creditorName': 'Nome do favorecido',
            'identificationNumber': 'CPF/CNPJ do favorecido',
            'paymentAmount': 'Valor do pagamento',
            'fundingSource': 'Fonte de recurso',
            'paymentHistory': 'Histórico do pagamento',

            'EmployeeInformation': 'Pessoal',
            'employeeName': 'Nome do servidor',
            'identificationNumber': 'CPF do servidor',
            'employmentContractType': 'Tipo de vínculo',
            'employeePosition': 'Cargo',
            'employeeSalary': 'Salário',
        }

        for area, details in self.detailed_evaluation.items():
            print(f'{TRANSLATIONS[area]}: {self.summary_evaluation[area]} ({area})')

            for key, value in details.items():
                print(f'\t{TRANSLATIONS[key]}: {value} ({key})')
