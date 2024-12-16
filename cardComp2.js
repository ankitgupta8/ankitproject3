import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TutorCard = ({ name, location, grade, subject, hoursToTeach, salary }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>Name: {name}</Text>
      <Text style={styles.location}>Location: {location}</Text>
      <Text style={styles.grade}>Grade: {grade}</Text>
      <Text style={styles.subject}>Subject: {subject}</Text>
      <Text style={styles.hoursToTeach}>Hours to teach: {hoursToTeach}</Text>
      <Text style={styles.salary}>Salary: {salary}</Text>
    </View>
  );
};
const TutorCard2 = ({ name, location, experience, subject }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>Name: {name}</Text>
      <Text style={styles.location}>Location: {location}</Text>
      <Text style={styles.subject}>Experience: {experience}</Text>
      <Text style={styles.hoursToTeach}>Subject to teach: {subject}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 30,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    padding: 16,
    marginVertical: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    marginBottom: 8,
  },
  grade: {
    fontSize: 16,
    marginBottom: 8,
  },
  subject: {
    fontSize: 16,
    marginBottom: 8,
  },
  hoursToTeach: {
    fontSize: 16,
    marginBottom: 8,
  },
  salary: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TutorCard2;