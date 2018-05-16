import React, { Component } from 'react';
import Web3 from 'web3';
import Eth from 'web3-eth';
import Tier2 from './tier2';
import TruffleContract from 'truffle-contract'
//var Web3 = require('web3');  //specific version


const wallet = "0x1a7c690ce047277b58d0b420547326fa3503ac7e";
const escrow_address = "0xd23632e1d1324c8ad31ab2fb810bc242082cffdb";
const Escrow_abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "seller",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "name",
                "type": "string"
            }
        ],
        "name": "start",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "seller",
                "type": "address"
            },
            {
                "name": "buyer",
                "type": "address"
            }
        ],
        "name": "setup",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "sellername",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "created",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "abort",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "refund",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "buyer",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "broker",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "payOut",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "fee",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "buyer",
                "type": "address"
            }
        ],
        "name": "escrowEvent1",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "message",
                "type": "string"
            }
        ],
        "name": "verify",
        "type": "event"
    }
]

////////page starts here////////

let HelloGrypto = () => <span> Making Crypto History </span>

//Set Provider:
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://34.217.182.230:8545'));

console.log("----web3:----")
console.log( web3);

//debug:
console.log("-----provider:-----");
console.log(web3.currentProvider);

var mywallet = web3.eth.coinbase;
web3.eth.defaultAccount = web3.eth.accounts[0];

console.log("----ACCOUNT:----\n", web3.eth.getAccounts())
    //takes a second to return a value
web3.eth.getAccounts().then(console.log);

console.log("coinbase account  " + mywallet);
console.log("default account:  " + web3.eth.defaultAccount);
console.log("hardcoded wallet: " + wallet);

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log("web3 ok");
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3.providers.HttpProvider('http://34.217.182.230:8545');
    console.log("web3 loaded");
}

//Web3 contract:
//var DeployedContract = web3.eth.Contract(escrow_address);
//var MyContract = DeployedContract.at(escrow_address);

//truffle contract:
var contract = require("truffle-contract");
var MyContract = contract({
    abi: Escrow_abi,
    address: escrow_address, // optional
})


console.log("current provider: \n", web3.currentProvider);
console.log("-------my contract: \n", MyContract);

//----------------------GET TRUFFLE CONTRACT--------------------:
var deployed;
MyContract.deployed().then(function(instance) {
    var deployed = instance;
    console.log("----sent start command----\n");
    return instance.start("Cyrano De Bergerac");
}).then(function(result) {
    console.log("-----returned: -----\n" + result);
});


MyContract.setProvider(web3.currentProvider);
//dirty hack for web3@1.0.0 support for localhost testrpc, see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
if (typeof MyContract.currentProvider.sendAsync !== "function") {
    MyContract.currentProvider.sendAsync = function() {
        return MyContract.currentProvider.send.apply(
            MyContract.currentProvider, arguments
        );
    };
}


//var MyContract = new web3.eth.contract(abi);  //V 0.xx
//var myInstance = MyContract.at(escrow_address);
var Contract2 = new web3.eth.Contract(Escrow_abi, escrow_address);

console.log("---------TRUFFLE CONTRACT  1---------------\n", Contract2);
console.log("---------TRUFFLE CONTRACT  2---------------\n", MyContract);

MyContract.at(escrow_address).start.call("Matt").then(function(result){
    alert("Trying to start contract: \n" + result);
});


//MyContract.deployed().then(instance => {  MyContract = inst });
MyContract.deployed().then(function(instance){return instance.start("JoHNNY");});

//var myEvent = MyContract.escrowEvent1();
//var filter = web3.eth.filter('pending');

class Escrow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            account: '0x0',
            parties: [],
            filed: false,
            deposit: true,
            approved: false,
            blockNumber: web3.eth.blockNumber,
            balance: "0.0",
            wallet: mywallet,
            version: "1.0"
        };

    }


    componentWillMount() {
        if(this.web3 && this.web3.givenProvider) {
            this.setState({isConnected: true});
        }
    }

    componentDidMount() {
/*

        MyContract.events.allEvents({
            fromBlock: 'latest',
        }, function (error, event) {
            if (error)
                alert("error while subscribing to event")
            console.log(event)
        });
*/


        /* Escrow.deployed().then(function(instance) {
             console.log(instance);
         });*/

/*
        filter.watch(function (error, result) {
            if (!error)
                console.log(result);
        });*/

        /*         // Or pass a callback to start watching immediately
                 var event = myInstance.myEvent(function(error, result) {
                     if (!error)
                         console.log(result);
                 });*/
   /*     filter.watch((error, result) =>{
            const block = web3.eth.getBlock(result, true);
            this.setState({blockNumber: block.number});
            this.setState({coinbase: (web3.eth.coinbase)});
            this.setState({balance:  (web3.eth.getBalance(web3.eth.coinbase))});
});*/
}

render()
    {
        return (
            <div>
            <HelloGrypto />
            <br/><br/>
            {this.state.isConnected?'(Connected to node)':'(Not Connected)'}
            <br/><br/>

            <h2>Version:</h2>
            {this.state.version}
            <br/><br/>
            <h2>Balance:</h2>
            {this.state.balance}
            </div>
            );
    }
}

export default Escrow;
