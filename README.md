# Intern Project Submission App

A React Native mobile application for internship project submission and review workflows.

## Features

- Intern project submission
- PDF/ZIP file selection
- Supabase Storage uploads
- Firebase Firestore submission records
- Submission history and feedback
- Demo admin review UI

## Technologies

- React Native
- Expo
- Firebase Firestore
- Supabase Storage
- JavaScript
- Document Picker

## Local setup

```bash
npm install
cp .env.example .env
npx expo start
```

Fill `.env` with your own Firebase and Supabase client configuration. The real `.env` file is ignored by Git and must not be committed.

## Security note

The repository intentionally contains no live project credentials and no hard-coded admin password.

Firebase client configuration and Supabase publishable/anon keys are client-side identifiers rather than server secrets, but they should still be kept out of a public portfolio repository when they point to a live project. Access to actual data must be enforced by Firebase Security Rules, Supabase Row Level Security/storage policies, authenticated roles, quotas, and provider-side restrictions.

The admin screen is disabled by default. `EXPO_PUBLIC_ENABLE_UNSAFE_DEMO_ADMIN=true` exists only for local UI demonstration and **must not** be treated as authentication or authorization. A real deployment should use authenticated server-side/managed authorization such as Firebase Authentication with protected security rules or an equivalent backend design.

Never commit service-account JSON, Supabase service-role keys, private API keys, signing keys, `.env` files, databases, logs, backups, or customer/user data.

## Author

Developed as part of a React Native internship assignment.
