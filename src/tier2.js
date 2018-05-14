import React, { Component } from 'react';
import logo from './logo.svg';
import Web3 from 'web3';
import Eth from 'web3-eth';



//const Eth = require('ethjs-query');
const EthContract = require('ethjs-contract');

class Tier2 extends Component {

    render() {
        return (
            function startApp(web3) {

                const eth = new Eth(web3.currentProvider)
                const contract = new EthContract(eth)

                //initContract(contract)
                window.addEventListener('load', function() {
                    // Check if Web3 has been injected by the browser:
                    if (typeof web3 !== 'undefined') {

                        // You have a web3 browser! Continue below!
                        startApp(web3);

                    } else {

                        // Warn the user that they need to get a web3 browser
                        // Or install MetaMask, maybe with a nice graphic.
                    }
                });
            })
    };
}

export default Tier2