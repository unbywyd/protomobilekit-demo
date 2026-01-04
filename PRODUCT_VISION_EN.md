# FlowCraft - SaaS Platform for Creating and Testing Mobile Flows

## Overview

**FlowCraft** is a no-code SaaS platform for creating, testing, and demonstrating mobile applications through interactive flows. Users describe their app idea, AI helps structure the project, generates screens and roles, and then users assemble flows from ready-made components, record macros, and share results.

**Key Value:** Transform an idea into an interactive prototype in minutes, without writing code.

---

## Problems We Solve

### 1. Gap Between Idea and Prototype
- **Pain:** To demonstrate an app idea, you either draw in Figma (static) or write code (slow).
- **Solution:** AI assistant helps structure the idea → automatically generates screens → user assembles interactive flow.

### 2. Difficulty Demonstrating Multi-Role Applications
- **Pain:** A delivery service = 3 apps (customer, courier, admin). Showing their interaction in Figma is impossible.
- **Solution:** Multiple devices on one canvas, synchronized data, simultaneous demonstration of all roles.

### 3. Reproducibility and Sharing
- **Pain:** "Watch how I went through this flow" = screencast or Loom. Can't repeat, can't modify.
- **Solution:** Recorded macros can be replayed, paused, shared via link — recipients see the same interactive experience.

### 4. Documenting Flows for Teams
- **Pain:** User journey descriptions in Confluence/Notion are text + screenshots. Gets outdated, not interactive.
- **Solution:** Living flows as documentation. Links are always up-to-date, you can "walk through" the flow yourself.

---

## Target Audience

| Segment | Task | Value |
|---------|------|-------|
| **Product Managers** | Communicate ideas to team and stakeholders | Interactive prototype instead of presentations |
| **UX Designers** | Test user flows before development | Fast iteration without code |
| **Startup Founders** | Validate ideas with potential customers | MVP in hours, not weeks |
| **Development Teams** | App behavior specification | Executable documentation |
| **Sales/Pre-sales** | Product demos for clients | Customizable demo scenarios |

---

## User Journey (From Idea to Sharing)

### Stage 1: Project Creation

```
┌─────────────────────────────────────────────────────────────┐
│                    New Project                              │
├─────────────────────────────────────────────────────────────┤
│  Name: [Delivery App                              ]         │
│  Description: [Food delivery service with couriers ]        │
│  Industry: [E-commerce / Delivery          ▼]               │
│                                                             │
│  [Continue →]                                               │
└─────────────────────────────────────────────────────────────┘
```

**Fields:**
- Project name
- Brief description
- Industry/category (for AI suggestions)
- Tags (optional)

### Stage 2: AI Challenge (Idea Structuring)

User goes through an interactive dialogue with AI that:
1. Asks clarifying questions
2. Identifies roles and entities
3. Defines key flows

