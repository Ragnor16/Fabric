'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'Fabric';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

async function main() {
	try {
		const ccp = buildCCPOrg1();
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
		const wallet = await buildWallet(Wallets, walletPath);
		await enrollAdmin(caClient, wallet, mspOrg1);
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
		const gateway = new Gateway();
		try {
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true}

			});
			const contract = network.getContract(chaincodeName);
			const network = await gateway.getNetwork(channelName);

			console.log('Submit Transaction: InitLedger');
			await contract.submitTransaction('InitLedger');
			console.log('Result: committed');

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
		// Disconnect from the gateway when the application is closing
		// This will close all connections to the network
		gateway.disconnect();
	}
} catch (error) {
	console.error(`******** FAILED to run the application: ${error}`);
}
}

main();
