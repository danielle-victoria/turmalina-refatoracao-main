# Scrapy settings for crawler project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://docs.scrapy.org/en/latest/topics/settings.html
#     https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://docs.scrapy.org/en/latest/topics/spider-middleware.html

import os
from os import environ

# Spider setup
BOT_NAME = 'crawler'
SPIDER_MODULES = ['crawler.spiders']
NEWSPIDER_MODULE = 'crawler.spiders'


# Selenium Middlewere setup
SELENIUM_DRIVER_NAME = 'firefox'
SELENIUM_DRIVER_EXECUTABLE_PATH = '/usr/bin/geckodriver'
# SELENIUM_DRIVER_EXECUTABLE_PATH = '/opt/homebrew/bin/geckodriver'
SELENIUM_DRIVER_ARGUMENTS = ['--headless']
# SELENIUM_DRIVER_ARGUMENTS = ['']


# Crawl responsibly by identifying yourself (and your website) on the user-agent
# USER_AGENT = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:96.0) Gecko/20100101 Firefox/96.0"
USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36"


# Overwrite request headers:
DEFAULT_REQUEST_HEADERS = {
    'Accept-Encoding': 'compress',
    'Accept-Language': 'pt-br',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    # 'Cookie': 'please input your cookie here',
    # 'Host': 'weibo.com',
    'Pragma': 'no-cache',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': USER_AGENT
}


# Disable cookies (enabled by default)
COOKIES_ENABLED = True


# Obey robots.txt rules
ROBOTSTXT_OBEY = False


# Configure maximum concurrent requests performed by Scrapy (default: 16)
CONCURRENT_REQUESTS = 1


# Class used to detect and filter duplicate requests
DUPEFILTER_CLASS = 'crawler.dupefilters.CustomDupeFilter'
DUPEFILTER_DEBUG = True


# Turmalina CLI setup
COMMANDS_MODULE = "crawler.commands"


# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
DOWNLOADER_MIDDLEWARES = {
    'crawler.middlewares.CustomSeleniumMiddleware': 810,
}


# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
    'crawler.pipelines.PortalEvaluationPipeline': 800,
}


# List of domains considered in the link extraction process
ALLOWED_DOMAINS = [
    'portaldatransparencia.publicsoft.com.br',
    'transparenciaativa.com.br',
    'portaldatransparencia.gov.br',
    'transparencia.pb.gov.br',
    'siteseticons.com.br',
    'transparencia.elmartecnologia.com.br',
]


# Maximum depth of pages analyzed by the crawler
DEPTH_LIMIT = 5

# Maximum number of times to retry, in addition to the first download.
RETRY_TIMES = 3

# Timeout (in seconds) for the crawling process
# CLOSESPIDER_TIMEOUT = 14400  # 4 horas 
# CLOSESPIDER_TIMEOUT = 21600  # 6 horas 
# CLOSESPIDER_TIMEOUT = 3600*8  # 8 horas 
CLOSESPIDER_TIMEOUT = 3600*10  # 10 horas 
# CLOSESPIDER_TIMEOUT = 0

# Timeout for downloading a page.
DOWNLOAD_TIMEOUT = 100

# Waiting time to download consecutive pages from the same site.
DOWNLOAD_DELAY = 4

# Additional load time after page release by Selenium
PAGE_LOAD_DELAY = 10

# Timeout applied to each clicked element and context switch to iframe
REQUEST_DELAY = 10
REQUEST_DELAY_CLICK = 35  # wait more after clicking an element

# Amount of miss allowed per element group
BFS_MISS_TOLERANCE = 5


# Setup email sending
MAIL_USER = 'sandboxturmalina@gmail.com'
MAIL_PASS = 'K@Jby1*Bt1ozHgrB4WbI'


# Setup Database
DB_NAME = 'turmalina'
DB_USER = 'turmalina'
DB_PASS = os.getenv('DB_PASS')
DB_HOST = '10.10.5.207'
DB_PORT = 5432

# URL snippet ignored by the crawler
URL_IGNORE_SNIPPETS = [
    'covid', 'coronavirus', 'vacinado', 'vacina', 'vacinometro',
    '.pdf', '.doc', '.docx', '.zip', '.csv', '/pdf.php',
    'arquivos_download', 'downfotos', '/download',
    'privacidade', 'politica-de-privacidade',
    'noticias', '/informa.php',
    'procon',
    'procuradoria',
    'login',
    'contato', 'fale-conosco', '/vlibras',
    'glossario',
    'acessibilidade',
    'gestores',
    'conselhos',
    'manualdosite', 'usando-o-portal', 'manual-de-navegacao',
    'mapa-do-site', 'mapa_site',
    'veiculos',
    '/lei', 'leis', 'codigo-tributario',
    '/publicacoes', '/areport',
    'diariooficial', 'diario-oficial',
    'campanha',
    'prefeito', 'prefeita',
    'feriados',
    'cartaservicos', 'carta-de-servicos',
    'perguntas-frequentes', 'duvidas-frequentes', 'perguntaserespostas',
    '/sobre', '/secretaria', '/vice', '/graficos', '/captcha',
    'organograma',
    'turismo',
    'portaria', 'decreto',
    'entenda-a-gestao-publica',
    '/#td-header-menu', '/#rodape', '/#anchorSearch', '#altocontraste', '#highcontrast',
    '#sogothemeFooter', '#sogothemeSearch', '#news',
    '/cultura_lista_artistas', '/unidadesaude',
    '/semanario-oficial',
    # joao pessoa fix:
    'https://transparencia.elmartecnologia.com.br/Contab/Receitas?e=101095&Tab=3&tabs=off&isModal=False',
    'https://transparencia.elmartecnologia.com.br/Contab/Despesas?e=101095&isModal=False',
    # caldas brandão fix:
    'https://www.caldasbrandao.pb.gov.br/modalidade/',
    'https://www.caldasbrandao.pb.gov.br/item_licitacao/N',
    'https://www.caldasbrandao.pb.gov.br/item_licitacao/O'
]

AGREEMENT_PORTAL_DOMAINS = ['portaldatransparencia.gov.br',
                            'transparencia.pb.gov.br']

AGREEMENT_PORTAL_URLS = ['www.portaldatransparencia.gov.br/localidades',
                         'www.portaldatransparencia.gov.br/convenios',
                         'transparencia.pb.gov.br/convenios',
                         'transparencia.pb.gov.br/relatorios/?rpt=convenioslst']