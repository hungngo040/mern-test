const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true,
  
  },

  email: {
    type: String,
    required: true,
    unique: true
},

})

// static signup
adminSchema.statics.signup = async function(username, password, email) {
    
    // validation
    if (! username || ! password || !email) {
        throw Error(' All fields must be field')
    }
    
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }
    
    
    const exists = await this.findOne({ username })

    if (exists) {
        throw Error(' Username already in use')
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const admin = await this.create({ username, password: hash, email})
    return admin

}

// static login
adminSchema.statics.login =async function(username, password) {
  if (! username || ! password) {
    throw Error(' All fields must be field')
  }

  const admin = await this.findOne({ username })

    if (!admin) {
        throw Error(' Incorrect username ')
    }

    const match = await bcrypt.compare(password, admin.password)

    if(!match) {
      throw Error( 'Incorrect password')
    }

    return admin
}
module.exports = mongoose.model('Admin', adminSchema)
