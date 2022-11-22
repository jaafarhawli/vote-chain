const Election = artifacts.require("Election");
const assert = require('assert');

contract('Election', (accounts) => {
    
    it('should deploy election', async() => {
        const admin_account = accounts[0];
        const election = await Election.deployed(1678239079, 1678249079);
        const admin = await election.admin.call();
        const start_time = await election.startTime.call();
        const end_time = await election.endTime.call();
        assert.equal(admin, admin_account);
        assert.equal(start_time, 1678239079);
        assert.equal(end_time, 1678249079);
    })
    
    it('should allow admin to add candidates', async() => {
        const candidates = ['mbappe'];
        const parties = ['france'];
        const election = await Election.deployed(1668239079, 1668249079);
        await election.addCandidates(candidates, parties);
        const results = await election.candidates.call(0);
        assert.equal(results.name, 'mbappe');
        assert.equal(results.partyName, 'france');
        assert.equal(results.voteCount, 0);
    })

    it('should give voter right to vote', async() => {
        const election = await Election.deployed(1668239079, 1668249079);
        const voter = accounts[2];
        await election.giveRightToVote([voter]);
        const voters = await election.voters.call(voter);
        assert(voters.hasAccess, true);
    })

    it('should be able to vote', async() => {
        const candidates = ['mbappe'];
        const parties = ['france'];
        const election = await Election.deployed(1668239079, 1668249079);
        await election.addCandidates(candidates, parties);
        const voter = accounts[2];
        await election.giveRightToVote([voter]);
        await election.vote(0, {from: voter});
        const results = await election.results();
        const voters = await election.voters.call(voter);
        assert(results[0].voteCount, 1);
        assert(voters.voted, true);
    })

    it('should be able to change election time interval', async() => {
        const election = await Election.deployed(1668239079, 1668249079);
        await election.changeTime(1678239079, 1678249079);
        const start_time = await election.startTime.call();
        const end_time = await election.endTime.call();
        assert(start_time, 1678239079);
        assert(end_time, 1678249079);
    })
    
    it('should be able to launch election', async() => {
        const election = await Election.deployed(7968239079, 7968249079);
        await election.launchElection();
        const launched = await election.launched.call();
        assert(launched, true);
    })
    
})
