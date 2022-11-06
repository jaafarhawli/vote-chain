const Party = require('../models/parties.model');
const Election = require('../models/elections.model');

const addParty = async (req, res) => {
    const {name, election_id} = req.body;

    Election.findById(election_id, (err) => {
        if(err)
        return res.status(404).json("Election not found");});

        try{
            const party = new Party();
            party.name = name;
            party.election = election_id;
            await party.save();
    
            const election = await Election.findById(election_id);
            election.parties.push(party._id);
            await election.save();
    
            res.status(200).json(party);
    
        }catch(err){
            res.status(400).json({
                message: err.message
            })
        }
}

module.exports = {
    addParty
}