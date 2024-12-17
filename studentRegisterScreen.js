// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons, AntDesign } from '@expo/vector-icons';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// import { createTodoTask } from './firestore/create';
// import { auth } from './firebase';

// const { width } = Dimensions.get('window');

// function StudentRegisterScreen({ navigation }) {
//   const [district, setDistrict] = useState('');
//   const [specificLocation, setSpecificLocation] = useState('');
//   const [studentClass, setStudentClass] = useState('');
//   const [stream, setStream] = useState('');
//   const [boardType, setBoardType] = useState('');
//   const [course, setCourse] = useState('');
//   const [subject, setSubject] = useState('');
//   const [hoursToBeTaught, setHoursToBeTaught] = useState('');
//   const [salary, setSalary] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
  

//   const buttonScale = useSharedValue(1);

//   const animatedButtonStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: buttonScale.value }],
//     };
//   });

//   const handleStudentClassChange = (itemValue) => {
//     setStudentClass(itemValue);
//     if (itemValue === '11' || itemValue === '12') {
//       setStream('');
//       setBoardType('');
//     } else if (itemValue === 'bachelor' || itemValue === 'master') {
//       setCourse('');
//     }
//   };

//   const handleSubmit = () => {
//     if (district && specificLocation && studentClass && subject && hoursToBeTaught && salary) {
//       const uid = auth.currentUser.uid;
//       const name = auth.currentUser.displayName;
//       createTodoTask({
//         name,
//         district,
//         specificLocation,
//         class: studentClass,
//         subject,
//         hoursToTeach: hoursToBeTaught,
//         salary,
//         phoneNumber,
//         ownerId: uid
//       });
//       navigation.navigate('dashboard');
//     } else {
//       alert('Please fill all required fields');
//     }
//   };

//   const onPressIn = () => {
//     buttonScale.value = withSpring(0.95);
//   };

//   const onPressOut = () => {
//     buttonScale.value = withSpring(1);
//   };

//   return (
//     <LinearGradient
//       colors={['#4c669f', '#3b5998', '#192f6a']}
//       style={styles.container}
//     >
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <AntDesign name="arrowleft" size={24} color="#ffffff" />
//       </TouchableOpacity>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <Text style={styles.title}>Student Registration</Text>
        
//         <View style={styles.inputContainer}>
//           <Ionicons name="location-outline" size={24} color="#ffffff" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             value={district}
//             onChangeText={setDistrict}
//             placeholder="District"
//             placeholderTextColor="#a0a0a0"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Ionicons name="pin-outline" size={24} color="#ffffff" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             value={specificLocation}
//             onChangeText={setSpecificLocation}
//             placeholder="Specific Location"
//             placeholderTextColor="#a0a0a0"
//           />
//         </View>

//         <View style={styles.pickerContainer}>
//           <Ionicons name="school-outline" size={24} color="#ffffff" style={styles.icon} />
//           <Picker
//             selectedValue={studentClass}
//             onValueChange={handleStudentClassChange}
//             style={styles.picker}
//             dropdownIconColor="#ffffff"
//           >
//             <Picker.Item label="Select Class" value="" />
//             <Picker.Item label="UKG" value="ukg" />
//             <Picker.Item label="1" value="1" />
//             <Picker.Item label="2" value="2" />
//             <Picker.Item label="3" value="3" />
//             <Picker.Item label="4" value="4" />
//             <Picker.Item label="5" value="5" />
//             <Picker.Item label="6" value="6" />
//             <Picker.Item label="7" value="7" />
//             <Picker.Item label="8" value="8" />
//             <Picker.Item label="9" value="9" />
//             <Picker.Item label="10" value="10" />
//             <Picker.Item label="11" value="11" />
//             <Picker.Item label="12" value="12" />
//             <Picker.Item label="Bachelor" value="bachelor" />
//             <Picker.Item label="Master" value="master" />
//           </Picker>
//         </View>

