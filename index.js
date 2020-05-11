const engagerScript = require('./engager-script');
const logger = require('./logger')
const constants = require('./constants')

const main = async () => {

    const quietFlag = process.argv.slice(2).find(arg => arg.includes(constants.QUIET_FLAG))

    if (quietFlag) {
        logger.info('Starting in quiet mode...')
        logger.pause()
    }

    else
        logger.info('Starting Twitter Engager!')

    logger.info('Current date & time in New York: ' + new Date().toLocaleString("en-US", { timeZone: "America/New_York" }))

    await engagerScript.engage()

    logger.info('\n\nTwitter Engager has completed successfully! 🤖\n')

    const memUsage = process.memoryUsage()

    logger.info('mem used: ' + (memUsage.rss / 1024 / 1024).toFixed(1) + "mb")

}

main().catch(err => {
    logger.error('Any errors: ' + err)
})
