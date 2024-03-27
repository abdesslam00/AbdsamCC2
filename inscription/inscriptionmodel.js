const inscriptionSchema = new mongoose.Schema({
    id:String,
    utilisateur_id:  mongoose.Schema.Types.ObjectId, ref: 'Utilisateur',
    evenement_id: mongoose.Schema.Types.ObjectId, ref: 'Evenement', 
  });

module.exports = mongoose.model('Inscription', inscriptionSchema);
