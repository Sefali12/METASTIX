# METASTIX

Anonymous Blockchain Feedback System built on Flow EVM Testnet.

![METASTIX](public/metastix-logo.png)

## Overview

METASTIX is a decentralized application (dApp) that enables anonymous feedback submission and verification on the blockchain. It uses cryptographic hashing to ensure feedback integrity while maintaining user privacy.

## Features

- 🔒 **Anonymous Feedback** - Submit feedback without revealing your identity
- ✅ **Blockchain Verification** - All feedback is stored on Flow EVM Testnet
- 🔍 **Proof Verification** - Verify feedback authenticity using cryptographic proofs
- 📊 **Feedback Viewer** - View all submitted feedback for any organization
- 🦊 **MetaMask Integration** - Connect your wallet to interact with the blockchain

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Flow EVM Testnet
- **Smart Contract Interaction**: ethers.js
- **UI Components**: Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask wallet extension

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/METASTIX.git
   cd METASTIX
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Connecting to Flow EVM Testnet

1. Install MetaMask browser extension
2. Click "Connect Wallet" in the app
3. The app will automatically prompt you to add Flow EVM Testnet

**Network Details:**
- Network Name: Flow EVM Testnet
- RPC URL: https://testnet.evm.nodes.onflow.org
- Chain ID: 545
- Currency Symbol: FLOW
- Block Explorer: https://evm-testnet.flowscan.io

## Project Structure

```
METASTIX/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Home page
│   ├── submit/            # Submit feedback page
│   ├── verify/            # Verify proof page
│   └── viewer/            # View feedback page
├── components/            # React components
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── submit-form.tsx
│   ├── verify-proof.tsx
│   ├── viewer-table.tsx
│   └── wallet-connect.tsx
├── lib/
│   └── contract.ts        # Smart contract interaction
├── types/
│   └── ethereum.d.ts      # TypeScript definitions
└── public/                # Static assets
```

## Smart Contract

The feedback contract is deployed on Flow EVM Testnet at:
`0x6F811366489a86D42A2B6aFF698911C86205AA27`

### Contract Functions

- `submitFeedback(orgId, hash)` - Submit feedback hash for an organization
- `getFeedbackCount(orgId)` - Get total feedback count for an organization
- `getFeedback(orgId, index)` - Get feedback hash and timestamp

## Environment Variables

See `.env.example` for available environment variables.

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
