import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const LandingPage = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <LottieView
        source={require('./assets/background-animation.json')}
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.title}>Welcome to Our App</Text>
        <Text style={styles.subtitle}>Get started with your journey</Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={[styles.button, styles.signInButton]}
            labelStyle={styles.buttonText}
            onPress={() => navigation.navigate('SignIn')}
          >
            Sign In
          </Button>
          <Button
            mode="contained"
            style={[styles.button, styles.signUpButton]}
            labelStyle={styles.buttonText}
            onPress={() => navigation.navigate('Register')}
          >
            Sign Up
          </Button>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundAnimation: {
    position: 'absolute',
    width: width,
    height: height,
    opacity: 0.6,
  },
  content: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    width: width * 0.9,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    marginVertical: 10,
    paddingVertical: 8,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: '#2C4E80',
  },
  signUpButton: {
    backgroundColor: '#B51B75',
  },
});

export default LandingPage;