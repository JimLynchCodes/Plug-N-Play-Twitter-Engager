#!/bin/bash -l

printf "\nRunning Twitter Engager bash script!\n"

# Load these for nvm and node.
source ~/.bashrc
source ~/.nvm/nvm.sh
source ~/.profile

# Navigate into the project directory.
cd ~/Git-Projects/Plug-N-Play-Twitter-Engager/

# Use project's preferred node version from .nvmrc file.
nvm use

# Allows you to run this bash script with arbitrary arguments. It then calls 
# "npm start" with those arguments. If no arguments passed in it just runs "npm start".
# npm_parameters=""

if [ "$#" -eq "0" ]; then
   npm start
   exit
fi

eval npm start -- "'$*'"
