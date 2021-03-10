pragma solidity ^0.5.0;

contract LRozTest {

	string public name; //Gives us a function to return this value
	
	//Setting the value inside a construtctor
	//"Gets run whenever smart contract is initialized/created"
	
	constructor() public {
		name = "LRoz Social Network Test";
	}
}