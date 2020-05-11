const logger = require('./../logger')

const like = (Twitter, tweetId) => {

    return new Promise((resolve, reject) => {

        Twitter.post('favorites/create', {
            id: tweetId
        }, (err, response) => {

            if (err) {
                logger.error('Something went wrong while LIKING... ' + err)
                reject(err)
            }

            logger.info(`Liked tweet! https://twitter.com/_/status/${tweetId}`)

            resolve(response)

        })

    })

}

module.exports = like