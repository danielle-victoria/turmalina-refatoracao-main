from models import Evaluation, ManagementUnit, get_management_unit_evaluations
import os

#path do arquivo pdf
pdf_path = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
#print(pdf_path)
pdf_file = os.path.join(pdf_path, 'api', 'report', 'outputs', 'Report.pdf')
#print(pdf_file)

with open(pdf_file, 'rb') as file:
    pdf_content = file.read()

#name é chave estrangeira única então deve mudar para cada teste
mu = ManagementUnit(name='teste', public_entity='teste', start_urls='teste')
mu.save()
ev = Evaluation(management_unit=mu, PDFreport=pdf_content)
ev.save()

#Parametros que são recebidos na def turmalina report do arquivo app.py
management_unit = 'teste' #Prefeitura de João Pessoa
date = '2023-11-20' #2023-06-08

# Retrieve the file from the database
evaluations = get_management_unit_evaluations(management_unit) 

for evaluation in evaluations:
    if evaluation.start_datetime[0:10] == date:
        # Write the file data to a new file
        with open('Report_copy.pdf', 'wb') as file:
            file.write(evaluation.PDFreport)
    else:
        print("Não encontrado")