```
┌─────────────────────────────────────────────────────────────┐
│  🤖 AI Assistant                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tell me more about your application.                       │
│  What types of users will be using it?                      │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Customers order food, couriers deliver,             │   │
│  │ restaurants prepare, admins manage                  │   │
│  └─────────────────────────────────────────────────────┘   │
│  [Send]                                                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  🤖 Got it! Let's define the main flows.                   │
│                                                             │
│  For the "Customer" role — what's the main use case?       │
│                                                             │
│  ○ Browse catalog and order                                │
│  ○ Track delivery                                          │
│  ○ Leave a review                                          │
│  ○ Other: [_______________]                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Challenge Result:**
- List of roles (Customer, Courier, Restaurant, Admin)
- List of entities (Order, Product, User, Restaurant)
- Suggested screens for each role
- Suggested flows (Order Flow, Delivery Flow, etc.)

### Stage 3: Roles and Users Setup

```
┌─────────────────────────────────────────────────────────────┐
│  Roles and Users                                            │
├──────────────────────┬──────────────────────────────────────┤
│  Roles               │  Test Users                          │
│  ────────────────    │  ────────────────────────            │
│  ☑ Customer          │  👤 Alice Smith (Customer)           │
│    └ premium, regular│     +44 7911 123456                  │
│  ☑ Courier           │  👤 Bob Driver (Courier)             │
│    └ walker, driver  │     +44 7911 234567                  │
│  ☑ Restaurant        │  👤 Mario's Pizza (Restaurant)       │
│  ☑ Admin             │     +44 7911 345678                  │
│                      │  👤 Admin User (Admin)               │
│  [+ Add Role]        │  [+ Add User]                        │
└──────────────────────┴──────────────────────────────────────┘
```

**Capabilities:**
- Create roles with sub-types (premium/regular customer)
- Create test users for each role
- Visual avatars and identifiers
- Quick Switch between users during testing

### Stage 4: Canvas Configuration

Define which "apps" (devices) will be on the canvas:

```
┌─────────────────────────────────────────────────────────────┐
│  Project Canvases                                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📱 Customer App                                            │
│     Role: Customer                                          │
│     Device: iPhone 14                                       │
│     [Configure Screens]                                     │
│                                                             │
│  📱 Courier App                                             │
│     Role: Courier                                           │
│     Device: iPhone 14                                       │
│     [Configure Screens]                                     │
│                                                             │
│  💻 Admin Dashboard                                         │
│     Role: Admin                                             │
│     Device: Desktop Browser                                 │
│     [Configure Screens]                                     │
│                                                             │
│  [+ Add Application]                                        │
│                                                             │
│  ─────────────────────────────────────────────              │
│  Canvas Layout:                                             │
│  ○ Row (side by side)                                       │
│  ○ Grid 2x2                                                 │
│  ● Freeform (drag & drop)                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Stage 5: Screen Generation and Setup

AI generates screens based on the Challenge. Users can:
- Accept generated screens
- Edit via visual editor
- Add custom screens

```
┌─────────────────────────────────────────────────────────────┐
│  Screens: Customer App                                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │  Home   │ │Catalog  │ │  Cart   │ │Checkout │           │
│  │         │ │         │ │         │ │         │           │
│  │ 🏠      │ │ 📋      │ │ 🛒      │ │ 💳      │           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│                                                             │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                       │
│  │ Order   │ │Tracking │ │ Profile │                       │
│  │ Status  │ │         │ │         │                       │
│  │ 📦      │ │ 🗺️      │ │ 👤      │                       │
│  └─────────┘ └─────────┘ └─────────┘                       │
│                                                             │
│  [+ Add Screen]  [🤖 Generate More]                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Each screen contains:**
- Name and description
- UI components (from library)
- Data bindings (entities)
- Transitions to other screens
- Display conditions (role-based)

### Stage 6: Flow Assembly

A flow is a sequence of steps connecting screens across different apps:

```
┌─────────────────────────────────────────────────────────────┐
│  Flow: Order Delivery                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Step 1: Customer Places Order                         │  │
│  │ App: Customer App → Screen: Checkout                  │  │
│  │ Task: ☐ Fill delivery address                        │  │
│  │ Task: ☐ Select payment method                        │  │
│  │ Task: ☐ Confirm order                                │  │
│  │ Condition: → Step 2 when Order.status = 'placed'     │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│                           ▼                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Step 2: Restaurant Accepts                            │  │
│  │ App: Restaurant App → Screen: Orders                  │  │
│  │ Task: ☐ Review order                                 │  │
│  │ Task: ☐ Accept order                                 │  │
│  │ Auto-highlight: Restaurant device                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│                           ▼                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Step 3: Courier Picks Up                              │  │
│  │ App: Courier App → Screen: Active Order               │  │
│  │ ...                                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  [+ Add Step]  [🔀 Add Branch]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Flow Capabilities:**
- Linear steps
- Conditional branches
- Parallel steps (multiple devices simultaneously)
- Gating: block transition until conditions are met
- Auto-navigation: automatic transition to the right screen
- Device highlighting: highlight active device

### Stage 7: Running and Recording Macros

