const logger = require('./../logger')

const followUser = (Twitter, userId) => {

    return new Promise((resolve, reject) => {

        Twitter.post('friendships/create', {
            user_id: userId
        }, (err, response) => {
            if (err) {
                logger.error(' Error following user: ' + err)
                reject(err)
            }

            logger.info(`Followed User! https://twitter.com/intent/user?user_id=${userId}`);

            resolve(response)

        })

    })
    
}

module.exports = followUser