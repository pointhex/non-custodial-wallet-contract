import {compile, NetworkProvider} from '@ton/blueprint';
import {jettonWalletCodeFromLibrary, promptBool, promptToncoin, promptUserFriendlyAddress} from "../wrappers/ui-utils";
import {checkJettonWallet} from "./JettonWalletChecker";
import {fromNano} from "@ton/core";

export async function run(provider: NetworkProvider) {
    const isTestnet = provider.network() !== 'mainnet';

    const ui = provider.ui();

    const jettonMinterCode = await compile('JettonMinter');
    const jettonWalletCodeRaw = await compile('JettonWallet');
    // const jettonWalletCode = jettonWalletCodeFromLibrary(jettonWalletCodeRaw);

    const jettonWalletAddress = await promptUserFriendlyAddress("Enter the address of the jetton wallet", ui, isTestnet);

    try {
        const {jettonWalletContract} = await checkJettonWallet(jettonWalletAddress, jettonMinterCode, jettonWalletCodeRaw, provider, ui, isTestnet, false);;

        const tonAmount = await promptToncoin("Enter Toncoin amount to top-up jetton-wallet Toncoins balance.", ui);

        if (!(await promptBool(`${fromNano(tonAmount)} TON top-up ?`, ['yes', 'no'], ui))) {
            return;
        }

        await jettonWalletContract.sendTopUp(provider.sender(), tonAmount);

        ui.write('Transaction sent');

    } catch (e: any) {
        ui.write(e.message);
        return;
    }
}
