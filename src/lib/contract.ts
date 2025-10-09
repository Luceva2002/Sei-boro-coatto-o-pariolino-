import type { Abi } from 'viem';
import ABI_JSON from '../../smart-contract.json';

// Sostituisci con il tuo indirizzo contratto su Sepolia
export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000') as `0x${string}`;

// ABI reale del contratto importato da smart-contract.json
export const CONTRACT_ABI = ABI_JSON as unknown as Abi;


