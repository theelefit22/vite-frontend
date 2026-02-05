# Architecture & Data Flow Diagrams

## 🏗️ Component Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    App.tsx                              │
│          (Main Router Configuration)                    │
└──────────────────┬──────────────────────────────────────┘
                   │
        ┌──────────┴──────────┬──────────────┐
        │                     │              │
        ▼                     ▼              ▼
    ┌─────────┐         ┌──────────┐   ┌─────────────┐
    │ AuthPage│         │Protected │   │ Other Pages │
    │.tsx    │         │ Route    │   │ (Community, │
    └────┬────┘         └──────────┘   │ AI Coach)   │
         │                             └─────────────┘
    ┌────┴────┬─────────┐
    │          │         │
    ▼          ▼         ▼
┌────────┐ ┌────────┐ ┌──────────────┐
│Login   │ │Signup  │ │CustomerAuth  │
│.tsx   │ │.tsx   │ │.tsx          │
└───┬────┘ └───┬────┘ └──────┬───────┘
    │          │             │
    └──────┬───┘             │
           │                 │
           ▼                 ▼
    ┌─────────────┐   ┌─────────────┐
    │ Firebase    │   │ Shopify     │
    │ Service     │   │ Validation  │
    └─────────────┘   └─────────────┘
           │                 │
           └─────────┬───────┘
                     ▼
            ┌─────────────────┐
            │  AuthContext    │
            │  (Global State) │
            └────────┬────────┘
                     │
           ┌─────────┴──────────┐
           │                    │
    ┌──────▼──────┐     ┌──────▼──────┐
    │  Dashboard  │     │   Redirect  │
    │   Routes    │     │   Handler   │
    └─────────────┘     └─────────────┘
```

---

## 📊 Authentication Data Flow

### Flow 1: Login

```
User Visits /auth
    ↓
[AuthPage.tsx shows Login.tsx]
    ↓
User enters: email + password
    ↓
[Login.tsx validates format]
    ├─ Email check (RFC 5321)
    ├─ Password min 6 chars
    └─ Non-empty fields
    ↓
[firebase.ts calls loginUser()]
    ├─ Firebase Auth
    ├─ Verify credentials
    └─ Get user profile
    ↓
[AuthContext updates global state]
    ├─ Set user data
    ├─ Set isAuthenticated = true
    └─ Set userType (user/expert/admin)
    ↓
[useNavigate() redirects]
    ├─ Check URL ?redirect=
    ├─ Use user type default
    └─ Navigate to dashboard
    ↓
✅ User logged in & redirected
```

### Flow 2: Signup

```
User Visits /auth, clicks "Sign up"
    ↓
[AuthPage.tsx shows Signup.tsx]
    ↓
User enters: first name + last name + email + password
    ↓
[Signup.tsx validates format]
    ├─ Name non-empty
    ├─ Email format (RFC 5321)
    ├─ Password strength (8+, upper, lower, num, special)
    ├─ Passwords match
    └─ Show strength indicator (0-5)
    ↓
[firebase.ts calls signup()]
    ├─ Firebase Auth Create User
    ├─ Firestore Create Profile
    ├─ Store userType = 'user'
    └─ Send welcome email
    ↓
[AuthContext updates global state]
    ├─ Set user data
    ├─ Set isAuthenticated = true
    └─ Set userType = 'user'
    ↓
[useNavigate() redirects]
    ├─ Check URL ?redirect=
    ├─ Default to /dashboard
    └─ Show success message
    ↓
✅ Account created & user logged in
```

### Flow 3: Shopify Customer Auth

```
Shopify API generates customer link
    ↓
Redirects to /auth/customer?email=...&customerId=...
    ↓
[CustomerAuth.tsx mounts]
    ↓
[Extract URL parameters]
    ├─ email = decodeURIComponent()
    └─ customerId = decodeURIComponent()
    ↓
[Validate with Shopify API]
    ├─ Check customer exists
    ├─ Verify email matches
    └─ Return customer data
    ↓
[Store in localStorage]
    ├─ shopifyCustomerEmail
    └─ shopifyCustomerId
    ↓
[Show success message]
    ↓
[Auto-redirect to /auth]
    └─ Add ?email=... parameter
    ↓
[Login.tsx loads with pre-filled email]
    ↓
User enters password
    ↓
[Firebase authenticates]
    ↓
[AuthContext updates state]
    ↓
