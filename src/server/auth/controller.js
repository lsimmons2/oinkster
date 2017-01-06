
import express from 'express'
import bcrypt from 'bcrypt'

function signUp(req, res, next){
  return res.status(200).send('tryna sign up?');
}

function logIn(req, res, next){
  return res.status(200).send('tryna log in?');
}

export { signUp, logIn }
