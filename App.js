
import 'react-native-gesture-handler';
// import 'react-native-reanimated';

import React from "react";
// import * as React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CustomerProvider } from './components/Customer/CustomerContext';
// import DateAndTimeContext from './components/Customer/DateAndTimeContext';
// import { CustomerProvider } from './components/Customer/DateAndTimeContext';

// import MainNavigator from './MainNavigator';


import Login from './components/Customer/Login';
import SignUp from './components/Customer/SignUp';
import CustomerHome from './components/Customer/CustomerHome';
// import Review from './components/Customer/Review';
import AvailableDateTime from './components/Customer/AvailableDateTime';
import Contact from './components/Customer/Contact';

import AdminLogin from './components/Admin/AdminLogin';
import AdminHome from './components/Admin/AdminHome';
import CustomersList from './components/Admin/CustomersList';
import CustomersReviews from './components/Admin/CustomersReviews';
import AllocatedDateTime from './components/Admin/AllocatedDateTime';
import DateTimeAllocation from './components/Admin/DateTimeAllocation';
import ReservedTime from './components/Admin/ReservedTime';
import UnreservedTime from './components/Admin/UnreservedTime';
import Logout from './components/Admin/Logout';

import WelcomePage from './WelcomePage';

// import { useContext } from 'react';
// import CustomerContext from './components/Customer/CustomerContext';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {

  createAdminDrawer = () =>
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#789c6c',
        width: 240,
        borderRadius: 10,
      },
      drawerActiveBackgroundColor: '#46693b',
        drawerActiveTintColor: '#789c6c',
      drawerInactiveTintColor: 'white',
      drawerItemStyle: {
        marginBottom: 5,
      },
    }}
  > 
    <Drawer.Screen name="Home" component={AdminHome} 
        options={{
          drawerLabelStyle: {
            color: 'white',
          },
        }}
    />
    <Drawer.Screen name="Customers" component={CustomersList}
      options={{
        drawerLabelStyle: {
          color: 'white',
        },
      }}
    />
    <Drawer.Screen name="Reviews" component={CustomersReviews}
      options={{
        drawerLabelStyle: {
          color: 'white',
        },
      }}
    />
    <Drawer.Screen name="Set up Date and Time" component={DateTimeAllocation}
      options={{
        drawerLabelStyle: {
          color: 'white',
        },
      }}
    />
    <Drawer.Screen name="Allocated Date and Time" component={AllocatedDateTime}
      options={{
        drawerLabelStyle: {
          color: 'white',
        },
      }}
    />
    <Drawer.Screen name="Reserved Allocation" component={ReservedTime}
      options={{
        drawerLabelStyle: {
          color: 'white',
        },
      }}
    />
    <Drawer.Screen name="Unreserved Allocation" component={UnreservedTime}
      options={{
        drawerLabelStyle: {
          color: 'white',
        },
      }}
    />
    <Drawer.Screen name="Logout" component={Logout}
      options={{
        drawerLabelStyle: {
          color: 'white',
        },
      }}
      />
    </Drawer.Navigator>

createCustomerDrawer = () => 
  <Drawer.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#789c6c',
        width: 240,
        borderRadius: 10,
      },
      drawerActiveBackgroundColor: '#46693b',
        drawerActiveTintColor: '#789c6c',
      drawerInactiveTintColor: 'white',
      drawerItemStyle: {
        marginBottom: 5,
      },
    }}
  >
    <Drawer.Screen name="Home" component={CustomerHome}
            options={{
              drawerLabelStyle: {
                color: 'white',
              },
            }}
    />
    <Drawer.Screen name="Make Reservation" component={AvailableDateTime}
            options={{
              drawerLabelStyle: {
                color: 'white',
              },
            }}
    />
    <Drawer.Screen name="contact" component={Contact}
      options={{
        drawerLabelStyle: {
          color: 'white',
        },
      }}
    />
    <Drawer.Screen name="Logout" component={Logout}
      options={{
        drawerLabelStyle: {
          color: 'white',
        },
      }}
      />
  </Drawer.Navigator>

  return(
    <CustomerProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="WelcomePage"
        component={WelcomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdminLogin"
        component={AdminLogin}
        options={{headerShown: false}}
        // options={{title: 'Welcome'}}
      />
      <Stack.Screen
        name="Admin"
        children={createAdminDrawer}
        options={{headerShown: false}}
        
        // options={{title: 'Welcome'}}
      />
      <Stack.Screen
        name="Home"
        component={AdminHome}
        options={{headerShown: false}}
       />      
      <Stack.Screen
        name="CustomersList"
        component={CustomersList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomersReviews"
        component={CustomersReviews}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllocatedDateTime"
        component={AllocatedDateTime}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DateTimeAllocation"
        component={DateTimeAllocation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReservedTime"
        component={ReservedTime}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UnreservedTime"
        component={UnreservedTime}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CustomerHome"
        children={createCustomerDrawer}
        options={{headerShown: false}}
      // options={{title: 'Welcome'}}
      />
      <Stack.Screen
        name="AvailableDateTime"
        component={UnreservedTime}
        options={{headerShown: false}}
      />
      </Stack.Navigator>
    </NavigationContainer>
    </CustomerProvider>
  );
};



