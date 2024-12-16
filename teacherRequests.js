import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { auth } from './firebase';
import { Button } from 'react-native-paper';
import { fetchWholeTodoListTeacher } from './firestore/read';
import TeacherCard from './TeacherCard';

const { width } = Dimensions.get('window');
const user = auth.currentUser;

export default function TeacherRequest() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  async function getMyFiles() {
    if (!user) return;
    const result = await fetchWholeTodoListTeacher();
    const myTodos = result.docs.map((d) => ({ docId: d.id, ...d.data() }));
    setData(myTodos);
    setLoading(false);
    setRefreshing(false);

  }

  useEffect(() => {
    getMyFiles();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    await getMyFiles();
  };



  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
     <Animated.ScrollView
             contentContainerStyle={{
               flexGrow: 1,
               justifyContent: 'center',
               alignItems: 'center',
               paddingVertical: 20,
             }}
             refreshControl={
                       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                     }
                     onScroll={Animated.event(
                       [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                       { useNativeDriver: true }
                     )}
                     scrollEventThrottle={16}
           >

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Loading Teachers</Text>
          </View>
        ) : (
          data.map((e) => (
            <TeacherCard
              key={e.docId}
              name={e.name}
              location={e.location}
              experience={e.experience}
              subject={e.subject}
              phoneNumber={e.phoneNumber}
            />
          ))
        )}
      </Animated.ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

