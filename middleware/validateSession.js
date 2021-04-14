const db = require('../db');
const jwt = require('jsonwebtoken');

const Users = db.models.User;

const validateSession = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(501).send({ auth: false, message: "You are not authorized to access this resource"});
    return;
  }

  await jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      res.status(501).send({ auth: false, message: "You are not authorized to access this resource."});
      return;
    } else {
      const user = await Users.findOne({ where: { id: decoded.id }});

      req.callingUser = decoded.id;
      req.isAdmin = user.isAdmin;
    }
  })

  next();
}

module.exports = validateSession;
