import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, FlatList, Image, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { createTodoTask } from './firestore/create';
import { auth } from './firebase';
import { pickImage, uploadToCloudinary } from './utils/cloudinary';

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

function StudentRegisterScreen({ navigation }) {
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
  const [studentClass, setStudentClass] = useState('');
  const [stream, setStream] = useState('');
  const [boardType, setBoardType] = useState('');
  const [course, setCourse] = useState('');
  const [subject, setSubject] = useState('');
  const [hoursToBeTaught, setHoursToBeTaught] = useState('');
  const [salary, setSalary] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  

  const buttonScale = useSharedValue(1);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const [classOpen, setClassOpen] = useState(false);
  const [streamOpen, setStreamOpen] = useState(false);
  const [boardOpen, setBoardOpen] = useState(false);

  const handleStudentClassChange = (itemValue) => {
    setStudentClass(itemValue);
    if (itemValue === '11' || itemValue === '12') {
      setStream('');
      setBoardType('');
    } else if (itemValue === 'bachelor' || itemValue === 'master') {
      setCourse('');
    }
  };

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

  const handleImagePick = async () => {
    const uri = await pickImage();
    if (uri) {
      setPhotoUri(uri);
    }
  };

  const handleSubmit = async () => {
    if (province && district && specificLocation && studentClass && subject && hoursToBeTaught && salary) {
      try {
        setUploading(true);
        const uid = auth.currentUser.uid;
        const name = auth.currentUser.displayName;
        
        // Upload photo if selected
        let photoURL = null;
        if (photoUri) {
          photoURL = await uploadToCloudinary(photoUri);
        }

        await createTodoTask({
          name,
          district,
          specificLocation,
          class: studentClass,
          subject,
          hoursToTeach: hoursToBeTaught,
          salary,
          phoneNumber,
          ownerId: uid,
          photoURL,
          timestamp: Date.now()
        });

        navigation.navigate('dashboard');
      } catch (error) {
        alert('Error submitting form: ' + error.message);
      } finally {
        setUploading(false);
      }
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

  const renderPhotoUpload = () => (
    <TouchableOpacity onPress={handleImagePick} style={styles.photoUploadContainer}>
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.photoPreview} />
      ) : (
        <View style={styles.photoPlaceholder}>
          <Ionicons name="camera" size={40} color="#ffffff" />
          <Text style={styles.photoPlaceholderText}>Add Photo</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderFormItem = ({ item }) => {
    switch (item.type) {
      case 'title':
        return <Text style={styles.title}>{item.content}</Text>;
      
      case 'photo':
        return renderPhotoUpload();
      
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

      case 'location':
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

      case 'class':
        return (
          <View style={[styles.pickerContainer, { zIndex: 4000 }]}>
            <Ionicons name="school-outline" size={24} color="#ffffff" style={styles.icon} />
            <DropDownPicker
              open={classOpen}
              setOpen={setClassOpen}
              value={studentClass}
              setValue={handleStudentClassChange}
              items={[
                { label: "Select Class", value: "" },
                { label: "UKG", value: "ukg" },
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
                { label: "6", value: "6" },
                { label: "7", value: "7" },
                { label: "8", value: "8" },
                { label: "9", value: "9" },
                { label: "10", value: "10" },
                { label: "11", value: "11" },
                { label: "12", value: "12" },
                { label: "Bachelor", value: "bachelor" },
                { label: "Master", value: "master" }
              ]}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              containerStyle={styles.dropdownContainerStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              placeholderStyle={styles.placeholderStyle}
              zIndex={4000}
            />
          </View>
        );

      case 'stream':
        return studentClass === '11' || studentClass === '12' ? (
          <View style={[styles.pickerContainer, { zIndex: 3000 }]}>
            <Ionicons name="git-branch-outline" size={24} color="#ffffff" style={styles.icon} />
            <DropDownPicker
              open={streamOpen}
              setOpen={setStreamOpen}
              value={stream}
              setValue={setStream}
              items={[
                { label: "Select Stream", value: "" },
                { label: "Science", value: "science" },
                { label: "Commerce", value: "commerce" },
                { label: "Arts", value: "arts" },
                { label: "Others", value: "others" }
              ]}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              containerStyle={styles.dropdownContainerStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              placeholderStyle={styles.placeholderStyle}
              zIndex={3000}
            />
          </View>
        ) : null;

      case 'board':
        return studentClass === '11' || studentClass === '12' ? (
          <View style={[styles.pickerContainer, { zIndex: 2000 }]}>
            <Ionicons name="library-outline" size={24} color="#ffffff" style={styles.icon} />
            <DropDownPicker
              open={boardOpen}
              setOpen={setBoardOpen}
              value={boardType}
              setValue={setBoardType}
              items={[
                { label: "Select Board", value: "" },
                { label: "NEB", value: "neb" },
                { label: "A-LEVEL", value: "a-level" },
                { label: "IB", value: "ib" },
                { label: "CBSE", value: "cbse" },
                { label: "Others", value: "others" }
              ]}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              containerStyle={styles.dropdownContainerStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              placeholderStyle={styles.placeholderStyle}
              zIndex={2000}
            />
          </View>
        ) : null;

      case 'course':
        return (studentClass === 'bachelor' || studentClass === 'master') ? (
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
        ) : null;

      case 'subject':
        return (
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
        );

      case 'hours':
        return (
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
        );

      case 'salary':
        return (
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
    { id: 'title', type: 'title', content: 'Student Registration' },
    { id: 'photo', type: 'photo' },
    { id: 'province', type: 'province' },
    { id: 'district', type: 'district' },
    { id: 'location', type: 'location' },
    { id: 'class', type: 'class' },
    { id: 'stream', type: 'stream' },
    { id: 'board', type: 'board' },
    { id: 'course', type: 'course' },
    { id: 'subject', type: 'subject' },
    { id: 'hours', type: 'hours' },
    { id: 'salary', type: 'salary' },
    { id: 'phone', type: 'phone' }
  ];

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      {uploading && (
        <View style={styles.uploadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.uploadingText}>Uploading photo...</Text>
        </View>
      )}
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
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    height: 50,
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
  photoUploadContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    borderStyle: 'dashed',
  },
  photoPlaceholderText: {
    color: '#ffffff',
    marginTop: 5,
    fontSize: 14,
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  uploadingText: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default StudentRegisterScreen;

