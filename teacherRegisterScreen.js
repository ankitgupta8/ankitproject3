import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import DropDownPicker from 'react-native-dropdown-picker';
import { createTodoTaskTeacher } from './firestore/create';
import { auth } from './firebase';

const { width } = Dimensions.get('window');

const nepal_districts = {
  "Province 1": ["Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang", "Morang", "Okhaldhunga", "Panchthar", "Sankhuwasabha", "Solukhumbu", "Sunsari", "Taplejung", "Terhathum", "Udayapur"],
  "Madhesh Province": ["Bara", "Dhanusha", "Mahottari", "Parsa", "Rautahat", "Saptari", "Sarlahi", "Siraha"],
  "Bagmati Province": ["Bhaktapur", "Chitwan", "Dhading", "Dolakha", "Kathmandu", "Kavrepalanchok", "Lalitpur", "Makwanpur", "Nuwakot", "Ramechhap", "Rasuwa", "Sindhuli", "Sindhupalchok"],
  "Gandaki Province": ["Baglung", "Gorkha", "Kaski", "Lamjung", "Manang", "Mustang", "Myagdi", "Nawalpur", "Parbat", "Syangja", "Tanahun"],
  "Lumbini Province": ["Arghakhanchi", "Banke", "Bardiya", "Dang", "Gulmi", "Kapilvastu", "Nawalparasi", "Palpa", "Pyuthan", "Rolpa", "Rukum (East)", "Rupandehi"],
  "Karnali Province": ["Dailekh", "Dolpa", "Humla", "Jajarkot", "Jumla", "Kalikot", "Mugu", "Rukum (West)", "Salyan", "Surkhet"],
  "Sudurpashchim Province": ["Achham", "Baitadi", "Bajhang", "Bajura", "Dadeldhura", "Darchula", "Doti", "Kailali", "Kanchanpur"]
};

function TeacherRegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [provinces] = useState(Object.keys(nepal_districts).map(prov => ({
    label: prov,
    value: prov
  })));
  const [districts, setDistricts] = useState([]);
  const [specificLocation, setSpecificLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [subject, setSubjectsToTeach] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const buttonScale = useSharedValue(1);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handleProvinceChange = (selectedProvince) => {
    setProvince(selectedProvince);
    setDistrict(null);
    if (selectedProvince) {
      setDistricts(nepal_districts[selectedProvince].map(dist => ({
        label: dist,
        value: dist
      })));
    } else {
      setDistricts([]);
    }
  };

  const handleSubmit = () => {
    if (name && district && specificLocation && experience && subject) {
      const uid = auth.currentUser.uid;
      createTodoTaskTeacher({
        name,
        location: district,
        specificLocation,
        experience,
        subject,
        phoneNumber,
        ownerId: uid
      });
      navigation.navigate('dashboard2');
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

  const renderFormItem = ({ item }) => {
    switch (item.type) {
      case 'title':
        return <Text style={styles.title}>{item.content}</Text>;
      
      case 'name':
        return (
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="#ffffff" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
              placeholderTextColor="#a0a0a0"
            />
          </View>
        );

      case 'province':
        return (
          <View style={[styles.dropdownContainer, { zIndex: 6000 }]}>
            <Ionicons name="location-outline" size={24} color="#ffffff" style={styles.icon} />
            <DropDownPicker
              open={provinceOpen}
              value={province}
              items={provinces}
              setOpen={setProvinceOpen}
              setValue={setProvince}
              onChangeValue={handleProvinceChange}
              placeholder="Select Province"
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              containerStyle={styles.dropdownContainerStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              placeholderStyle={styles.placeholderStyle}
              zIndex={6000}
            />
          </View>
        );
      
      case 'district':
        return (
          <View style={[styles.dropdownContainer, { zIndex: 5000 }]}>
            <Ionicons name="location-outline" size={24} color="#ffffff" style={styles.icon} />
            <DropDownPicker
              open={districtOpen}
              value={district}
              items={districts}
              setOpen={setDistrictOpen}
              setValue={setDistrict}
              placeholder="Select District"
              disabled={!province}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              containerStyle={styles.dropdownContainerStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              placeholderStyle={styles.placeholderStyle}
              zIndex={5000}
            />
          </View>
        );

      case 'specificLocation':
        return (
          <View style={styles.inputContainer}>
            <Ionicons name="pin-outline" size={24} color="#ffffff" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={specificLocation}
              onChangeText={setSpecificLocation}
              placeholder="Specific Location (Area, Tole, etc.)"
              placeholderTextColor="#a0a0a0"
            />
          </View>
        );

      case 'experience':
        return (
          <View style={styles.inputContainer}>
            <Ionicons name="time-outline" size={24} color="#ffffff" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={experience}
              onChangeText={setExperience}
              placeholder="Experience (years)"
              placeholderTextColor="#a0a0a0"
              keyboardType="numeric"
            />
          </View>
        );

      case 'subject':
        return (
          <View style={styles.inputContainer}>
            <Ionicons name="book-outline" size={24} color="#ffffff" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={setSubjectsToTeach}
              placeholder="Subjects to Teach"
              placeholderTextColor="#a0a0a0"
            />
          </View>
        );

      case 'phone':
        return (
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
        );

      default:
        return null;
    }
  };

  const formItems = [
    { id: 'title', type: 'title', content: 'Teacher Registration' },
    { id: 'name', type: 'name' },
    { id: 'province', type: 'province' },
    { id: 'district', type: 'district' },
    { id: 'specificLocation', type: 'specificLocation' },
    { id: 'experience', type: 'experience' },
    { id: 'subject', type: 'subject' },
    { id: 'phone', type: 'phone' }
  ];

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

      <FlatList
        data={formItems}
        renderItem={renderFormItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        scrollEnabled={true}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />

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
    position: 'relative',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 100,
    position: 'relative',
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
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    marginTop: 10,
  },
  dropdown: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    minHeight: 50,
    position: 'relative',
  },
  dropdownText: {
    color: '#ffffff',
    fontSize: 16,
  },
  dropdownContainerStyle: {
    height: 50,
  },
  dropDownContainerStyle: {
    backgroundColor: '#192f6a',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  placeholderStyle: {
    color: '#a0a0a0',
    fontSize: 16,
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

export default TeacherRegisterScreen;

