import * as grpc from '@grpc/grpc-js'
import { connect, hash, signers } from '@hyperledger/fabric-gateway'
import * as crypto from 'node:crypto'
import { promises as fs } from 'node:fs'
import { TextDecoder } from 'node:util'
import path from 'node:path'
import bodyParser from 'body-parser'

const utf8Decoder = new TextDecoder();

const mspId = envOrDefault('MSP_ID', 'Org1MSP');
const channelName = envOrDefault('CHANNEL_NAME', 'mychannel');
const chaincodeName = envOrDefault('CHAINCODE_NAME', 'basic');

// Path to crypto materials.
const cryptoPath = envOrDefault(
    'CRYPTO_PATH',
    path.resolve(
        process.cwd(),
        '..',
        'fabric-samples',
        'test-network',
        'organizations',
        'peerOrganizations',
        'org1.example.com'
    )
)

// Path to user private key directory.
const keyDirectoryPath = envOrDefault(
    'KEY_DIRECTORY_PATH',
    path.resolve(
        cryptoPath,
        'users',
        'User1@org1.example.com',
        'msp',
        'keystore'
    )
)

// Path to user certificate directory.
const certDirectoryPath = envOrDefault(
    'CERT_DIRECTORY_PATH',
    path.resolve(
        cryptoPath,
        'users',
        'User1@org1.example.com',
        'msp',
        'signcerts'
    )
)

// Path to peer tls certificate.
const tlsCertPath = envOrDefault(
    'TLS_CERT_PATH',
    path.resolve(cryptoPath, 'peers', 'peer0.org1.example.com', 'tls', 'ca.crt')
);

// Gateway peer endpoint.
const peerEndpoint = envOrDefault('PEER_ENDPOINT', 'localhost:7051');

// Gateway peer SSL host name override.
const peerHostAlias = envOrDefault('PEER_HOST_ALIAS', 'peer0.org1.example.com');

const addUser = async (req, res, next) => { 
    const client = await newGrpcConnection()

    const gateway = connect({
        identity: await newIdentity(),
        signer: await newSigner(),
        hash: hash.sha256,
        client,
    });

    try {
        const network = gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        const putResult = await contract.submitTransaction('InitLedger');
        console.log('Put result:', utf8Decoder.decode(putResult));

        const getResult = await contract.evaluateTransaction('GetAllAssets');
        console.log('Get result:', utf8Decoder.decode(getResult));
    } finally {
        gateway.close();
        client.close();
    }   
    res.locals.title = 'Hyperledger-AddUser'
    res.status(200)
    res.send("addUser")
}

const getBlocks = async (req, res, next) => { 
    const client = await newGrpcConnection()
    var block

    const gateway = connect({
        identity: await newIdentity(),
        signer: await newSigner(),
        hash: hash.sha256,
        client,
    });

    try {
        const network = gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        console.log('get all')
        block = await contract.evaluateTransaction('GetAllAssets');
    } finally {
        gateway.close();
        client.close();
    }
    const result = JSON.parse(utf8Decoder.decode(block))
    console.log(result)
    res.locals.title = 'Hyperledger-AddUser'
    res.status(200)
    res.render('pages/blockView', { user: req.user, result })
}

const getBlock = async (req, res, next) => { 
    const Id = req.params.id
    console.log(Id)
    const client = await newGrpcConnection()
    var block

    const gateway = connect({
        identity: await newIdentity(),
        signer: await newSigner(),
        hash: hash.sha256,
        client,
    });

    try {
        const network = gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);

        console.log('get one')
        block = await contract.evaluateTransaction('ReadAsset', Id);
    } finally {
        gateway.close();
        client.close();
    }
    const result = JSON.parse(utf8Decoder.decode(block))
    console.log(result)
    res.locals.title = 'Hyperledger-AddUser'
    res.status(200)
    res.render('pages/blockView', { user: req.user, result })
}

async function newGrpcConnection() {
    const tlsRootCert = await fs.readFile(tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
        'grpc.ssl_target_name_override': peerHostAlias,
    });
}

async function newIdentity() {
    const certPath = await getFirstDirFileName(certDirectoryPath);
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials };
}

async function getFirstDirFileName(dirPath) {
    const files = await fs.readdir(dirPath);
    const file = files[0];
    if (!file) {
        throw new Error(`No files in directory: ${dirPath}`);
    }
    return path.join(dirPath, file);
}

async function newSigner() {
    const keyPath = await getFirstDirFileName(keyDirectoryPath);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

function envOrDefault(key, defaultValue) {
    return process.env[key] || defaultValue;
}

export {
  addUser,
  getBlock,
  getBlocks
}