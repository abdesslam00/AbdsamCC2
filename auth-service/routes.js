const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateur = require('./utilisateur');

router.post('/register', async (req, res) => {
  try {
    const { utilisateur_id,nom, email, login, mdp } = req.body;

    let utilisateur = await Utilisateur.findOne({ email });
    if (utilisateur) {
      return res.status(400).json({ message: "m3ana" });
    }
    const hashedPassword = await bcrypt.hash(mdp, 10);
    utilisateur = new Utilisateur({ utilisateur_id,nom, email, login, mdp: hashedPassword });
    await utilisateur.save();
    res.status(201).json({ message: "bien" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur ");
  }
});

router.post('/login', async (req, res) => {
    console.log(req.body);
  try {
    const { login, mdp } = req.body;
    const utilisateur = await Utilisateur.findOne({ login });
    if (!utilisateur) {

      return res.status(400).json({ message: "no " });
    }

    const password= await bcrypt.compare(mdp, utilisateur.mdp);
    if (!password) {
      return res.status(400).json({ message: "mdp inc" });
    }

    const token = jwt.sign({ userId: utilisateur._id }, 'secret');

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("erreur");
  }
});



router.post('/utilisateurs/m3ana', async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findOne({ login: req.body.login });
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouve" });
    }
    res.status(200).json({ message: "Utilisateur touve" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
