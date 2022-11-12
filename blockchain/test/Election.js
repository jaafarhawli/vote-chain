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
    
})
