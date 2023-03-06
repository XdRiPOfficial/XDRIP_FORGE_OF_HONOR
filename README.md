Readme Overview

# XDRIP_FORGE_OF_HONOR
Medals of Honor Elite XdRiP NFT Collection

This is a smart contract written in Solidity for managing an NFT collection called "Medals of Honor". The NFTs are multi-tiered and extremely limited in supply. The contract interacts with the Binance Smart Chain (BSC).

Features -
    The contract uses OpenZeppelin libraries for ERC721 implementation, ownership management, and reentrancy guard.
    The contract has several customizable parameters such as supply, prices, and mint cooldown times.
    The contract has functions for minting NFTs of different tiers (common, uncommon, rare, epic, and legendary).
    The contract distributes funds from minting to several wallets based on configurable percentage splits.
    The contract has a function for retrieving IPFS hashes associated with NFTs.
    The contract has functions for checking the eligibility of a user for minting a particular tier and how long until their cooldown period ends.
    The contract also includes functions for editing the wallet addresses for receiving funds and updating prices.

Dependencies-
    ERC721URIStorage.sol
    ERC721.sol
    Counters.sol
    Ownable.sol
    SafeMath.sol
    ReentrancyGuard.sol

Smart Contract Overview -
Supply and Cooldown Times

The contract defines the total supply for each of the NFT tiers: COMMON, UNCOMMON, RARE, EPIC, and LEGENDARY. 
It also sets the cooldown time for each tier, which determines how long a user must wait before they can mint the next tier.

Wallet Addresses -
The contract defines several wallet addresses for distributing funds, including xDripBuybacksWallet, stakingRewardsWallet, 
marketingWallet, giveawaysWallet, and teamWallet. These wallet addresses can be configured by the contract owner.

Minting Functions - 
The contract includes individual minting functions for each NFT tier, as well as functions to get the IPFS hash for a given NFT 
and to determine a user's eligibility for the next tier of NFT. The minting functions require that the user sends the correct 
amount of BNB and that they own the required number of NFTs from the previous tier.
Distribution Percentages

The contract includes a struct to define the distribution percentages for each wallet. The struct includes 
xDripBuybacksPercentage, stakingRewardsPercentage, marketingPercentage, giveawaysPercentage, and teamPercentage. 
These percentages can be set by the contract owner.

Internal Functions - 
The contract includes several internal functions for distributing funds, determining cooldown periods, and setting IPFS hashes for NFTs.

External Functions - 
The contract includes several external functions for updating wallet addresses and NFT prices.

Disclaimer - 
This smart contract interacts with the Binance Smart Chain. All cryptocurrency transactions carry inherent risk. 
Use this contract and associated dApps at your own risk.

Authors - 
The XdRiP Medal of Honor Collection NFT smart contract was written by Jim C OG and OG Brad & team
