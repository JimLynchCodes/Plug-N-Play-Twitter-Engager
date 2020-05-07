const logger = require('./../logger')

const like = (Twitter, tweetId) => {

    return new Promise((resolve, reject) => {

        logger.info('Liking tweet!' + tweetId)

        Twitter.post('favorites/create', {
            id: tweetId
        }, (err, response) => {

            if (err) {
                logger.info('Something went wrong while LIKING... ' + err)
                reject(err)
            }

            logger.info('Liked ' + tweetId + '!')
            resolve(response)
        });

    })
}

module.exports = like