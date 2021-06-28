const BitGo = require('bitgo')
require('dotenv').config()

// init the sdk
const bitgo = new BitGo.BitGo({ env: process.env.mode, 
  accessToken: process.env.accessToken4 });
// defaults to testnet. add env: 'prod' if you want to go against mainnet
console.log("BitGoJS library version: " + bitgo.version());

testBitGo = async() => {
  let result = await bitgo.session();
  console.dir(result);

  const btc_params = {
    "passphrase": "helloworld",
    "label": "firstwallet"
  };
  // create a btc wallet
  const { wallet } = await bitgo.coin('tbtc').wallets().generateWallet(btc_params);
  console.dir(wallet);

  // create a eth wallet
  // enterprise access is needed for teth, eth
  /*const eth_params = {
    "passphrase": "helloworld",
    "label": "firstwallet",
    "newFeeAddress": true
  };
  const { eth_wallet } = await bitgo.coin('teth').wallets().generateWallet(eth_params);
  console.dir(eth_wallet);*/

  // create new address
  const address = await wallet.createAddress();
  console.dir(address);

  // view wallet transfers
  const transfers = await wallet.transfers();
  console.log(transfers);

  // view wallet balance
  const balance = await wallet.balance();
  console.log(balance)

  // send crypto to another address
  result = await wallet.send({
    address: "2NEe9QhKPB2gnQLB3hffMuDcoFKZFjHYJYx",
    amount: 0.01 * 1e8,
    walletPassphrase:  "helloworld"
  });
  console.dir(result);
}

testBitGo();
