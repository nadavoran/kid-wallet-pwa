# Kid Wallet PWA 💰

A simple and delightful Progressive Web App (PWA) designed for kids to manage their digital allowance and learn basic money management skills through pretend payments.

## Overview

Kid Wallet is an educational tool that provides children with a virtual wallet to track their allowance, make pretend purchases, and view their transaction history. Built with modern web technologies, it works seamlessly across devices and can be installed as a standalone app.

## Features

### Core Functionality
- **Balance Tracking**: View current wallet balance with animated updates
- **Add Money**: Parents can add allowance with a fun coin-dropping animation
- **Payment System**: Kids can make pretend payments for items
- **Transaction History**: Complete record of all credits and debits
- **Refund Capability**: Undo payments with PIN protection

### User Experience
- **Personalization**: Customizable child name and wallet icon (piggy bank or wallet)
- **PIN Protection**: Optional 4-digit PIN for adding money and refunds
- **Quick Payment Items**: Pre-configured items (ice cream, pizza, burger, lollies) for faster transactions
- **Animated UI**: Smooth animations powered by Framer Motion for an engaging experience
- **Offline Support**: Works offline thanks to PWA capabilities

### Technical Features
- **Progressive Web App**: Installable on mobile and desktop devices
- **Local Storage**: All data stored locally in browser (no server required)
- **Responsive Design**: Works on phones, tablets, and desktop computers
- **Cross-Platform**: Optimized icons for Android, iOS, and Windows 11

## Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.8
- **Styling**: Tailwind CSS 3.4.16
- **Animations**: Framer Motion 11.0.0
- **PWA**: vite-plugin-pwa for service worker and manifest generation
- **State Management**: React Context API with useReducer
- **Icons**: Sharp for icon generation

## Project Structure

```
kid-wallet-pwa/
├── public/               # Static assets
│   ├── icons/           # PWA icons for all platforms
│   ├── wallet/          # Wallet images (pig, wallet)
│   └── screenshots/     # App screenshots for app stores
├── src/
│   ├── components/      # React components
│   │   ├── AddMoneyModal.tsx      # Modal with coin animation
│   │   ├── HistoryPanel.tsx       # Transaction history
│   │   ├── PayPanel.tsx           # Payment interface
│   │   ├── PinGate.tsx            # PIN verification
│   │   ├── SettingsModal.tsx      # App settings
│   │   ├── Wallet.tsx             # Balance display
│   │   └── wallets/               # Wallet animation components
│   ├── utils/           # Utility functions
│   │   ├── currency.ts            # Currency formatting
│   │   └── storage.ts             # LocalStorage operations
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   ├── state.tsx        # Global state management
│   ├── types.ts         # TypeScript type definitions
│   └── index.css        # Global styles
├── scripts/             # Build scripts
│   └── generate-icons.mjs         # Icon generation script
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies and scripts
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher recommended)
- Yarn or npm package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kid-wallet-pwa
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Generate PWA icons** (optional)
   ```bash
   yarn gen:assets
   # or
   npm run gen:assets
   ```

4. **Start development server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The service worker is enabled in development for easier testing

### Production Build

```bash
yarn build
# or
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
yarn preview
# or
npm run preview
```

## Usage Guide

### For Parents

1. **Initial Setup**
   - Open the app and click "Settings"
   - Set your child's name
   - Optionally set a 4-digit PIN to protect adding money and refunds
   - Choose wallet icon style (piggy bank or wallet)

2. **Adding Allowance**
   - Click "Add money" button
   - Enter PIN if enabled
   - Enter the amount to add
   - Watch the fun coin animation as money is added

3. **Managing Transactions**
   - View transaction history by clicking "History"
   - Refund payments if needed (requires PIN if enabled)

### For Kids

1. **Check Balance**
   - Your current balance is displayed prominently at the top

2. **Make Payments**
   - Enter the amount you want to spend
   - Optionally add a note (what you're paying for)
   - Click "Pay" button
   - Or click quick payment buttons for common items

3. **View History**
   - Click "History" to see all your transactions
   - Green amounts are money added
   - Red amounts are money spent

## Configuration

### Default Settings
- **Currency**: AUD (Australian Dollars)
- **Default Name**: "Ben Ben"
- **Default Icon**: Piggy bank
- **Default Quick Items**: Ice-cream, Pizza, Burger, Lollies

### Customization

Edit [`src/utils/storage.ts`](./src/utils/storage.ts) to change:
- Default currency
- Default child name
- Default quick payment items

Edit [`src/types.ts`](./src/types.ts) to add more currency options.

## Data Storage

All data is stored locally in the browser using `localStorage` under the key `kid_wallet_state_v1`. This includes:
- Current balance
- Transaction history
- User settings (name, PIN, icon preference)
- Quick payment items

**Important**: Clearing browser data will reset the wallet. No data is sent to any server.

## PWA Installation

### Mobile (Android/iOS)
1. Open the app in your mobile browser
2. Look for "Add to Home Screen" or "Install App" prompt
3. Follow the browser-specific installation steps
4. The app will appear as a standalone app on your home screen

### Desktop (Chrome/Edge)
1. Open the app in a supported browser
2. Look for the install icon in the address bar
3. Click to install
4. The app will be available in your applications menu

## Browser Compatibility

- **Chrome/Edge**: Full support including installation
- **Safari**: Full support (iOS 11.3+)
- **Firefox**: Works with limited PWA features
- **Modern mobile browsers**: Full support

## Development Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server with hot reload |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build locally |
| `yarn gen:assets` | Generate PWA icons from source images |

## Security Notes

- **PIN Storage**: The 4-digit PIN is stored in plain text in localStorage. This is acceptable for a local-only educational app but should **not** be used for real financial data.
- **Local Only**: No data leaves the device. The app does not communicate with any servers.
- **Educational Purpose**: This app is for teaching kids about money management, not for real financial transactions.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Development Guidelines
- Follow existing code style
- Use TypeScript types
- Test across different browsers
- Ensure animations are smooth
- Keep the UI kid-friendly

## License

This project is available for personal and educational use.

## Credits

- Built with React, TypeScript, and Vite
- Animations by Framer Motion
- Styled with Tailwind CSS
- Icons generated with Sharp

## Future Enhancements

Potential features for future versions:
- [ ] Multiple child profiles
- [ ] Savings goals
- [ ] Chores/task tracking
- [ ] Parent dashboard
- [ ] Custom quick payment items
- [ ] Charts and statistics
- [ ] Import/export data
- [ ] Cloud sync (optional)

## Support

For issues or questions, please open an issue on the repository.

---

Made with ❤️ for kids learning about money management
