# Turmalina Crawler

A Turmalina é um software de análise e monitoramento de transparência fiscal. Seu funcionamento consiste em navegar por um conjunto definido de portais de transparência e avaliá-los de acordo com critérios pré-estabelecidos pelo Tribunal de Contas do Estado da Paraíba (TCE-PB).

O software foi desenvolvido a partir da parceria entre o Tribunal de Contas do Estado da Paraíba e o Artificial Intelligence Applications Laboratory (ARIA) da Universidade Federal da Paraíba. A Turmalina tem como objetivo incentivar a transparência nos portais de entes públicos e auxiliar o trabalho de auditores fiscais no acompanhamento da gestão. 

A arquitetura do projeto segue integralmente a organização recomendada na documentação do [Scrapy](https://docs.scrapy.org/en/latest/), framework base da aplicação. Dessa forma, para compreender o funcionamento do projeto é necessário conhecer profundamente o fluxo de execução do Scrapy, bem como sua estrutura de arquivos.


## Processo de avaliação 

Primeiramente, antes de qualquer avaliação, os critérios de avaliação devem estar devidamente documentados no Turmalina Schema. Posteriormente, o processo de avaliação poderá ser iniciado. Quando iniciado, ele verificará o cumprimento das especificações do Turmalina Schema nos portais de transparência. De maneira simplificada, o crawler procura pela presença de `itemtypes` e `itemprops` nas páginas dos portais.

### Fluxo do processo

1. O crawler é iniciado

2. O link da página inicial do portal é adicionado à fila de requisição;

3. A página correspondente ao primeiro link da fila de requisição é aberta;

4. O cumprimento dos critérios de avaliação especificados no Turmalina Schema é verificado por seletores (CSS e Xpath), na respectiva página aberta;

5. Quando algum critério é cumprido, ele é salvo e a pontuação do portal é atualizada com a pontuação correspondente;

6. Caso a pontuação total tenha sido atingida, o processo é encerrado e os critérios identificados são salvos no banco de dados. Caso contrário, (i) os links da página que ainda não foram acessados são adicionados à fila de requisição. (ii) Cada elemento marcado com a classe `tm-execute` origina uma nova requisição à página, através da fila de requisição, com instruções para acionar o respectivo elemento. Em ambas as situações, (i) e (ii), a execução retorna as etapas 3-6.


## Dependências
* Python 3.8
* Scrapy 2.5
* Scrapyd 1.2.1
* Selenium 3.141
* Peewee 3.14.4

## Detalhes de funcionamento

### Como funciona a avaliação de páginas dinâmicas

Existem contextos em que os dados de interesse da avaliação não podem ser acessados simplesmente carregando a página. Nesses contextos, geralmente é necessário clicar em um botão de pesquisa para buscar os dados, ou até mesmo clicar em um botão que detalha o respectivo item em um pop-up. Esses são exemplos de elementos que fazem requisições assíncronas à página usando JavaScript. O Turmalina Schema descreve detalhadamente como esses elementos devem ser marcados e em quais contextos essa marcação é necessária. Em resumo, eles são marcados com a classe `tm-execute`. 
O crawler está configurado para clicar nos elementos marcados com `tm-execute`. Para tanto, os elementos marcados com classe são mapeados e para cada elemento mapeado é programada uma nova requisição à página, mas com instruções para executar o respectivo elemento. Esse processo é recursivo, então o estado final de cada nova requisição é submetido ao mesmo processo. Assim, conseguimos gerar ações encadeadas em uma mesma página. Entretanto, vale ressaltar que elementos mapeados em etapas anteriores da recursão, não são executados em etapas subsequentes. Por fim, apesar de várias ações serem executadas em uma página, na perspectiva do crawler estamos apenas na mesma página, uma vez que essa execução de instruções acontece através do Middleware. Entretanto, cada nova ação executada sobre a página aumenta em uma unidade a profundidade da requisição. Dessa maneira, a recursão pode ser submetida a um limite de profundidade definido. 

### Como funciona a avaliação de iframes
O Selenium disponibiliza um método para trocar o contexto da página atual pelo contexto de um iframe. Essa foi a única forma encontrada para replicar a requisição enviada pela página à url do iframe. Por fim, vale ressaltar, que o iframe segue a mesma lógica recursiva do tópico anterior. 

### Downloader Middleware 
Um downloader middleware é um framework que intermedia o processamento de requests/responses do Scrapy. Diante da necessidade de carregar páginas dinâmicas, interagir com elementos e iframes, escolhemos o [Selenium Middleware](https://github.com/clemfromspace/scrapy-selenium) como ponto de partida para atingir esses objetivos. Para tanto, criamos um middleware personalizado que herda de Selenium Middleware e implementa essas funcionalidades.

### Dupefilter
Classe usada para identificar e filtrar requests duplicados. Principais adaptações:
- Uso da URL base como mecanismo de identificação de duplicidade.
- Manutenção de fragmentos. 

Representado por uma `#`,  um fragmento é um componente opcional de uma URL. Ele  normalmente serve para referenciar uma seção dentro de uma página web. Entretanto, alguns web frameworks adaptaram seu uso, o HashLocationStrategy é o principal exemplo dessa adaptação.

## Parâmetros de Configuração
Todas as configurações listadas encontram-se no arquivo settings.py.

### USER_AGENT
User agent do navegador.

### DEPTH_LIMIT
Profundidade máxima das páginas analisadas pelo crawler.

### RETRY_TIMES
Número máximo de tentativas de download, além da primeira, por página. 

### DOWNLOAD_TIMEOUT
Tempo limite, em segundos, para o download de uma página.

### CLOSESPIDER_TIMEOUT
Tempo limite, em segundos, que o crawler deve permanecer aberto. Caso ultrapasse esse tempo, ele será fechado automaticamente por `closespider_timeout`, que pode ser verificado no log. Se atribuído zero à constante, o crawler não será encerrado por tempo limite.

### DOWNLOAD_DELAY
Tempo de espera para baixar páginas consecutivas de um mesmo site.

### PAGE_LOAD_DELAY
Tempo adicional de carregamento após liberação da página pelo Selenium, ou seja, tempo de espera adicional para assegurar o carregamento completo da página, a fim de prevenir o caso descrito abaixo.
> The driver.get method will navigate to a page given by the URL. WebDriver will wait until the page has fully loaded (that is, the “onload” event has fired) before returning control to your test or script. Be aware that if your page uses a lot of AJAX on load then WebDriver may not know when it has completely loaded.

### REQUEST_DELAY
Tempo de espera aplicado a cada elemento clicado e troca de contexto para iframe. 

### ALLOWED_DOMAINS
Lista de domínios considerados no processo de extração de links. Recomenda-se adicionar os domínios dos iframes permitidos. Os domínios presentes no `start_urls` são considerados por padrão. 

### BFS_MISS_TOLERANCE
Quantidade de miss permitida por grupo de elementos. Elementos dinâmicos são o gargalo da aplicação, pensando nisso desenvolvemos essa feature que tem o intuito de limitar interações dinâmicas redundantes. Por exemplo, se em uma página temos 20 elementos que abrem o "mesmo" pop-up, bastaria avaliar apenas um desses pop-ups. Entretanto, em uma página não temos como afirmar com certeza que um determinado conjunto de elementos são de um mesmo grupo. Portanto, desenvolvemos a seguinte heurística: a página é avaliada como uma árvore, na qual cada elemento (ou nó) está localizado em um nível da árvore. Elementos localizados no mesmo nível são rotulados como pertencentes a um mesmo grupo. Posteriormente, como sabemos, cada elemento `tm-execute` mapeado resulta em uma nova requisição à página, contendo instruções para executá-lo. Dessa forma, cada requisição originada pelos elementos de um grupo é marcada com um hash que identifica o grupo. Assim, se o estado final de uma página, originada pela requisição de um dos elementos de um grupo não apresentar nenhum novo `itemprop`, considera-se um "miss" para o grupo. Seguindo essa lógica, a constante `BFS_MISS_TOLERANCE` determina a quantidade de miss tolerada antes de descartar as requisições remanescentes de um grupo. Essa heurística baseia-se no pressuposto de que o estado final das páginas geradas por um grupo é redundante. Em síntese, quando não temos um grupo, todas as suas páginas de um nível da árvore são avaliadas. Quando temos, avalia-se a quantidade de página definida no `BFS_MISS_TOLERANCE`.

## Banco de dados

Por padrão a aplicação utiliza o banco de dados Postgresql, mas essa configuração pode ser alterada no arquivo models.py.
Para conectar-se a um banco de dados defina em settings as seguintes constantes:

* DB_NAME
* DB_USER
* DB_PASS
* DB_HOST
* DB_PORT

As constantes também podem ser definidas através de variáveis de ambiente. 


## Envio de e-mails

Para habilitar o envio de e-mail nas requisições de teste, basta definir em settings as constantes:
* MAIL_USER
* MAIL_PASS  

As constantes também podem ser definidas através de variáveis de ambiente. 

**Obs:** O Gmail não permite por padrão seu uso por aplicações de terceiros. Portanto, faz-se necessário configurá-lo para habilitar o acesso por aplicações de terceiros. Para tanto, com o navegador aberto, clique na sua foto e abra "Gerenciar sua Conta do Google", selecione a seção "Segurança" no menu lateral esquerdo. Na página, em "Como fazer login no Google" habilite a verificação em duas etapas e crie uma senha de app. Agora a senha criada poderá ser usada para login na Turmalina.

## Scrapyd 

O Scrapyd é um aplicativo que ouve solicitações para que os spiders sejam executados e gera um processo para cada um. O Scrapyd também executa vários processos em paralelo, alocando-os em um número fixo de slots fornecidos pelas opções `max_proc` e `max_proc_per_cpu`, iniciando o maior número possível de processos para lidar com a carga. Os parâmetros de funcionamento do Scrapyd podem ser definidos em scrapyd.cfg. Para mais informações sobre os parâmetros de configuração disponíveis, acesse a documentação [Scrapyd](https://scrapyd.readthedocs.io/en/stable/overview.html). 

## Instalação da aplicação no Ubuntu 20.04

### Instalando o Python 3.8
Os seguintes passos devem ser seguidos para a instalação do Python 3.8:
```
$ sudo apt-get update
$ sudo apt-get install python3 python3-venv python3-pip
```

### Instalando o WebDriver
Baixe uma versão do [WebDriver Geckodriver](https://github.com/mozilla/geckodriver/releases) compatível com o seu sistema.

Descompacte o arquivo:  
```
$ tar -xvf geckodriver-v0.30.0-linux64.tar.gz
```

Adicione-o ao diretório `/usr/local/bin`:  
```
$ sudo mv geckodriver /usr/local/bin/
```

## Instalando as dependências
Primeiro, crie um ambiente virtual e ative-o:

```
$ python3 -m venv env
$ source env/bin/activate
```

Depois, instale as dependências:

```
$ pip3 install -r requirements.txt
```

## Deploy da aplicação

Inicie o servidor scrapyd:
```
$ scrapyd
```

Depois, faça o deploy da versão atual do projeto:

```
$ scrapyd-deploy
```

O Scrapyd vem com uma interface web mínima (para monitorar processos em execução e acessar logs) que pode ser acessada em http://localhost:6800/.

## Turmalina CLI

A Turmalina CLI pode ser acessada no diretório raíz do projeto e aceita os comandos listados abaixo:

* Avalia uma unidade gestora:

```
$ scrapy turmalina -m <unidade_gestora>
```

* Avalia todas as unidades gestoras de um ente público:

```
$ scrapy turmalina -p <ente_publico>
```

* Avalia todas as unidades gestoras:
    
```
$ scrapy turmalina -a
```

## Cancelando execuções

Se a avaliação estiver em execução, ele será encerrado. Se a avaliação estiver pendente, ela será removida. 

```
$ curl http://localhost:6800/cancel.json -d project=crawler -d job=<nome_do_job>
```

## Manutenção do Crawler

### Atualização de URLs
Para atualizar as urls de uma unidade gestora, basta atualizar o respectivo campo no banco de dados.

### Adição de unidades gestoras
Para adicionar novas unidades gestoras, basta adicionar novas instâncias na tabela `managementunit` do banco de dados. Assim, automaticamente elas estarão disponíveis para consulta no crawler. 

### Adição de novos critérios de avaliação
Para adicionar novos critérios de avaliação, basta adicionar os respectivos `itemtypes` e `itemprops` no dicionário `EVALUATION_MODEL`, localizado no arquivo `crawler/util/evaluation.py`.










