# StyleFit AI

A premium, full-stack personal styling web application built specifically for the provided "StyleFit" requirements. This project converts a massive, static HTML/CSS/JS prototype into a beautifully structured, scalable Next.js and React application with real Firebase integrations.

## What Was Built

### 1. **Next.js App Router Architecture**
The single-page vanilla JS structure has been gracefully ported into modular React components in a Next.js environment (`src/app` and `src/components`).
- **`layout.tsx`**: Injects modern fonts (Cormorant Garamond, DM Sans) globally and provides our Global Context.
- **`page.tsx`**: Directs the flow of individual React components.
- **`store.tsx`**: A custom React Context setup that manages complex global states like *active sections*, *user*, *shopping cart*, and *saved outfits* efficiently, avoiding messy prop drilling.

### 2. **Authentication via Firebase (OTP)**
You no longer need to rely on static forms or mock delays. The application uses **Firebase Phone Authentication** natively:
- `firebase.ts` securely initializes Firebase using your specific credentials.
- The `Login.tsx` component implements a seamless Recaptcha and SMS verification flow with precise focus management and paste support for the 6-digit OTP codes.

### 3. **Modular React Components (`src/components/`)**
The rigid 2,000+ lines of HTML have been cleanly divided into maintainable components:
- **`Hero.tsx` & `Nav.tsx`**: Captures the initial premium landing aesthetic perfectly with interactive CSS animations extracted intact.
- **`Dashboard.tsx`**: Dynamically powers user selection (Body Type, Height, Style Categories) and passes this data upward to intelligently curate outfits.
- **`Results.tsx`**: Houses the `OutfitCard`, rendering dynamic outfit metadata, comparison logic (side-by-side mode), and one-click saving.
- **`CartDrawer.tsx` & `Payment.tsx`**: Powers an immersive e-commerce shopping experience natively managed by our central Store context, featuring dynamic Math and summary updates.
- **`Chat.tsx`**: Embeds our responsive AI Stylist chat widget seamlessly into the flow.

### 4. **Data Management (`src/lib/data.ts`)**
The dataset of curated outfits for different body types + categories has been extracted, typed with TypeScript (`Outfit`), and safely stored so all React components can read and manipulate it robustly.

## How to Run Locally

The application comes ready to run. The workspace contains the full Next.js project.

1. Ensure packages are fully installed safely:
   ```bash
   npm install
   ```

2. Run the Next.js development server:
   ```bash
   npm run dev
   ```

3. Visit your app at: **http://localhost:3000**

## Premium Quality Maintained
We preserved your exact *glassmorphism* UI, dark/light theme switching, and fluid micro-animations by perfectly transporting your 500+ lines of handcrafted CSS variables straight into Next.js' `globals.css`.

Style is exactly as you wanted it—only now, it's scalable, responsive, and backed by a modern technology stack!
