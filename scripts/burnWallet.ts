import {compile, NetworkProvider} from '@ton/blueprint';
import {jettonWalletCodeFromLibrary, promptBool, promptToncoin, promptUserFriendlyAddress} from "../wrappers/ui-utils";
import {checkJettonWallet} from "./JettonWalletChecker";
import {fromNano, toNano} from "@ton/core";

export async function run(provider: NetworkProvider) {
    const isTestnet = provider.network() !== 'mainnet';

    const ui = provider.ui();

    const jettonMinterCode = await compile('JettonMinter');
    const jettonWalletCodeRaw = await compile('JettonWallet');
    // const jettonWalletCode = jettonWalletCodeFromLibrary(jettonWalletCodeRaw);

    const jettonWalletAddress = await promptUserFriendlyAddress("Enter the address of the jetton wallet", ui, isTestnet);

    try {
        const {jettonWalletContract} = await checkJettonWallet(jettonWalletAddress, jettonMinterCode, jettonWalletCodeRaw, provider, ui, isTestnet, false);;

        const jettonBurnAmount = await promptToncoin("Enter Jetton amount to burn", ui);

        // if (!(await promptBool(`${fromNano(jettonBurnAmount)} TON top-up ?`, ['yes', 'no'], ui))) {
        //     return;
        // }

        await jettonWalletContract.sendBurn(provider.sender(), toNano(0.1), jettonBurnAmount, null, null);

        ui.write('Transaction sent');

    } catch (e: any) {
        ui.write(e.message);
        return;
    }
}
