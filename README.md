# Plug N' Play Twitter Engager


<img src="./art/plug-n-play-twitter-engager-logo.png" alt="plug-n-play-twitter-engager-logo" align="right" width="175"/>

<div >
<p margin="30px">
From the command line, quickly and easily find a tweet matching some keywords and then like it, retweet it, and follow the user who tweeted it!
</p>
</div>

<br/>

## How It Works

The script should do this:

  Pull 100 latest original tweets matching the keywords (excluding retweets),

  then randomly select one that hasn't already been liked,

  and on behalf on the account whose creds were provided:
  - likes the tweet.
  - retweets the tweet (with no comment).
  - follows the user who created the tweet.

### - Step 1 - Plug in Your Credentials.

### - Step 2 - Run the Twitter Engager 

### - Step 3 (Optional) - Schedule as a Cron Job.

<br/>

# Usage Guide

## Step 1 - Plug in Your Credentials.

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

  config.js
  ```
  module.exports = {
    keywords: 'Giveaway! like to enter',
    creds: {
        consumer_key: '...',
        consumer_secret: '...',
        access_token: '...',
        access_token_secret: '...'
    },
    minWaitTime: 400,
    maxWaitTime: 1200
  }
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

  - ### Install Depencies
    Run the usual npm isntall command.
    ```
    npm i
    ```

  - ### Run the start script
    This project uses the familiar old `start` script to run the whole twitter engagement process.
    ```
    npm start
    ```

    Note: be sure to use the `--` before the flags as to pass them to the underlying command for `npm start`

    ```
    npm start -- --keywords="new york knicks"
    ```
    
<br/>

## Step 3 - Schedule As A Cron Job

  - ### Using a Remote Server
    This [blog post]() is a nice guide on setting up a new Ubuntu server from Digital Ocean for running cron jobs.
    
    These can also be scheduled on your local machine, but they won't run if it is turned off or asleep.
    
     <br/>
     
  - ### Edit The Crontab
    
    To open the crontab editor:
    ```
    crontab -e
    ```
    
    On a new line, put the schedule on which you'd like the script to run (see [gronguru](https://crontab.guru/) for help) followed by the command to run. 
    
    The below example schedules the script to ONLY like a tweet found with the default search keywords every day at 4:05pm. 
    ```
    # My applesauce tweeting cronjob  
      */12 * * * * cd ~/Git-Projects/Plug-N-Play-Twitter-Engager && ./run-twitter-engager.sh --keywords=\"applesauce\"
    ```
    
    ## Bash Script
    Sometimes when running in a cron environment you need to "setup" again (navigate to the proejct directory, load nvm and node into the PATH, etc.)

    _Note: Although the node process uses Winston to write logs to the project's `logs` folder, you can pipe the output of the crontab execution which can be helpful for debugging inproperly running jobs:_
    ```
    # My applesauce tweeting cronjob  
      */12 * * * * cd ~/Git-Projects/Plug-N-Play-Twitter-Engager && ./run-twitter-engager.sh --keywords=\"applesauce\ >> ~/Git-Projects/Plug-N-Play-Twitter-Engager/logs/cron-logs_`date +\%Y-\%m-\%d`.log 2>&1"
    
    _Note the use of backlashes to escape the quotes when passing arguments to the bash file._


There is a bash file included in this project, and you can conveniently pass all the arguments you would pass to `npm start` along when you execute the shell script and it will call `npm start` with these additional arguments.

For example:
```
./run-twitter-engager.sh --keywords=\"I like pizza\"
```
You may find that the cron execution environment does not have access to necessary things such as `nvm`. In this case it is recommended to schedule the cron job to execute a bash file which calls `npm start` after the proper setup instead of running the `npm start` command directly. Create a bash file like the one included here and allow your shell's current user to execute it.
```
chmod +x run-twitter-engager.sh
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
| `--min-wait-time` | Integer          | Minimum number of milliseconds to wait between engagement actions. |
| `--max-wait-time` | Integer          | Maximum number of milliseconds to wait between engagement actions. |
| `--quiet` | None          | Much shorter logs. |


Example:
```
npm start -- --keywords="love Javascript" --no-like --no-follow --no-retweet --min-wait-time=200 --max-wait-time=800 --quiet
```

<br/>


## Wait Times
In order to simulate actual user interactions on Twitter, the requests for like, retweet, and follow are not executed simultaneously. Instead, the _like_ is executed immediately, and then a random amount of time betwen the `minWaitTime` and `maxWaitTime` goes by. After this, the _retweet_ is executed, a new random amount of time within bounds in chosen, and after waiting this much time the _follow_ is executed.

The defaults for `minWaitTime` and `maxWaitTime` are 400 and 1100 milliseconds, respectively, and you can change these values by setting them differently in the `config.js` file or via the command line flags.

<br/>


## Logs
All logging is performed using [Winston](https://github.com/winstonjs/winston)'s _info_ and _error_ levels. By default info logs are written to the `./logs` directory into a file prefixed with "logs-", followed by the current calendar date. Similarly, the errors are written in ./logs to a file prefixed "errors-" then followed by the current calendar date.

There is extensive logging in the script for debuggin purposes, but they can be silenced with the `--quiet` flag.

<br/>


## Based On Twit
Shoutout to the nice library [twit](https://github.com/ttezel/twit) This project leverages the for executing the Twitter interactions.

<br/>

## Contributing
We'd love to hear all about your ideas, suggestions, and how you're using this project!
