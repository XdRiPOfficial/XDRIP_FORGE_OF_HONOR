//                                  :+*********-                                                  .+*********=
//                                    =%%%%%%%%%*:                                              .+%%%%%%%%%*:
//                                      =%%%%%%%%%#-                                          .+%%%%%%%%%*:
//                                        =%%%%%%%%%*:                                      .+%%%%%%%%%*:
//                                         .+%%%%%%%%%*:                                  .+%%%%%%%%%*:
//                                           .+%%%%%%%%%*:                               =%%%%%%%%%*:
//                                             .+%%%%%%%%%*:                           =%%%%%%%%%*:
//                                               .+%%%%%%%%%*:                       =%%%%%%%%%#-
//                                                 .+%%%%%%%%%*:                   =%%%%%%%%%*-
//                                                   .+%%%%%%%%%*-              :+%%%%%%%%%#-
//                                                     .+%%%%%%%%%%*=-:.....:-+#%%%%%%%%%#-
//                                                       .+%%%%%%%%%%%%%%%%%%%%%%%%%%%%#-
//                                                         .=#%%%%%%%%%%%%%%%%%%%%%%%*:
//                                                            :=*%%%%%%%%%%%%%%%%#+-
//                                                               .:-=++***++=-:
//
//                                 .............          .----------:.          ......      .-----------:
//                                 ===============:       *%%********#%#=        -=====      -%%********#%%+.
//                                 =======:.=======-      *%#         .*%#       -=====      -%%.         +%%:
//                                 ======.   -======.     *%#          :%%:      -=====      -%%.          %%+
//                                 =====.     -=====:     *%#          =%#       -=====      -%%.         +%%:
//                                 ====.       -====:     *%%*****+=:   :        -=====      -%%*********%%+.
//                                 ===-        :====:     *%#----=+%%*.          -=====      -%%=--------:
//                                 ====-.      -====.     *%#       +%%=         -=====      -%%.
//                                 =====--:.:-=====:      *%#        .*%#-       -=====      -%%.
//                                 =============-:        *%#          -#%*:     -=====      -%%.
//                                 ..........             .:.            :::      ....        ..
//
//                                                              :-=**##%%%##*+=:.
//                                                          .=*%%%%%%%%%%%%%%%%%%#+:
//                                                        -*%%%%%%%%%%%%%%%%%%%%%%%%#=.
//                                                      -#%%%%%%%%%%%%####%%%%%%%%%%%%%+.
//                                                    -#%%%%%%%%%*=:.       .-+%%%%%%%%%%+.
//                                                  -#%%%%%%%%#=.               :*%%%%%%%%%+.
//                                                -#%%%%%%%%%=                    :*%%%%%%%%%+.
//                                              -#%%%%%%%%%=                        :*%%%%%%%%%+
//                                            -#%%%%%%%%%=                            :#%%%%%%%%%=
//                                          :#%%%%%%%%%=                                :#%%%%%%%%%=
//                                        -#%%%%%%%%%=                                    :#%%%%%%%%%=
//                                      :#%%%%%%%%%=                                        -#%%%%%%%%%=
//                                    :*%%%%%%%%%+.                                           -#%%%%%%%%%=
//                                  :*%%%%%%%%%+.                                               -#%%%%%%%%#=
//                                 -==========.                                                   -==========.

//      ##     ## ######## ########     ###    ##        ######      #######  ########    ##     ##  #######  ##    ##  #######  ########
//      ###   ### ##       ##     ##   ## ##   ##       ##    ##    ##     ## ##          ##     ## ##     ## ###   ## ##     ## ##     ##
//      #### #### ##       ##     ##  ##   ##  ##       ##          ##     ## ##          ##     ## ##     ## ####  ## ##     ## ##     ##
//      ## ### ## ######   ##     ## ##     ## ##        ######     ##     ## ######      ######### ##     ## ## ## ## ##     ## ########
//      ##     ## ##       ##     ## ######### ##             ##    ##     ## ##          ##     ## ##     ## ##  #### ##     ## ##   ##
//      ##     ## ##       ##     ## ##     ## ##       ##    ##    ##     ## ##          ##     ## ##     ## ##   ### ##     ## ##    ##
//      ##     ## ######## ########  ##     ## ########  ######      #######  ##          ##     ##  #######  ##    ##  #######  ##     ##

//                                                 DESIGNED AND BUILT BY THE DEV TEAM OF XDRIP
//                                                              OG JIM & OG BRAD
//
// The XdRiP Dev Team that made this contract possible:
// OG Brad - Owner and Master Coder
// OG Matt - Master Web Developer and Script Coder
// Jim C OG - Contract Code Developer and Marketing Guru
// OG Amos - Master Public Relations and Promotional & Advertising Guru
// OG Flo - Master Graphics and 3D Designer

