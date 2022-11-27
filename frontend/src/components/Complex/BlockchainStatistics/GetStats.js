export const getStats = async (data) => {
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
        return {
            names:names,
            scores: scores,
            candidates: candidates,
            candidatesScores: candidatesScores,
            allCandidates: allCandidates,
            allCandidatesScores: allCandidatesScores
        }
    }
}