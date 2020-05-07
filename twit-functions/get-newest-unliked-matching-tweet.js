const logger = require('./../logger')

const getNewestUnlikedMatchingTweet = (Twitter, keywords) => {

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

        Twitter.get('search/tweets', params, (err, data) => {

            if (err) {
                logger.info('err', err)
                reject(err)
            }

            logger.info('statuses found: ' + data.statuses.length)

            const notAlreadyLikedStatuses = data.statuses.filter(tweet => {
                return !tweet.favorited
            })

            logger.info('After filtering out already liked tweets: ' + notAlreadyLikedStatuses.length)

            const randIndex = Math.floor(Math.random() * notAlreadyLikedStatuses.length)

            logger.info('Randomly chose tweet at index: ' + randIndex)

            const chosenTweet = notAlreadyLikedStatuses[randIndex]

            resolve(chosenTweet);

        })

    })
}

module.exports = getNewestUnlikedMatchingTweet

