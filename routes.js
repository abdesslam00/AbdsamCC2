const express = require('express');
const router = express.Router();
const evenementsmodel = require('../evenements/evenementsmodel');
const mongoose = require('mongoose');

router.post('/add', async (req, res) => {
  try {
    const Evenement = mongoose.model('Evenement', utilisateurSchema);
    const event1 = new Evenement({titre: "ev1", description: "ev", lieu: "tanger", categorie: "1"});
    const event2 = new Evenement({titre: "ev2", description: "e2v", lieu: "tanger2", categorie: "21"});

    const docs = await Evenement.insertMany([event1, event2]);

    console.log(docs);
    res.status(201).json(docs); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

router.get('evenment/titre', async (req, res) => {
  try {
    const titre = req.params.titre;

    const event = await evenementsmodel.findById(titre);

    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

module.exports = router;
