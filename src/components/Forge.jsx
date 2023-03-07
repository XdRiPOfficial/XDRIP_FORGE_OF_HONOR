import React, { useState } from 'react';
import Web3 from 'web3';
import contractABI from '../abis/mohAbi.json';
import "../Forge.css";
import ModalVideo from 'react-modal-video';
import "react-modal-video/scss/modal-video.scss";
import commonVideo from "../videos/common_video.mp4";
import uncommonVideo from "../videos/uncommon_video.mp4";
import rareVideo from "../videos/rare_video.mp4";
import epicVideo from "../videos/epic_video.mp4";
import legendaryVideo from "../videos/legendary_video.mp4";

const mohContractABI = contractABI;
const mohContractAddress = '0xaF0B5f4d9F777fb4CAC449ff6F759e4979d184d4'; 

const Forge = () => {
  const [contractInstance, setContractInstance] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [isWeb3Installed, setIsWeb3Installed] = useState(!!(window.ethereum || window.BinanceChain));
  const [accounts, setAccounts] = useState([]);


  const handleConnectWallet = async () => {
  try {
    let provider;
    if (window.ethereum) {
      provider = new Web3(window.ethereum);
    } else if (window.BinanceChain) {
      provider = new Web3(window.BinanceChain);
    } else {
      alert('Please install Metamask or Binance Chain Wallet and connect to Binance Smart Chain');
      return;
    }

    const accounts = await provider.eth.requestAccounts();
    const contractInstance = new provider.eth.Contract(mohContractABI, mohContractAddress);
    setContractInstance(contractInstance);
    setAccounts(accounts);

    // Add event listener for "click" event on NFT cards
    const nftCards = document.querySelectorAll('.nft-card');
    nftCards.forEach(card => {
      card.addEventListener('click', () => {
        // Get the NFT ID and name from the card
        const nftId = card.getAttribute('data-nft-id');
        const nftName = card.getAttribute('data-nft-name');

        // Call the handleMint function with the NFT ID, name, and accounts
        handleMint(nftId, nftName, accounts);
      });
    });

    // handle web3 actions with the provider and contractInstance
  } catch (error) {
    console.error(error);
    alert('Error connecting to wallet. Please allow access to your wallet and try again.');
    return;
  }
}


 const handleMint = async (nftId, nftName, accounts) => {
  if (!contractInstance) {
    console.error('Contract instance not found');
    return;
  }

  // find the NFT id
  const selectedNft = nfts.find(nft => nft.id === nftId);

  // make sure the selected NFT exists
  if (!selectedNft) {
    console.error(`NFT with ID ${nftId} not found`);
    return;
  }

  // Confirm the purchase
  const confirmed = window.confirm(`FORGE YOUR ${selectedNft.name} MEDAL FOR ${selectedNft.price}?`);

  if (!confirmed) {
    return;
  }

  // check the balance of the connected account
  const balance = await contractInstance.methods.balanceOf(accounts[0]).call();
  const price = web3.utils.toWei(selectedNft.price, 'ether');

  if (balance < price) {
    alert('Insufficient balance');
    return;
  }

  // call the smart contract function to mint the NFT based on the NFT's name
  try {
    let tx;
    switch (selectedNft.name) {
      case 'COMMON':
        tx = await contractInstance.methods.mintCommon('ipfs://QmRmB8XKF39SPN6EPD9uqB5PbYZuQb3ZCbGyBvkp3iPapX/COMMON.mp4').send({ from: accounts[0], value: price });

        break;
      case 'UNCOMMON':
        tx = await contractInstance.methods.mintUncommon('ipfs://QmejQNntRF55PdeJ8o3Kf5Yt7gYdibdQsbmzHYFY5FwfDx/UNCOMMON.mp4').send({ from: accounts[0], value: price });
        break;
      case 'RARE':
        tx = await contractInstance.methods.mintRare('ipfs://QmVZQWfTpBJQKtAhdxE85uF3chUGF9aTFE2ZjAoRj2wKG7/RARE.mp4').send({ from: accounts[0], value: price  });
        break;
      case 'EPIC':
        tx = await contractInstance.methods.mintEpic('ipfs://QmcpkEPjttpwBoZPiuCyDtqj8WHpqSVfZv6xa2TRfR7rEU/EPIC.mp4').send({ from: accounts[0], value: price  });
        break;
      case 'LEGENDARY':
        tx = await contractInstance.methods.mintLegendary('ipfs://QmfNX1afjGa4WwYUZrv1SUhp5DkVBqZ9sPUkcSWYySfovx/LEGENDARY.mp4').send({ from: accounts[0], value: price  });
        break;
      default:
        console.error(`Unknown NFT name: ${selectedNft.name}`);
        return;
    }

    console.log(`Minted NFT: ${selectedNft.name} (${nftName})`);
  } catch (error) {
    console.error(error);
  }
}


const nfts = [
  {
    id: 0,
    name: 'COMMON',
    creator: 'XDRIP OFFICIAL',
    price: '0.25 BNB',
    nft: commonVideo,
    videoId: 'nWHNzR660TU'
  },
  {
    id: 1,
    name: 'UNCOMMON',
    creator: 'XDRIP OFFICIAL',
    price: '0.50 BNB',
    nft: uncommonVideo,
    videoId: '7w94uyo24g0'
  },
  {
    id: 2,
    name: 'RARE',
    creator: 'XDRIP OFFICIAL',
    price: '0.75 BNB',
    nft: rareVideo,
    videoId: 'jQG6tgMtL'
  },
  {
    id: 3,
    name: 'EPIC',
    creator: 'XDRIP OFFICIAL',
    price: '1.0 BNB',
    nft: epicVideo,
    videoId: 't7psdW_'


},
{
  id: 4,
  name: 'LEGENDARY',
  creator: 'XDRIP OFFICIAL',
  price: '1.5 BNB',
  nft: legendaryVideo,
  videoId: 'e_Yr4s7fTTA'
},

];

  return (
  <>
    <div className="max-w-7xl mx-auto py-10 px-0 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-2">
        {nfts.map((nft) => (
          <div key={nft.id} className="border nft-card" data-nft-id={nft.id} data-nft-name={nft.name} onClick={() => handleMint(nft.id, nft.name)}>
            <div className="relative">
              <video className="w-full h-full object-cover" title="Click to preview NFT" src={nft.nft} autoPlay loop muted onClick={() => { setOpen(true); setVideoId(nft.videoId); }} />
            </div>
            <div className="p-4">
              <h4 className="mt-0 mb-0 text-2xl text-white">{nft.name}<br/>MEDAL</h4>
              <p className="text-sm text-white mb-0">Presented By</p>
              <h3 className="text-sm text-white mb-12">{nft.creator}</h3>              
              <p className="mt- text-md text-white">{nft.price}</p>
       <button 
        className="mt-4 w-full inline-flex justify-center border px-4 py-2 
        gradient-bg-button text-base text-black hover:from-blue-400 hover:to-purple-400 focus:outline-none 
        focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
        onClick={() => handleMint(nft.id, nft.name, accounts)}
     >
             FORGE YOUR MEDAL
          </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <ModalVideo channel='youtube' isOpen={isOpen} videoId={videoId} onClose={() => setOpen(false)} />
  </>
)
};

export default Forge;

