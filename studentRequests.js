import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, RefreshControl, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, Button, Chip, Portal, Modal, List, Provider as PaperProvider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import TutorCard from './cardComp';
import { fetchWholeTodoListStudent } from './firestore/read';
import { auth } from './firebase';

const { width, height } = Dimensions.get('window');
const user = auth.currentUser;

export default function StudentsRequest() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [district, setDistrict] = useState('');
  const [sortNewest, setSortNewest] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [availableLocations, setAvailableLocations] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  async function getMyFiles() {
    const result = await fetchWholeTodoListStudent();
    const myTodos = result.docs.map((d) => ({ docId: d.id, ...d.data() }));
    setData(myTodos);
    
    // Extract unique locations
    const locations = [...new Set(myTodos.map(item => item.district))].filter(Boolean);
    setAvailableLocations(locations);
    
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
        item.district === district
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

  const selectLocation = (location) => {
    setDistrict(location);
    setShowLocationModal(false);
  };

  const clearLocation = () => {
    setDistrict('');
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.container}
        >
          <View style={styles.filterContainer}>
            <View style={styles.filterButtonContainer}>
              <Button
                mode="contained"
                onPress={() => setShowLocationModal(true)}
                style={styles.filterButton}
                labelStyle={styles.buttonLabel}
              >
                {district || 'Select Location'}
              </Button>
              {district && (
                <Button
                  mode="text"
                  onPress={clearLocation}
                  style={styles.clearButton}
                  textColor="#fff"
                  labelStyle={styles.buttonLabel}
                >
                  Clear
                </Button>
              )}
            </View>
            <Chip
              selected={sortNewest}
              onPress={toggleSort}
              style={styles.chip}
              labelStyle={styles.chipLabel}
            >
              {sortNewest ? 'Newest' : 'Default'}
            </Chip>
          </View>

          <Portal>
            <Modal
              visible={showLocationModal}
              onDismiss={() => setShowLocationModal(false)}
              contentContainerStyle={styles.modalContent}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Location</Text>
                <Button onPress={() => setShowLocationModal(false)}>Close</Button>
              </View>
              <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalScrollContent}>
                {availableLocations.map((location) => (
                  <List.Item
                    key={location}
                    title={location}
                    onPress={() => selectLocation(location)}
                    style={styles.locationItem}
                    titleStyle={styles.locationText}
                  />
                ))}
              </ScrollView>
            </Modal>
          </Portal>

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
                  photoURL={e.photoURL}
                />
              ))
            )}
          </Animated.ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  filterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  filterButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#192f6a',
  },
  buttonLabel: {
    fontSize: Math.min(width * 0.035, 14),
    paddingHorizontal: 4,
  },
  clearButton: {
    marginRight: 8,
  },
  chip: {
    backgroundColor: '#fff',
    height: 32,
  },
  chipLabel: {
    fontSize: Math.min(width * 0.035, 14),
  },
  modalContent: {
    backgroundColor: 'white',
    margin: width * 0.05,
    padding: 16,
    borderRadius: 8,
    maxHeight: height * 0.7,
    width: width * 0.9,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#192f6a',
  },
  modalScroll: {
    maxHeight: height * 0.6,
  },
  modalScrollContent: {
    paddingVertical: 8,
  },
  locationItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  locationText: {
    fontSize: Math.min(width * 0.04, 16),
    color: '#192f6a',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: height * 0.3,
  },
  loadingText: {
    marginTop: 10,
    fontSize: Math.min(width * 0.045, 18),
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