✅ Shopify customer logged in
```

---

## 🔐 State Management Flow

```
┌─────────────────────────────────────────┐
│         AuthContext.tsx                 │
│    (Global Authentication State)        │
│                                         │
│  State Variables:                       │
│  ├─ user: FirebaseUser | null          │
│  ├─ loading: boolean                    │
│  ├─ error: string | null                │
│  ├─ userType: 'user' | 'expert' | null │
│  ├─ isAuthenticated: boolean            │
│  └─ isLoading: boolean                  │
│                                         │
│  Methods:                               │
│  ├─ login(email, password)              │
│  ├─ signup(email, password, type, data)│
│  ├─ logout()                            │
│  └─ checkAuth()                         │
└─────────────────────────────────────────┘
                    ▲
                    │ (useAuth hook)
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌───▼────┐    ┌────▼──┐    ┌──────▼───┐
│AuthPage│    │Login  │    │ Signup   │
│.tsx    │    │.tsx  │    │.tsx      │
└────────┘    └───────┘    └──────────┘
    │               │            │
    └───────────────┼────────────┘
                    │
             ┌──────▼────────┐
             │ Firebase      │
             │ Service Call  │
             └───────────────┘
                    │
             ┌──────▼────────────────┐
             │ Update Global State   │
             │ & Trigger Re-renders  │
             └───────────────────────┘
```

---

## 🎨 Component Hierarchy

```
App.tsx
├── Routes
│   ├── Route("/") → Index.tsx
│   ├── Route("/auth") → AuthPage.tsx
│   │   ├── Login.tsx (isLogin === true)
│   │   │   └── Input, Button, Alert components
│   │   └── Signup.tsx (isLogin === false)
│   │       └── Input, Button, Alert components
│   ├── Route("/auth/customer") → CustomerAuth.tsx
│   │   └── Alert, Loader components
│   │
│   └── Protected Routes
│       ├── Route("/dashboard") → Dashboard.tsx
│       ├── Route("/community") → Community.tsx
│       └── Route("/ai-coach") → AICoach.tsx
│
└── AuthProvider
    └── AuthContext (useAuth hook)
```

---

## 💾 Data Persistence

```
┌──────────────────────────────┐
│    Firebase Authentication   │
│    (Cloud Storage)           │
├──────────────────────────────┤
│ - User accounts              │
│ - Email/password hashes      │
│ - User profiles              │
│ - Preferences                │
└──────────┬───────────────────┘
           │
        (read/write)
           │
┌──────────▼────────────────────┐
│    AuthContext Global State   │
│    (Component Memory)         │
├───────────────────────────────┤
│ - Current user                │
│ - Authentication status       │
│ - User type                   │
│ - Loading state               │
└──────────┬────────────────────┘
           │
        (read)
           │
    ┌──────┴──────┐
    │             │
┌───▼───┐   ┌────▼────┐
│LocalUI│   │Protected │
│State  │   │Routes    │
└───────┘   └─────────┘

Optional: localStorage for tokens
└─ shopifyCustomerEmail
└─ shopifyCustomerId
```

---

## 🔄 Redux-style State Cycle

```
┌─────────────────────────────────────────┐
│ User Action (click Sign In button)      │
└────────────────┬────────────────────────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │ Component State Update     │
    │ (email, password, loading) │
    └────────────┬───────────────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │ Validation                 │
    │ (format check)             │
    └────────────┬───────────────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │ API Call                   │
    │ (firebase.loginUser())     │
    └────────────┬───────────────┘
                 │
            ┌────┴────┐
            │          │
        Success      Error
            │          │
            ▼          ▼
        ┌────┐    ┌─────────┐
        │OK  │    │setError │
        └─┬──┘    └─────────┘
          │
          ▼
    ┌──────────────────────┐
    │ AuthContext.setUser()│
    │ AuthContext.setAuth()│
    └─────────┬────────────┘
              │
              ▼
    ┌──────────────────────┐
    │ Component Re-renders │
    │ useAuth() returns    │
    │ updated state        │
    └─────────┬────────────┘
              │
              ▼
    ┌──────────────────────┐
    │ Navigation Effect    │
    │ useEffect() triggers │
    │ navigate('/dashboard')
    └──────────────────────┘
```

---

## 🛣️ Route Flow Diagram

```
                    Entry Point
                        │
                        ▼
    ┌───────────────────────────────────┐
    │      User navigates to /auth      │
    └───────────────┬───────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────┐
    │    AuthPage.tsx mounted           │
    │  (check if authenticated)         │
    └───────────────┬───────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
    No Auth               Yes - Auth
        │                       │
        ▼                       ▼
    Show Forms          ┌──────────────┐
    ├─ Login          │ Get userType │
    └─ Signup         └───────┬──────┘
        │                     │
        │              ┌──────┴────────┐
        │              │               │
        │              ▼               ▼
        │          ┌───────┐     ┌──────────┐
        │          │expert │     │user/admin│
        │          └───┬───┘     └────┬─────┘
        │              │              │
        │         Redirect to    Redirect to
        │         /expert-      /dashboard
        │         dashboard     or ?redirect
        │              │              │
        └──────────────┴──────────────┘
                       │
                       ▼
            ┌────────────────────────┐
            │  Dashboard/Feature Page│
            │  Protected Route       │
            └────────────────────────┘
