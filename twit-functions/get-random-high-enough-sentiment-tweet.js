const logger = require('../logger')
var Sentiment = require('sentiment');

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

const getRandomHighEnoughSentimentTweet = (notAlreadyLikedStatuses, minSentimentArg) => {

    return new Promise(resolve => {

        logger.info(`Initial length of statuses: ${notAlreadyLikedStatuses}`);
        // logger.info(`Initial length of statuses: ${JSON.stringify(notAlreadyLikedStatuses)}`);

        let tweetFound = false

        const shuffled = shuffleArray(notAlreadyLikedStatuses)

        logger.info(`Initial length of statuses: ${JSON.stringify(shuffled, null, 1)}`);

        const sentimentAnalyzer = new Sentiment();

        shuffled.forEach((status, index) => {

            console.log('in status: ', index)
            console.log('status text: ', status.text)

            const tweetSentiment = sentimentAnalyzer.analyze(status.text).score;

            logger.info(`The sentiment of ${status.text} is: ${tweetSentiment}`);

            if (tweetSentiment >= minSentimentArg && !tweetFound) {
                logger.info(`Greater than or equal to the min sentiment of: ${minSentimentArg}`);
                tweetFound = true
                resolve(status)
            }

            if ((index + 1) === notAlreadyLikedStatuses.length && !tweetFound)
                reject('no status to return...')

        });
    })

}

module.exports = { getRandomHighEnoughSentimentTweet }