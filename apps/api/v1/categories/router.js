const express = require('express')
const router = express()
const { create, findAll, findOne, update, remove } = require("./controller")

router.get('/categories', findAll)
router.get('/categories/:id', findOne)

router.post('/categories', create)

router.put('/categories/:id', update)

router.delete('/categories/:id', remove)

module.exports = router