const express = require('express')
const router = express.Router()
const checkToken = require('../token')
const refreshToken = require('../refresh')
const fetch = require('node-fetch')
const dt = require('node-json-transform').DataTransform
const models = require('../models/loginEvents')
global.Headers = fetch.Headers

router.get('/events',
    async function (req, res) {
        let events = []
        let page = 0
        const valid = (checkToken(req.token))

        if (valid == true) {
            await callApi("https://graph.microsoft.com/beta/auditLogs/signIns?&$filter=status/errorCode eq 0")
            res.status(200).send(events)
        } else res.status(403).end()

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
            page = page + 1
            if (data["@odata.nextLink"] && page <= 10) {
                await callApi(data["@odata.nextLink"])
            } else return
        }
    }
)

module.exports = router