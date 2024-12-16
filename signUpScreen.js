import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, Animated } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { TextInput, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './firebase';

const { width, height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  const buttonScale = new Animated.Value(1);

  const onSignUpPress = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: displayName
      });
      console.log('User created and profile updated');
      setUserId(auth.currentUser.uid);
      setEmail('');
      setPassword('');
      setDisplayName('');
      navigation.navigate('ChooseRole', { name: displayName });
    } catch (error) {
      console.error('Sign-up error:', error);
      alert(error.message + " (" + error.code + ")");
      setPassword('');
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="#fff" style={styles.icon} />
            <TextInput
              mode='flat'
              label="Name"
              value={displayName}
              onChangeText={setDisplayName}
              style={styles.input}
              theme={{ colors: { text: '#fff', primary: '#fff' } }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="#fff" style={styles.icon} />
            <TextInput
              mode='flat'
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              theme={{ colors: { text: '#fff', primary: '#fff' } }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#fff" style={styles.icon} />
            <TextInput
              mode='flat'
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              theme={{ colors: { text: '#fff', primary: '#fff' } }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              animateButton();
              onSignUpPress();
            }}
            disabled={loading}
          >
            <Animated.View style={[
              styles.button,
              { transform: [{ scale: buttonScale }] }
            ]}>
              <Text style={styles.buttonText}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: width * 0.9,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#3b5998',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signInContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signInText: {
    color: '#fff',
    fontSize: 14,
  },
  signInLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;