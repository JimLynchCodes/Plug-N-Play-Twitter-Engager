
const logger = require('./logger')
const initializeWithCreds = require('./twit-functions/initilize-with-creds')
const getNewestUnlikedMatchingTweet = require('./twit-functions/get-newest-unliked-matching-tweet')
const likeTweet = require('./twit-functions/like-tweet')
const retweetTweet = require('./twit-functions/retweet-tweet')
const followUser = require('./twit-functions/follow-user')
const config = require('./config.js');
const constants = require('./constants')

engage = async () => {

    return new Promise(async resolve => {
        try {
            const args = process.argv.slice(2)

            const keywords = getArgValues(args, constants.KEYWORDS_FLAG) || config.keywords 
            const minWaitTime = parseInt(getArgValues(args, constants.MIN_WAIT_TIME_FLAG) || config.minWaitTime)
            const maxWaitTime = parseInt(getArgValues(args, constants.MAX_WAIT_TIME_FLAG) || config.maxWaitTime)
            const quietFlag = args.find(arg => arg.includes(constants.QUIET_FLAG))

            const noLikesArg = args.find(arg => arg.includes(constants.NO_LIKE_FLAG))
            const noRetweetArg = args.find(arg => arg.includes(constants.NO_RETWEET_FLAG))
            const noFollowArg = args.find(arg => arg.includes(constants.NO_FOLLOW_FLAG))


            logger.info('Command line arg values:')
            logger.info('--keywords: ' + keywords)
            logger.info('--max-wait-time: ' + minWaitTime)
            logger.info('--min-wait-time: ' + maxWaitTime)
            logger.info('--no-like: ' + noLikesArg)
            logger.info('--no-retweet: ' + noRetweetArg)
            logger.info('--no-follow: ' + noFollowArg)
            logger.info('--quiet: ' + quietFlag)

            logger.info('\nInitializing twitter...')

            const Twitter = initializeWithCreds()

            logger.info('Getting newest unliked matching tweet...')

            const tweet = await getNewestUnlikedMatchingTweet(Twitter, keywords)
            
            /** Use below logging to see the full tweet object from Twitter. */
            // logger.info(`Fulltweet: ${JSON.stringify(tweet, null, 2)}`)
            
            logger.info(`Tweet favorited property: ${tweet.favorited}`)

            const tweetId = tweet.id_str

            const tweeterId = tweet.user.id_str

            const waitTimeUntilRetweet = getRandomTimeWithinBounds(minWaitTime, maxWaitTime)
            const additionalWaitTimeUntilFollow = getRandomTimeWithinBounds(minWaitTime, maxWaitTime)

            if (noLikesArg)
                logger.info('NOT liking because --no-like flag was found.')

            else {
                await likeTweet(Twitter, tweetId)
            }

            setTimeout(async () => {

                if (noRetweetArg)
                    logger.info('NOT retweeting because --no-retweet flag was found.')

                else {
                    await retweetTweet(Twitter, tweetId)
                }

                setTimeout(async () => {

                    if (noFollowArg)
                        logger.info('NOT following because --no-follow flag was found.')

                    else {
                        await followUser(Twitter, tweeterId)
                    }

                    resolve('success!')

                }, additionalWaitTimeUntilFollow)

            }, waitTimeUntilRetweet)

        }
        catch (err) {
            return Promise.reject(err)
        }

    })

}

module.exports = {
    engage
}

/** Utility function to pull the value off of a flag that takes one */
const getArgValues = (args, flag) => {

    const argToFind = args.find(arg => arg.includes(flag))

    return argToFind && argToFind.substring(flag.length + 1, argToFind.length)
}

/**
 *  Utility function to generate the amount of time to wait between engagement interactions.
 *  Arguments and return time are all in milliseconds.
 */
const getRandomTimeWithinBounds = (min, max) => {

    if (max < min)
        throw new Error('max can\'t be less than min! max: ' + max + ', min: ' + min)

    const time = Math.floor(min + Math.random() * (max - min))

    logger.info('Calculated random amount of time within bounds: ' + time)

    return time

}