```
┌─────────────────────────────────────────────────────────────┐
│  Flow Runner                                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  [⏮] [⏪] [▶ Play] [⏸] [⏩] [⏭]  Speed: [1x ▼]     │   │
│  │                                                      │   │
│  │  ═══════════●══════════════════════════════════════ │   │
│  │  Step 2 of 8                              02:34     │   │
│  │                                                      │   │
│  │  [🔴 Record Macro]  [📁 Load Macro]                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │    📱             │  │    📱             │               │
│  │   Customer        │  │   Courier         │               │
│  │   ┌──────────┐   │  │   ┌──────────┐   │               │
│  │   │          │   │  │   │          │   │               │
│  │   │ Tracking │   │  │   │  Active  │   │               │
│  │   │   Map    │   │  │   │  Order   │   │               │
│  │   │    🚗    │   │  │   │    📦    │   │               │
│  │   │          │   │  │   │          │   │               │
│  │   └──────────┘   │  │   └──────────┘   │               │
│  │                  │  │  ◀── ACTIVE      │               │
│  └──────────────────┘  └──────────────────┘                │
│                                                             │
│  Current Step: Courier picks up order                       │
│  ☑ Arrived at restaurant                                   │
│  ☐ Confirm pickup                                          │
│  ☐ Start delivery                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Recording Mode:**
- Captures all user actions
- Records timings
- Saves data changes (diff)
- Allows voice/text annotations

**Playback:**
- Play/Pause/Step
- Speed control (0.5x, 1x, 2x)
- Seek to specific step
- Interactive mode (can intervene during playback)

---

## Export and Sharing

### Export Formats

| Format | Description | Use Case |
|--------|-------------|----------|
| **Share Link** | Interactive link (read-only) | Show stakeholders |
| **Embed Code** | Iframe for website embedding | Documentation, landing page |
| **Macro File** | JSON session recording | Send to colleague for replay |
| **Flow Config** | JSON flow schema | Import into another project |
| **Screen Pack** | Screen set for reuse | Team component library |
| **Video Export** | MP4/GIF walkthrough recording | Presentations, social media |

### Sharing a Macro

```
┌─────────────────────────────────────────────────────────────┐
│  Share Macro                                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📎 View Link:                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ https://flowcraft.io/m/abc123xyz                    │ 📋│
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Access Settings:                                           │
│  ○ Public (anyone with link)                               │
│  ● Link-only (only those with link)                        │
│  ○ Private (project members only)                          │
│                                                             │
│  Permissions:                                               │
│  ☑ View                                                    │
│  ☐ Playback with pause                                     │
│  ☐ Interactive intervention                                │
│  ☐ Download                                                │
│                                                             │
│  Expiration: [Never ▼]                                     │
│                                                             │
│  [Copy Link]  [Send via Email]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Technical Architecture

### Rendering: WebGL/Canvas vs HTML

**Recommendation: Hybrid Approach**

| Component | Technology | Reason |
|-----------|------------|--------|
| **Device Frame** | HTML/CSS | Simplicity, accessibility, responsive |
| **Screen Content** | HTML/React | Interactivity, accessibility |
| **Canvas Layout** | HTML + CSS Grid/Flex | Easy drag & drop |
| **Recording Overlay** | Canvas 2D | Drawing markers, annotations |
| **Playback Timeline** | Canvas 2D / WebGL | Animation performance |
| **Export to Video** | Canvas → MediaRecorder | MP4/GIF generation |

**Why not pure WebGL:**
- Accessibility: screen readers don't work with WebGL
- Interactivity: buttons, inputs are harder to implement
- SEO/Embedding: HTML indexes and embeds better
- Development time: HTML components already exist

**Where WebGL is justified:**
- Very complex timeline animations
- Simultaneous rendering of 10+ devices
- Effects (blur, transitions) during playback

### Data Formats

