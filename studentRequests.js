// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Dimensions, Animated, RefreshControl } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { ActivityIndicator, TextInput } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
// import TutorCard from './cardComp';
// import { fetchWholeTodoListStudent } from './firestore/read';
// import { fetchOnLocationStudent } from './firestore/read';
// import { auth } from './firebase';
// import { Button } from 'react-native-paper';


// const user = auth.currentUser;


// export default function StudentsRequest() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [district, setDistrict] = useState('');
  
//   const scrollY = useRef(new Animated.Value(0)).current;

//   async function getMyFiles() {
//     const result = await fetchWholeTodoListStudent();
//     const myTodos = result.docs.map((d) => ({ docId: d.id, ...d.data() }));
//     setData(myTodos);
//     setLoading(false);
//     setRefreshing(false);
//   }

//   // useEffect(() => {
//   //   getMyFiles();
//   // }, []);
//   useEffect(() => {
//     const fetchData = async () => {
//       await getMyFiles(); // Ensure the fetch logic is executed once
//     };
//     fetchData();
//   }, []); 

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await getMyFiles();
//   };
//   async function filterDistrict(dist) {
//     setDistrict(dist);
//     const result = await fetchOnLocationStudent(dist);
//     const myTodos = result.docs.map((d) => ({ docId: d.id, ...d.data() }));
//     console.log(result.docs, dist)
//     setData(myTodos);
    
//     setLoading(false);
//     setRefreshing(false);
//   } 


//   return (
//     <LinearGradient
//       colors={['#4c669f', '#3b5998', '#192f6a']}
//       style={{ flex: 1 }}
//     >
//       <Animated.ScrollView
//         contentContainerStyle={{
//           flexGrow: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           paddingVertical: 20,
//         }}
//         refreshControl={
//                   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//                 }
//                 onScroll={Animated.event(
//                   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//                   { useNativeDriver: true }
//                 )}
//                 scrollEventThrottle={16}
//       >
//         <TextInput
//               style={{
//                 flex:0.1,
//                 flexDirection:'row',
//                 margin:20,
//                 backgroundColor:'#fff',
//                 color: '#fff',}}
//               value={district}
//               onChangeText={(dist) => {filterDistrict(dist)}}
//               placeholder="District"
//               placeholderTextColor="#a0a0a0"
//             />

//         {!loading ? (
//           data.map((e) => (
//             <TutorCard
//               key={e.docId}
//               grade={e.class}
//               hoursToTeach={e.hoursToTeach}
//               location={e.district}
//               salary={e.salary}
//               name={e.name}
//               subject={e.subject}
//               phoneNumber={e.phoneNumber}
              
//             />
//           ))
//         ) : (
//           <View style={styles.loadingContainer}>
//                       <ActivityIndicator size="large" color="#ffffff" />
//                       <Text style={styles.loadingText}>Loading Student</Text>
//                     </View>
//         )}
//       </Animated.ScrollView>
//     </LinearGradient>
//   );
// }
// const styles = StyleSheet.create({
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
// })


import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, TextInput, Text, Button, Chip } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import TutorCard from './cardComp';
import { fetchWholeTodoListStudent } from './firestore/read';
import { fetchOnLocationStudent } from './firestore/read';
import { auth } from './firebase';

const user = auth.currentUser;

export default function StudentsRequest() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [district, setDistrict] = useState('');
  const [sortNewest, setSortNewest] = useState(false);
  
  const scrollY = useRef(new Animated.Value(0)).current;

  async function getMyFiles() {
    setLoading(true);
    const result = await fetchWholeTodoListStudent();
    const myTodos = result.docs.map((d) => ({ docId: d.id, ...d.data() }));
    setData(myTodos);
    setFilteredData(myTodos);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    getMyFiles();
  }, []);

  useEffect(() => {
    filterAndSortData();
  }, [ district, sortNewest, data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getMyFiles();
  };

  const filterAndSortData = () => {
    let filtered = [...data];
    if (district) {
      filtered = filtered.filter(item => {
        console.log(item, "each item")
        return item.district == district
      }
      );
    }

    if (sortNewest) {
      filtered.sort((a, b) => {
        // Ensure that createdAt exists and has a seconds property
        const aSeconds = a.createdAt && a.createdAt.seconds ? a.createdAt.seconds : 0;
        const bSeconds = b.createdAt && b.createdAt.seconds ? b.createdAt.seconds : 0;
        return bSeconds - aSeconds; // Sort in descending order (newest first)
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
      style={{ flex: 1 }}
    >
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          value={district}
          onChangeText={setDistrict}
          placeholder="Filter by District"
          placeholderTextColor="#a0a0a0"
          onSubmitEditing={filterAndSortData}
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
            <Text style={styles.loadingText}>Loading Students</Text>
          </View>
        ) : (
          filteredData.map((e) => (
            <TutorCard
              key={e.docId}
              grade={e.class}
              hoursToTeach={e.hoursToTeach}
              location={e.district}
              salary={e.salary}
              name={e.name}
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
    backgroundColor:"#fff"
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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

