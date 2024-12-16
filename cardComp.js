import React from 'react';
import { View, Text, StyleSheet, Dimensions, Linking } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const TutorCard = ({ grade, hoursToTeach, location, salary, name, subject, phoneNumber }) => {
  const scale = useSharedValue(1);
  console.log(phoneNumber)
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
      <Card style={styles.card} onPress={() => callFn(phoneNumber)} onPressIn={onPressIn} onPressOut={onPressOut}>
        <LinearGradient
          colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.6)']}
          style={styles.cardContent}
        >
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>

          <View style={styles.header}>
            <Ionicons name="person-circle-outline" size={40} color="#4c669f" />
            <Title style={styles.name}>{name}</Title>

          </View>
          <DetailItem3 icon="call" text={`${phoneNumber}`} />
          </View>

          <View style={{flexDirection: 'row', marginTop:10}}>

          <DetailItem2 icon="book" text={`${subject}`} />
          </View>
          <View style={styles.detailsContainer}>
            <DetailItem icon="school-outline" text={`Grade ${grade}`} />
            <DetailItem icon="time-outline" text={`${hoursToTeach} hours`} />
            <DetailItem icon="location-outline" text={location} />
            <DetailItem icon="cash-outline" text={`Rs. ${salary}/hr`} />
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
    <Ionicons name={icon} size={22} color="#4c669f" style={styles.icon} />
    <Text style={styles.detailText3}>{text}</Text>
  </View>
);
const DetailItem3 = ({ icon, text }) => (
  <View style={styles.detailItem2}>
    <Ionicons name={icon} size={28} color="#4c669f" style={styles.icon} />
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  detailItem2: {
    marginTop:5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
  },
  detailText3: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom:3,

  },
  detailText2: {
    fontSize: 20,
    fontWeight: 'bold',

    color: '#4c669f',
  },
});

export default TutorCard;

