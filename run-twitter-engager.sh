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

# Run the cron job!
npm start
