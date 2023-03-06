const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');

const mnemonic = '0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0';
const bscTestnetEndpoint = 'https://data-seed-prebsc-1-s1.binance.org:8545';

// Read the contract source code from file
const contractSource = fs.readFileSync('./contracts/MedalsOfHonor.sol', 'utf8');

// Compile the contract
const input = {
  language: 'Solidity',
  sources: {
    'MedalsOfHonor.sol': {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode'],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Get the compiled contract bytecode and ABI
const bytecode = output.contracts['MedalsOfHonor.sol']['MedalsOfHonor'].evm.bytecode.object;
const abi = output.contracts['MedalsOfHonor.sol']['MedalsOfHonor'].abi;

// Initialize the web3 provider with the mnemonic and BSC testnet endpoint
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonic,
  },
  providerOrUrl: bscTestnetEndpoint,
});

// Initialize web3 with the provider
const web3 = new Web3(provider);

// Deploy the contract
const deployContract = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(`Deploying contract from account ${accounts[0]}`);

  const contract = new web3.eth.Contract(abi, null, { data: bytecode });

  const gas = await contract.deploy().estimateGas();

  const tx = contract.deploy().send({
    from: accounts[0],
    gas: gas,
  });

  tx.on('transactionHash', (hash) => {
    console.log(`Transaction hash: ${hash}`);
  });

  const deployedContract = await tx;

  console.log(`Contract deployed at address ${deployedContract.options.address}`);
};

deployContract();
