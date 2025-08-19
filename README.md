# FlowerBloomingenglishacademy.github.io

A simple school website with features for admissions, notices, student/teacher login, and homework management. Built with HTML, CSS, JavaScript, and Firebase.

## Setup
1. **Firebase**: Configure Firebase Authentication (Email/Password) and Firestore.
2. **Firestore Collections**:
   - `notices`: { title, content, date }
   - `homework`: { title, subject, dueDate }
   - `admissions`: { name, email, phone, status, submittedAt }
3. **Update Config**: Replace `firebase.js` config with your Firebase project settings.
4. **Test Locally**: Use a local server (e.g., VS Code Live Server).
5. **Deploy**: Push to GitHub and enable GitHub Pages.

## Deployment
- Repository: `<username>.github.io/school-website`
- GitHub Pages: Enable in Settings > Pages, select `main` branch.

## Features
- Login: Student/Teacher authentication.
- Notices: View school announcements.
- Homework: Display assignments.
- Admission: Submit application forms.
