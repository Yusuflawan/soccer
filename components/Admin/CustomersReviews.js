import * as React from "react";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';

export default function CustomersReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      const fetchReviewws = async () => {
        const url = "http://192.168.43.99:8080/soccer/api/fetchReviews.php";
  
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
  
          if (response.ok) {
            const jsonData = await response.json();
            setReviews(jsonData);
          } else {
            throw new Error('Request failed with status: ' + response.status);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchReviewws();
    }, []);
    return(
        <View style={styles.container}>
        <ScrollView>          
            <View>
              {reviews.map((review, index) => (
              <View style={styles.customerContainer} key={index}>
                  <Text style={styles.customerName}>{index + 1}. {review.firstName} {review.lastName}</Text>
                  <Text style={styles.customerPhone}>{review.review}</Text>
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
  