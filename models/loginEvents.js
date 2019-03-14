const moment = require('moment')
const tz = require('moment-timezone')

const dateTransform = (date) => moment(date).tz('America/New_York').format('MM-DD-YYYY, hh:mm A')

const events = {
    list: 'value',
    item: {
        time: 'createdDateTime',
        userName: 'userDisplayName',
        userEmail: 'userPrincipalName',
        appName: 'appDisplayName',
        ipAddress: 'ipAddress',
        status: 'status',
        location: 'location'
    },
    operate: [{
        'run': dateTransform,
        'on': "time"
    }]
}

module.exports = {
    events
}