```

---

## 📱 Mobile vs Desktop Layout

```
Desktop (>768px)                Mobile (<768px)
┌──────────────────────┐       ┌─────────────┐
│                      │       │             │
│    Gradient BG       │       │ Gradient BG │
│                      │       │             │
│  ┌──────────────┐    │       │ ┌─────────┐ │
│  │              │    │       │ │         │ │
│  │  ELEFIT      │    │       │ │ ELEFIT  │ │
│  │  Logo        │    │       │ │ Logo    │ │
│  │              │    │       │ │         │ │
│  ├──────────────┤    │       │ ├─────────┤ │
│  │ Login Form   │    │       │ │Login    │ │
│  │              │    │       │ │Form     │ │
│  │ [Email]      │    │       │ │[Email] │ │
│  │ [Password]   │    │       │ │[Pass]  │ │
│  │ [Sign In]    │    │       │ │[Sign]  │ │
│  │              │    │       │ │        │ │
│  └──────────────┘    │       │ └─────────┘ │
│                      │       │             │
└──────────────────────┘       └─────────────┘

All components use:
- Responsive padding (p-4 to p-8)
- Flexible max-widths (max-w-md)
- Mobile-first Tailwind classes
- Touch-friendly buttons (h-10 min)
- Readable font sizes (text-sm to text-2xl)
```

---

## 🎯 Error Handling Flow

```
User submits form
    │
    ▼
┌─────────────────────┐
│ Client Validation   │
└──────┬──────────────┘
       │
       ├─ Email format
       ├─ Password length
       └─ Required fields
       │
       ├─ VALID ──→ Continue
       │
       └─ INVALID ──→ Show error message
                      ↓
                    Stop (no API call)
       │
       ▼
┌──────────────────────┐
│ Firebase Call        │
└──────┬───────────────┘
       │
       ├─ SUCCESS
       │   └─ Update state
       │   └─ Navigate
       │
       └─ ERROR
           └─ Get error code
               │
               ├─ auth/user-not-found
               ├─ auth/wrong-password
               ├─ auth/invalid-email
               ├─ auth/email-already-in-use
               └─ ... 7 more codes
               │
               └─ Map to user-friendly message
                  └─ Display in Alert component
```

---

## 🏅 Component Dependencies

```
AuthPage.tsx depends on:
├── useNavigate() [react-router-dom]
├── useSearchParams() [react-router-dom]
├── useAuth() [contexts/AuthContext]
├── Login.tsx [./Login]
├── Signup.tsx [./Signup]
├── Alert [ui/alert]
├── AlertDescription [ui/alert]
├── CheckCircle2, AlertCircle [lucide-react]
└── CSS classes [Tailwind]

Login.tsx depends on:
├── useNavigate() [react-router-dom]
├── useSearchParams() [react-router-dom]
├── useAuth() [contexts/AuthContext]
├── Button [ui/button]
├── Input [ui/input]
├── Card [ui/card]
├── Alert [ui/alert]
├── Eye, EyeOff [lucide-react]
├── AlertCircle, CheckCircle2 [lucide-react]
├── cn() [lib/utils]
└── CSS classes [Tailwind]

Signup.tsx depends on:
├── useState [react]
├── useNavigate() [react-router-dom]
├── useAuth() [contexts/AuthContext]
├── Button, Input, Card [ui/*]
├── Alert [ui/alert]
├── Eye, EyeOff, AlertCircle, CheckCircle2 [lucide-react]
└── CSS classes [Tailwind]

CustomerAuth.tsx depends on:
├── useState, useEffect [react]
├── useNavigate() [react-router-dom]
├── useSearchParams() [react-router-dom]
├── Card [ui/card]
├── Alert, AlertDescription [ui/alert]
├── CheckCircle2, AlertCircle, Loader [lucide-react]
├── loginUser [shared/firebase]
└── CSS classes [Tailwind]
```

---

## 🔄 Unidirectional Data Flow

```
User Input
    │
    ▼
Component State
    │
    ├─ email
    ├─ password
    ├─ loading
    └─ error
    │
    ▼
Event Handler
    │
    ├─ Validate
    ├─ Call Service
    └─ Update State
    │
    ▼
Firebase Service
    │
    ├─ Authenticate
    └─ Return User
    │
    ▼
AuthContext
    │
    ├─ Update Global
    ├─ Trigger Hooks
    └─ Re-render
    │
    ▼
Component Re-render
    │
    ├─ Show loading/success/error
    ├─ Update DOM
    └─ Navigate if needed
    │
    ▼
User Sees Update
```

---

**All diagrams created: February 2, 2026** ✅