#### Project Config
```json
{
  "id": "proj_abc123",
  "name": "Delivery App",
  "description": "Food delivery service",
  "roles": [
    {
      "id": "customer",
      "name": "Customer",
      "subTypes": ["regular", "premium"]
    },
    {
      "id": "courier",
      "name": "Courier",
      "subTypes": ["walker", "driver"]
    }
  ],
  "entities": [
    {
      "id": "order",
      "name": "Order",
      "fields": ["id", "status", "customerId", "courierId", "items", "total"]
    }
  ],
  "testUsers": [
    {
      "id": "alice",
      "name": "Alice Smith",
      "role": "customer",
      "subType": "premium",
      "avatar": "...",
      "credentials": { "phone": "+44..." }
    }
  ],
  "apps": [
    {
      "id": "customer-app",
      "name": "Customer App",
      "role": "customer",
      "device": "iphone-14",
      "screens": ["home", "catalog", "cart", "checkout", "tracking"]
    }
  ],
  "canvas": {
    "layout": "freeform",
    "devices": [
      { "appId": "customer-app", "position": { "x": 0, "y": 0 } },
      { "appId": "courier-app", "position": { "x": 420, "y": 0 } }
    ]
  }
}
```

#### Screen Config
```json
{
  "id": "checkout",
  "appId": "customer-app",
  "name": "Checkout",
  "components": [
    {
      "type": "Header",
      "props": { "title": "Checkout" }
    },
    {
      "type": "AddressInput",
      "props": { "bind": "order.address" }
    },
    {
      "type": "PaymentSelector",
      "props": { "bind": "order.paymentMethod" }
    },
    {
      "type": "Button",
      "props": {
        "label": "Place Order",
        "action": {
          "type": "updateEntity",
          "entity": "order",
          "field": "status",
          "value": "placed"
        }
      }
    }
  ],
  "transitions": [
    {
      "trigger": "order.status === 'placed'",
      "target": "order-confirmation"
    }
  ]
}
```

#### Flow Config
```json
{
  "id": "order-delivery-flow",
  "name": "Order Delivery",
  "steps": [
    {
      "id": "step-1",
      "name": "Customer Places Order",
      "app": "customer-app",
      "screen": "checkout",
      "tasks": [
        { "id": "t1", "text": "Fill delivery address" },
        { "id": "t2", "text": "Select payment method" },
        { "id": "t3", "text": "Confirm order" }
      ],
      "gating": {
        "condition": "order.status === 'placed'",
        "next": "step-2"
      }
    },
    {
      "id": "step-2",
      "name": "Restaurant Accepts",
      "app": "restaurant-app",
      "screen": "orders",
      "highlightDevice": true,
      "tasks": [...]
    }
  ],
  "branching": [
    {
      "after": "step-3",
      "condition": "order.paymentMethod === 'cash'",
      "trueNext": "step-4a",
      "falseNext": "step-4b"
    }
  ]
}
```

#### Macro (Recording)
```json
{
  "id": "macro_xyz789",
  "flowId": "order-delivery-flow",
  "createdAt": "2024-01-15T10:30:00Z",
  "duration": 180000,
  "events": [
    {
      "timestamp": 0,
      "type": "flow:start",
      "stepId": "step-1"
    },
    {
      "timestamp": 2500,
      "type": "navigation",
      "app": "customer-app",
      "screen": "checkout"
    },
    {
      "timestamp": 5000,
      "type": "input",
      "app": "customer-app",
      "target": "address-input",
      "value": "123 Main St"
    },
    {
      "timestamp": 8000,
      "type": "entity:update",
      "entity": "order",
      "diff": { "address": "123 Main St" }
    },
    {
      "timestamp": 15000,
      "type": "task:complete",
      "stepId": "step-1",
      "taskId": "t1"
    },
    {
      "timestamp": 45000,
      "type": "step:complete",
      "stepId": "step-1",
      "nextStep": "step-2"
    },
    {
      "timestamp": 45100,
      "type": "device:highlight",
      "app": "restaurant-app"
    }
  ],
  "annotations": [
    {
      "timestamp": 10000,
      "type": "text",
      "content": "Note the address validation"
    }
  ],
  "snapshot": {
    "entities": { ... },
    "auth": { ... }
  }
}
```