//         {(studentClass === '11' || studentClass === '12') && (
//           <>
//             <View style={styles.pickerContainer}>
//               <Ionicons name="git-branch-outline" size={24} color="#ffffff" style={styles.icon} />
//               <Picker
//                 selectedValue={stream}
//                 onValueChange={setStream}
//                 style={styles.picker}
//                 dropdownIconColor="#ffffff"
//               >
//                 <Picker.Item label="Select Stream" value="" />
//                 <Picker.Item label="Science" value="science" />
//                 <Picker.Item label="Commerce" value="commerce" />
//                 <Picker.Item label="Arts" value="arts" />
//                 <Picker.Item label="Others" value="others" />
//               </Picker>
//             </View>

//             <View style={styles.pickerContainer}>
//               <Ionicons name="library-outline" size={24} color="#ffffff" style={styles.icon} />
//               <Picker
//                 selectedValue={boardType}
//                 onValueChange={setBoardType}
//                 style={styles.picker}
//                 dropdownIconColor="#ffffff"
//               >
//                 <Picker.Item label="Select Board" value="" />
//                 <Picker.Item label="NEB" value="neb" />
//                 <Picker.Item label="A-LEVEL" value="a-level" />
//                 <Picker.Item label="IB" value="ib" />
//                 <Picker.Item label="CBSE" value="cbse" />
//                 <Picker.Item label="Others" value="others" />
//               </Picker>
//             </View>
//           </>
//         )}

//         {(studentClass === 'bachelor' || studentClass === 'master') && (
//           <View style={styles.inputContainer}>
//             <Ionicons name="book-outline" size={24} color="#ffffff" style={styles.icon} />
//             <TextInput
//               style={styles.input}
//               value={course}
//               onChangeText={setCourse}
//               placeholder="Course"
//               placeholderTextColor="#a0a0a0"
//             />
//           </View>
//         )}

//         <View style={styles.inputContainer}>
//           <Ionicons name="book-outline" size={24} color="#ffffff" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             value={subject}
//             onChangeText={setSubject}
//             placeholder="Subject"
//             placeholderTextColor="#a0a0a0"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Ionicons name="time-outline" size={24} color="#ffffff" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             value={hoursToBeTaught}
//             onChangeText={setHoursToBeTaught}
//             placeholder="Hours to be taught"
//             placeholderTextColor="#a0a0a0"
//             keyboardType="numeric"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Ionicons name="cash-outline" size={24} color="#ffffff" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             value={salary}
//             onChangeText={setSalary}
//             placeholder="Salary"
//             placeholderTextColor="#a0a0a0"
//             keyboardType="numeric"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//                   <Ionicons name="call" size={24} color="#ffffff" style={styles.icon} />
//                   <TextInput
//                     style={styles.input}
//                     value={phoneNumber}
//                     onChangeText={setPhoneNumber}
//                     placeholder="Phone Number"
//                     placeholderTextColor="#a0a0a0"
//                     keyboardType="numeric"
        
//                   />
//                 </View>
//       </ScrollView>

//       <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleSubmit}
//           onPressIn={onPressIn}
//           onPressOut={onPressOut}
//         >
//           <Ionicons name="checkmark" size={24} color="#4c669f" />
//         </TouchableOpacity>
//       </Animated.View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     paddingHorizontal: 20,
//     paddingTop: 40,
//     paddingBottom: 100,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255, 255, 255, 0.5)',
//   },
//   pickerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255, 255, 255, 0.5)',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     color: '#ffffff',
//     fontSize: 16,
//     paddingVertical: 10,
//   },
//   picker: {
//     flex: 1,
//     color: '#ffffff',
//   },
//   buttonContainer: {
//     position: 'absolute',
//     right: 20,
//     bottom: 20,
//   },
//   button: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#ffffff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 1,
//   },
// });

// export default StudentRegisterScreen;
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons, AntDesign } from '@expo/vector-icons';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// import { createTodoTask } from './firestore/create';
// import { auth } from './firebase';
// import { getFirestore, serverTimestamp } from 'firebase/firestore';

// const { width } = Dimensions.get('window');

