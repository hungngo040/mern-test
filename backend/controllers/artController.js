const Art = require('../models/artmodel')
const mongoose = require('mongoose')


// get all arts
const getArts = async (req, res) => {
    const arts = await Art.find({}).sort({createdAt: -1})
    res.status(200).json(arts)
}
// get a single art
const getArt = async (req, res) => {
    const { id } = req.params
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No art found'}) 
    }

    const art = await Art.find({id})
    
    if (!art) {
       return res.status(404).json({error: 'No art found'}) 
    }
    res.status(200).json(art)
}   

// create art
const createArt = async (req, res) => {
    const {title, price, stock, tags, description} = req.body

    try {
        const art = await Art.create({title, price, stock, tags, description})
        res.status(200).json(art)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete art
const deleteArt = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No art found'}) 
    }

    const art = await Art.findOneAndDelete({_id: id})
    
    if (!art) {
        return res.status(400).json({error: 'No art found'}) 
    }

    res.status(200).json(art)
    
}

//update art
const updateArt = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No art found'}) 
    }

    const art = await Art.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!art) {
        return res.status(400).json({error: 'No art found'}) 
    }

    res.status(200).json(art)
}



module.exports = {
    getArts,
    getArt,
    createArt,
    deleteArt,
    updateArt
}