# Non-Custodial Wallet

Non-custodial wallet FunC smart contracts. 

# Targets and Goals

This project was created to allow users to exchange and buy assets in the TON DeFi ecosystem with a jetton (token or currency) that is not subject to volatile fluctuations. To meet regulatory requirements, the issuer of the tokens must have additional control over the tokens.

However, this non-custodial wallet ensures that users maintain full control over their funds, eliminating the need for a master contract and reducing the risk of exploits. This wallet provides the following functionality:

- Users control all their funds; nothing is sent to a master contract.
- Users can lock/unlock their funds within their wallet.

__⚠️ It is critically important for users to securely manage their private keys to avoid any potential risks of being hacked. It is highly recommended to use a multi-signature wallet for added security, with private keys stored on different air-gapped hosts or hardware wallets.__

__⚠️ The contract does not check the code and data on the `upgrade` message, so it is possible to brick the contract if you send invalid data or code. Therefore, you should always test upgrades on the testnet.__

# Local Development

## Install Dependencies

`npm install`

## Compile Contracts

`npm run build`

## Run Tests

`npm run test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

use Toncenter API:

`npx blueprint run --custom https://testnet.toncenter.com/api/v2/ --custom-version v2 --custom-type testnet --custom-key <API_KEY> `

API_KEY can be obtained on https://toncenter.com or https://testnet.toncenter.com

## Notes

- The non-custodial wallet contract partially include functionality that allows the owner to withdraw Toncoin funds from the wallet's Toncoin balance.
- The contract prices gas based on the *current* blockchain configuration. 
  It is worth keeping in mind the situation when the configuration has changed at the moment when the message goes from one wallet to another.
  Reducing fees in a blockchain configuration does not require additional actions.
  However, increasing fees in a blockchain configuration requires preliminary preparation—e.g., wallets and services must start sending Toncoins for gas in advance based on future parameters.
- If you set the status of the wallet to prohibit receiving jettons, there is no guarantee that when you send jettons to such a wallet, the jettons will bounce back and be credited to the sender. In case of gas shortage, they can be lost.