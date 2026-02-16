# Firebase & Integrations Migration Guide

## ✅ Migration Complete

All Firebase, Shopify, OpenAI, and email services from the old React app have been successfully migrated to the new Vite React application.

---

## 📁 New File Structure

```
client/
├── contexts/
│   └── AuthContext.tsx          # Authentication context & hook
├── components/
│   ├── ProtectedRoute.tsx       # Route guards and auth components
│   └── [other components]
└── pages/
    └── [all pages]

shared/
├── firebase.ts                  # Firebase initialization & auth functions
├── aicoachService.ts            # AI Coach with OpenAI integration
├── bookingService.ts            # Booking system
├── emailService.ts              # EmailJS notifications
├── shopifyService.ts            # Shopify e-commerce integration
└── storageService.ts            # File upload & storage handling
```

---

## 🔧 Installation & Setup

### 1. **Environment Variables**

Create a `.env` file in the root directory:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Shopify Configuration
VITE_SHOPIFY_STORE_DOMAIN=your_shopify_domain
VITE_SHOPIFY_STORE_FRONT_ACCESS_TOKEN=your_shopify_token

# OpenAI Configuration
VITE_OPENAI_API_KEY=your_openai_key

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Google Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CALENDAR_API_KEY=your_calendar_api_key

# App Configuration
VITE_APP_ENV=development
VITE_APP_URL=http://localhost:8080
```

### 2. **Install Dependencies**

```bash
npm install firebase openai emailjs-com axios date-fns
```

### 3. **Update App.tsx**

The main `App.tsx` now includes:
- `AuthProvider` wrapper for global auth state
- Protected routes for authenticated pages
- Route guards for role-based access

---

## 🔐 Authentication System

### Using the Auth Hook

```typescript
import { useAuth } from "@/contexts/AuthContext";

const MyComponent = () => {
  const { user, isAuthenticated, userType, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.email}</p>
          <button onClick={() => logout()}>Logout</button>
        </>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};
```

### Route Protection

**Protect entire routes:**

```typescript
<Route
  path="/protected"
  element={
    <ProtectedRoute>
      <MyPage />
    </ProtectedRoute>
  }
/>
```

**Protect by user role:**

```typescript
<Route
  path="/expert-only"
  element={
    <ExpertRoute>
      <ExpertDashboard />
    </ExpertRoute>
  }
/>
```

### Authentication Functions

**Signup:**

```typescript
import { useAuth } from "@/contexts/AuthContext";