// function StudentRegisterScreen({ navigation }) {
//   const [district, setDistrict] = useState('');
//   const [specificLocation, setSpecificLocation] = useState('');
//   const [studentClass, setStudentClass] = useState('');
//   const [stream, setStream] = useState('');
//   const [boardType, setBoardType] = useState('');
//   const [course, setCourse] = useState('');
//   const [subject, setSubject] = useState('');
//   const [hoursToBeTaught, setHoursToBeTaught] = useState('');
//   const [salary, setSalary] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
  

//   const buttonScale = useSharedValue(1);

//   const animatedButtonStyle = useAnimatedStyle(() => {
//     return {
//       transform: [{ scale: buttonScale.value }],
//     };
//   });

//   const handleStudentClassChange = (itemValue) => {
//     setStudentClass(itemValue);
//     if (itemValue === '11' || itemValue === '12') {
//       setStream('');
//       setBoardType('');
//     } else if (itemValue === 'bachelor' || itemValue === 'master') {
//       setCourse('');
//     }
//   };

//   const handleSubmit = () => {
//     if (district && specificLocation && studentClass && subject && hoursToBeTaught && salary) {
//       const uid = auth.currentUser.uid;
//       const name = auth.currentUser.displayName;
//       createTodoTask({
//         name,
//         district,
//         specificLocation,
//         class: studentClass,
//         subject,
//         hoursToTeach: hoursToBeTaught,
//         salary,
//         phoneNumber,
//         ownerId: uid,
//         timestamp: serverTimestamp()
//       });
//       console.log(serverTimestamp(), "server timestamp")
//       navigation.navigate('dashboard');
//     } else {
//       alert('Please fill all required fields');
//     }
//   };

//   const onPressIn = () => {
//     buttonScale.value = withSpring(0.95);
//   };

//   const onPressOut = () => {
//     buttonScale.value = withSpring(1);
//   };

//   return (
//     <LinearGradient
//       colors={['#4c669f', '#3b5998', '#192f6a']}
//       style={styles.container}
//     >
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <AntDesign name="arrowleft" size={24} color="#ffffff" />
//       </TouchableOpacity>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <Text style={styles.title}>Student Registration</Text>
        
//         <View style={styles.inputContainer}>
//           <Ionicons name="location-outline" size={24} color="#ffffff" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             value={district}
//             onChangeText={setDistrict}
//             placeholder="District"
//             placeholderTextColor="#a0a0a0"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Ionicons name="pin-outline" size={24} color="#ffffff" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             value={specificLocation}
//             onChangeText={setSpecificLocation}
//             placeholder="Specific Location"
//             placeholderTextColor="#a0a0a0"
//           />
//         </View>

//         <View style={styles.pickerContainer}>
//           <Ionicons name="school-outline" size={24} color="#ffffff" style={styles.icon} />
//           <Picker
//             selectedValue={studentClass}
//             onValueChange={handleStudentClassChange}
//             style={styles.picker}
//             dropdownIconColor="#ffffff"
//           >
//             <Picker.Item label="Select Class" value="" />
//             <Picker.Item label="UKG" value="ukg" />
//             <Picker.Item label="1" value="1" />
//             <Picker.Item label="2" value="2" />
//             <Picker.Item label="3" value="3" />
//             <Picker.Item label="4" value="4" />
//             <Picker.Item label="5" value="5" />
//             <Picker.Item label="6" value="6" />
//             <Picker.Item label="7" value="7" />
//             <Picker.Item label="8" value="8" />
//             <Picker.Item label="9" value="9" />
//             <Picker.Item label="10" value="10" />
//             <Picker.Item label="11" value="11" />
//             <Picker.Item label="12" value="12" />
//             <Picker.Item label="Bachelor" value="bachelor" />
//             <Picker.Item label="Master" value="master" />
//           </Picker>
//         </View>

//         {(studentClass === '11' || studentClass === '12') && (
//           <>
//             <View style={styles.pickerContainer}>
//               <Ionicons name="git-branch-outline" size={24} color="#ffffff" style={styles.icon} />
//               <Picker
//                 selectedValue={stream}
//                 onValueChange={setStream}
//                 style={styles.picker}
//                 dropdownIconColor="#ffffff"
//               >
//                 <Picker.Item label="Select Stream" value="" />
//                 <Picker.Item label="Science" value="science" />
//                 <Picker.Item label="Commerce" value="commerce" />
//                 <Picker.Item label="Arts" value="arts" />
//                 <Picker.Item label="Others" value="others" />
//               </Picker>
//             </View>

