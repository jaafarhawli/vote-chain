const Election = artifacts.require("Election");

module.exports = function(deployer) {
  deployer.deploy(Election, 1678239079, 1678249079);
};