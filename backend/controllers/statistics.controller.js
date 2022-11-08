const Election = require('../models/elections.model');
const Party = require('../models/parties.model');

const viewPartiesVoteCount = async (req, res) => {
    const {election_id} = req.params;
    const parties = await Party.find({election: election_id}).select();
    const partyNames = [];
    const partyScores = [];
    for(const party of parties) {
        partyNames.push(party.name);
        let votes=0;
        for(const candidate of party.candidates) {
            votes+=candidate.score;
        }
        partyScores.push(votes);
    }
    return res.status(200).json({
        labels: partyNames,
        data: partyScores
    });
}

module.exports = {
    viewPartiesVoteCount
}