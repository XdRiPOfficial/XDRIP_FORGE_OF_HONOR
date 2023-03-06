# XDRIP_FORGE_OF_HONOR
Medals of Honor Elite XdRiP NFT Collection

This is a smart contract for managing the Medals of Honor Elite XdRiP NFT Collection. It is a multi-tiered and extremely limited collection of Elite NFTs. 
The contract is written in Solidity and interacts with the Binance Smart Chain.

Dependencies-
This contract uses the following dependencies from the OpenZeppelin library:

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
