import React, { useState } from 'react';
import Web3 from 'web3';
import contractAbi from '../abis/mohAbi.json';
import "../Forge.css";
import ModalVideo from 'react-modal-video';
import "react-modal-video/scss/modal-video.scss";
import commonVideo from "../videos/common_video.mp4";
import uncommonVideo from "../videos/uncommon_video.mp4";
import rareVideo from "../videos/rare_video.mp4";
import epicVideo from "../videos/epic_video.mp4";
import legendaryVideo from "../videos/legendary_video.mp4";
import detectEthereumProvider from '@metamask/detect-provider';

// const BinanceChain = {
//   name: "BSC Mainnet",
//   rpcURL: ["https://bsc-dataseed.binance.org/"],
//   chainId: "0x38",
//   nativeCurrency: {
//     name: 'BNB',
//     symbol: 'BNB',
//     decimals: 18,
//   },
//   blockExplorerUrls: ['https://bscscan.com'],
// }

const BinanceChain = {
  name: "BSC Testnet",
  rpcURL: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
  chainId: '0x61',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  blockExplorerUrls: ['https://testnet.bscscan.com'],
}

const Forge = () => {
  const contractAddress = '0xa7f455976455F328D6E73D345E21B319bDe6A7b3';
  //const medalsOfHonor = new web3.eth.Contract(contractAbi, contractAddress);
  //  const ipfsHash = '/ipfs/QmTjjf1DRjdRWvuSsh5LGXVUi2AKTiTXbcH4a2oVxbouog/'; 

  const [isOpen, setOpen] = useState(false);
  const [videoId, setVideoId] = useState('');

  const nfts = [
    {
      id: 1,
      name: 'COMMON',
      creator: 'XDRIP OFFICIAL',
      price: '0.25 BNB',
      priceNumber: 0.25,
      nft: commonVideo,
      videoId: 'nWHNzR660TU',
      ipfsHash: '/ipfs/QmRmB8XKF39SPN6EPD9uqB5PbYZuQb3ZCbGyBvkp3iPapX?filename=COMMON.mp4'
    },
    {
      id: 2,
      name: 'UNCOMMON',
      creator: 'XDRIP OFFICIAL',
      price: '0.50 BNB',
      priceNumber: 0.5,
      nft: uncommonVideo,
      videoId: '7w94uyo24g0',
      ipfsHash: '/ipfs/QmejQNntRF55PdeJ8o3Kf5Yt7gYdibdQsbmzHYFY5FwfDx?filename=UNCOMMON.mp4'
    },
    {
      id: 3,
      name: 'RARE',
      creator: 'XDRIP OFFICIAL',
      price: '0.75 BNB',
      priceNumber: 0.75,
      nft: rareVideo,
      videoId: 'jQG6tgMtLbk',
      ipfsHash: '/ipfs/QmVZQWfTpBJQKtAhdxE85uF3chUGF9aTFE2ZjAoRj2wKG7?filename=RARE.mp4'
    },
    {
      id: 4,
      name: 'EPIC',
      creator: 'XDRIP OFFICIAL',
      price: '1.0 BNB',
      priceNumber: 1,
      nft: epicVideo,
      videoId: 't7psdW_7fZI',
      ipfsHash: '/ipfs/QmcpkEPjttpwBoZPiuCyDtqj8WHpqSVfZv6xa2TRfR7rEU?filename=EPIC.mp4'
    },
    {
      id: 5,
      name: 'LEGENDARY',
      creator: 'XDRIP OFFICIAL',
      price: '1.5 BNB',
      priceNumber: 1.5,
      nft: legendaryVideo,
      videoId: 'e_Yr4s7fTTA',
      ipfsHash: '/ipfs/QmfNX1afjGa4WwYUZrv1SUhp5DkVBqZ9sPUkcSWYySfovx?filename=LEGENDARY.mp4'
    },
  ];

  const handleMint = async (nftId, nftName) => {
    // find the NFT with the matching ID
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

    const provider = await detectEthereumProvider();
    try {
      const curChainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (curChainId != BinanceChain.chainId) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: BinanceChain.chainId,
            },
          ],
        })
      }
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: BinanceChain.chainId,
                chainName: BinanceChain.name,
                nativeCurrency: BinanceChain.nativeCurrency,
                rpcUrls: BinanceChain.rpcURL,
                blockExplorerUrls: BinanceChain.blockExplorerUrls
              },
            ],
          });
          return true
        } catch (adderror) {
          console.error('Failed to add the network in Metamask:', adderror)
          return false
        }
      } else {
        console.error('Failed to setup the network in Metamask:', error)
        return
      }
    }

    // call the smart contract function to mint the NFT
    try {
      // Prompt user to connect MetaMask
      await window.ethereum.enable();
      const web3 = new Web3(provider);

      // Get user's BSC address
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      // Get the contract instance
      const contract = new web3.eth.Contract(contractAbi, contractAddress);

      // Mint the NFT
      const mintTx = await contract.methods.mintNFT(selectedNft.name, selectedNft.ipfsHash).send({
        from: userAddress,
        value: web3.utils.toWei(selectedNft.priceNumber.toString(), 'ether')
      });

      console.log(mintTx);
      console.log(`Minted NFT: ${selectedNft.name} (${nftName})`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto py-10 px-0 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-2">
          {nfts.map((nft) => (
            <div key={nft.id} className="border" >
              <div className="relative">
                <video className="w-full h-full object-cover" title="Click to preview NFT" src={nft.nft} autoPlay loop muted onClick={() => { setOpen(true); setVideoId(nft.videoId); }} />
              </div>
              <div className="p-4">
                <h4 className="mt-0 mb-0 text-2xl text-white">{nft.name}<br />MEDAL</h4>
                <p className="text-sm text-white mb-0">Presented By</p>
                <h3 className="text-sm text-white mb-12">{nft.creator}</h3>
                <p className="mt- text-md text-white">{nft.price}</p>
                <button
                  className="mt-4 w-full inline-flex justify-center border px-4 py-2 
                    gradient-bg-button text-base text-black hover:from-blue-400 hover:to-purple-400 focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => handleMint(nft.id, nft.name)}
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
  );
};

export default Forge;