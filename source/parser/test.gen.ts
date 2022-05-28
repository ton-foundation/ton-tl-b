import BN from "bn.js";
import { Cell, Address, beginCell } from "ton";

export class TokenTransfer {
    readonly queryId: BN;
    readonly amount: BN;
    readonly destination: Address;
    readonly responseDestination: Address;
    readonly customPayload: Cell | null;
    readonly forwardTonAmount: BN;
    readonly forwardPayload: Cell | Cell;

    toCell() {
        let builder = beginCell()
        builder.storeUint(260734629, 32);
        builder.storeCoins(this.amount);
        builder.storeAddress(this.destination);
        builder.storeAddress(this.responseDestination);
        builder.storeCoins(this.forwardTonAmount);
        return builder.endCell();
    }
}

export class TokenTransferNotification {
    readonly queryId: BN;
    readonly amount: BN;
    readonly sender: Address;
    readonly forwardPayload: Cell | Cell;

    toCell() {
        let builder = beginCell()
        builder.storeUint(1935855772, 32);
        builder.storeCoins(this.amount);
        builder.storeAddress(this.sender);
        return builder.endCell();
    }
}

export class StakeWithdraw {
    readonly queryId: BN;
    readonly gasLimit: BN;
    readonly amount: BN;

    toCell() {
        let builder = beginCell()
        builder.storeUint(3665837821, 32);
        builder.storeCoins(this.gasLimit);
        builder.storeCoins(this.amount);
        return builder.endCell();
    }
}

export class StakeDeposit {
    readonly queryId: BN;
    readonly gasLimit: BN;

    toCell() {
        let builder = beginCell()
        builder.storeUint(2077040623, 32);
        builder.storeCoins(this.gasLimit);
        return builder.endCell();
    }
}

