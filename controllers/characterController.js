const router = require('express').Router();
const {
  createCharacter,
  updateCharacter,
  getCharacters,
  getCharactersByUserId,
  deleteCharacter,
  getCharacterById
} = require('../services/characterService');
const validateSession = require('../middleware/validateSession');

// post create Character
router.post('/new', validateSession, createCharacter);

// put edit character
router.put('/edit/:id', validateSession, updateCharacter)

// get all characters w/ limit & offset
router.get('/all/:limit/:offset', validateSession, getCharacters)

// get all characters by user Id
router.get('/user/:id/:limit/:offset', validateSession, getCharactersByUserId)

// delete characters
router.delete('/delete/:id', validateSession, deleteCharacter)

// get character by id
router.get('/:id', validateSession, getCharacterById);

module.exports = router;
