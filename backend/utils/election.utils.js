const viewElectionAsModeratorResult =  (election) => {
    return result = {
        id: election._id,
        code: election.code,
        title: election.title,
        start_time: election.start_time,
        end_time: election.end_time,
        timezone: election.timezone,
        voters: election.voters
    }
}

const removeElectionFromUsers = (user, users) => {
    const index = user.elections.indexOf(election_id);
        user.elections.splice(index, 1); 
        user.save();
        users.forEach((user) => {
            const index = user.moderator_for.indexOf(election_id);
            user.moderator_for.splice(index, 1); 
            user.save();
        })
}




module.exports = {
    viewElectionAsModeratorResult,
    removeElectionFromUsers
}