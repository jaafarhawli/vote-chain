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
    const candidateScores = {};
    for(const party of parties) {
        for(const candidate of party.candidates) {
            candidateScores[candidate.name] = candidate.score
        }
    }
    const sorted = Object.fromEntries(
        Object.entries(candidateScores).sort(([,a],[,b]) => b-a)
    );
    return res.status(200).json({
        sorted
    });
}

const viewPartyCandidates = async (req, res) => {
        const {election_id} = req.params;
        const parties = await Party.find({election: election_id}).select();
        const result = [];
        for(const party of parties) {
            const candidateNames = [];
            const candidateScores = [];
            for(const candidate of party.candidates) {
                candidateNames.push(candidate.name);
                candidateScores.push(candidate.score);
            }
            result.push({
                labels: candidateNames,
                data: candidateScores,
                party: party.name
            })
        }
        return res.status(200).json({
            result
        });
}

const viewElectionNumerics = async (req, res) => {
    const {election_id} = req.params;
    const election = await Election.findById(election_id).populate({
        path: "parties",
      });
    let candidates = 0;
    for(const party of election.parties) {
        candidates+=party.candidates.length;
    }
    const numerics = {
        voters: election.voters.length,
        parties: election.parties.length,
        candidates: candidates
    }
    return res.status(200).json({
        numerics
    });
}



module.exports = {
    viewPartiesVoteCount,
    viewCandidatesVoteCount,
    viewPartyCandidates,
    viewElectionNumerics
}