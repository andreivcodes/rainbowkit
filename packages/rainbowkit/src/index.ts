export * from './components';
export { defaultWallets } from './components/RainbowKitProvider/defaultWallets';
export { wallet } from './components/RainbowKitProvider/wallet';
export type { Wallet } from './components/RainbowKitProvider/WalletsContext';
export type { Theme } from './components/RainbowKitProvider/RainbowKitProvider';
export { lightTheme } from './themes/lightTheme';
export { darkTheme } from './themes/darkTheme';
export { dimTheme } from './themes/dimTheme';
export { cssStringFromTheme } from './css/cssStringFromTheme';
export { cssObjectFromTheme } from './css/cssObjectFromTheme';

// We're re-exporting from wagmi for now to resolve peer dependency
// resolution issues due to mixed usage of ESM and CJS. Otherwise
// rainbowkit and the host app get different instances of wagmi,
// meaning they can't talk to each other because they have different
// React contexts. This is not intended to be the final API.
export * from 'wagmi';
export { Provider as WagmiProvider } from 'wagmi';