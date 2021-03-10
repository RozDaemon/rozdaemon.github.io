import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json'
import Navbar from './Navbar'
import Main from './Main'
//Main javascript file
//"React is a component based library that allows us to write
//javascript in these reusuable components."
//Mixes javascript with HTML code
class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  //Looks for Ethereum provider inside your window. If there is none,
  //It will create one!
  async loadWeb3() {
    if (window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    //Load account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account: accounts[0]})
    //Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = SocialNetwork.networks[networkId]
    if (networkData) {
      //Take all the info we have...
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
      this.setState({ socialNetwork: socialNetwork })
      const postCount = await socialNetwork.methods.postCount().call()
      this.setState({ postCount: postCount})
      //Load posts
      for(var i = 1; i<=postCount; i++){
        const post = await socialNetwork.methods.posts(i).call()
        this.setState({
          posts: [...this.state.posts, post] //Creates a new array, adds post to end of that array
        })
      }
      //Sort posts and show highest tipped posts
      this.setState({
        posts:this.state.posts.sort((a,b) => b.tipAmount - a.tipAmount)
      })
      this.setState({loading: false})
    } //This will tell us what the address is

    else{
      window.alert('SocialNetwork contract not deployed to detected network.')
    }
  }

/* const MyContract = web3.eth.contract([
//	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
//	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tipAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			}
		],
		"name": "PostCreated",
		"type": "event"
	},
//	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tipAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			}
		],
		"name": "PostTipped",
		"type": "event"
	},
//	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			}
		],
		"name": "createPost",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
//	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
//	{
		"constant": true,
		"inputs": [],
		"name": "postCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
//	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "posts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "tipAmount",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
//	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "tipPost",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
//])*/

  createPost(content){
    this.setState( { loading: true })
    this.state.socialNetwork.methods.createPost(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  tipPost(id, tipAmount){
    this.setState({ loading: true })
    this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  //Props are properties for the componenet
  constructor(props) {
    super(props) //Properties
    this.state = {
      account: '',
      socialNetwork:null,
      postCount: 0,
      posts: [],
      loading: true
    }

    this.createPost = this.createPost.bind(this)
    this.tipPost = this.tipPost.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
        {this.state.loading
          ? <div id="loaded" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              posts={this.state.posts}
              createPost={this.createPost}
              tipPost={this.tipPost}
               />
        }
      </div>
    );
  }
}

export default App;
