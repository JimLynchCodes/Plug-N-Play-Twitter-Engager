const logger = require('./../logger')

const followUser = (Twitter, userId) => {

    return new Promise((resolve, reject) => {

        logger.info('Following user!' + userId)

        Twitter.post('friendships/create', {
            user_id: userId
        }, (err, response) => {
            if (err) {
                logger.info(' Error following user: ' + err) 
                reject(err)
            }

                logger.info('Followed! User!');

                resolve(response)
        });
    })
}

module.exports = followUser