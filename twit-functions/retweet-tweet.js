const logger = require('./../logger')

const retweetTweet = (Twitter, tweetId) => {

    return new Promise((resolve, reject) => {

        Twitter.post('statuses/retweet/:id', {
            id: tweetId
        }, (err, response) => {
            if (err) {
                logger.error(' Error retweeting: ' + err)
                reject(err)
            }
            logger.info(`Retweeted tweet! https://twitter.com/_/status/${tweetId}`)
            resolve(response)
        })

    })
}

module.exports = retweetTweet