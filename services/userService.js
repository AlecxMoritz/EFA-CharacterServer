const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.models.User;

 const createUser = (req, res) => {
   const reqUser = req.body.user;
   const newUser = {
     ...reqUser,
     password: bcrypt.hashSync(reqUser.password, 10),
   };

   User.create(newUser)
     .then(() => {
       res.status(200).send({ ok: true });
     })
     .catch((err) => {
       res.status(500).send({ ok: false, error: err });
     })
}

 const signInUser = async (req, res) => {
   const { password, email } = req.body.credentials;

   if (!password || !email) {
     res.status(400).send({ ok: true, message: "No credentials provided"})
   }
   const user = await User.findOne({
     where: {
       email: email,
     }
   });

   const { id, password: passwordHash } = user;

   const match = await bcrypt.compare(password, passwordHash);

   if (match) {
     const token = jwt.sign({ id: id }, process.env.SECRET, { expiresIn: '48hr' });

     res.status(200).send({ ok: true, token: token })
   } else {
     res.status(401).send({ ok: true, message: 'Invalid credentials' });
   }
 }

 const updateUser = (req, res) => {
   const isAdmin = req.isAdmin;

   if (req.callingUser != req.params.id && !isAdmin) {
     res.status(500).send({ ok: false, message: "You are not authorized to perform this action" });
     return;
   }
   const userUpdate = req.body.user;

  // do not allow email or password change
  const currentUserRecord = User.findOne({ where: {
    id: req.params.id,
  }})

   User.update({
     ...userUpdate,
     email: currentUserRecord.email,
     password: currentUserRecord.password,
   }, {
     where: {
       id: req.params.id,
     }
   })
   .then(() => res.send({ ok: true }))
   .catch((err) => res.status(500).send({ ok: false, error: err }));
}

 const getUserInfo = async (req, res) => {
   const foundUser = await User.findOne({ where: { id: req.params.id }});

   if (!foundUser) {
     res.status(201).send({ ok: true, message: "User not found" });
     return;
   } else {
     delete foundUser.password;
     res.status(200).send({ ok: true, data: foundUser});
   }
}

 const elevateUserStanding = async (req, res) => {
   const callingUserObject = await User.findOne({
     where: {
       id: req.callingUser,
     }
   })
   console.log(callingUserObject.isAdmin)
   if (callingUserObject.isAdmin !== true) {
     res.status(401).send({ ok: false, message: "You are not authorized to perform this action. "});
     return;
   }

   User.update({ isAdmin: true }, {
    where: {
      id: req.params.id,
    }
  })
  .then(() => res.send({ ok: true }))
  .catch((err) => res.status(500).send({ ok: false, error: err }));
}

module.exports = { createUser, signInUser, updateUser, getUserInfo, elevateUserStanding }
