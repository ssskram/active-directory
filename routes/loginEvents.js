const express = require('express')
const router = express.Router()
const checkToken = require('../token')
const refreshToken = require('../refresh')
const fetch = require('node-fetch')
const dt = require('node-json-transform').DataTransform
const models = require('../models/loginEvents')

global.Headers = fetch.Headers

// return all api applications
router.get('/events',
    async function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            fetch("https://graph.microsoft.com/beta/auditLogs/signIns", {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + await refreshToken(),
                        'Content-Type': 'application/json'
                    })
                })
                .then(res => res.json())
                .then(data => {
                    res.status(200).send(dt(data, models.events).transform())
                })
                .catch(err => res.status(500).send(err))
        } else res.status(403).end()
    }
)

module.exports = router