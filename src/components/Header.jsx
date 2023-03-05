import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import headerLogo from "../images/headerLogo.png";
import '../Header.css';

const Header = () => {
  const [address, setAddress] = useState(null);
  const [walletType, setWalletType] = useState(null);

  useEffect(() => {
    const getConnectedAddress = async () => {y
      try {
        const provider = await detectEthereumProvider();
        if (provider && provider.isMetaMask) {
          setWalletType('MetaMask');
          const signer = new ethers.providers.Web3Provider(provider).getSigner();
          const connectedAddress = await signer.getAddress();
          setAddress(connectedAddress);
        } else if (window.ethereum && window.ethereum.isTrust) {
          setWalletType('Trust Wallet');
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
          const connectedAddress = await signer.getAddress();
          setAddress(connectedAddress);
        } else {
          console.log('Please install MetaMask or Trust Wallet');
        }
      } catch (err) {
        console.error(err);
      }
    };
    getConnectedAddress();
  }, []);

  const connectWallet = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (provider && provider.isMetaMask) {
        await provider.request({ method: 'eth_requestAccounts' });
        const signer = new ethers.providers.Web3Provider(provider).getSigner();
        const connectedAddress = await signer.getAddress();
        setAddress(connectedAddress);
        setWalletType('MetaMask');
      } else if (window.ethereum && window.ethereum.isTrust) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
        const connectedAddress = await signer.getAddress();
        setAddress(connectedAddress);
        setWalletType('Trust Wallet');
      } else {
        console.log('Please install MetaMask or Trust Wallet');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getShortenedAddress = () => {
    if (address) {
      const firstFourChars = address.substring(0, 4);
      const lastFourChars = address.substring(address.length - 4);
      return `${firstFourChars}...${lastFourChars}`;
    }
    return null;
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={headerLogo} width="204" height="56" alt="The Forge Logo" />
      </div>
      <nav className="nav">
        <ul>
          <li><a href="https://www.xdrip.io">XDRIP.io</a></li>
          <li><a href="https://t.me/The_XdRiP_Official">TELEGRAM</a></li>
        </ul>
      </nav>
      <div className="wallet">
        {address ? (
          <button className={`wallet-button ${walletType.toLowerCase()}`}>
            {getShortenedAddress()}
          </button>
        ) : (
          <button className="wallet-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
