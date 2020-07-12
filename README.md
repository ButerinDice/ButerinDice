# ButerinDice
Yo. Does anyone remember SatoshiDice?
It failed because of the high fees / slow confirmations of the Bitcoin network. This is an Ethereum clone "ButerinDice" with 3 different static addresses:



## Addresses
**The "Case address"**: [0x**d1ce**7d6986977ca03e0c9547f60a8e130ca6**ca5e**](https://etherscan.io/address/0xd1ce7d6986977ca03e0c9547f60a8e130ca6ca5e)

<sub>Start balance 0.5 ETH -> max 0.02 ETH bet</sub>

|Multiplier|Odd|
|-|-|
|25x|1%|
|8x|3%|
|2.4x|8%|
|0.8x|22%|
|0.1x|66%|

**The "50/50 address"**: [0x**d1ce**87a1d14ce8d86d6ec45b12dd4c7f11f0**5050**](https://etherscan.io/address/0xd1ce87a1d14ce8d86d6ec45b12dd4c7f11f05050)

<sub>(Start balance 0.2 ETH -> max 0.1 ETH bet)</sub>

This address works like a regular coinflip but, like, in cool...

**The "10 TO 1 address"**: [0x**d1ce**3a04965f49bb31094a7d08ab4c8734454**101**](https://etherscan.io/address/0xd1ce3a04965f49bb31094a7d08ab4c8734454101)

<sub>(Start balance 0.1 ETH -> max 0.01 ETH bet)</sub>

10x your ETH in one transaction to this address!



## How do I play?
Taking a bet is really simple: just send some ETH (minimum 0.01 ETH) to one of the 3 addresses and after 1 confirmation your win gets send back to you. There is no "total loss" (like 0x, the lowest is 0.1x), you always get some amount of ETH back. In the worst case you loose 90% of your ETH.

## Is this legit?
If this would be a scam it might make 0.02 ETH before somebody notices, wouldn't be profitable at all. Go to EtherScan and have a look at all bets. Here on GitHub you can verify the source code yourself. Ask if you have any questions. Minimum bet is 0.01 ETH, don't send less but try out small amounts first to verify this works. Don't use any copycats, those might be a scam.

## What should I keep in mind?
Feel free to send some ETH to play around with this. Please keep in mind the current balance & best multiplier of each address. If you send 0.3 ETH to an address with only 1 ETH balance but hit an 8x, you won't get 2.4 ETH back.
### But I want to bet more
I will increase the balance (potential win) of each address after some time. This is like a test phase, so please try to find bugs in the source code and open an issue / write a pull request if you find something (ButerinDice@protonmail.com for private messages). If there are no critical errors I'll get more confident to put more ETH on the line for this.



# How to run your own copy
1. Clone / download the repo
2. Configure an .env file. You need an API key from infura.io & EtherScan.io (both free to get)
Generate 3 Wallet public/private key pairs (you can use MetaMask for that). Now fund the addresses with some ETH to play around.
Make a .env file, add all 5 keys. Should look like this:

```
INFURA_API_KEY = "yourinfurakeygoeshere"
ETHERSCAN_API_KEY = "YOURETHERSCANKEYGOESHERE"
KEY1 = "0xPRIVATEKEYOFTHEFIRSTADDRESS"
KEY2 = "0xPRIVATEKEYOFTHESECONDADDRESS"
KEY3 = "0xPRIVATEKEYOFTHETHIRDADDRESS"
```

3. Now enter the repo, install npm packages & run index.js:
```
cd path/to/repo
npm init --save
node index.js
```

For any questions open an issue or contact ButerinDice@protonmail.com



## Comming soon / Planned
**The "BigBet address"**: [0x**d1ce**notdoneyet**b19be7**](https://etherscan.io)

<sub>Start balance 1 ETH -> max 0.01 ETH bet.</sub>

99/1 odds: 100x. Win 1 ETH with a bet of just 0.01 ETH!

## Open Source
Feedback or even some pull requests are gladly appreciated :)
For critical errors, private stuff or talking about your feelings please contact **ButerinDice@protonmail.com**

## Thanks
goes to Infura, EtherScan, Vitalik & MetaMask <3