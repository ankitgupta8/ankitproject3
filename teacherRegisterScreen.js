import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { createTodoTaskTeacher } from './firestore/create';
import { auth } from './firebase';

const { width } = Dimensions.get('window');

function TeacherRegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [subject, setSubjectsToTeach] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const buttonScale = useSharedValue(1);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleSubmit = () => {
    if (name && location && experience && subject) {
      const uid = auth.currentUser.uid;
      createTodoTaskTeacher({
        name,
        location,
        experience,
        subject,
        phoneNumber,
        ownerId: uid
      });
      navigation.navigate('dashboard2');
    } else {
      // Show error or alert for incomplete form
      alert('Please fill all fields');
    }
  };

  const onPressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    buttonScale.value = withSpring(1);
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={navigation.goBack}
      >
        <AntDesign name="arrowleft" size={24} color="#ffffff" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Teacher Registration</Text>
        
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color="#ffffff" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#a0a0a0"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={24} color="#ffffff" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
            placeholderTextColor="#a0a0a0"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="time-outline" size={24} color="#ffffff" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={experience}
            onChangeText={setExperience}
            placeholder="Experience (years)"
            placeholderTextColor="#a0a0a0"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="book-outline" size={24} color="#ffffff" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={setSubjectsToTeach}
            placeholder="Subjects to Teach"
            placeholderTextColor="#a0a0a0"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="call" size={24} color="#ffffff" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number"
            placeholderTextColor="#a0a0a0"
            keyboardType="numeric"

          />
        </View>
      </ScrollView>

      <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Ionicons name="checkmark" size={24} color="#4c669f" />
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 10,
  },
  buttonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default TeacherRegisterScreen;

