import  {nodeCall} from './Main.js'
'use strict';

const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class Asset extends Contract{

async InitLedger(ctx){
    const assets=nodeCall('person');

    for(const asset of assets){
        asset.doctype='asset';

        await ctx.stub.putState(asset.id, Buffer.from(stringify(sortKeysRecursive(asset))));
    }
}
async CreateAsset(ctx,id,age,gender,name) {
    const exists = await this.AssetExists(ctx, );
    if (exists) {
        throw new Error(`The asset ${id} already exists`);
    }

    const asset = {
      ID: id,
      Age:age,
      Gender:gender,
      Name:name,
    };

    await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
    return JSON.stringify(asset);
}

async ReadAsset(ctx,id) {
    const assetJSON = await ctx.stub.getState(id);
    if (!assetJSON || assetJSON.length === 0) {
        throw new Error(`The asset ${id} does not exist`);
    }
    return assetJSON.toString();
}
}