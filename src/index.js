import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Web3 from 'web3';
import Escrow from './Escrow'
import 'bootstrap/dist/css/bootstrap.min.css';




ReactDOM.render(
    <Escrow />,
document.getElementById('root')
);

registerServiceWorker();




