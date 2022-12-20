import  {nodeCall} from './Main.js'

'use strict';

const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class Asset extends Contract{

async InitLedger(ctx){
    const asset=nodeCall;

    for(const asset of assets){
        asset.doctype='asset';

        await ctx.stub.putState(asset, Buffer.from(stringify(sortKeysRecursive(asset))));
    }
}
async CreateAsset() {
    const exists = await this.AssetExists(ctx, );
    if (exists) {
        throw new Error(`The asset ${} already exists`);
    }

    const asset = {
      
    };

    await ctx.stub.putState(, Buffer.from(stringify(sortKeysRecursive(asset))));
    return JSON.stringify(asset);
}

async ReadAsset(ctx, ) {
    const assetJSON = await ctx.stub.getState();
    if (!assetJSON || assetJSON.length === 0) {
        throw new Error(`The asset ${} does not exist`);
    }
    return assetJSON.toString();
}
}

