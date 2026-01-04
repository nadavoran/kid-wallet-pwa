# App Icons and Splash Screens Update

## Overview
Updated all app icons and splash screens to use the pig-with-coin image instead of generic SVG icons.

## Changes Made

### 1. Updated Icon Generation Script
**File**: `scripts/generate-icons.mjs`

**Key Changes**:
- Changed source from SVG icons to `public/wallet/pig-with-coin.png`
- Generates all platform-specific icons from the pig image
- Creates splash screens with centered pig image on sky blue background

### 2. Generated Icon Sets

#### Main PWA Icons
- `icon-192.png` - 192x192px
- `icon-512.png` - 512x512px

#### Android Icons
Generated sizes: 48, 72, 96, 144, 192, 512
- `android-launchericon-48-48.png`
- `android-launchericon-72-72.png`
- `android-launchericon-96-96.png`
- `android-launchericon-144-144.png`
- `android-launchericon-192-192.png`
- `android-launchericon-512-512.png`

#### iOS Icons
Generated sizes: 16, 20, 29, 32, 40, 50, 57, 58, 60, 64, 72, 76, 80, 87, 100, 114, 120, 128, 144, 152, 167, 180, 192, 256, 512, 1024
- Complete set of iOS app icon sizes
- Supports all iPhone, iPad, and Apple Watch sizes

#### Windows 11 Icons
Complete Windows 11 tile and icon set:
- **Small Tiles**: 71-284px (5 scales)
- **Square 150x150**: 150-600px (5 scales)
- **Wide 310x150**: 310x150 to 1240x600 (5 scales)
- **Large Tiles**: 310-1240px (5 scales)
- **Square 44x44**: Multiple variants and scales
- **Store Logo**: 50-200px (5 scales)
- **Splash Screens**: 620x300 to 2480x1200 (5 scales)

### 3. Updated SVG Icons
**Files**: 
- `public/icons/icon-192.svg`
- `public/icons/icon-512.svg`

Created custom SVG representations of the pig with coin:
- Pink pig with proper proportions
- Gold coin with gradient
- Dollar sign on coin
- Clean, scalable vector graphics

### 4. Screenshots
**Files**:
- `public/screenshots/wide-1200x630.png` - For wide displays
- `public/screenshots/narrow-540x720.png` - For narrow/mobile displays

Both feature:
- Sky blue background (#0ea5e9)
- Centered pig-with-coin image
- Scaled to 60% of screenshot dimensions

## How to Regenerate

Run the generation script:
```bash
yarn gen:assets
# or
npm run gen:assets
```

This will:
1. Create all necessary directories
2. Generate PNG icons from pig-with-coin.png for all platforms
3. Create splash screens with pig image
4. Output success message

## Icon Specifications

### Main App Icon (pig-with-coin.png)
- **Source**: `public/wallet/pig-with-coin.png`
- **Format**: PNG with transparency
- **Recommended Source Size**: 1024x1024 or larger
- **Content**: Cute pink piggy bank with gold coin

### Generated Formats
- **PNG**: All platform icons (transparent background)
- **SVG**: Vector versions for scalability
- **Splash Screens**: PNG with colored background

## Platform Support

### ✅ Android
- Launcher icons (all densities)
- Adaptive icon support
- Play Store listing icon

### ✅ iOS
- All iPhone sizes (iOS 7+)
- All iPad sizes
- Apple Watch icon
- App Store icon (1024x1024)

### ✅ Windows 11
- Small, Medium, Wide, Large tiles
- Store logo
- Splash screens (all scales)
- Target size icons

### ✅ PWA
- Manifest icons (192, 512)
- Maskable icon support
- App screenshots for install prompt

## Visual Identity

The pig-with-coin image provides:
- **Kid-Friendly**: Cute, approachable design
- **Clear Purpose**: Instantly recognizable as money/wallet app
- **Consistent Branding**: Same icon across all platforms
- **Professional Quality**: High-resolution, clean graphics

## Testing

### Desktop
1. Open app in browser
2. Look for pig icon in browser tab
3. Install PWA and check desktop icon

### Mobile (Android)
1. Install PWA
2. Check home screen icon
3. Verify splash screen on app launch

### Mobile (iOS)
1. Add to Home Screen
2. Check home screen icon
3. Verify app icon matches

## File Sizes
- Main icons: ~25KB (192px), ~169KB (512px)
- Screenshots: ~72KB (narrow), ~103KB (wide)
- Total icon set: ~5-10MB (all platforms combined)

## Future Updates

To change the app icon:
1. Replace `public/wallet/pig-with-coin.png` with new image
2. Run `yarn gen:assets`
3. Commit updated icons to repository
4. Deploy changes

## Notes
- All icons are generated from a single source image
- Maintains aspect ratio and quality across all sizes
- Transparent background preserved where supported
- Splash screens use app's primary color (#0ea5e9)

---

**Updated**: January 2026  
**Source Image**: `public/wallet/pig-with-coin.png`  
**Generation Script**: `scripts/generate-icons.mjs`
