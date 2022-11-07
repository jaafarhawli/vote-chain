
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




module.exports = {
    viewElectionAsModeratorResult
}