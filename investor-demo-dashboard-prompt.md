# Investor Demo — Restaurant Dashboard UI Prompt

## PURPOSE

Build a completely standalone, fully self-contained Restaurant Dashboard UI as an investor demo.

- No backend, no database, no API calls, no login page
- All data is seeded dummy/mock data hardcoded directly in the frontend
- The dashboard opens immediately on load — no authentication flow
- Must look real, polished, and production-ready to impress investors

---

## TECH STACK

- React + TypeScript
- Vite (standalone frontend only — no Express, no server)
- Tailwind CSS
- shadcn/ui components — Card, Button, Badge, Switch, Table, Dialog, Input, Select, Tabs, Skeleton, Progress
- lucide-react icons
- Framer Motion for smooth page/section transitions and card animations
- recharts for charts and graphs on the Overview page
- All data is local mock/seed — no fetch, no axios, no API calls anywhere

---

## DESIGN — CRITICAL

The dashboard must be visually stunning and feel like a premium, modern SaaS product built specifically for restaurants. It must NOT look like a generic admin panel.

### Color Theme

- **Sidebar background:** Deep navy `#0f172a` with a subtle top-to-bottom gradient to `#1e293b`
- **Sidebar active item:** Amber/gold `#f59e0b` background pill with dark text
- **Sidebar inactive items:** Muted slate text with hover glow in amber
- **Top header:** White with a thin bottom border, restaurant logo on the left, restaurant name bold, action buttons on the right
- **Page background:** Light warm gray `#f8fafc`
- **Stat cards:** White with a colored left-border accent (use different accent colors per card — amber, teal, violet, rose) and a soft drop shadow
- **Section headings:** Bold, dark, with a small colored underline accent
- **Buttons:** Solid amber/gold for primary actions, slate outline for secondary
- **Badges:** Green for available, red for unavailable, amber for Today's Special, purple for Chef's Special, blue for categories
- **Tables:** Striped rows, sticky headers, rounded container with shadow
- **Forms/Modals:** Clean white dialogs with smooth open/close animation

### Typography
- Section headings: bold, large, dark
- Subheadings: medium weight, muted slate
- Body/table text: clean, readable, not too small

### Animations
- Sidebar nav items have a smooth active indicator transition
- Cards animate in with a subtle fade-up on page load (Framer Motion)
- Charts animate on entry
- Modal dialogs slide in smoothly

---

## RESTAURANT USED FOR DUMMY DATA

Use a fictional upscale restaurant called **"Ember & Oak"** — a fine-dining bar and restaurant.
Use realistic, varied dummy data throughout. The restaurant should feel real.

---

## DUMMY SEED DATA

### Menu Items (create at least 30 items across varied categories)

Categories to use: `starters`, `mains`, `desserts`, `cocktails`, `mocktails`, `wines`, `whisky`, `craft-beers`

Sample items (add more variety):
- Truffle Arancini — starters — ₹450 — isVeg: true — isAvailable: true — todaysSpecial: true
- Smoked Salmon Bruschetta — starters — ₹520 — isVeg: false — isAvailable: true
- Pan-Seared Duck Breast — mains — ₹1200 — isVeg: false — isAvailable: true — chefSpecial: true
- Wild Mushroom Risotto — mains — ₹850 — isVeg: true — isAvailable: true
- Chocolate Fondant — desserts — ₹380 — isVeg: true — isAvailable: true — todaysSpecial: true
- Ember Negroni — cocktails — ₹420 — isVeg: true — isAvailable: true
- Passion Fruit Spritz — mocktails — ₹280 — isVeg: true — isAvailable: true
- Sauvignon Blanc (Glass) — wines — "Glass: ₹450 / Bottle: ₹2200" — isAvailable: true
- Macallan 12yr — whisky — "30ml: ₹650 / 60ml: ₹1200" — isAvailable: true
- (Add 20+ more items realistically)

### Customers (at least 15 records)
- Mix of visit counts (1 to 12), realistic names, 10-digit phone numbers, varied dates

