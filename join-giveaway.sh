#!/bin/bash -l

# Print some nice things in the logs.
printf "=======================================\n\n"
printf "Running Sector Scraper...\n"
printf "$(date)\n\n"

# Load these for nvm and node.
source ~/.bashrc
source ~/.nvm/nvm.sh
source ~/.profile

# Navigate into the project directory.
cd ~/Git-Projects/Jim-s-Twitter-Api-Experiments/giveaway_sweepstakes_joiner/

# Use project's preferred node version from .nvmrc file.
nvm use

# Run the cron job(s)!
# npm start

# node follow_bot.js
npm start


printf "\nRan twitter bot!\n"
