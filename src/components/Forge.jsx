import React, { useState } from 'react';
import Web3 from 'web3';
import contractABI from '../abis/mohAbi.json';
import { Button, Input, Typography } from 'antd';
import detectEthereumProvider from '@metamask/detect-provider';


const { XDRIP STUFF } = Typography;

const mohContractABI = contractABI;
const mohContractAddress = '0xaF0B5f4d9F777fb4CAC449ff6F759e4979d184d4';

const OwnerFunctions = () => {
  const [contractInstance, setContractInstance] = useState(null);
  const [isWeb3Installed, setIsWeb3Installed] = useState(!!(window.ethereum || window.BinanceChain));
  const [isOwner, setIsOwner] = useState(false);
  const [commonPrice, setCommonPrice] = useState('');
  const [uncommonPrice, setUncommonPrice] = useState('');
  const [rarePrice, setRarePrice] = useState('');
  const [epicPrice, setEpicPrice] = useState('');
  const [legendaryPrice, setLegendaryPrice] = useState('');
  const [xdripbuybackWallet, setXdripbuybackWallet] = useState('');
  const [stakingRewardsWallet, setStakingRewardsWallet] = useState('');
  const [marketingWallet, setMarketingWallet] = useState('');
  const [giveawaysWallet, setGiveawaysWallet] = useState('');
  const [teamWallet, setTeamWallet] = useState('');
  const [commonCooldown, setCommonCooldown] = useState('');
  const [uncommonCooldown, setUncommonCooldown] = useState('');
  const [rareCooldown, setRareCooldown] = useState('');
  const [epicCooldown, setEpicCooldown] = useState('');
  const [legendaryCooldown, setLegendaryCooldown] = useState('');
  const [xDripBuybacksPercentage, setXDripBuybacksPercentage] = useState('');
  const [stakingRewardsPercentage, setStakingRewardsPercentage] = useState('');
  const [marketingPercentage, setMarketingPercentage] = useState('');
  const [giveawaysPercentage, setGiveawaysPercentage] = useState('');
  const [teamPercentage, setTeamPercentage] = useState('');

  const handleConnectWallet = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (!provider) {
        alert('Please install MetaMask, Trust Wallet, or Binance Chain Wallet');
        return;
      }

      await provider.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      const contractInstance = new web3.eth.Contract(mohContractABI, mohContractAddress);
      setContractInstance(contractInstance);

      // Check if the connected account is the owner
      const owner = await contractInstance.methods.owner().call();
      setIsOwner(owner === accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

const updatePercentages = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    await contractInstance.methods.setPercentages(
      parseInt(xDripBuybacksPercentage),
      parseInt(stakingRewardsPercentage),
      parseInt(marketingPercentage),
      parseInt(giveawaysPercentage),
      parseInt(teamPercentage)
    ).send(options);
    console.log('Distribution percentages updated successfully');
  } catch (error) {
    console.error(error);
  }
}

const updateCommonPrice = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setCommonPrice(uncommonPrice).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateUncommonPrice = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setUncommonPrice(uncommonPrice).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateRarePrice = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setRarePrice(rarePrice).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateEpicPrice = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setEpicPrice(epicPrice).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateLegendaryPrice = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setLegendaryPrice(legendaryPrice).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateXdripbuybackWallet = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setXdripbuybackWallet(xdripbuybackWallet).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateStakingRewardsWallet = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setStakingRewardsWallet(stakingRewardsWallet).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateMarketingWallet = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setMarketingWallet(marketingWallet).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateGiveawaysWallet = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setGiveawaysWallet(giveawaysWallet).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateTeamWallet = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setTeamWallet(teamWallet).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};



const updateCommonCooldown = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setCommonCooldown(commonCooldown).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateUncommonCooldown = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setUncommonCooldown(uncommonCooldown).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateRareCooldown = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setRareCooldown(rareCooldown).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateEpicCooldown = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setEpicCooldown(epicCooldown).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

const updateLegendaryCooldown = async () => {
  try {
    const options = { from: await contractInstance.methods.owner().call() };
    const tx = await contractInstance.methods.setLegendaryCooldown(legendaryCooldown).send(options);
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error(error);
  }
};

