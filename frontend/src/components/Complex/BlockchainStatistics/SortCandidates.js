export const sortCandidates = (allCandidates, allCandidatesScores, setAllCandidates, setAllCandidatesScores) => {
    if(allCandidates) {
    const indices = [];
    for(let i = 0; i< allCandidates.length; i++) {
      indices[i] = i;
    }
    indices.sort( (a,b) => allCandidatesScores[b] - allCandidatesScores[a] )
    const sortedNames = indices.map(i => allCandidates[i]);
    const sortedScores = indices.map(i => allCandidatesScores[i]);
    setAllCandidates(sortedNames);
    setAllCandidatesScores(sortedScores);
  }
}