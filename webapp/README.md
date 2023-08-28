# Turmalina

## Configuração

Após fazer clone do projeto deve-se instalar as dependências necessárias.

Para a instação do Node e do NPM, recomenda-se o uso do [NVM](https://github.com/creationix/nvm)

- Instale o NVM

    `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`

- Atualize as definições de seu terminal

    `source ~/.profile`

    `source ~/.bashrc`

- Instale a versão desejada do Node

    `nvm install <versão>`

- Instale o Angular 12

    `npm install -g @angular/cli@12.2.9`

- Instale as dependências

    `npm install package.json`

## Servidor de Desenvolvimento

Execute `ng serve` para iniciar um servidor de desenvolvimento. A aplicação executará em `http://localhost:4200/` e recarregará automaticamente ao detectar mudanças.

## Construção do projeto (Build)

Execute `ng build` para construir a aplicação. Use a opção `--prod` para construir a aplicação em ambiente de produção.


## Packages utilizados

- Leaflef

- D3

- Materials

- Bootstrap

- Round-Progress

- Moment

- Chart.js

- Flask

## Rotas do site

Existem, no total, cinco rotas no Turmalina: Mapa, Ranking, Relatório, Avaliações e Documentação. Cada uma delas possui diferentes funções que serão sitadas a seguir.

### Mapa

A rota "Mapa", contém um mapa leaflet do estado da Paraíba. Nele, também é possível observar a pontuação de cada município do estado, que difere conforme a cor que está sendo fornecida, que são baseadas nos dados adquiridos.

### Ranking

No ranking, há uma tabela para apresentar as posições dos municípios em relação a quantidade de pontos que foram obtidos. Além da colocação, também são dispostos o nome, a entidade pública, a data de avaliação, a pontuação, o link do portal de cada cidade.

### Relatório

No relatório é onde estão três tipos de gráficos sobre a avaliação (gráfico de progressão circular, gráfico de barras e gráfico de linhas), o que traz mais informações sobre a pontuação que foi mostrada do ranking. 
Os gráficos de prograssão circular expõem a pontuação dos parâmetros que formam a pontuação geral. Já no de barras, está uma comparação entre a pontuação do município que foi selecionado com a média do estado. E, finalmente no de linhas, é mostrado o histórico de pontuações do município.

### Avaliação

Nessa rota, ao selecionar um município e uma data, serão exibidas tabelas com as pontuações dos sub parâmetros, as quais compõem a pontuação de cada parâmetro, que foram mostrados no gráfico de progressão circular. Assim, é possível ter acesso a detalhes sobre o assunto.

### Documentação

Por fim, na documentação é onde estão todas as informações referentes ao Turmalina e como os portais dos municipios podem implementar, corretamente, a estrutura do código, para que seja exibida a pontuação apropriada.