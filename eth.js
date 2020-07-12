const axios = require("axios");

const Web3 = require("web3");
const web3 = new Web3("https://mainnet.infura.io/v3/"+process.env.INFURA_API_KEY);
const EthTx = require("ethereumjs-tx").Transaction;

exports.keyToAddr = key => web3.eth.accounts.privateKeyToAccount(key).address.toLowerCase();

let GAS_PRICE = 15;

exports.sendETH = async (privKey,recipient,amount,subTXfee=true) => {
	if (amount <= 1e-9*GAS_PRICE*21300 && subTXfee) return "error_amount_too_low_to_cover_fee"

	amount -= subTXfee ? 1e-9*GAS_PRICE*21300 : 0;
	amount = Math.round(amount*1e9)/1e9;

	const sendAddr = exports.keyToAddr(privKey);
	const newNonce = await web3.eth.getTransactionCount(sendAddr,"pending");

	const tx = new EthTx({
		nonce:		"0x"+newNonce.toString(16),
		gasPrice:	web3.utils.toHex(web3.utils.toWei(GAS_PRICE.toString(),"gwei")),
		gasLimit:	web3.utils.toHex(21200),
		from:		sendAddr,
		to:			recipient,
		value:		web3.utils.toHex(web3.utils.toWei((amount).toString(),"ether"))
	});

	tx.sign(Buffer.from(privKey.slice(2),"hex"));
	const hash = web3.utils.sha3(tx.serialize());
	const raw = "0x"+tx.serialize().toString("hex");

	console.log(`Sending ${amount} ETH from ${sendAddr} to ${recipient}`);
	web3.eth.sendSignedTransaction(raw);

	return hash;
}


async function refreshGasPrice () {
	const gasPriceAPI = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_KEY}`);
	GAS_PRICE = parseInt(gasPriceAPI.data.result.ProposeGasPrice);

	setTimeout(refreshGasPrice, 15000);
}
refreshGasPrice();


const crypto = require("crypto");
exports.randFloat = () => parseInt(crypto.randomBytes(3).toString("hex"),16) / 16777215;