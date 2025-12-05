# Firebase Setup Guide for Metromellow Waitlist

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name your project: `metromellow-waitlist` (or your preferred name)
4. Enable Google Analytics (recommended for tracking)
5. Choose your analytics account or create a new one

## 2. Set up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose **"Start in test mode"** for now (we'll update security rules later)
4. Select your preferred location (choose closest to Nigeria for best performance)

## 3. Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click **"Web"** icon to add a web app
4. Register your app with name: `Metromellow Web`
5. Copy the Firebase config object

## 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase configuration in `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

## 5. Install Firebase CLI (Optional but Recommended)

```bash
npm install -g firebase-tools
firebase login
firebase init firestore
```

## 6. Deploy Security Rules

1. Update `firestore.rules` with your admin emails
2. Deploy rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

Or manually copy the rules from `firestore.rules` to Firebase Console > Firestore > Rules

## 7. Test Your Setup

1. Install Firebase package:

   ```bash
   npm install firebase
   ```

2. Start your development server:

   ```bash
   npm run dev
   ```

3. Navigate to `/welcome` and test the waitlist signup

## 8. Monitor Your Waitlist

### View Signups in Firebase Console

1. Go to Firestore Database
2. Navigate to the `waitlist` collection
3. View all signups with timestamps and details

### Export Waitlist Data

```javascript
// Use the waitlistService.exportWaitlist() method
import { waitlistService } from "@/lib/services/waitlist";

const exportData = async () => {
  const data = await waitlistService.exportWaitlist();
  console.log(data);
  // Convert to CSV or your preferred format
};
```

## 9. Production Considerations

### Security Rules

- Update admin emails in `firestore.rules`
- Consider implementing proper authentication for admin access
- Review and tighten security rules before going live

### Analytics

- Set up Firebase Analytics goals for waitlist conversions
- Consider integrating with Google Analytics 4

### Monitoring

- Set up Firebase Performance Monitoring
- Enable Firestore usage alerts
- Monitor costs and set billing alerts

### Backup

- Consider setting up automated Firestore exports
- Implement data retention policies

## 10. Advanced Features (Optional)

### Email Notifications

Set up Cloud Functions to send welcome emails:

```bash
firebase init functions
```

### Real-time Updates

Add real-time listeners for live waitlist count updates:

```javascript
import { onSnapshot, collection } from "firebase/firestore";

// Real-time waitlist count
const unsubscribe = onSnapshot(collection(db, "waitlist"), (snapshot) => {
  console.log("Current waitlist size:", snapshot.size);
});
```

### Data Analytics

- Export data to BigQuery for advanced analytics
- Set up conversion funnels and user behavior analysis

## Troubleshooting

### Common Issues

1. **Permission Denied**: Check your security rules and environment variables
2. **Invalid API Key**: Verify your Firebase config in `.env.local`
3. **CORS Errors**: Ensure your domain is added to Firebase Auth domains
4. **Build Errors**: Make sure Firebase is properly imported and initialized

### Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Next.js Firebase Integration](https://firebase.google.com/docs/web/setup)
