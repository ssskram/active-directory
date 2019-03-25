const express = require('express')
const router = express.Router()
const refreshToken = require('../refresh')
const fetch = require('node-fetch')
const dt = require('node-json-transform').DataTransform
const models = require('../models/loginEvents')

router.get('/events', async (req, res) => {
    let events = []
    const time = await getSpan(req.query.prevMinutes)
    await callApi("https://graph.microsoft.com/beta/auditLogs/signIns?$filter=(status/errorCode eq 0) and createdDateTime ge " + time.from + "")
    res.status(200).send(events)

    async function callApi(url) {
        const response = await fetch(url, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + await refreshToken(),
                'Content-Type': 'application/json'
            })
        })
        const data = await response.json()
        await events.push(...dt(data, models.events).transform())
        if (data["@odata.nextLink"]) {
            await callApi(data["@odata.nextLink"])
        } else return
    }
})

router.get('/singleEvent', async (req, res) => {
    fetch("https://graph.microsoft.com/beta/auditLogs/signIns/" + req.query.id, {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + await refreshToken(),
            'Accept': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
})

const getSpan = span => {
    const from = new Date()
    // pulling an extra five minutes back...
    // typically there is a ~2-4 min lag before events
    // appear in feed
    from.setMinutes(from.getMinutes() - span - 5)
    return {
        from: from.toISOString(),
    }
}

module.exports = router