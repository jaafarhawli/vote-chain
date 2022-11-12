const Election = artifacts.require("Election");

module.exports = function(deployer) {
  deployer.deploy(Election, 1668239079, 1668249079);
};