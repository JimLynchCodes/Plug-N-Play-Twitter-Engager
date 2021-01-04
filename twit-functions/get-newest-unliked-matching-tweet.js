const logger = require('./../logger')
const getRandomHighEnoughSentimentTweet = require('./get-random-high-enough-sentiment-tweet').getRandomHighEnoughSentimentTweet

const getNewestUnlikedMatchingTweetHighEnoughSentiment = (Twitter, keywords, minSentimentArg) => {

    return new Promise((resolve, reject) => {

        // for more parametes, see: https://dev.twitter.com/rest/reference/get/search/tweets
        const params = {
            q: keywords + ' -filter:retweets',
            result_type: 'recent',
            lang: 'en',
            count: 100,
            include_entities: false
        }

        logger.info('searching for: ' + params.q)

        Twitter.get('search/tweets', params, async (err, data) => {

            if (err) {
                logger.error('err', err)
                reject(err)
            }

            logger.info('statuses found: ' + data.statuses.length)

            const notAlreadyLikedStatuses = data.statuses.filter(tweet => {
                if (tweet.favorited !== true)
                    return tweet
            })

            logger.info('After filtering out already liked tweets: ' + notAlreadyLikedStatuses.length)

            // const randIndex = Math.floor(Math.random() * notAlreadyLikedStatuses.length)

            // logger.info('Randomly chose tweet at index: ' + randIndex)

            // try {
                const chosenHighSentimentTweet = await getRandomHighEnoughSentimentTweet(notAlreadyLikedStatuses, minSentimentArg) 
                console.log('min-sentiment: ', chosenHighSentimentTweet)
                
                console.log('tweet is: ', chosenHighSentimentTweet)

                resolve(chosenHighSentimentTweet)
            // }
            // catch(err) {
            //     logger.error('No matching tweets found above the minimum sentiment of ' + minSentimentArg + ' ' + err)
            //     throw 'No matching tweets found above the minimum sentiment of ' + minSentimentArg + ' ' + err
            // }
        })

    })
}

module.exports = getNewestUnlikedMatchingTweetHighEnoughSentiment

