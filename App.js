import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Searchbar, Button } from 'react-native-paper';
import { getAuth, signOut } from "firebase/auth";
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import your existing screens
import SignUpScreen from './signUpScreen';
import StudentRegisterScreen from './studentRegisterScreen.js';
import SignInScreen from './signinscreen.js';
import DashBoard from './DashBoard';
import StudentsRequest from './studentRequests';
import DashBoard2 from './Dashboard2';
import TeacherRequest from './teacherRequests';
import TeacherRegisterScreen from './teacherRegisterScreen';
import LandingPage from './initApp';
import ChooseRoleScreen from './ChooseRoleScreen.js';
import { Directions, TouchableOpacity } from 'react-native-gesture-handler';

const auth = getAuth();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const { width } = Dimensions.get('window');

function SearchTutorScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Location"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        style={styles.searchBar}
      />
      <Button mode="contained" onPress={() => navigation.navigate('TutorResults')} style={styles.button}>
        Search
      </Button>
    </View>
  );
}
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
function StudentScreen() {
  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <Stack.Navigator>
      <Stack.Screen name="dashboard" component={DashBoard} options={{headerShown: false}} />
      <Stack.Screen name="Sregistration" component={StudentRegisterScreen} options={{
        headerShown: false,
        transitionSpec: {
          open: config,
          close: config,
        },
        }} />
    </Stack.Navigator>
  );
}

function TeacherScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="dashboard2" component={DashBoard2} options={{headerShown: false}} />
      <Stack.Screen name="Tregistration" component={TeacherRegisterScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function TabBar({ state, descriptors, navigation }) {
  const translateX = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = withTiming(state.index * (width / state.routes.length), { duration: 300 });
  }, [state.index]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.tabBar}>
      <Animated.View style={[styles.slider, animatedStyle]} />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabItem}
          >
            <AnimatedIcon
              name={options.tabBarIcon({ focused: isFocused, color: '', size: 24 }).props.name}
              size={24}
              color={isFocused ? '#4c669f' : '#b3b3b3'}
              style={[
                styles.icon,
                { transform: [{ scale: isFocused ? 1.2 : 1 }] },
              ]}
            />
            <Text style={[styles.label, { color: isFocused ? '#4c669f' : '#b3b3b3' }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function StudentTabScreen() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen 
        name="TeacherRequest" 
        component={TeacherRequest} 
        options={{
          tabBarLabel: 'Find Teacher',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="account-search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="StudentRegister" 
        component={StudentScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function TeacherTabScreen() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen 
        name="StudentsRequest" 
        component={StudentsRequest} 
        options={{
          tabBarLabel: 'Find Students',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="account-search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="TeacherRegister" 
        component={TeacherScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} options={{headerShown: false}} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen 
          name="ChooseRole" 
          component={ChooseRoleScreen} 
          options={({navigation}) => ({
            headerShown: false, 
            headerLeft: () => (
              <Button 
                icon="arrow-left" 
                onPress={() => navigation.navigate('LandingPage')}
                color="#4c669f"
              />
            )
          })} 
        />
        <Stack.Screen 
          name="StudentDashboard" 
          component={StudentTabScreen}  
          options={{
            headerShown: true,
            headerTitle: 'Student Dashboard',
            headerStyle: styles.header,
            headerTintColor: '#fff',
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <Stack.Screen 
          name="TeacherDashboard" 
          component={TeacherTabScreen}  
          options={{
            headerShown: true,
            headerTitle: 'Teacher Dashboard',
            headerStyle: styles.header,
            headerTintColor: '#fff',
            headerTitleStyle: styles.headerTitle,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4c669f',
  },
  header: {
    backgroundColor: '#4c669f',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#ffffff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: width / 5,
    backgroundColor: '#4c669f',
  },
});

export default App;