### Reservations (at least 12 records)
- Mix of dates (past and upcoming), party sizes 2–10, various occasions (Anniversary, Birthday, Business Dinner, etc.)

### Coupons (5 records)
- EMBER20 — 20% OFF — On total bill — Valid till 30 Apr 2026 — show: true
- HAPPYHOUR — ₹150 Off — On all cocktails — Weekdays 5–8 PM — show: true
- WELCOME50 — ₹50 OFF — First visit — show: true
- WEEKEND25 — 25% OFF — Weekend food orders — show: true
- OAKPASS — 15% OFF — Loyalty members — show: false

### Carousel Images (5 records)
Use placeholder image URLs (e.g. https://images.unsplash.com/...) for a beautiful restaurant interior, bar, food, etc.

### Smart Picks (5 tabs)
- 🔥 Trending — key: trending — tagline: "What everyone's ordering" — isVisible: true — order: 1
- ⭐ Chef's Table — key: chef-special — tagline: "Curated by our head chef" — isVisible: true — order: 2
- 🌿 Veg Delights — key: veg — tagline: "Fresh plant-based picks" — isVisible: true — order: 3
- 🍹 Happy Hour — key: happy-hour — tagline: "Best drinks of the evening" — isVisible: true — order: 4
- 🎂 Today's Special — key: todays-special — tagline: "Limited availability daily" — isVisible: false — order: 5

### Social Links
- Instagram: https://instagram.com/emberoakrestaurant
- Facebook: https://facebook.com/emberandoak
- YouTube: https://youtube.com/@emberoak
- Google Review: https://g.page/r/example/review
- WhatsApp: https://wa.me/919876543210
- Email: mailto:hello@emberandoak.in
- Website: https://www.emberandoak.in

### Restaurant Info
- Location: Ember & Oak, BKC, Mumbai — show: true
- Contact: +91 98765 43210 — For Reservations — show: true
- Hours: 12:00 PM – 12:00 AM — Open All Days — show: true
- Instagram: @emberoakrestaurant — show: true
- WhatsApp: +91 98765 43210 — show: true

### Payment Details
- upiId: emberandoak@upi

### Logo
- url: https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=200 (or any clean logo placeholder)

### Welcome Screen
- buttonText: EXPLORE OUR MENU
- logoUrl: (same as logo above)

### Call Waiter
- called: false

---

## LAYOUT

### Structure
```
┌─────────────────────────────────────────────────────┐
│  SIDEBAR (fixed, left, collapsible)                 │
│  - Restaurant logo + name at top                    │
│  - Nav items with icons                             │
│  - Collapse toggle at bottom                        │
├─────────────────────────────────────────────────────┤
│  TOP HEADER (sticky)                                │
│  - Current section title                            │
│  - Restaurant name + status badge (Open)            │
│  - Search bar + notification bell icon              │
├─────────────────────────────────────────────────────┤
│  MAIN CONTENT AREA                                  │
│  - Renders the active section                       │
└─────────────────────────────────────────────────────┘
```

---

## SIDEBAR SECTIONS

| # | Label | Icon |
|---|-------|------|
| 1 | Overview | `LayoutDashboard` |
| 2 | Menu Items | `UtensilsCrossed` |
| 3 | Categories | `LayoutGrid` |
| 4 | Smart Picks | `Sparkles` |
| 5 | Carousel | `Images` |
| 6 | Coupons | `Tag` |
| 7 | Customers | `Users` |
| 8 | Reservations | `CalendarCheck` |
| 9 | Social Links | `Share2` |
| 10 | Welcome Screen | `Monitor` |
| 11 | Restaurant Info | `Info` |
| 12 | Payment Settings | `CreditCard` |
| 13 | Logo | `ImageIcon` |
| 14 | Call Waiter | `Bell` |

---

## SECTION DETAILS

### 1. Overview
Four large stat cards at the top:
- Total Menu Items (count from seed data) — amber accent — UtensilsCrossed icon
- Total Customers (count) — teal accent — Users icon
- Total Reservations (count) — violet accent — CalendarCheck icon
- Active Coupons (show: true count) — rose accent — Tag icon

Below the stat cards:
- **Bar chart** (recharts): Menu items count per category
- **Line chart** (recharts): Fictional customer visits over last 7 days (seed numbers)
- **Recent Reservations** mini-table: last 5 reservations
- **Recent Customers** mini-table: last 5 customers by join date

### 2. Menu Items
- Filter bar: search input + category dropdown (from seed categories) + toggle pills for isVeg / isAvailable / todaysSpecial / chefSpecial
- Item cards in a responsive grid (not just a table): image thumbnail, name, description (truncated), price, category badge, veg/non-veg dot, status badges
- Inline toggle switches for isAvailable, todaysSpecial, chefSpecial (updates local state)
- "Add Item" button opens a modal form (all fields, updates local state — no API)
- Edit button on each card opens pre-filled modal
- Delete button with confirmation dialog (removes from local state)

### 3. Categories
- Expandable accordion cards for each top-level category
- Each card shows subcategories as chips
- Toggle visibility switch per category and per subcategory (local state)
- Reorder with up/down arrow buttons
- Edit title inline

### 4. Smart Picks
- Cards for each smart pick with icon, label, tagline
- Toggle isVisible switch
- Reorder with up/down buttons
- Edit modal for label, icon, tagline

### 5. Carousel
- Image grid with thumbnails (use the seeded Unsplash URLs)
- Visible/hidden badge on each
- Toggle visible, delete (with confirm), reorder
- "Add Image" modal (URL + alt text)

### 6. Coupons
- Beautiful coupon cards (styled like real vouchers) with code, title, discount text, validity, tag badge
- Toggle show/hide switch on each
- Add / Edit / Delete with confirmation

### 7. Customers
- Paginated table (10 per page): Name, Phone, Visit Count (with a small bar/progress indicator), Last Visit, Joined
- Search by name or phone
- Date range filter
- Sort by visit count or join date
- "Export CSV" button (actually triggers a download of the seed data as CSV)

### 8. Reservations
- Full table: Name, Phone, Date, Time, Guests (with person icon + count), Occasion badge, Booked On
- Upcoming vs. past filter tabs
- Date filter
- Export CSV button

### 9. Social Links
- Icon-rich edit form — each row has the platform icon, platform name, and an editable input
- Save button shows a success toast (local state only)

### 10. Welcome Screen
- Live preview panel on the right showing how the welcome screen looks (button text + logo)
- Inputs on the left to edit logoUrl and buttonText
- Changes reflect instantly in the preview

### 11. Restaurant Info
- Card-based form: each info field (location, contact, hours, socials) is its own card with inputs for name, subtext, and a show/hide toggle switch

### 12. Payment Settings
- Clean centered card with UPI ID input and a generated QR code placeholder
- Save button with success toast

### 13. Logo
- Large centered logo preview with a subtle border
- Input below to update URL, preview refreshes on change
- Save button

### 14. Call Waiter
- Large status card: if `called: false` show a calm green "All Clear" state; if `called: true` show a pulsing red alert
- Toggle button to simulate a waiter call (updates local state)
- Reset button to clear

---

## IMPORTANT RULES

- All state changes (toggles, edits, adds, deletes) must work using React local state (useState) — they do not need to persist after page refresh since this is a demo
- Every interactive element must work — no broken buttons, no dead UI
- All forms must open, fill, and submit correctly (updating local state)
- Export CSV must actually trigger a file download using the seeded data
- The overview charts must render with realistic-looking fictional data
- Use smooth transitions between sidebar sections (Framer Motion AnimatePresence)
- The sidebar must be collapsible — collapsed shows only icons, expanded shows icons + labels
- Must be fully responsive — looks great on both laptop and large monitor
- No hardcoded "coming soon" or placeholder sections — every section must be complete and functional
