const express = require('express');
const router = express.Router();
const Utilisateur = require('../auth-service/utilisateur'); 
const Evenement = require('../evenements/evenementsmodel'); 
const Inscription = require('../inscription/inscriptionmodel'); 

router.post('/inscription', async (req, res) => {
  try {
    const { utilisateur_id, evenement_id } = req.body;

    const utilisateur = await Utilisateur.findById(utilisateur_id);
    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const evenement = await Evenement.findById(evenement_id);
    if (!evenement) {
      return res.status(404).json({ error: 'Evnement non trouve' });
    }

    const inscription = new Inscription({
      utilisateur_id,
      evenement_id
    });

    await inscription.save();

    res.status(201).json(inscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur interne' });
  }
});

module.exports = router;