---

## Scenarios and Snapshots

### Snapshot = System State at a Point in Time

```json
{
  "id": "snapshot_001",
  "name": "Order ready for delivery",
  "createdAt": "2024-01-15T10:30:00Z",
  "state": {
    "entities": {
      "orders": [
        { "id": "ord_1", "status": "ready", "customerId": "alice", "courierId": "bob" }
      ],
      "users": [...]
    },
    "auth": {
      "customer-app": { "userId": "alice" },
      "courier-app": { "userId": "bob" }
    },
    "navigation": {
      "customer-app": { "screen": "tracking" },
      "courier-app": { "screen": "pickup" }
    },
    "flow": {
      "activeFlow": "order-delivery-flow",
      "currentStep": "step-3",
      "completedTasks": ["t1", "t2", "t3", "t4", "t5"]
    }
  }
}
```

**Operations:**
- **Save Snapshot** — save current state
- **Load Snapshot** — restore state
- **Export Snapshot** — download JSON
- **Import Snapshot** — upload from file
- **Share Snapshot** — link for colleagues

### Determinism

For reproducibility:
- Faker seed is fixed in snapshot
- Timestamp-based IDs replaced with deterministic ones
- Random data generated from seed

---

## Platform UI/UX

### Main Screen (Dashboard)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  FlowCraft                                    🔔  👤 John Doe  [Pro Plan]   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  My Projects                                              [+ New Project]   │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │  🍕             │  │  🚗             │  │  🏥             │             │
│  │  Delivery App   │  │  Taxi Clone     │  │  Health App     │             │
│  │                 │  │                 │  │                 │             │
│  │  3 apps · 12 fl │  │  2 apps · 5 fl  │  │  1 app · 3 fl   │             │
│  │  Updated 2h ago │  │  Updated 1d ago │  │  Updated 3d ago │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  Recent Macros                                           [All Macros →]    │
│                                                                             │
│  📹 Order Flow Demo          Delivery App       15 min ago        [▶]      │
│  📹 Payment Test             Delivery App       2 hours ago       [▶]      │
│  📹 Onboarding Review        Health App         yesterday         [▶]      │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  Templates                                               [All Templates →] │
│                                                                             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐               │
│  │ Delivery   │ │ E-commerce │ │ Social     │ │ Fintech    │               │
│  │ 🚚         │ │ 🛒         │ │ 💬         │ │ 💳         │               │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Project Workspace

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Projects   Delivery App                    [Preview] [Share] [Export]   │
├────────────────────┬────────────────────────────────────────────────────────┤
│  📁 Structure      │                                                        │
│  ├─ 📱 Apps        │    ┌──────────────┐       ┌──────────────┐            │
│  │  ├─ Customer    │    │   Customer   │       │   Courier    │            │
│  │  ├─ Courier     │    │   ┌──────┐   │       │   ┌──────┐   │            │
│  │  └─ Restaurant  │    │   │      │   │       │   │      │   │            │
│  ├─ 👥 Roles       │    │   │ Home │   │       │   │Active│   │            │
│  ├─ 📊 Entities    │    │   │      │   │       │   │Orders│   │            │
│  ├─ 🔄 Flows       │    │   └──────┘   │       │   └──────┘   │            │
│  │  ├─ Order Flow  │    │              │       │              │            │
│  │  └─ Refund Flow │    └──────────────┘       └──────────────┘            │
│  └─ 📹 Macros      │                                                        │
│                    │    ───────────────────────────────────────             │
│  ──────────────    │    Flow: Order Delivery                                │
│  🛠 DevTools       │    Step 2/8: Restaurant accepts                        │
│  ├─ State          │    [⏮] [▶] [⏭]  ●●●●●○○○                              │
│  ├─ Events         │                                                        │
│  └─ Auth           │                                                        │
│                    │                                                        │
└────────────────────┴────────────────────────────────────────────────────────┘
```

---

## Billing and Plans

### Free
- 1 project
- 2 apps on canvas
- 3 flows
- 5 macros (stored for 7 days)
- Share links (read-only)
- FlowCraft watermark

### Pro ($19/month)
- 10 projects
- Unlimited apps
- Unlimited flows
- Unlimited macros
- Export (JSON, video)
- Custom branding
- Priority support

### Team ($49/month for 5 users)
- Everything in Pro
- Team workspace
- Comments and annotations
- Flow versioning
- SSO integration
- API access

### Enterprise (contact us)
- Everything in Team
- On-premise deployment
- Custom integrations
- Dedicated support
- SLA

---

## Roadmap

### MVP (v0.1) — Core Product
- [ ] Project creation (basic fields)
- [ ] AI Challenge (structuring interview)
- [ ] Role and entity generation
- [ ] Apps/devices configuration
- [ ] Screen generation (basic components)
- [ ] Linear Flow assembly
- [ ] Flow Runner (Play/Pause/Step)
- [ ] Save/Load Snapshot
- [ ] Export/Import JSON

### v0.2 — Recording and Playback
- [ ] Macro recording
- [ ] Playback with timeline
- [ ] Export macro as JSON
- [ ] Share link (read-only preview)

### v0.3 — Canvas UX
- [ ] Drag & drop devices
- [ ] Zoom/Pan canvas
- [ ] Save layout
- [ ] Focus mode (expand single device)

### v0.4 — Advanced Flows
- [ ] Branching (conditional paths)
- [ ] Parallel steps
- [ ] Gating (condition-based blocking)
- [ ] Auto-highlight active device

### v0.5 — Sharing and Collaboration
- [ ] Public share links
- [ ] Embed code
- [ ] Comments on steps
- [ ] Video export (MP4/GIF)

### v1.0 — Production Release
- [ ] Billing and subscriptions
- [ ] Team workspaces
- [ ] Template library
- [ ] API for integrations
- [ ] Mobile preview (QR code for phone viewing)

### v2.0 — Enterprise Features
- [ ] Project versioning
- [ ] Audit log
- [ ] SSO/SAML
- [ ] On-premise deployment
- [ ] Plugin system

---

## Competitive Advantages

| Competitor | Their Focus | Our Difference |
|------------|-------------|----------------|
| **Figma** | Static design | Interactive flows, multi-app |
| **Framer** | Animations, landing pages | Multi-role, data-driven |
| **ProtoPie** | Complex prototypes | AI generation, macros |
| **Maze** | Testing | Creation + demonstration |
| **Loom** | Video recordings | Interactive playback |

**FlowCraft Uniqueness:**
1. **Multi-app on one canvas** — no one shows 3 apps simultaneously
2. **AI-generated structure** — from idea to prototype in minutes
3. **Recordable macros** — not video, but interactive sessions
4. **Data-driven** — real entities and relationships, not just images

---

## Tech Stack (Recommendation)

### Frontend
- **React** + TypeScript
- **Zustand** for state management
- **TailwindCSS** for styling
- **Canvas 2D** for timeline/overlays
- **MediaRecorder API** for video export

### Backend
- **Node.js** + Fastify
- **PostgreSQL** for data
- **Redis** for cache/sessions
- **S3** for macro/video storage
- **WebSocket** for real-time preview

### AI
- **Claude API** for Challenge and generation
- **Structured outputs** for configs

### Infrastructure
- **Vercel/Railway** for deployment
- **Cloudflare** for CDN
- **Stripe** for billing

---

## Conclusion

FlowCraft solves a real problem: showing how an app works (especially multi-role) without writing code. Key innovations:

1. **AI-driven onboarding** — from description to structure in 5 minutes
2. **Multi-device canvas** — all roles on one screen
3. **Executable flows** — not a checklist, but guided walkthrough
4. **Macro recording** — interactive recordings instead of video
5. **No-code** — everything via UI, config export

The product bridges the gap between "idea in mind" and "interactive prototype," which currently requires either a designer + developer or weeks of solo work.
