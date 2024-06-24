const express = require('express')
const { summaryController, codeController } = require('../controllers/aiHubController')

const aiHubRouter = express.Router()

aiHubRouter.post('/summarize', summaryController)
aiHubRouter.post('/getCode', codeController)

module.exports = aiHubRouter