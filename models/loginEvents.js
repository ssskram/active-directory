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
        location: {
            city: 'location.city',
            state: 'location.state',
            country: 'location.countryOrRegion',
            latitute: 'location.geoCoordinates.latitude',
            longitude: 'location.geoCoordinates.longitude'
        }
    },
    operate: [{
        'run': dateTransform,
        'on': "time"
    }]
}

module.exports = {
    events
}