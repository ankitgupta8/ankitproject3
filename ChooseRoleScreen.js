import React from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Button, Text, Card, Title, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { signOut } from 'firebase/auth';
import { auth } from './firebase'; // Make sure this import is correct for your project structure
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

function ChooseRoleScreen({ navigation, route }) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Signed out successfully');
      navigation.navigate('LandingPage');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome, {route.params.name}!</Text>
          <Text style={styles.subtitle}>Choose your role to continue</Text>

          <Card style={styles.card} onPress={() => navigation.navigate('StudentDashboard')}>
            <Card.Content>
              <Ionicons name="school-outline" size={48} color="#4c669f" style={styles.icon} />
              <Title style={styles.cardTitle}>I'm a Student</Title>
              <Paragraph style={styles.cardDescription}>Access your courses, assignments, and grades</Paragraph>
            </Card.Content>
          </Card>

          <Card style={styles.card} onPress={() => navigation.navigate('TeacherDashboard')}>
            <Card.Content>
              <Ionicons name="book-outline" size={48} color="#4c669f" style={styles.icon} />
              <Title style={styles.cardTitle}>I'm a Teacher</Title>
              <Paragraph style={styles.cardDescription}>Manage your classes, create assignments, and grade students</Paragraph>
            </Card.Content>
          </Card>

          <Button
            mode="outlined"
            onPress={handleSignOut}
            style={styles.signOutButton}
            labelStyle={styles.signOutButtonLabel}
          >
            Sign Out
          </Button>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    width: width * 0.8,
    marginBottom: 20,
    elevation: 4,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4c669f',
    marginTop: 8,
  },
  cardDescription: {
    color: '#666',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  signOutButton: {
    marginTop: 20,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  signOutButtonLabel: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default ChooseRoleScreen;