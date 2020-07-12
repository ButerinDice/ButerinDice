require("dotenv").config({path:__dirname+"/.env"});

const axios = require("axios");
const ethJS = require("./eth.js");


let cases = {};
cases[ethJS.keyToAddr(process.env.KEY1)] = { //The "Case" address: 0xd1ce7d6986977ca03e0c9547f60a8e130ca6ca5e
	"key": process.env.KEY1,
	"odds": [
		[0.01,25],
		[0.03,8],
		[0.09,2.4],
		[0.22,0.8],
		[0.65,0.1]
	]
};
cases[ethJS.keyToAddr(process.env.KEY2)] = { //The "50/50" address: 0xd1ce87a1d14ce8d86d6ec45b12dd4c7f11f05050
	"key": process.env.KEY2,
	"odds": [
		[0.45,2],
		[0.55,0.1]
	]
};
cases[ethJS.keyToAddr(process.env.KEY3)] = { //The "10 TO 1" address: 0xd1ce3a04965f49bb31094a7d08ab4c8734454101
	"key": process.env.KEY3,
	"odds": [
		[0.085,10],
		[0.915,0.1]
	]
};

function openCase (caseAddr,float) {
	for (c of cases[caseAddr].odds) {
		if (float < c[0]) return c[1]
		float -= c[0];
	}
}


async function main () {
	for (addr in cases) {
		const txCall = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${addr}&apikey=${process.env.ETHERSCAN_API_KEY}`);
	
		for (tx of txCall.data.result) {
			if (tx.to !== addr || doneTX.includes(tx.hash)) continue
			doneTX.push(tx.hash);
	
			const val = parseInt(tx.value)/10e17;
			const ticket = ethJS.randFloat();
			console.log(`${val} ETH from ${tx.from} (${tx.hash}). Ticket: ${ticket}`);
	
			if (val >= 0.01) {
				const newHash = await ethJS.sendETH(
					cases[addr].key,
					tx.from,
					val*openCase(addr,ticket),
					(openCase(addr,ticket) > 0.1)
				);
				console.log(`Sent ${val*openCase(addr,ticket)} to ${tx.from} (${newHash})`);
			}
		}
	}
}

let doneTX = [];
async function init () {
	for (addr in cases) {
		const txCall = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${addr}&apikey=${process.env.ETHERSCAN_API_KEY}`);

		for (tx of txCall.data.result) {
			if (tx.to !== addr) continue
			doneTX.push(tx.hash);
		}
	}

	console.log(`(${doneTX.length} cases opened)`);

	setInterval(main,8000);
	console.log("up and running :)");
}

console.log("loading...");
init();