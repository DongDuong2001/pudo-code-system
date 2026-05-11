# Web3 & Smart Contracts PUDO Checklist

## 1. PLAN (Architecture & Strategy)
- [ ] **Protocol Design:** Define contract architecture (e.g., Monolithic vs. Proxy/Upgradable vs. Diamond pattern).
- [ ] **Tokenomics:** Map out value flow, minting, burning, and pausing capabilities (ERC20/ERC721/ERC1155).
- [ ] **Access Control:** Plan roles (Owner, Admin, Minter) and multisig requirements.
- [ ] **Gas Economics:** Architect data structures to minimize storage operations (packing variables).

## 2. UNDERSTAND (Context & Auditing)
- [ ] **Dependencies:** Validate versions of inherited libraries (e.g., OpenZeppelin Contracts).
- [ ] **External Interactions:** Map all calls to external, untrusted contracts (risk of reentrancy).
- [ ] **State Changes:** Understand the lifecycle of state variables over the contract's active period.

## 3. DEVELOP (Implementation)
- [ ] **CEI Pattern:** STRICTLY adhere to Checks-Effects-Interactions pattern for all state-mutating functions.
- [ ] **Modifiers:** Use modifiers for access control and validation logically without bloating gas.
- [ ] **Events:** Emit events for all significant state changes for off-chain indexing.
- [ ] **Testing:** Achieve 100% branch test coverage using Foundry or Hardhat. Include fuzz testing and invariant testing.

## 4. OPTIMIZE (Performance & Review)
- [ ] **Security Auditing:** Run static analyzers (Slither, Aderyn) to catch common vulnerabilities (reentrancy, arithmetic overflows).
- [ ] **Gas Optimization:** Use `calldata` instead of `memory` for read-only external inputs. Pack structs to fit in 256-bit slots.
- [ ] **Upgradability:** If using proxies, ensure storage slots do not clash on upgrades (append-only storage).
- [ ] **Documentation:** Add NatSpec comments (`@title`, `@notice`, `@param`) to all public/external functions.