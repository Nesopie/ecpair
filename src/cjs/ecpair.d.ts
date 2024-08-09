import { Network } from './networks';
import * as networks from './networks';
export { networks };
interface ECPairOptions {
    compressed?: boolean;
    network?: Network;
    rng?(arg0: number): Uint8Array;
}
export interface Signer {
    publicKey: Uint8Array;
    network?: any;
    sign(hash: Uint8Array, lowR?: boolean): Uint8Array;
    getPublicKey?(): Uint8Array;
}
export interface SignerAsync {
    publicKey: Uint8Array;
    network?: any;
    sign(hash: Uint8Array, lowR?: boolean): Promise<Uint8Array>;
    getPublicKey?(): Uint8Array;
}
export interface ECPairInterface extends Signer {
    compressed: boolean;
    network: Network;
    lowR: boolean;
    privateKey?: Uint8Array;
    toWIF(): string;
    tweak(t: Uint8Array): ECPairInterface;
    verify(hash: Uint8Array, signature: Uint8Array): boolean;
    verifySchnorr(hash: Uint8Array, signature: Uint8Array): boolean;
    signSchnorr(hash: Uint8Array): Uint8Array;
}
export interface ECPairAPI {
    isPoint(maybePoint: any): boolean;
    fromPrivateKey(buffer: Uint8Array, options?: ECPairOptions): ECPairInterface;
    fromPublicKey(buffer: Uint8Array, options?: ECPairOptions): ECPairInterface;
    fromWIF(wifString: string, network?: Network | Network[]): ECPairInterface;
    makeRandom(options?: ECPairOptions): ECPairInterface;
}
export interface TinySecp256k1Interface {
    isPoint(p: Uint8Array): boolean;
    pointCompress(p: Uint8Array, compressed?: boolean): Uint8Array;
    isPrivate(d: Uint8Array): boolean;
    pointFromScalar(d: Uint8Array, compressed?: boolean): Uint8Array | null;
    xOnlyPointAddTweak(p: Uint8Array, tweak: Uint8Array): XOnlyPointAddTweakResult | null;
    privateAdd(d: Uint8Array, tweak: Uint8Array): Uint8Array | null;
    privateNegate(d: Uint8Array): Uint8Array;
    sign(h: Uint8Array, d: Uint8Array, e?: Uint8Array): Uint8Array;
    signSchnorr?(h: Uint8Array, d: Uint8Array, e?: Uint8Array): Uint8Array;
    verify(h: Uint8Array, Q: Uint8Array, signature: Uint8Array, strict?: boolean): boolean;
    verifySchnorr?(h: Uint8Array, Q: Uint8Array, signature: Uint8Array): boolean;
}
interface XOnlyPointAddTweakResult {
    parity: 1 | 0;
    xOnlyPubkey: Uint8Array;
}
export declare function ECPairFactory(ecc: TinySecp256k1Interface): ECPairAPI;