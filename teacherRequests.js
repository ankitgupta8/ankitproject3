// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Dimensions, Animated, RefreshControl } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { ActivityIndicator } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
// import { auth } from './firebase';
// import { Button } from 'react-native-paper';
// import { fetchWholeTodoListTeacher } from './firestore/read';
// import TeacherCard from './TeacherCard';

// const { width } = Dimensions.get('window');
// const user = auth.currentUser;

// export default function TeacherRequest() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
// const [refreshing, setRefreshing] = useState(false);
//   const scrollY = useRef(new Animated.Value(0)).current;
//   async function getMyFiles() {
//     const result = await fetchWholeTodoListTeacher();
//     const myTodos = result.docs.map((d) => ({ docId: d.id, ...d.data() }));
//     setData(myTodos);
//     setLoading(false);
//     setRefreshing(false);

//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       await getMyFiles(); // Ensure the fetch logic is executed once
//     };
//     fetchData();
//   }, []); 
//   const onRefresh = async () => {
//     setRefreshing(true);
//     const fetchData = async () => {
//       await getMyFiles(); // Ensure the fetch logic is executed once
//     };
//     fetchData();
//   };



//   return (
//     <LinearGradient
//       colors={['#4c669f', '#3b5998', '#192f6a']}
//       style={styles.container}
//     >
//      <Animated.ScrollView
//              contentContainerStyle={{
//                flexGrow: 1,
//                justifyContent: 'center',
//                alignItems: 'center',
//                paddingVertical: 20,
//              }}
//              refreshControl={
//                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//                      }
//                      onScroll={Animated.event(
//                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//                        { useNativeDriver: true }
//                      )}
//                      scrollEventThrottle={16}
//            >

//         {loading ? (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#ffffff" />
//             <Text style={styles.loadingText}>Loading Teachers</Text>
//           </View>
//         ) : (
//           data.map((e) => (
//             <TeacherCard
//               key={e.docId}
//               name={e.name}
//               location={e.location}
//               experience={e.experience}
//               subject={e.subject}
//               phoneNumber={e.phoneNumber}
//             />
//           ))
//         )}
//       </Animated.ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     alignItems: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 18,
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
// });

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, TextInput, Chip } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { auth } from './firebase';
import { fetchWholeTodoListTeacher } from './firestore/read';
import TeacherCard from './TeacherCard';

const { width } = Dimensions.get('window');
const user = auth.currentUser;

export default function TeacherRequest() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [district, setDistrict] = useState('');
  const [sortNewest, setSortNewest] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  async function getMyFiles() {
    const result = await fetchWholeTodoListTeacher();
    const myTodos = result.docs.map((d) => ({ docId: d.id, ...d.data() }));
    setData(myTodos);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      await getMyFiles();
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortData();
  }, [district, sortNewest, data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getMyFiles();
  };

  const filterAndSortData = () => {
    let filtered = [...data];

    if (district) {
      filtered = filtered.filter(item => 
        item.location == district
      );
    }

    if (sortNewest) {
      filtered.sort((a, b) => {
        const aSeconds = a.createdAt && a.createdAt.seconds ? a.createdAt.seconds : 0;
        const bSeconds = b.createdAt && b.createdAt.seconds ? b.createdAt.seconds : 0;
        return bSeconds - aSeconds;
      });
    }

    setFilteredData(filtered);
  };

  const toggleSort = () => {
    setSortNewest(!sortNewest);
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          value={district}
          onChangeText={setDistrict}
          placeholder="Filter by Location"
          placeholderTextColor="#a0a0a0"
        />
        <Chip
          selected={sortNewest}
          onPress={toggleSort}
          style={styles.chip}
        >
          {sortNewest ? 'Newest First' : 'Default Order'}
        </Chip>
      </View>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
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
          filteredData.map((e) => (
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  chip: {
    backgroundColor: '#192f6a',
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

