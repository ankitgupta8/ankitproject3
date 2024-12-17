import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Animated, 
  RefreshControl 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './firebase';
import { fetchOnlyMyTodoList2 } from './firestore/read';
import TeacherCard from './TeacherCard';

const { width, height } = Dimensions.get('window');

export default function Dashboard2({ navigation }) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const user = auth.currentUser;

  const fetchData = async () => {
    if (!user) return;
    const result = await fetchOnlyMyTodoList2(user.uid);
    const myTodos = result.docs.map((d) => ({ docId: d.id, ...d.data() }));
    setData(myTodos);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const fabScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.headerText}>Teacher Dashboard</Text>
      </Animated.View>

      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {data.length > 0 ? (
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
        ) : (
          <Text style={styles.noDataText}>No teaching requests found. Create one!</Text>
        )}
      </Animated.ScrollView>

      <Animated.View style={[styles.fabContainer, { transform: [{ scale: fabScale }] }]}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('Tregistration')}
        >
          <Ionicons name="add" size={24} color="#4c669f" />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
        <Ionicons name="arrow-up" size={24} color="#ffffff" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  noDataText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 50,
  },
  fabContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  scrollTopButton: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

