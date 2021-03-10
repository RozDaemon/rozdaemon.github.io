pragma solidity ^0.5.0;

contract SocialNetwork {

	string public name; //Gives us a function to return this value
	uint public postCount = 0;
	mapping(uint => Post) public posts; //Key value store that allows us to store data

	//Setting the value inside a construtctor
	//"Gets run whenever smart contract is initialized/created

	struct Post {
		uint id; //Unique identifier for post, unsigned integer
		string content;
		uint tipAmount;
		address payable author;
	}

	event PostCreated(
		uint id,
		string content,
		uint tipAmount,
		address payable author
	);

	event PostTipped(
		uint id,
		string content,
		uint tipAmount,
		address payable author
	);


	constructor() public {
		name = "LRoz Social Network Test";
	}

	//_ states that this is a local variable and not a state variable
	//Memory: "modifier that solidity requires us to use"
	function createPost(string memory _content) public{
		//Require valid content
		require(bytes(_content).length > 0);
		//Increment the post count
		postCount++;
		//Create the post
		posts[postCount] = Post(postCount, _content, 0, msg.sender);
		//Trigger event
		emit PostCreated(postCount, _content, 0, msg.sender);
	})

	function tipPost (uint _id) public payable{ //Payable keyword allows this function to accept ether
		//Another require statement!
		require(_id > 0 && _id <= postCount);

		//Fetch the post
		Post memory _post = posts[_id];  //Creates a copy, won't affect it on the blockchain
																		 //Stores a post in memory
		//Fetch the author
		address payable _author = post.author;
		//Pay the author
		address(_author).transfer(msg.value); //Send ether to the author
		//Increment the tip amount
		_post.tipAmount = _post.tipAmount + msg.value; //Amount of ether that is sent in
		//Update the post
		posts[_id] = _post; //Puts an updated version of the contract on the blockchain
		//Trigger an event
		emit PostTipped(postCount, _post.content, _post.tipAmount, _author);
	}
}
