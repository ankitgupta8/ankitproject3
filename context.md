# Tutor-Student Connection Platform

## Project Overview
This is a React Native mobile application built with Expo that facilitates connections between students and teachers. The app serves as a platform where students can find tutors and teachers can find students, creating an educational marketplace.

## Technical Stack
- **Frontend Framework**: React Native with Expo (SDK 52)
- **Navigation**: React Navigation (Stack and Material Top Tab navigation)
- **UI Components**: React Native Paper
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Animations**: React Native Reanimated
- **State Management**: React's built-in state management
- **Build System**: EAS (Expo Application Services)

## Project Structure

### Core Components

1. **Authentication Screens**
   - `signinscreen.js`: Handles user login
   - `signUpScreen.js`: Handles new user registration
   - `ChooseRoleScreen.js`: Allows users to select their role (Student/Teacher)

2. **Student Features**
   - `studentRegisterScreen.js`: Student profile registration and management
   - `studentRequests.js`: Handles student requests for tutors
   - `DashBoard.js`: Student dashboard interface

3. **Teacher Features**
   - `teacherRegisterScreen.js`: Teacher profile registration and management
   - `teacherRequests.js`: Handles teacher availability and student requests
   - `Dashboard2.js`: Teacher dashboard interface

4. **Shared Components**
   - `cardComp.js` & `cardComp2.js`: Reusable card components for displaying profiles
   - `TeacherCard.js`: Specialized card component for teacher profiles
   - `styles.js`: Shared styles across the application

### Firebase Integration
- `firebase.js`: Firebase configuration and initialization
- `firestore/`: Directory containing Firestore database operations
  - `update.ts`: Handles database updates

### Configuration Files
- `app.json`: Expo configuration
- `eas.json`: EAS Build configuration
- `metro.config.js`: Metro bundler configuration
- `babel.config.js`: Babel configuration
- `codemagic.yaml`: CI/CD configuration with Codemagic

## Key Features

1. **User Authentication**
   - Email/password authentication
   - Role-based access control (Student/Teacher)
   - Secure session management

2. **Profile Management**
   - Separate registration flows for students and teachers
   - Profile editing capabilities
   - Role-specific information collection

3. **Search and Discovery**
   - Students can search for teachers
   - Teachers can view student requests
   - Location-based search functionality

4. **Navigation**
   - Custom animated tab bar
   - Role-specific navigation flows
   - Smooth transitions between screens

5. **UI/UX**
   - Material Design components
   - Custom animations
   - Responsive layouts
   - Icon-based navigation

## Application Flow

1. **Initial Launch**
   - Users start at the Landing Page (`initApp.js`)
   - Can choose to sign in or register

2. **Registration Process**
   - User signs up with email/password
   - Selects role (Student/Teacher)
   - Completes role-specific registration

3. **Main Application**
   - Students:
     - Can search for teachers
     - View teacher profiles
     - Manage their own profile
   - Teachers:
     - Can view student requests
     - Manage their availability
     - Update their profile

4. **Dashboard Features**
   - Role-specific dashboards
   - Tab-based navigation
   - Profile management
   - Request handling

## Build and Deployment

- Uses EAS for building Android/iOS apps
- Configured with Codemagic for CI/CD
- Supports OTA updates through Expo Updates
- Android release signing configured

## Security Features

- Firebase Authentication integration
- Secure data storage with Firestore
- Environment variable management
- API key protection

## Future Enhancements

1. Real-time messaging between students and teachers
2. Payment integration for booking sessions
3. Rating and review system
4. Advanced search filters
5. Calendar integration for scheduling

## Development Guidelines

1. Follow React Native best practices
2. Maintain consistent code style
3. Use TypeScript for new features
4. Keep components modular and reusable
5. Document new features and changes 