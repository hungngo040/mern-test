const express = require('express')
const {
    getArt,
    getArts,
    createArt,
    deleteArt,
    updateArt
} = require('../controllers/artController')

const router = express.Router()

router.get('/', getArts)

router.get('/:id', getArt)

router.post('/', createArt)

router.delete('/:id', deleteArt)

router.patch('/:id', updateArt)


module.exports = router