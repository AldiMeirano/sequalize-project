const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }


 const comparePasswords = async (candidatePassword, hashedPassword) => {
   return await bcrypt.compare(candidatePassword, hashedPassword);
 };
 module.exports = { hashPassword, comparePasswords };