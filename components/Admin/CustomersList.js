import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const url = "http://192.168.43.99:8080/soccer/api/fetchCustomer.php";

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const jsonData = await response.json();
          setCustomers(jsonData);
        } else {
          throw new Error('Request failed with status: ' + response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

  if (customers.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <ScrollView>          
            <View>
              {customers.map((customer, index) => (
              <View style={styles.customerContainer} key={index}>
                  <Text style={styles.customerName}>{index + 1}. {customer.firstName} {customer.lastName}</Text>
                  <Text style={styles.customerPhone}>{customer.phone}</Text>
              </View>
              ))}
            </View>   
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  customerContainer: {
    marginVertical: .5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#789c6c',
    borderRadius: 5,
    elevation: 2, // For shadow (Android)
    shadowColor: '#000', // For shadow (iOS)
    shadowOpacity: 0.2, // For shadow (iOS)
    shadowOffset: { width: 0, height: 2 }, // For shadow (iOS)
  },
  customerName: {
    fontSize: 18,
    color: 'white',
  },
  customerPhone: {
    fontSize: 14,
    color: 'white',
    marginLeft: 15
  },
});
