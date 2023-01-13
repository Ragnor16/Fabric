'use strict';

const { Gateway, Wallets } = require('fabric-network');
const  = require('./Fabric.js');
const fs = require('fs');
const path = require('path');

async function main() {
    try {

const walletPath = path.join(process.cwd(), 'wallet');
const wallet = await Wallets.newFileSystemWallet(walletPath);

const gateway = new Gateway();
await gateway.connect(ccp, { wallet, identity: 'id', discovery: { enabled: true, asLocalhost: true } });


console.log(' Submit Transaction: CreateAsset');
			result = await contract.submitTransaction('CreateAsset', 'asset1', '1', '24', 'Male', 'Bob');
			console.log(' Result: committed');
			if (`${result}` !== '') {
				console.log(`Result: ${prettyJSONString(result.toString())}`);
			}

			console.log(' Evaluate Transaction: ReadAsset');
			result = await contract.evaluateTransaction('ReadAsset', 'asset1');
			console.log(`Result: ${prettyJSONString(result.toString())}`);

	}
	finally {
		gateway.disconnect();
	}
} catch (error) {
	console.error(`******** FAILED to run the application: ${error}`);
}


main();