return (
  <div>
    {isWeb3Installed ? (
      <>
        {isOwner ? (
          <>
          
            <Typography.Title level={2}>Update Mint Price</Typography.Title>
            <Input type="number" placeholder="Common Price" onChange={(e) => setCommonPrice(e.target.value)} />
            <Button type="primary" onClick={updateCommonPrice}>Update Common Price</Button>
            
            <Input type="number" placeholder="Uncommon Price" onChange={(e) => setUncommonPrice(e.target.value)} />
            <Button type="primary" onClick={updateUncommonPrice}>Update Uncommon Price</Button>

            <Input type="number" placeholder="Rare Price" onChange={(e) => setRarePrice(e.target.value)} />
            <Button type="primary" onClick={updateRarePrice}>Update Rare Price</Button>

            <Input type="number" placeholder="Epic Price" onChange={(e) => setEpicPrice(e.target.value)} />
            <Button type="primary" onClick={updateEpicPrice}>Update Epic Price</Button>
            
            <Input type="number" placeholder="Legendary Price" onChange={(e) => setLegendaryPrice(e.target.value)} />
            <Button type="primary" onClick={updateLegendaryPrice}>Update Legendary Price</Button>

            <Typography.Title level={2}>Update Distribution Percentages</Typography.Title>          
            <Input type="number" placeholder="xDrip Buybacks Percentage" onChange={(e) => setXDripBuybacksPercentage(e.target.value)} />
            <Input type="number" placeholder="Staking Rewards Percentage" onChange={(e) => setStakingRewardsPercentage(e.target.value)} />
            <Input type="number" placeholder="Marketing Percentage" onChange={(e) => setMarketingPercentage(e.target.value)} />
            <Input type="number" placeholder="Giveaways Percentage" onChange={(e) => setGiveawaysPercentage(e.target.value)} />
            <Input type="number" placeholder="Team Percentage" onChange={(e) => setTeamPercentage(e.target.value)} />
            <Button type="primary" onClick={updatePercentages}>Update Percentages</Button>

            <Typography.Title level={2}>Update Cooldown Times</Typography.Title>
            <Input type="number" placeholder="Common Cooldown" onChange={(e) => setCommonCooldown(e.target.value)} />
            <Button type="primary" onClick={updateCommonCooldown}>Update Common Cooldown</Button>

            <Input type="number" placeholder="Uncommon Cooldown" onChange={(e) => setUncommonCooldown(e.target.value)} />
            <Button type="primary" onClick={updateUncommonCooldown}>Update Uncommon Cooldown</Button>

            <Input type="number" placeholder="Rare Cooldown" onChange={(e) => setRareCooldown(e.target.value)} />
            <Button type="primary" onClick={updateRareCooldown}>Update Rare Cooldown</Button>

            <Input type="number" placeholder="Epic Cooldown" onChange={(e) => setEpicCooldown(e.target.value)} />
<Button type="primary" onClick={updateEpicCooldown}>Update Epic Cooldown</Button>

<Input type="number" placeholder="Legendary Cooldown" onChange={(e) => setLegendaryCooldown(e.target.value)} />
<Button type="primary" onClick={updateLegendaryCooldown}>Update Legendary Cooldown</Button>

<Typography.Title level={2}>Update Wallet Addresses</Typography.Title>
<Input type="text" placeholder="xDrip Buybacks Wallet" onChange={(e) => setXdripbuybackWallet(e.target.value)} />
<Button type="primary" onClick={updateXdripbuybackWallet}>Update xDrip Buybacks Wallet</Button>

<Input type="text" placeholder="Staking Rewards Wallet" onChange={(e) => setStakingRewardsWallet(e.target.value)} />
<Button type="primary" onClick={updateStakingRewardsWallet}>Update Staking Rewards Wallet</Button>

<Input type="text" placeholder="Marketing Wallet" onChange={(e) => setMarketingWallet(e.target.value)} />
<Button type="primary" onClick={updateMarketingWallet}>Update Marketing Wallet</Button>

<Input type="text" placeholder="Giveaways Wallet" onChange={(e) => setGiveawaysWallet(e.target.value)} />
<Button type="primary" onClick={updateGiveawaysWallet}>Update Giveaways Wallet</Button>

<Input type="text" placeholder="Team Wallet" onChange={(e) => setTeamWallet(e.target.value)} />
<Button type="primary" onClick={updateTeamWallet}>Update Team Wallet</Button>
</div>
);
};




return (
  <div>
    {isWeb3Installed ? (
      <>
        {isOwner ? (
          <>
            <Typography.Title level={2}>Update Distribution Percentages</Typography.Title>
            <Input type="number" placeholder="xDrip Buybacks Percentage" onChange={(e) => setXDripBuybacksPercentage(e.target.value)} />
            <Input type="number" placeholder="Staking Rewards Percentage" onChange={(e) => setStakingRewardsPercentage(e.target.value)} />
            <Input type="number" placeholder="Marketing Percentage" onChange={(e) => setMarketingPercentage(e.target.value)} />
            <Input type="number" placeholder="Giveaways Percentage" onChange={(e) => setGiveawaysPercentage(e.target.value)} />
            <Input type="number" placeholder="Team Percentage" onChange={(e) => setTeamPercentage(e.target.value)} />
            <Button type="primary" onClick={updatePercentages}>Update Percentages</Button>

            <Typography.Title level={2}>Update Cooldown Times</Typography.Title>
            <Input type="number" placeholder="Common Cooldown" onChange={(e) => setCommonCooldown(e.target.value)} />
            <Button type="primary" onClick={updateCommonCooldown}>Update Common Cooldown</Button>

            <Input type="number" placeholder="Uncommon Cooldown" onChange={(e) => setUncommonCooldown(e.target.value)} />
            <Button type="primary" onClick={updateUncommonCooldown}>Update Uncommon Cooldown</Button>

            <Input type="number" placeholder="Rare Cooldown" onChange={(e) => setRareCooldown(e.target.value)} />
            <Button type="primary" onClick={updateRareCooldown}>Update Rare Cooldown</Button>

            <Input type="number" placeholder="Epic Cooldown" onChange={(e) => setEpicCooldown(e.target.value)} />



          </>
        ) : (
          <Typography.Title level={2}>You are not the owner of this contract</Typography.Title>
        )}
      </>
    ) : (
      <Button type="primary" onClick={handleConnectWallet}>Connect Wallet</Button>
    )}
  </div>
);

export default OwnerFunctions;