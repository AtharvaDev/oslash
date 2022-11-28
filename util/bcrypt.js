const bcrypt = require('bcrypt')

const saltRounds = 10

exports.createHashPassowrd = async (password) => {
    const hash = await bcrypt.hash(password, saltRounds)
    return hash;
}

exports.verifyPassword = async (password, hash) => {
    //result is true or false
  const result = await bcrypt.compare(password, hash)
  return result;
}