//             <View style={styles.pickerContainer}>
//               <Ionicons name="library-outline" size={24} color="#ffffff" style={styles.icon} />
//               <Picker
//                 selectedValue={boardType}
//                 onValueChange={setBoardType}
//                 style={styles.picker}
//                 dropdownIconColor="#ffffff"
//               >
//                 <Picker.Item label="Select Board" value="" />
//                 <Picker.Item label="NEB" value="neb" />
//                 <Picker.Item label="A-LEVEL" value="a-level" />
//                 <Picker.Item label="IB" value="ib" />
//                 <Picker.Item label="CBSE" value="cbse" />
//                 <Picker.Item label="Others" value="others" />
//               </Picker>
//             </View>
//           </>
//         )}

//         {(studentClass === 'bachelor' || studentClass === 'master') && (
//           <View style={styles.inputContainer}>
//             <Ionicons name="book-outline" size={24} color="#ffffff" style={styles.icon} />
//             <TextInput
//               style={styles.input}
//               value={course}
//               onChangeText={setCourse}
//               placeholder="Course"
//               placeholderTextColor="#a0a0a0"
//             />
//           </View>
//         )}

//         <View style={styles.inputContainer}>
//           <Ionicons name="book-outline" size={24} color="#ffffff" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             value={subject}
//             onChangeText={setSubject}
//             placeholder="Subject"
//             placeholderTextColor="#a0a0a0"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Ionicons name="time-outline" size={24} color="#ffffff" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             value={hoursToBeTaught}
//             onChangeText={setHoursToBeTaught}
//             placeholder="Hours to be taught"
//             placeholderTextColor="#a0a0a0"
//             keyboardType="numeric"
//           />
//         </View>

//         <View style={styles.inputContainer}>
//           <Ionicons name="cash-outline" size={24} color="#ffffff" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             value={salary}
//             onChangeText={setSalary}
//             placeholder="Salary"
//             placeholderTextColor="#a0a0a0"
//             keyboardType="numeric"
//           />
//         </View>
//         <View style={styles.inputContainer}>
//                   <Ionicons name="call" size={24} color="#ffffff" style={styles.icon} />
//                   <TextInput
//                     style={styles.input}
//                     value={phoneNumber}
//                     onChangeText={setPhoneNumber}
//                     placeholder="Phone Number"
//                     placeholderTextColor="#a0a0a0"
//                     keyboardType="numeric"
        
//                   />
//                 </View>
//       </ScrollView>

//       <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleSubmit}
//           onPressIn={onPressIn}
//           onPressOut={onPressOut}
//         >
//           <Ionicons name="checkmark" size={24} color="#4c669f" />
//         </TouchableOpacity>
//       </Animated.View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     flexGrow: 1,
//     paddingHorizontal: 20,
//     paddingTop: 40,
//     paddingBottom: 100,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255, 255, 255, 0.5)',
//   },
//   pickerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255, 255, 255, 0.5)',
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     color: '#ffffff',
//     fontSize: 16,
//     paddingVertical: 10,
//   },
//   picker: {
//     flex: 1,
//     color: '#ffffff',
//   },
//   buttonContainer: {
//     position: 'absolute',
//     right: 20,
//     bottom: 20,
//   },
//   button: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#ffffff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   backButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 1,
//   },
// });

// export default StudentRegisterScreen;


import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { createTodoTask } from './firestore/create';
import { auth } from './firebase';

const { width } = Dimensions.get('window');

