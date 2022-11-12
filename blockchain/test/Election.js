const Election = artifacts.require("Election");
const assert = require('assert');

contract('Election', (accounts) => {
    
    it('should deploy election', async() => {
        const admin_account = accounts[0];
        const election = await Election.deployed(1668239079, 1668249079);
        const admin = await election.admin.call();
        const start_time = await election.startTime.call();
        const end_time = await election.endTime.call();
        assert.equal(admin, admin_account);
        assert.equal(start_time, 1668239079);
        assert.equal(end_time, 1668249079);
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
    
})
