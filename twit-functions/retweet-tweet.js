const logger = require('./../logger')

const retweetTweet = (Twitter, tweetId) => {

    return new Promise((resolve, reject) => {

        logger.info('Retweeting tweet!' + tweetId)

        Twitter.post('statuses/retweet/:id', {
            id: tweetId
        }, (err, response) => {
            if (err) {
                logger.info(' Error retweeting: ' + err)
                reject(err)
            }
            logger.info('Retweeted tweet!')
            resolve(response)
        })

    })
}

module.exports = retweetTweet