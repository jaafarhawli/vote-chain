export const getStats = async (data, setParties, setPartiesScores, setAllCandidates, setAllCandidatesScores, setCandidatesNames, setCandidatesScores) => {
    const names = [];
    const scores = [];
    const candidates = [];
    const candidatesScores = [];
    const allCandidates = [];
    const allCandidatesScores = [];
    for(let candidate of data) {
        allCandidates.push(candidate.name);
        allCandidatesScores.push(parseInt(candidate.voteCount));
        if(!names.includes(candidate.partyName)) {
            names.push(candidate.partyName);
            scores.push(parseInt(candidate.voteCount));
            candidates.push([candidate.name]);
            candidatesScores.push([parseInt(candidate.voteCount)]);
        }
        else {
            for(let i=0; i<names.length; i++) {
                if(names[i]===candidate.partyName) {
                    scores[i]+=parseInt(candidate.voteCount);
                    candidates[i].push(candidate.name);
                    candidatesScores[i].push(parseInt(candidate.voteCount));
                }
            }
        }
    setParties(names);
    setPartiesScores(scores);
    setCandidatesNames(candidates);
    setCandidatesScores(candidatesScores);
    setAllCandidates(allCandidates);
    setAllCandidatesScores(allCandidatesScores);
    }
}