const SignupForm = () => {
  const { signup } = useAuth();

  const handleSignup = async () => {
    try {
      await signup(
        "user@example.com",
        "password123",
        "customer",
        "John",
        "Doe"
      );
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
};
```

**Login:**

```typescript
const { login } = useAuth();

const handleLogin = async () => {
  try {
    await login("user@example.com", "password123");
  } catch (error) {
    console.error("Login failed:", error);
  }
};
```

**Logout:**

```typescript
const { logout } = useAuth();

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
```

---

## 🏋️ AI Coach Service

### Calculate User Metrics

```typescript
import {
  calculateBMR,
  calculateDailyCalories,
  calculateMacros,
} from "@shared/aicoachService";

const userMetrics = {
  age: 30,
  height: 180,
  weight: 85,
  gender: "male",
  activityLevel: "moderate",
  targetWeight: 75,
  targetTimeline: 12,
  workoutDays: 4,
  dietaryPreferences: ["vegetarian"],
};

const bmr = calculateBMR(
  userMetrics.age,
  userMetrics.height,
  userMetrics.weight,
  userMetrics.gender
);

const dailyCalories = calculateDailyCalories(bmr, userMetrics.activityLevel);

const macros = calculateMacros(dailyCalories);
```

### Generate AI Fitness Plan

```typescript
import { generateFitnessPlan, saveCoachPlan } from "@shared/aicoachService";

const generatePlan = async (userId: string) => {
  try {
    const plan = await generateFitnessPlan(userMetrics);

    // Save to Firebase
    await saveCoachPlan(userId, userMetrics, plan);

    console.log("Plan generated:", plan);
    // plan.dailyCalories
    // plan.macros
    // plan.meals[]
    // plan.workouts[]
  } catch (error) {
    console.error("Failed to generate plan:", error);
  }
};
```

### Retrieve Plan History

```typescript
import { getCoachHistory } from "@shared/aicoachService";

const fetchHistory = async (userId: string) => {
  try {
    const history = await getCoachHistory(userId);
    console.log("Plan history:", history);
  } catch (error) {
    console.error("Failed to fetch history:", error);
  }
};
```

---

## 📧 Email Notifications

### Send Welcome Email

```typescript
import { sendWelcomeEmail } from "@shared/emailService";

await sendWelcomeEmail("user@example.com", "John");
```

### Send Booking Confirmation

```typescript
import { sendBookingConfirmation } from "@shared/emailService";

await sendBookingConfirmation(
  "customer@example.com",
  "John Doe",
  "Dr. Expert",
  "Date: Feb 10, 2024 | Time: 2:00 PM | Duration: 60 minutes"
);
```

### Custom Email

```typescript
import { sendEmail } from "@shared/emailService";

await sendEmail(
  "service_id",
  "template_id",
  {
    to_email: "user@example.com",
    subject: "Custom Email",
    message: "Your custom message here",
  }
);
```

---

## 📅 Booking System

### Create Booking

```typescript
import { createNewBooking, checkExpertAvailability } from "@shared/bookingService";

const handleBooking = async (customerId: string, expertId: string) => {
  try {
    // Check availability first
    const isAvailable = await checkExpertAvailability(
      expertId,
      new Date("2024-02-10"),
      "14:00",
      60
    );

    if (isAvailable) {
      const bookingId = await createNewBooking({
        customerId,
        expertId,
        date: new Date("2024-02-10"),
        time: "14:00",
        duration: 60,
        notes: "Initial consultation",
      });
      console.log("Booking created:", bookingId);
    }
  } catch (error) {
    console.error("Booking failed:", error);
  }
};
```

### Get Available Slots

```typescript
import { getAvailableSlots } from "@shared/bookingService";

const showAvailableSlots = async (expertId: string) => {
  try {
    const slots = await getAvailableSlots(
      expertId,
      new Date("2024-02-10"),
      60
    );
    console.log("Available slots:", slots);
    // Returns: ["09:00", "09:30", "10:00", ...]
  } catch (error) {
    console.error("Failed to fetch slots:", error);
  }
};
```

### Manage Bookings

```typescript
import {
  fetchCustomerBookings,
  updateBookingStatus,
  cancelBooking,
} from "@shared/bookingService";

// Get all bookings
const bookings = await fetchCustomerBookings(customerId);

// Update status
await updateBookingStatus(bookingId, "confirmed");

// Cancel booking
await cancelBooking(bookingId);
```

---

## 🛍️ Shopify Integration

### Create Customer

```typescript
import { createShopifyCustomer } from "@shared/shopifyService";

const customer = await createShopifyCustomer(
  "user@example.com",
  "John",
  "Doe",
  "+1234567890"
);
```

### Search Products

```typescript
import { getShopifyProducts, searchShopifyProducts } from "@shared/shopifyService";

// Get all products
const products = await getShopifyProducts(20);

// Search products
const results = await searchShopifyProducts("protein powder", 10);

// Access product data
products.forEach((product) => {
  console.log(product.title);
  console.log(product.priceRange.minVariantPrice.amount);
  console.log(product.images[0]?.url);
});
```

### Create Checkout

```typescript
import { createShopifyCheckout } from "@shared/shopifyService";

const checkout = await createShopifyCheckout([
  {
    variantId: "gid://shopify/ProductVariant/12345",
    quantity: 2,
  },
]);

// Redirect user to checkout
window.location.href = checkout.webUrl;
```

---

## 💾 Profile Image Upload

### Update Profile Image

```typescript
import { updateProfileImage } from "@shared/storageService";

const handleImageUpload = async (userId: string, file: File) => {
  try {
    const imageUrl = await updateProfileImage(userId, file);
    console.log("Image uploaded:", imageUrl);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
```

### Image Validation

```typescript
import { validateImageFile } from "@shared/storageService";

const imageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const error = validateImageFile(file);
    if (error) {
      console.error(error);
    } else {
      handleImageUpload(userId, file);
    }
  }
};
```

---

## 🔄 User Profile Management

### Get User Profile

```typescript
import { getUserProfile, updateUserProfile } from "@shared/firebase";

const profile = await getUserProfile(userId);
console.log(profile);
// {
//   email, userType, firstName, lastName,
//   phone, age, gender, height, weight,
//   profileImageUrl, etc.
// }
```

### Update User Profile

```typescript
await updateUserProfile(userId, {
  firstName: "Jane",
  lastName: "Doe",
  phone: "+1234567890",
  age: 28,
  height: 170,
  weight: 65,
});
```

---

## 👥 Expert Functions

### Get Expert Profile

```typescript
import { getExpertProfile, updateExpertProfile } from "@shared/firebase";

const expertProfile = await getExpertProfile(expertId);
```

### Search Experts

```typescript
import { searchExperts } from "@shared/firebase";

const experts = await searchExperts({
  expertise: "nutrition",
  minRating: 4.5,
  available: true,
});
```

---

## 🔐 Security Rules

Configure Firebase Security Rules in the Firebase Console:

**Firestore Rules (firestore.rules):**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own documents
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Experts can read/write their own profiles
    match /experts/{userId} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }

    // Community posts
    match /community/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow write: if request.auth.uid == resource.data.authorId;
    }

    // Bookings
    match /bookings/{bookingId} {
      allow read: if request.auth.uid in [
        resource.data.customerId,
        resource.data.expertId
      ];
      allow create: if request.auth != null;
    }
  }
}
```

**Storage Rules (storage.rules):**

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User profile images
    match /profiles/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

---

## 🧪 Testing Integration

### Test Firebase Connection

```typescript
import { getCurrentUser } from "@shared/firebase";

const user = getCurrentUser();
console.log("Current user:", user?.email);
```

### Test Email Service

```typescript
import { sendWelcomeEmail } from "@shared/emailService";

try {
  await sendWelcomeEmail("test@example.com", "Test User");
  console.log("✅ Email service working");
} catch (error) {
  console.error("❌ Email service failed:", error);
}
```

### Test Shopify Integration

```typescript
import { getShopifyProducts } from "@shared/shopifyService";

try {
  const products = await getShopifyProducts(1);
  console.log("✅ Shopify integration working:", products[0]?.title);
} catch (error) {
  console.error("❌ Shopify integration failed:", error);
}
```

---

## 📊 Data Structures

### User Document

```typescript
{
  uid: string;
  email: string;
  userType: "customer" | "expert" | "admin";
  firstName: string;
  lastName: string;
  phone?: string;
  phoneVerified: boolean;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  profileImageUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
}
```

### Booking Document

```typescript
{
  id: string;
  customerId: string;
  expertId: string;
  date: string; // ISO date
  time: string; // HH:MM format
  duration: number; // minutes
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt?: Date;
}
```

### AI Coach Plan

```typescript
{
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: Array<{
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: string[];
    instructions: string;
  }>;
  workouts: Array<{
    day: string;
    name: string;
    duration: number;
    exercises: Array<{
      name: string;
      sets: number;
      reps: number;
      weight?: number;
    }>;
  }>;
}
```

---

## 🚀 Next Steps

### 1. **Create Authentication Pages**
   - Login page
   - Signup page
   - Password reset page
   - Phone verification page

### 2. **Implement User Flows**
   - Profile setup on first login
   - Profile editing
   - Image upload

### 3. **Build Features**
   - Expert dashboard
   - Booking system UI
   - AI Coach UI
   - Community features

### 4. **Add Admin Features**
   - User management
   - Expert verification
   - Analytics

### 5. **Testing**
   - Unit tests for services
   - Integration tests
   - E2E tests

---

## ⚠️ Important Notes

1. **Environment Variables**: Never commit `.env` file to Git. Use `.env.example` for template.

2. **Client-side OpenAI**: Using `dangerouslyAllowBrowser: true` exposes your API key. For production, create a backend endpoint to handle OpenAI requests.

3. **Shopify Access Token**: Use Storefront API token, not Admin API token.

4. **Firebase Rules**: Update security rules in Firebase Console before deploying to production.

5. **Email Templates**: Configure email templates in EmailJS dashboard for proper formatting.

---

## 📞 Support

For issues or questions:
1. Check Firebase Console for errors
2. Verify environment variables are set correctly
3. Check browser console for error messages
4. Review service file documentation

---

**Migration Date**: February 2, 2026  
**Status**: ✅ Complete
