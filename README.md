# Plug N' Play Twitter Engager

From the command line, quickly and easily find a tweet matching some keywords and then like it, retweet it, and follow the user who tweeted it!

<br/>

## How It Works

- Step 1 - Plug in your credentials.

- Step 2 - Run the twitter engager script which:
  This script pulls 100 latest original tweets matching the keywords (excluding retweets) and randomly selects on you haven't already liked, and on behalf on the account whose creds were provided:
  - likes the tweet.
  - retweets the tweet (with no comment).
  - follows the user who created the tweet.

- Step 3 (Optional) - Schedule as a cron job.

<br/>

# Usage Guide

<br/>

## Step 1 - Plug in your credentials.

- ### Get Credentials From Twitter
  First, you'll need to create an app here: https://developer.twitter.com/

  In order to get credentials, you will need to get an app "approved".

  The most difficult part of this all is waiting for Twitter to get back to you... 🙄

  Once your app has been approved, you can find the credentials by going to Apps -> Details -> Keys & Tokens.

- ### Create a Config.js file

  Copy the config_SAMPLE.js file and rename it just `config.js`. 

  ```
  cp config_SAMPLE.js config.js
  ```

  Enter your credentials from twitter as the values for the corresponding fields in `creds` within the config.js file.

  You should also set the `keywords` config property to a string as this is the default keywords used to search for a tweet when none is passed in via the `--keywords` flag.

<br/>

## Step 2 - Run the Script

  - ### Set your node verison
    It is recommended to use a recent node version such as v13.13.0 (or whatever is set in the .nvmrc file)
    ```
    nvm use
    ```

  - ### Run the start script
    This project uses the familiar old `start` script to run the whole twitter engagement process.
    ```
    npm start
    ```
    
## Step 3 - Schedule As A Cron Job

  - ### Get a Server
    This blog post is a nice guide on setting up a new Ubuntu server from Digital Ocean for running cron jobs.
    
    These can also be scheduled on your local machine, but they won't run if it is turned off or asleep.
    
  - ### Edit The Crontab
    
    To open the crontab editor:
    ```
    crontab -e
    ```
    
    On a new line, put the schedule on which you'd like the script to run (see [gronguru](https://crontab.guru/) for help) followed by the command to run. 
    
    The below example schedules the script to ONLY like a tweet found with the default search keywords every day at 4:05pm. 
    ```
    5 4 * * * npm start --no-retweet --no-follow
    ```
    
    _Note: Although the node process uses Winston to write logs to the project's `logs` folder, you can pipe the output of the crontab execution which can be helpful for debugging inproperly running jobs:_
    ```
     5 4 * * * npm start --no-retweet --no-follow ~/path/to/project/temporary-cron-logs.log 2&>1
    ```
    
You may find that the cron execution environment does not have access to necessary things such as `nvm`. In this case it is recommended to schedule the cron job to execute a bash file which calls `npm start` after the proper setup instead of running the `npm start` command directly. Create a bash file like the one included here and allow your shell's current user to execute it.
```
chmod +x run-script.sh
```
    

<br/>

## Flags
You can use `--` to pass arguments into script, and these flags allow you to disable certain interactions and/or override the search keywords.

| Flag          | Flag Arguments| Purpose  |
| ------------- |:-------------:| :-----|
| `--keywords`  | String        | Overrides the keywords provided in `config.js` |
| `--no-like`   | None          | Skips over liking the tweet when the script is run. |
| `--no-retweet`| None          | Skips over liking the tweet when the script is run. |
| `--no-follow` | None          | Skips over liking the tweet when the script is run. |

TODO - Add flags for `--minWaitTime` and `--max-wait-time`

Example:
```
npm start -- --keywords="Penguins are my jam" --no-like --no-follow --no-retweet
```

<br/>


###Wait Times
In order to simulate actual user interactions on Twitter, the requests for like, retweet, and follow are not executed simultaneously. Instead, the _like_ is executed immediately, and then a random amount of time betwen the `minWaitTime` and `maxWaitTime` goes by. After this, the _retweet_ is executed, a new random amount of time within bounds in chosen, and after waiting this much time the _follow_ is executed.

The defaults for `minWaitTime` and `maxWaitTime` are 400 and 1100 milliseconds, respectively, and you can change these values by setting them differently in the `config.js` file.

<br/>

## Based On Twit
This project leverages the nice twit library for executing the interactions.

<br/>

## Contributing
We'd love to hear all about your ideas, suggestions, and how you're using this project!
