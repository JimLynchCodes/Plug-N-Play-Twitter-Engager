const config = require('./../config.js')
const twit = require('twit')

const intializeWithCreds = () => {

    return new twit(config.creds)
    
}

module.exports = intializeWithCreds