import React from 'react';
import { View, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const TeacherCard = ({ name, location, experience, subject, phoneNumber }) => {
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
const callFn = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`)
    console.log(phoneNumber+'calling')
      }
  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.cardContainer, animatedStyles]}>
      <Card onPress={() => callFn(phoneNumber)} style={styles.card} onPressIn={onPressIn} onPressOut={onPressOut}>
        <LinearGradient
          colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.6)']}
          style={styles.cardContent}
        >
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          
          <View style={styles.header}>
            <Ionicons name="person-circle-outline" size={40} color="#4c669f" />
            <Title style={styles.name}>{name}</Title>
          </View>
          <DetailItem2 icon="call" text={`${phoneNumber}`} />
          </View>
          <DetailItem2 icon="book" text={`${subject}`} />

          <View style={styles.detailsContainer}>
            <DetailItem icon="location-outline" text={location} />
            <DetailItem icon="time-outline" text={`${experience} years exp.`} />
          </View>
        </LinearGradient>
      </Card>
    </Animated.View>
  );
};

const DetailItem = ({ icon, text }) => (
  <View style={styles.detailItem}>
    <Ionicons name={icon} size={16} color="#4c669f" style={styles.icon} />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);
const DetailItem2 = ({ icon, text }) => (
  <View style={styles.detailItem}>
    <Ionicons name={icon} size={18} color="#4c669f" style={styles.icon} />
    <Text style={styles.detailText2}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.9,
    marginBottom: 20,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4c669f',
    marginLeft: 10,
  },
  subject: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:5,
  },
  icon: {
    marginRight: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  detailText2: {
    fontSize: 18,
    color: '#333', 
    marginBottom:3,
  },
  
});

export default TeacherCard;

