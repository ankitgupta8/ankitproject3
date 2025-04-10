import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        setUser(userData);
        try {
          // Store the Firebase auth token
          const token = await user.getIdToken();
          await AsyncStorage.setItem('authToken', token);
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
        } catch (error) {
          console.error('Error saving auth data:', error);
        }
      } else {
        // User is signed out
        setUser(null);
        try {
          await AsyncStorage.removeItem('authToken');
          await AsyncStorage.removeItem('userData');
        } catch (error) {
          console.error('Error removing auth data:', error);
        }
      }
      setLoading(false);
    });

    // Check for existing session on startup
    const checkExistingSession = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const userData = await AsyncStorage.getItem('userData');
        
        if (token && userData) {
          // Verify the token is still valid
          const currentUser = auth.currentUser;
          if (currentUser) {
            const currentToken = await currentUser.getIdToken();
            if (currentToken === token) {
              setUser(JSON.parse(userData));
            } else {
              // Token is invalid, clear storage
              await AsyncStorage.removeItem('authToken');
              await AsyncStorage.removeItem('userData');
              setUser(null);
            }
          }
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
      }
    };

    checkExistingSession();

    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 