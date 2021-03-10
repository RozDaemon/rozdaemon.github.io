//Moving something from one state to another
//This is for putting our contract on the blockchain
//Use same name as Smart Contract

const SocialNetwork = artifacts.require("SocialNetwork");

module.exports = function(deployer) {
  deployer.deploy(SocialNetwork);
};
