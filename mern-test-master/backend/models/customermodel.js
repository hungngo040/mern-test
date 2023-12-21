const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const customerSchema = new mongoose.Schema({
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
customerSchema.statics.signup = async function(username, password, email) {
  const exists = await this.findOne({ username })

  if (exists) {
      throw Error(' Username already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const customer = await this.create({ username, password: hash, email})
  return customer

}

// static login
customerSchema.statics.login =async function(username, password) {
  if (! username || ! password) {
    throw Error(' All fields must be field')
  }

  const customer = await this.findOne({ username })

    if (!customer) {
        throw Error(' Incorrect username ')
    }

    const match = await bcrypt.compare(password, customer.password)

    if(!match) {
      throw Error( 'Incorrect password')
    }

    return customer
}
module.exports = mongoose.model('Customer', customerSchema)
