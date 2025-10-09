import type { Abi } from 'viem';
import ABI_JSON from '../../smart-contract.json';

// Indirizzo contratto su Sepolia (fallback a quello fornito)
export const CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x1C9E05B29134233e19fbd0FE27400F5FFFc3737e') as `0x${string}`;

// ABI reale del contratto importato da smart-contract.json
export const CONTRACT_ABI = ABI_JSON as unknown as Abi;


