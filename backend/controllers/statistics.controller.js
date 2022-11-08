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
const viewCandidatesVoteCount = async (req, res) => {
    const {election_id} = req.params;
    const parties = await Party.find({election: election_id}).select();
    const candidateNames = [];
    const candidateScores = [];
    for(const party of parties) {
        for(const candidate of party.candidates) {
            candidateNames.push(candidate.name);
            candidateScores.push(candidate.score);
        }
    }
    return res.status(200).json({
        labels: candidateNames,
        data: candidateScores
    });
}



module.exports = {
    viewPartiesVoteCount,
    viewCandidatesVoteCount
}