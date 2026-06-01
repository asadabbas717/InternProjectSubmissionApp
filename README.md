# Intern Project Submission App

A React Native mobile application that allows interns to submit their project files and receive feedback from the admin. The app provides separate dashboards for Intern and Admin roles to keep the submission and review process simple and organized.

## Features

* Role selection: Intern or Admin
* Intern project submission
* PDF/ZIP file selection using Document Picker
* File upload using Supabase Storage
* Submission records stored in Firebase Firestore
* Admin review system
* Admin feedback/comments
* Submission status update: Pending, Reviewed, Approved, or Rejected
* Submission history for interns

## Technologies Used

* React Native
* Expo
* Firebase Firestore
* Supabase Storage
* JavaScript
* Document Picker

## App Flow

### Intern

1. Select **Continue as Intern**
2. Enter intern name
3. Enter project title
4. Select PDF or ZIP file
5. Submit project
6. View submission history and admin feedback

### Admin

1. Select **Continue as Admin**
2. Enter admin password
3. View all submitted projects
4. Open submitted files
5. Add feedback
6. Update submission status

## Installation

```bash
npm install
```

## Run the App

```bash
npx expo start
```

Scan the QR code using Expo Go on your mobile device.

## Configuration

Create and configure Firebase Firestore for storing submission data.

Create a Supabase project and storage bucket for uploading PDF/ZIP files.

Update the Firebase and Supabase configuration files with your own project keys.

## Admin Password

Default demo admin password:

```txt
admin123
```

You can change it inside the Admin screen file.

## Note

Firebase Storage requires billing activation, so Supabase Storage was used as a free alternative for file uploads while Firebase Firestore was used for storing submission records and feedback.

## Author

Developed as part of a React Native internship assignment.
