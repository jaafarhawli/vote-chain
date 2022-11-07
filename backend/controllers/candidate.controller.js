const Party = require('../models/parties.model');

const addCandidate = async (req, res) => {
    const {name, party_id} = req.body;
    Party.findById(party_id, async (err, party) => {
        if(err) 
        return res.status(404).json({message:"Party not found"});
        if(!party)
        return res.status(404).json({message:"Party not found"});
        const candidate = {
            name: name,
            score: 0,
            picture_url: ""
        }
        party.candidates.push(candidate);
        party.save();
        res.status(200).json({data: party.candidates[party.candidates.length-1]});    
    });
}

const removeCandidate = async (req, res) => {
    const {candidate_id, party_id} = req.body;
    try {
    await Party.updateOne({"_id": party_id}, {"$pull": {
        "candidates": {"_id": candidate_id}
    }})
    return res.status(200).json({message:"Candidate removed successfully"});
    } catch (err) {
        return res.status(500).json({ err });
    }
}

const viewCandidates = async (req, res) => {
    const {election_id} = req.params;
    Party.find({election: election_id}, async (err, parties) => {
        if(err)
        return res.status(404).json({message:"Election not founnd"}); 
        const candidates = [];
        parties.forEach((party) => {
            party.candidates.forEach((candidate) => {
                candidates.push({
                    "party": party.name,
                    "party_id":party._id,
                    "name": candidate.name,
                    "image": candidate.picture_url,
                    "id": candidate._id,
                });
            })
        })
        return res.status(200).json({data: candidates});
    })
}

const uploadCandidateImage = (req, res, next) => {
    const {candidate_id, party_id} = req.body;
    const url = req.protocol + '://' + req.get('host')
    Party.findById(party_id, async (err, party) => {
        if(err)
        res.status(404).json("Party not found");
        party.candidates.forEach((candidate)=> {
            if(candidate._id == candidate_id) {
                candidate.picture_url = url + `/public/${candidate_id}/` + req.file.filename;
            }
        })
        party.save().then(result => {
        res.status(201).json({
            message: "Image uploaded successfully!",    
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
    })
}

module.exports = {
    addCandidate, 
    removeCandidate,
    viewCandidates,
    uploadCandidateImage
}