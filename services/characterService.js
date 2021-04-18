const db = require('../db');
const Character = db.models.Character;
const censorString = require('../helpers/censor');

const createCharacter = (req, res) => {
// generate modifiers if need be
console.log(req.callingUser);
  const newCharacter = {
    ...req.body.character,
    name: censorString(req.body.character.name),
    bio: censorString(req.body.character.bio),
    faction: censorString(req.body.character.faction),
    UserId: req.callingUser,
  };

  Character.create(newCharacter)
    .then((character) => res.status(200).send({ ok: true, character, }))
    .catch((err) => res.status(500).send({ ok: false, error: err }));
}

const updateCharacter = async (req, res) => {
  const isAdmin = req.isAdmin;
  const characterUpdate = req.body.character;
  const dbChar = await Character.findOne({ where: { id: req.params.id }});

  if (!dbChar) {
    res.status(201).send({ ok: true, message: "No character found." });
  }

  console.log(dbChar.UserId);
  console.log(req.callingUser)
  if ((dbChar.UserId !== req.callingUser) && !isAdmin) {
    res.status(401).send({ ok: true, message: "You are not authorized to perform this action." });
    return;
  }

  // update modifiers if need be

  Character.update({
    ...characterUpdate,
  }, {
    where: {
      id: req.params.id,
    }
  })
  .then(() => res.send({ ok: true }))
  .catch((err) => res.status(500).send({ ok: false, error: err }))
}

const getCharacters = (req, res) => {
  const offset = req.params.offset;
  const limit = req.params.limit;

  Character.findAll({
    offset,
    limit,
    order: [
      ['name', 'DESC']
    ]
  })
  .then((characters) => res.status(200).send({ ok: true, characters, }))
  .catch((err) => res.status(500).send({ ok: false, error: err, }))
}

const getCharactersByUserId = (req, res) => {
  const targetUserId = req.params.id;
  const limit = req.params.limit;
  const offset = req.params.offset;

  Character.findAll({
    offset,
    limit,
    order: [
      ['name', 'DESC']
    ]
  })
  .then((characters) => res.status(200).send({ ok: true, characters, }))
  .catch((err) => res.status(500).send({ ok: false, error: err }))
}

const getCharacterById = (req, res) => {
  const characterId = req.params.id;

  Character.findOne({ where: { id: characterId }})
    .then((character) => res.status(200).send({ ok: true, character }))
    .catch((err) => res.status(500).send({ ok: false, error: err }))
};

const deleteCharacter = async (req, res) => {
  const isAdmin = req.isAdmin;
  const dbChar = await Character.findOne({ where: { id: req.params.id }});

  if (!dbChar) {
    res.status(201).send({ ok: true, message: "No character found." });
  }

console.log(dbChar)
console.log(req.callingUser)
  if ((dbChar.UserId !== req.callingUser) && !isAdmin) {
    res.status(401).send({ ok: true, message: "You are not authorized to perform this action." });
    return;
  }

  Character.destroy({ where: { id: req.params.id }})
    .then(() => res.status(200).send({ ok: true }))
    .catch((err) => res.status(500).send({ ok: false, error: err, }))
}

module.exports = { createCharacter, updateCharacter, getCharacters, getCharacterById, getCharactersByUserId, deleteCharacter };
