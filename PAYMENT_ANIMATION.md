# Payment Animation Feature

## Overview
Added a visual animation that shows money transferring from the wallet balance to the payment destination when a child makes a payment.

## How It Works

### Visual Effect
1. When the "Pay" button is clicked, money flies out of the balance display
2. Animated coins (💸) fly from the wallet balance to the pay button
3. A red badge shows the payment amount (e.g., "-$5.00")
4. The coins gradually disappear as they reach the payment destination
5. After the animation completes, the balance is updated and the form resets

### Animation Details
- **Coin Count**: Scales with payment amount (minimum 3, maximum 12 coins)
  - 1 coin ≈ $1.00
- **Duration**: ~0.8 seconds total
- **Stagger Effect**: Coins launch with 60ms delay between each
- **Visual Effects**:
  - Coins rotate randomly during flight
  - Coins spread out slightly at destination
  - Coins fade out as they arrive
  - Scale reduces from 1.0 to 0.7

### User Experience
- Input fields are disabled during animation to prevent multiple submissions
- Pay button is disabled during animation
- Smooth transition with no jarring updates
- Fun, engaging feedback for kids

## Implementation

### Files Modified

#### 1. `src/components/PayPanel.tsx`
Added payment animation system:
- State management for animation (`isAnimating`, `animAmount`)
- Refs for position tracking (`payButtonRef`, `containerRef`)
- Dynamic positioning using `useLayoutEffect`
- Coin generation based on payment amount
- Full-screen overlay with animated elements
- Payment completion handler

**Key Features**:
```typescript
- isAnimating: boolean       // Controls animation state
- animAmount: number          // Stores payment amount for animation
- coinCount: 3-12             // Dynamic based on payment amount
- positions: {wx, wy, bx, by} // Wallet and button positions
```

#### 2. `src/components/Wallet.tsx`
Added targeting class:
- Added `wallet-balance-container` class to balance display
- Allows PayPanel to locate the balance element for animation positioning

### Technical Details

**Position Calculation**:
```typescript
// Uses getBoundingClientRect() to get viewport coordinates
const w = walletEl.getBoundingClientRect();
const b = payButtonRef.current.getBoundingClientRect();

positions.current = {
  wx: w.left + w.width / 2,   // Wallet center X
  wy: w.top + w.height / 2,   // Wallet center Y
  bx: b.left + b.width / 2,   // Button center X
  by: b.top + b.height / 2,   // Button center Y
};
```

**Animation Configuration**:
```typescript
// Each coin animates independently
initial={{
  x: walletPosition.x + randomSpread,
  y: walletPosition.y + randomSpread,
  scale: 1,
  opacity: 1,
  rotate: 0,
}}
animate={{
  x: buttonPosition.x + spread,
  y: buttonPosition.y + randomSpread,
  scale: 0.7,
  opacity: 0,
  rotate: random * 360,
}}
transition={{ 
  duration: 0.8, 
  delay: coinIndex * 0.06, 
  ease: "easeInOut" 
}}
```

## Usage

### For Users
1. Enter payment amount in the Pay panel
2. Optionally add a note (what you're paying for)
3. Click the "Pay" button
4. Watch the money fly from your balance!
5. Form automatically resets after payment

### For Developers

**Customizing Animation**:

Change coin count range:
```typescript
const coinCount = useMemo(() => {
  const byValue = Math.floor(animAmount / 100);
  return Math.max(3, Math.min(12, byValue)); // Adjust min/max here
}, [animAmount]);
```

Change animation speed:
```typescript
transition={{ 
  duration: 0.8,              // Total animation time
  delay: i * 0.06,            // Delay between coins
  ease: "easeInOut"           // Easing function
}}
```

Change coin emoji:
```typescript
<motion.div>
  💸  {/* Change to any emoji: 🪙 💰 💵 */}
</motion.div>
```

## Browser Compatibility
- Works on all modern browsers that support Framer Motion
- Animations are GPU-accelerated for smooth performance
- Gracefully degrades if animations are disabled

## Performance
- Lightweight: only active during payment
- No impact on app when not animating
- Uses React's AnimatePresence for clean mount/unmount
- Position calculation happens only when animation starts

## Future Enhancements
- [ ] Different coin types based on amount (💵 for large, 🪙 for small)
- [ ] Sound effects option
- [ ] Customizable animation speed in settings
- [ ] Different animation styles (confetti, sparkles, etc.)
- [ ] Success checkmark at payment destination

## Testing Checklist
- [x] Animation starts on pay button click
- [x] Coins fly from balance to button
- [x] Amount badge displays correctly
- [x] Balance updates after animation
- [x] Form resets after animation
- [x] Inputs disabled during animation
- [x] Works with different payment amounts
- [x] Works on mobile viewport
- [x] Works on desktop viewport
- [ ] Test on actual devices (manual testing required)

## Accessibility Notes
- Animation is decorative and doesn't affect functionality
- Users who disable animations will still see balance updates
- No critical information is conveyed only through animation
- Consider adding `prefers-reduced-motion` support in future

---

**Implementation Date**: January 2026  
**Dependencies**: Framer Motion, React
