const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = async (req,res) => {
  const user = await User.create({...req.body})
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({user: user.getName(),token})
}

const login = async (req,res) => {
  console.log("Reched login")
  const {email:email,password:password} = req.body
  console.log(req.body)
  if(!email || !password)
  return res.status(StatusCodes.BAD_REQUEST)
  const user = await User.findOne({email})
  console.log(user)
  if(!user)
  return res.status(StatusCodes.BAD_REQUEST).send({err:"User does not exists"})
  try
  {
    console.log(password)
    const verify = await user.compare(password)
    console.log(verify)
    if(!verify)
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({err:"ksjdhfsjh"})
    const token = user.createJWT()
    res.send({username:user.getName(),token:token})
  }
  catch(error)
  {
      console.log(error)
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({error})
  }
  res.json({...req.body})
  console.log(req)

}

module.exports = {
  login,register
}
