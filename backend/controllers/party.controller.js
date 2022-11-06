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

const removeParty = async (req, res) => {
    const {party_id, election_id} = req.body;
    Party.findByIdAndRemove(party_id, async (err) => {
        if(err)
        return res.status(400).json("Invalid input");
    });
    Election.findById(election_id, (err, election) => {
        if(err)
        return res.status(404).json("Election not found");
        const index = election.parties.indexOf(election_id);
        election.parties.splice(index, 1); 
        election.save();
    })
    res.status(200).json("Party removed successfully");
}

module.exports = {
    addParty,
    removeParty
}