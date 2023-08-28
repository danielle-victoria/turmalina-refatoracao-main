#!/bin/bash

export NVM_DIR="$HOME/.nvm"

if ! [ -a "$NVM_DIR" ]; then
    echo "Looks like you don't have NVM Installed, downloading..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    echo "NVM Installed."
    source ~/.profile
    source ~/.bashrc
fi

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


if ! [ -a "$NVM_DIR/versions/node/v14.20.0" ]; then

    nvm install 14.20.0
    echo "Node.js v14.20.0 Installed."
fi

nvm use 14.20.0

if ! [ -a "$NVM_DIR/versions/node/v14.20.0/lib/node_modules/@angular/cli" ]; then
    npm install -g @angular/cli@14
fi

if ! [ -a "./webapp/node_modules" ]; then
    cd webapp
    npm install
    cd ..
fi

npm run --prefix webapp ng serve