function StudentRegisterScreen({ navigation }) {
  const [district, setDistrict] = useState('');
  const [specificLocation, setSpecificLocation] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [stream, setStream] = useState('');
  const [boardType, setBoardType] = useState('');
  const [course, setCourse] = useState('');
  const [subject, setSubject] = useState('');
  const [hoursToBeTaught, setHoursToBeTaught] = useState('');
  const [salary, setSalary] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  

  const buttonScale = useSharedValue(1);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleStudentClassChange = (itemValue) => {
    setStudentClass(itemValue);
    if (itemValue === '11' || itemValue === '12') {
      setStream('');
      setBoardType('');
    } else if (itemValue === 'bachelor' || itemValue === 'master') {
      setCourse('');
    }
  };

  const handleSubmit = () => {
    if (district && specificLocation && studentClass && subject && hoursToBeTaught && salary) {
      const uid = auth.currentUser.uid;
      const name = auth.currentUser.displayName;
      createTodoTask({
        name,
        district,
        specificLocation,
        class: studentClass,
        subject,
        hoursToTeach: hoursToBeTaught,
        salary,
        phoneNumber,
        ownerId: uid,
        timestamp: Date.now() // Use Date.now() instead of serverTimestamp()
      });
      navigation.navigate('dashboard');
    } else {
      alert('Please fill all required fields');
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
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="#ffffff" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Student Registration</Text>
        
        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={24} color="#ffffff" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={district}
            onChangeText={setDistrict}
            placeholder="District"
            placeholderTextColor="#a0a0a0"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="pin-outline" size={24} color="#ffffff" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={specificLocation}
            onChangeText={setSpecificLocation}
            placeholder="Specific Location"
            placeholderTextColor="#a0a0a0"
          />
        </View>

        <View style={styles.pickerContainer}>
          <Ionicons name="school-outline" size={24} color="#ffffff" style={styles.icon} />
          <Picker
            selectedValue={studentClass}
            onValueChange={handleStudentClassChange}
            style={styles.picker}
            dropdownIconColor="#ffffff"
          >
            <Picker.Item label="Select Class" value="" />
            <Picker.Item label="UKG" value="ukg" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
            <Picker.Item label="Bachelor" value="bachelor" />
            <Picker.Item label="Master" value="master" />
          </Picker>
        </View>

        {(studentClass === '11' || studentClass === '12') && (
          <>
            <View style={styles.pickerContainer}>
              <Ionicons name="git-branch-outline" size={24} color="#ffffff" style={styles.icon} />
              <Picker
                selectedValue={stream}
                onValueChange={setStream}
                style={styles.picker}
                dropdownIconColor="#ffffff"
              >
                <Picker.Item label="Select Stream" value="" />
                <Picker.Item label="Science" value="science" />
                <Picker.Item label="Commerce" value="commerce" />
                <Picker.Item label="Arts" value="arts" />
                <Picker.Item label="Others" value="others" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Ionicons name="library-outline" size={24} color="#ffffff" style={styles.icon} />
              <Picker
                selectedValue={boardType}
                onValueChange={setBoardType}
                style={styles.picker}
                dropdownIconColor="#ffffff"
              >
                <Picker.Item label="Select Board" value="" />
                <Picker.Item label="NEB" value="neb" />
                <Picker.Item label="A-LEVEL" value="a-level" />
                <Picker.Item label="IB" value="ib" />
                <Picker.Item label="CBSE" value="cbse" />
                <Picker.Item label="Others" value="others" />
              </Picker>
            </View>
          </>
        )}

        {(studentClass === 'bachelor' || studentClass === 'master') && (
          <View style={styles.inputContainer}>
            <Ionicons name="book-outline" size={24} color="#ffffff" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={course}
              onChangeText={setCourse}
              placeholder="Course"
              placeholderTextColor="#a0a0a0"
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Ionicons name="book-outline" size={24} color="#ffffff" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={subject}
            onChangeText={setSubject}
            placeholder="Subject"
            placeholderTextColor="#a0a0a0"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="time-outline" size={24} color="#ffffff" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={hoursToBeTaught}
            onChangeText={setHoursToBeTaught}
            placeholder="Hours to be taught"
            placeholderTextColor="#a0a0a0"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="cash-outline" size={24} color="#ffffff" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={salary}
            onChangeText={setSalary}
            placeholder="Salary"
            placeholderTextColor="#a0a0a0"
            keyboardType="numeric"
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
    paddingBottom: 100,
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
  pickerContainer: {
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
  picker: {
    flex: 1,
    color: '#ffffff',
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

export default StudentRegisterScreen;

