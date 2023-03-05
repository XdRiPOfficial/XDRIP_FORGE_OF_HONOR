import React, { useState } from 'react';
import { ethers } from 'ethers';
import Contract from '../contracts/Medals_Of_Honor.sol';
import "../Forge.css";
import ModalVideo from 'react-modal-video';
import "react-modal-video/scss/modal-video.scss";
import commonVideo from "../videos/common_video.mp4";
import uncommonVideo from "../videos/uncommon_video.mp4";
import rareVideo from "../videos/rare_video.mp4";
import epicVideo from "../videos/epic_video.mp4";
import legendaryVideo from "../videos/legendary_video.mp4";


const Forge = () => {
  
  const contractAddress = '0x...'; // insert address of contract here
  //const contractABI = MyContract.abi; // insert the ABI here
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  //const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

  const [isOpen, setOpen] = useState(false);
  const [videoId, setVideoId] = useState('');

  const nfts = [
    {
      id: 1,
      name: 'COMMON',
      creator: 'XDRIP OFFICIAL',
      price: '0.25 BNB',
      nft: commonVideo,
      videoId: 'nWHNzR660TU'
    },
    {
      id: 2,
      name: 'UNCOMMON',
      creator: 'XDRIP OFFICIAL',
      price: '0.50 BNB',
      nft: uncommonVideo,
      videoId: '7w94uyo24g0'
    },
    {
      id: 3,
      name: 'RARE',
      creator: 'XDRIP OFFICIAL',
      price: '0.75 BNB',
      nft: rareVideo,
      videoId: 'jQG6tgMtLbk'
    },
    {
      id: 4,
      name: 'EPIC',
      creator: 'XDRIP OFFICIAL',
      price: '1.0 BNB',
      nft: epicVideo,
      videoId: 't7psdW_7fZI'
    },
    {
      id: 5,
      name: 'LEGENDARY',
      creator: 'XDRIP OFFICIAL',
      price: '1.5 BNB',
      nft: legendaryVideo,
      videoId: 'e_Yr4s7fTTA'
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

    // prompt the user to confirm the purchase
    const confirmed = window.confirm(`FORGE YOUR ${selectedNft.name} MEDAL FOR ${selectedNft.price}?`);

    if (!confirmed) {
      return;
    }

    // call the smart contract function to mint the NFT
    try {
      const tx = await contractInstance.mintNFT();
      await tx.wait();
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
                <h4 className="mt-0 mb-0 text-2xl text-white">{nft.name}<br/>MEDAL</h4>
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