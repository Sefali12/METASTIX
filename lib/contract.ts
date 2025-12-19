import { ethers, BrowserProvider, Contract } from "ethers"

// Flow EVM Testnet Configuration
export const FLOW_EVM_TESTNET = {
  chainId: 545, // Flow EVM Testnet
  chainName: "Flow EVM Testnet",
  rpcUrl: "https://testnet.evm.nodes.onflow.org",
  blockExplorer: "https://evm-testnet.flowscan.io",
  nativeCurrency: {
    name: "FLOW",
    symbol: "FLOW",
    decimals: 18,
  },
}

// Replace with your deployed contract address on Flow EVM Testnet
// Deployed successfully on Flow EVM Testnet
export const CONTRACT_ADDRESS = "0x6F811366489a86D42A2B6aFF698911C86205AA27"

export const CONTRACT_ABI = [
  "function submitFeedback(uint256 orgId, bytes32 hash) public",
  "function getFeedbackCount(uint256 orgId) public view returns(uint256)",
  "function getFeedback(uint256 orgId, uint256 index) public view returns(bytes32, uint256)",
]

// Validate contract address
function isValidContractAddress(address: string): boolean {
  // Check it's not empty and not the zero address
  const cleanAddr = address.toLowerCase().trim()
  return cleanAddr.length === 42 && 
         cleanAddr.startsWith("0x") && 
         cleanAddr !== "0x0000000000000000000000000000000000000000"
}

// Add Flow EVM Testnet to MetaMask
export async function addFlowEVMNetwork() {
  if (typeof window === "undefined") return false

  const provider = getEthereumProvider()
  if (!provider) return false

  try {
    await provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${FLOW_EVM_TESTNET.chainId.toString(16)}`,
          chainName: FLOW_EVM_TESTNET.chainName,
          nativeCurrency: FLOW_EVM_TESTNET.nativeCurrency,
          rpcUrls: [FLOW_EVM_TESTNET.rpcUrl],
          blockExplorerUrls: [FLOW_EVM_TESTNET.blockExplorer],
        },
      ],
    })
    return true
  } catch (error) {
    console.error("Failed to add Flow EVM network:", error)
    return false
  }
}

// Switch to Flow EVM Testnet
export async function switchToFlowEVM() {
  if (typeof window === "undefined") return false

  const provider = getEthereumProvider()
  if (!provider) return false

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${FLOW_EVM_TESTNET.chainId.toString(16)}` }],
    })
    return true
  } catch (error: any) {
    // If network doesn't exist, add it
    if (error.code === 4902) {
      return await addFlowEVMNetwork()
    }
    console.error("Failed to switch network:", error)
    return false
  }
}

// Helper to get the correct wallet provider (handles multiple wallet extensions)
function getEthereumProvider() {
  if (typeof window === "undefined") return null

  const win = window as unknown as {
    ethereum?: {
      providers?: Array<{
        isMetaMask?: boolean
        request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      }>
      isMetaMask?: boolean
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
    }
  }

  // Handle multiple wallet providers (e.g., MetaMask + Phantom)
  if (win.ethereum?.providers && Array.isArray(win.ethereum.providers)) {
    // Prioritize MetaMask
    const metamask = win.ethereum.providers.find(p => p.isMetaMask)
    return metamask || win.ethereum.providers[0]
  }

  return win.ethereum || null
}

export async function getProvider() {
  if (typeof window === "undefined") {
    throw new Error("Window object not available")
  }
  
  const ethereum = getEthereumProvider()
  
  if (!ethereum) {
    throw new Error("MetaMask not detected. Please install MetaMask to use this feature.")
  }

  try {
    // Check if connected to Flow EVM Testnet
    const chainId = await ethereum.request({ method: "eth_chainId" }) as string
    const currentChainId = parseInt(chainId, 16)
    
    if (currentChainId !== FLOW_EVM_TESTNET.chainId) {
      const switched = await switchToFlowEVM()
      if (!switched) {
        throw new Error(`Please switch to Flow EVM Testnet in MetaMask`)
      }
    }

    // Check if accounts are connected
    const accounts = await ethereum.request({ 
      method: "eth_accounts" 
    }) as string[]
    
    if (!accounts || accounts.length === 0) {
      throw new Error("Please connect your wallet first")
    }
    
    return new BrowserProvider(ethereum as any)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("connect your wallet") || error.message.includes("switch to Flow")) {
        throw error
      }
    }
    console.error("Provider error:", error)
    throw new Error("Failed to connect to Flow EVM Testnet")
  }
}

export async function getContract(withSigner = false) {
  // Validate contract address before creating contract instance
  if (!isValidContractAddress(CONTRACT_ADDRESS)) {
    throw new Error(
      "Contract not deployed. Please deploy your contract and update CONTRACT_ADDRESS in lib/contract.ts"
    )
  }

  const provider = await getProvider()

  if (withSigner) {
    const signer = await provider.getSigner()
    return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
  }

  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
}

export function generateHash(feedback: string, salt: string): string {
  const combined = feedback + salt
  return ethers.keccak256(ethers.toUtf8Bytes(combined))
}

export function generateSalt(): string {
  return ethers.hexlify(ethers.randomBytes(32))
}

// Convert any string (name/organization) to a unique numeric ID
export function stringToId(str: string): bigint {
  const normalized = str.toLowerCase().trim()
  let hash = BigInt(0)
  for (let i = 0; i < normalized.length; i++) {
    const char = BigInt(normalized.charCodeAt(i))
    hash = ((hash << BigInt(5)) - hash) + char
    hash = hash & BigInt("0xFFFFFFFFFFFFFFFF") // Keep it within uint64 range
  }
  return hash < BigInt(0) ? -hash : hash
}
