import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Linking } from 'react-native';
import { Text, Button, Card, Title, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const TeacherDetailsScreen = ({ route, navigation }) => {
  const teacher = route.params?.teacher;

  const handleCall = () => {
    if (teacher?.phoneNumber) {
      Linking.openURL(`tel:${teacher.phoneNumber}`);
    }
  };

  if (!teacher) {
    navigation.goBack();
    return null;
  }

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} bounces={false}>
        <Surface style={styles.header}>
          <View style={styles.profileIconContainer}>
            <Ionicons name="person-circle-outline" size={80} color="#fff" />
          </View>
          <Title style={styles.name}>{teacher.name}</Title>
          <View style={styles.contactButton}>
            <Button 
              mode="contained" 
              onPress={handleCall}
              style={styles.callButton}
              icon="phone"
              labelStyle={styles.callButtonLabel}
            >
              Call Teacher
            </Button>
          </View>
        </Surface>

        <Card style={styles.detailsCard}>
          <Card.Content>
            <View style={styles.detailRow}>
              <Ionicons name="location" size={24} color="#4c669f" />
              <View style={styles.detailTexts}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>
                  {teacher.specificLocation ? `${teacher.specificLocation}, ` : ''}{teacher.location}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="school" size={24} color="#4c669f" />
              <View style={styles.detailTexts}>
                <Text style={styles.detailLabel}>Experience</Text>
                <Text style={styles.detailValue}>{teacher.experience} years</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="book" size={24} color="#4c669f" />
              <View style={styles.detailTexts}>
                <Text style={styles.detailLabel}>Subjects</Text>
                <Text style={styles.detailValue}>{teacher.subject}</Text>
              </View>
            </View>

            <View style={[styles.detailRow, styles.lastDetailRow]}>
              <Ionicons name="call" size={24} color="#4c669f" />
              <View style={styles.detailTexts}>
                <Text style={styles.detailLabel}>Contact</Text>
                <Text style={styles.detailValue}>{teacher.phoneNumber}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  profileIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  contactButton: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  callButton: {
    backgroundColor: '#25D366',
    borderRadius: 10,
    elevation: 3,
    paddingVertical: 8,
  },
  callButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lastDetailRow: {
    borderBottomWidth: 0,
  },
  detailTexts: {
    marginLeft: 15,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  }
});

export default TeacherDetailsScreen; 