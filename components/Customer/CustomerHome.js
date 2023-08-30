// import * as React from "react";
import React, { useContext, useEffect, useState } from 'react';
import CustomerContext from './CustomerContext';
import Payment from "../../Payment";

import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Button, FlatList, Alert, } from 'react-native';
import { color } from 'react-native-reanimated';

export default function CustomerHome({navigation}) {
    const { customerId, setCustomerId, customerName, setCustomerName, customerEmail, setCustomerEmail, selectedDate, setSelectedDate, selectedTime, setselectedTime } = useContext(CustomerContext);

    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    // const [reservedDate, setreservedDate] = useState(null);
    // const [reservedTime, setReservedTime] = useState(null);
    const [reservation, setReservation] = useState(null);

    const getCurrentDate = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();
        setDate(formattedDate);
        setTime(formattedTime);
      };
      
      useEffect(() => {
        getCurrentDate();
        
        // Update time every second
        const intervalId = setInterval(() => {
            getCurrentDate();
        }, 1000);
        
        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);


    async function customerReservation() {
        const url = "http://192.168.43.99:8080/soccer/api/fetchReservation.php";
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerId : customerId?.id
            }),
          });
      
          if (response.ok) {
            const jsonData = await response.json();
            let returnedMsg = jsonData.message;
            if (returnedMsg === "You have no reservation yet") {
                setReservation(returnedMsg);
            }
            else {
                let reservationInfo = "";

                for (const reservation of jsonData.message) {
                    const reservedDate = reservation.reservedDate;
                    const reservedTime = reservation.reservedTime;

                    reservationInfo +=  `${reservedDate} by ${reservedTime} \n \n`;
                }

                setReservation(`You have the following Reservation:\n \n` + reservationInfo);
            }
          }
          else {
            throw new Error('Request failed with status: ' + response.status);
          }
        }
        catch (error) {
          console.error(error);
          // Handle network or other errors
        }
      }
      
      useEffect(() => {
        // Call the function to fetch and display reservations
        customerReservation();
    }, []); // Empty dependency array means this effect runs once after the component mounts

    


    return(
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.layer}>
                    <Text style={styles.hName}> Hello, {customerName?.name}</Text>
                    {/* <Text style={styles.name}> {customerName?.name} </Text> */}
                    <Text style={styles.welcomeText}>Welcome to BradFror Football field</Text>
                    <Text style={styles.subName}>Find your passion for the game and make your soccer dreams come true.</Text>
                    <Text style={styles.subName}></Text>
                </View>
                <View style={styles.secLayer}>
                    {/* <Text style={styles.sLText}>Draw the side navigator or click the button below to enjoy our services</Text> */}
                    <Text style={styles.sLText}>{reservation}</Text>
                    <View style={styles.dateAndTime}>
                        <Text style={styles.dateText}>Today's date is: {date}</Text>
                        <Text style={styles.timeText}>Time: {time}</Text>
                    </View>
                </View>
                {/* <View style={styles.btnView}> */}
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Make Reservation")}>
                        <Text style={styles.btnText}>Make Reservation Now</Text>
                    </TouchableOpacity>
                {/* </View> */}
                </ScrollView>
            </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
    },
    layer: {
        backgroundColor: '#46693B',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        padding: 10,
    },
    hName: {
        fontSize: 40,
        marginTop: 20,
        marginLeft: 10,
        color: 'white'
    },
    name: {
        fontSize: 40,
        marginLeft: 40,
        color: 'white'
    },
    welcomeText: {
        marginTop: 10,
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    subName: {
        marginTop: 10,
        marginLeft: 20,
        color: 'white',
        textAlign: 'center'
    },
    secLayer: {
        marginTop: 20,
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 30,
        paddingBottom: 20,
        borderRadius: 15,
    },
    sLText: {
        color: 'gray',
        textAlign: 'center',
        fontSize: 20
    },
    dateAndTime: {
        marginBottom: 25,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText: {
        color: 'gray',
        fontSize: 24,
        marginBottom: 5,
    },
    timeText: {
        color: 'gray',
        fontSize: 24,
    },
    btn: {
        height: 50,
        borderRadius: 15,
        backgroundColor: '#46693B',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 18,
    },

});