//
//                                                 (c) 2022 All Right Reserved - XdRiP(tm) 2022
//                                      Dont steal it, Dont copy it, Dont steal parts of it, Dont FUCK with it!

// @title Medals of Honor Elite XdRiP NFT Collection
// @authors Jim C OG and OG Brad & team
// @notice This smart contract is for managing the XdRiP XRP reward token NFTs gallery. A multi tiered, extremely limited collection
// @disclaimer - This contract interacts on the BSC. All cryptocurrency transactions carry inherent risk. Use this contract and associated dApps at your own risk

// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MedalsOfHonor is ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    //@param token supply - editable cooldown times
    uint8 public constant COMMON_SUPPLY = 100;
    uint8 public constant UNCOMMON_SUPPLY = 80;
    uint8 public constant RARE_SUPPLY = 60;
    uint8 public constant EPIC_SUPPLY = 40;
    uint8 public constant LEGENDARY_SUPPLY = 40;
    uint256 public constant MINT_COOLDOWN = 30 days;
    uint256[] public cooldownTimes = [0, 30, 30, 30, 30]; 

    // @param default mint prices unless updated
    uint256 public commonPrice = 0.25 ether;
    uint256 public uncommonPrice = 0.5 ether;
    uint256 public rarePrice = 0.75 ether;
    uint256 public epicPrice = 1 ether;
    uint256 public legendaryPrice = 1.25 ether;

    // @dev wallets for deploy - editable
    //address payable public buybacksWallet;
    address payable private xDripBuybacksWallet;
    address payable private stakingRewardsWallet;
    address payable private marketingWallet;
    address payable private giveawaysWallet;
    address payable private teamWallet;
    
    // @param using Counters for comparison/tracking
    Counters.Counter private _commonCounter;
    Counters.Counter private _uncommonCounter;
    Counters.Counter private _rareCounter;
    Counters.Counter private _epicCounter;
    Counters.Counter private _legendaryCounter;

    // @dev mapping token ID to IPFS hash
    mapping(uint256 => string) private _tokenIPFSHashes;

    // @dev mapping from address to last mint timestamp
    mapping(address => mapping(uint256 => uint256)) private _lastMintTimestamp;

    // @param distribution percentages struct
    struct Percentages {
        uint256 xDripBuybacksPercentage;
        uint256 stakingRewardsPercentage;
        uint256 marketingPercentage;
        uint256 giveawaysPercentage;
        uint256 teamPercentage;
    }

    event CommonMinted(
        address indexed owner, 
        uint256 tokenId, 
        string ipfsHash
    );
    event UncommonMinted(
        address indexed owner,
        uint256 tokenId,
        string ipfsHash
    );
    event RareMinted(
        address indexed owner, 
        uint256 tokenId, 
        string ipfsHash
    );
    event EpicMinted(
        address indexed owner, 
        uint256 tokenId, 
        string ipfsHash
    );
    event LegendaryMinted(
        address indexed owner,
        uint256 tokenId,
        string ipfsHash
    );

    Percentages private percentages = Percentages(20, 40, 15, 15, 10);

    constructor(address payable _xdripsbuybackWallet)
        ERC721("Medals of Honor", "MOH")
    {
        xDripBuybacksWallet = _xdripsbuybackWallet;
    }

    // @dev individual tier minting functions
    function mintCommon(string memory ipfsHash) public payable {
        require(
            bytes(ipfsHash).length == 64,
            "IPFS_LEN_NOT_64"
        );
        require(
            msg.value >= commonPrice,
            "ERR_INSUFFICIENT_BNB"
        );
        require(
            _commonCounter.current() < COMMON_SUPPLY,
            "COMMON_SUPPLY_EMPTY"
        );
        require(balanceOf(msg.sender) == 0, "COMMON already minted");

        uint256 tokenId = _commonCounter.current();
        _mint(msg.sender, _commonCounter.current());
        _lastMintTimestamp[msg.sender][1] = block.timestamp;
        _tokenIPFSHashes[_commonCounter.current()] = ipfsHash;
        _commonCounter.increment();

        _lastMintTimestamp[msg.sender][1] = block.timestamp;
        _setTokenURI(tokenId, ipfsHash);
        _distributeFunds();
        emit CommonMinted(msg.sender, tokenId, ipfsHash);
    }

    function mintUncommon(string memory ipfsHash) public payable {
        require(
            bytes(ipfsHash).length == 66,
            "IPFS_LENGTH_NOT_66"
        );
        require(
            msg.value >= uncommonPrice,
            "ERR_INSUFFICIENT_BNB"
        );
        require(
            _uncommonCounter.current() < UNCOMMON_SUPPLY,
            "UNCOMMON_SUPPLY_EMPTY"
        );
        require(
            balanceOf(msg.sender) == 1,
            "Must own COMMON to mint UNCOMMON"
        );
        uint256 daysLeft = getCooldownDaysLeft(msg.sender, 1);
        if (daysLeft > 0) {
            revert("Required cooldown has not passed");
        } else {
            
            require(
                _lastMintTimestamp[msg.sender][1] + MINT_COOLDOWN <=
                    block.timestamp,
                "Required cooldown has not passed"
            );
            uint256 tokenId = _uncommonCounter.current();
            _mint(msg.sender, _uncommonCounter.current() + COMMON_SUPPLY);
            _tokenIPFSHashes[
                _uncommonCounter.current() + COMMON_SUPPLY
            ] = ipfsHash;
            _uncommonCounter.increment();

            _lastMintTimestamp[msg.sender][2] = block.timestamp;
            _setTokenURI(tokenId, ipfsHash);
            _distributeFunds();
            emit UncommonMinted(msg.sender, tokenId, ipfsHash);
        }
    }

    function mintRare(string memory ipfsHash) public payable {
        require(
            bytes(ipfsHash).length == 62,
            "IPFS_LENGTH_NOT_62"
        );
        require(
            msg.value >= rarePrice,
            "ERR_INSUFFICIENT_BNB"
        );
        require(
            _rareCounter.current() < RARE_SUPPLY,
            "RARE_SUPPLY_EMPTY"
        );
        require(
            balanceOf(msg.sender) == 2,
            "Must own UNCOMMON MOH to mint RARE"
        );
        uint256 daysLeft = getCooldownDaysLeft(msg.sender, 2);
        if (daysLeft > 0) {
            revert("Required cooldown not passed");
        } else {
            
            require(
                _lastMintTimestamp[msg.sender][2] + MINT_COOLDOWN <=
                    block.timestamp,
                "Required cooldown not passed"
            );
            uint256 tokenId = _rareCounter.current();
            _mint(
                msg.sender,
                _rareCounter.current() + COMMON_SUPPLY + UNCOMMON_SUPPLY
            );
            _tokenIPFSHashes[
                _rareCounter.current() + COMMON_SUPPLY + UNCOMMON_SUPPLY
            ] = ipfsHash;
            _rareCounter.increment();

            _lastMintTimestamp[msg.sender][3] = block.timestamp;
            _setTokenURI(tokenId, ipfsHash);
            _distributeFunds();
            emit RareMinted(msg.sender, tokenId, ipfsHash);
        }
    }

    function mintEpic(string memory ipfsHash) public payable {
        require(
            bytes(ipfsHash).length == 62,
            "IPFS_LENGTH_NOT_62"
        );
        require(
            msg.value >= epicPrice,
            "ERR_INSUFFICIENT_BNB"
        );
        require(
            _epicCounter.current() < EPIC_SUPPLY,
            "EPIC_SUPPLY_EMPTY"
        );
        require(
            balanceOf(msg.sender) == 3,
            "Must own RARE to mint EPIC"
        );
        uint256 daysLeft = getCooldownDaysLeft(msg.sender, 3);
        if (daysLeft > 0) {
            revert("Required cooldown not passed");
        } else {
            
            require(
                _lastMintTimestamp[msg.sender][3] + MINT_COOLDOWN <=
                    block.timestamp,
                "Required cooldown not passed"
            );
            uint256 tokenId = _epicCounter.current();
            _mint(
                msg.sender,
                _epicCounter.current() +
                    COMMON_SUPPLY +
                    UNCOMMON_SUPPLY +
                    RARE_SUPPLY
            );
            _tokenIPFSHashes[
                _epicCounter.current() +
                    COMMON_SUPPLY +
                    UNCOMMON_SUPPLY +
                    RARE_SUPPLY
            ] = ipfsHash;
            _epicCounter.increment();

            _lastMintTimestamp[msg.sender][4] = block.timestamp;
            _setTokenURI(tokenId, ipfsHash);
            _distributeFunds();
            emit LegendaryMinted(msg.sender, tokenId, ipfsHash);
        }
    }

    function mintLegendary(string memory ipfsHash) public payable {
        require(
            bytes(ipfsHash).length == 67,
            "IPFS_LENGTH_NOT_67"
        );
        require(
            msg.value >= legendaryPrice,
            "ERR_INSUFFICIENT_BNB"
        );
        require(
            _legendaryCounter.current() < LEGENDARY_SUPPLY,
            "LEGENDARY_SUPPLY_EMPTY"
        );
        require(
            balanceOf(msg.sender) == 4,
            "Must own EPIC to mint LEGENDARY"
        );
        require(
            _lastMintTimestamp[msg.sender][4] + MINT_COOLDOWN <=
                block.timestamp,
            "Required cooldown not passed"
        );
        uint256 tokenId = _legendaryCounter.current() +
            COMMON_SUPPLY +
            UNCOMMON_SUPPLY +
            RARE_SUPPLY +
            EPIC_SUPPLY;

        _mint(msg.sender, tokenId);
        _tokenIPFSHashes[tokenId] = ipfsHash;
        _legendaryCounter.increment();

        _setTokenURI(tokenId, ipfsHash);
        _distributeFunds();
        uint256 daysLeft = getCooldownDaysLeft(msg.sender, 4);
        if (daysLeft > 0) {}
    }

    //@param configure new wallet distribution
    function setPercentages(
        uint16 xDripBuybacksPercentage,
        uint16 stakingRewardsPercentage,
        uint16 marketingPercentage,
        uint16 giveawaysPercentage,
        uint16 teamPercentage
    ) public onlyOwner {
        uint16 totalPercentage = xDripBuybacksPercentage +
            stakingRewardsPercentage +
            marketingPercentage +
            giveawaysPercentage +
            teamPercentage;
        require(totalPercentage == 100, "Percents must total 100");
        percentages = Percentages(
            xDripBuybacksPercentage,
            stakingRewardsPercentage,
            marketingPercentage,
            giveawaysPercentage,
            teamPercentage
        );
    }

    //@dev internal functions
    function _distributeFunds() internal nonReentrant {
        uint256 totalFunds = address(this).balance;
        require(totalFunds > 0, "No funds to distribute");
        xDripBuybacksWallet.transfer(
            (totalFunds * percentages.xDripBuybacksPercentage) / 100
        );
        stakingRewardsWallet.transfer(
            (totalFunds * percentages.stakingRewardsPercentage) / 100
        );
        marketingWallet.transfer(
            (totalFunds * percentages.marketingPercentage) / 100
        );
        giveawaysWallet.transfer(
            (totalFunds * percentages.giveawaysPercentage) / 100
        );
        teamWallet.transfer((totalFunds * percentages.teamPercentage) / 100);
    }

    // @dev get ipfs, eligibility
    function getTokenIPFSHash(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        require(_exists(tokenId), "NO_SUCH_MOH_NFT");
        return _tokenIPFSHashes[tokenId];
    }


    // @dev external functions
    // @param edit / update distribution wallets

    function updateDistributionWallets(
        address payable _xdripsbuybackWallet,
        address payable _stakingRewardsWallet,
        address payable _marketingWallet,
        address payable _giveawaysWallet,
        address payable _teamWallet
    ) public onlyOwner {
        xDripBuybacksWallet = _xdripsbuybackWallet;
        stakingRewardsWallet = _stakingRewardsWallet;
        marketingWallet = _marketingWallet;
        giveawaysWallet = _giveawaysWallet;
        teamWallet = _teamWallet;
    }

    function getCooldownDaysLeft(address account, uint256 mintTier)
        public
        view
        returns (uint256)
    {
        require(mintTier > 0 && mintTier <= 5, "Invalid tier");
        require(
            _lastMintTimestamp[account][mintTier] > 0,
            "No previous mints for this tier"
        );
        uint256 cooldownEnd = _lastMintTimestamp[account][mintTier] +
            cooldownTimes[mintTier];
        if (block.timestamp >= cooldownEnd) {
            return 0;
        }
        return (cooldownEnd - block.timestamp) / 1 days;
    }

    function setCommonCooldown(uint256 cooldown) public onlyOwner {
        cooldownTimes[1] = cooldown;
    }

    function setUncommonCooldown(uint256 cooldown) public onlyOwner {
        cooldownTimes[2] = cooldown;
    }

    function setRareCooldown(uint256 cooldown) public onlyOwner {
        cooldownTimes[3] = cooldown;
    }

    function setEpicCooldown(uint256 cooldown) public onlyOwner {
        cooldownTimes[4] = cooldown;
    }

    function setLegendaryCooldown(uint256 cooldown) public onlyOwner {
        cooldownTimes[5] = cooldown;
    }

    function setCommonPrice(uint256 price) public onlyOwner {
        commonPrice = price;
    }

    function setUncommonPrice(uint256 price) public onlyOwner {
        uncommonPrice = price;
    }

    function setRarePrice(uint256 price) public onlyOwner {
        rarePrice = price;
    }

    function setEpicPrice(uint256 price) public onlyOwner {
        epicPrice = price;
    }

    function setLegendaryPrice(uint256 price) public onlyOwner {
        legendaryPrice = price;
    }
}
