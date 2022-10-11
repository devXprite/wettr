#!/bin/sh
set -e
# Install node and npm via nvm - https://github.com/nvm-sh/nvm

# Define versions
INSTALL_NODE_VER=16.16
INSTALL_NVM_VER=0.39.1

# You can pass argument to this script --version 8
if [ "$1" = '--version' ]; then
	echo "==> Using specified node version - $2"
	INSTALL_NODE_VER=$2
fi

echo "==> Ensuring .bashrc exists and is writable"
touch ~/.bashrc

echo "==> Installing node version manager (NVM). Version $INSTALL_NVM_VER"
# Removed if already installed
rm -rf ~/.nvm
# Unset exported variable
export NVM_DIR=

# Install nvm 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v$INSTALL_NVM_VER/install.sh | bash
# Make nvm command available to terminal
source ~/.nvm/nvm.sh

echo "==> Installing node js version $INSTALL_NODE_VER"
nvm install $INSTALL_NODE_VER

echo "==> Make this version system default"
nvm alias default $INSTALL_NODE_VER
nvm use default

#echo -e "==> Update npm to latest version, if this stuck then terminate (CTRL+C) the execution"
#npm install -g npm

echo "==> Checking for versions"
nvm --version
node --version
npm --version

echo "==> Print binary paths"
which npm
which node

echo "==> List installed node versions"
nvm ls

nvm cache clear
# echo "==> Now you're all setup and ready for development. If changes are yet totake effect, I suggest you restart your computer"

echo "==> Installing wettr latest version"
npm install wettr@latest -g 