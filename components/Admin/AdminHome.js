import * as React from "react";
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, Image } from 'react-native';

export default function AdminHome({navigation}) {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [name, setName] = useState(null);

    const fetchAdmin = async () => {
        const url = "http://192.168.43.99:8080/soccer/api/fetchAdmin.php";
        try {
          const response = await fetch(url);
          if (response.ok) {
            const jsonData = await response.json();    
            setName(jsonData.name);
          } else {
            throw new Error("Request failed with status: " + response.status);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchAdmin();

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

    return(
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.welcomeText}>Welcome, {name}</Text>

            <View style={styles.bgImage}>
                {/* <Image
                    style={styles.image}
                    source={require('../../photo-1486286701208-1d58e9338013.jpeg')}
                /> */}
            </View>
            <View style={styles.background}>
            <View style={styles.dateAndTime}>
                <Text style={styles.dateText}>Today's date is: {date}</Text>
                <Text style={styles.timeText}>Time: {time}</Text>
             </View>
                <Text style={styles.descriptionText}>
                    Draw the side navigator or scroll down to manage and oversee the reservation and allocation of the field
                    with ease.
                </Text>
                <Text style={styles.descriptionText}>
                    You are in control of every aspect
                </Text>
            </View>
            <View style={styles.layer}>
                <View style={styles.upperLayer}>
                    <TouchableOpacity style={styles.bgView1} onPress={()=> navigation.navigate("DateTimeAllocation")}>
                        <Text style={styles.text}>Set up Date and Time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bgView2} onPress={()=> navigation.navigate("AllocatedDateTime")}>
                        <Text style={styles.text}>Allocated Date and Time</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.lowerLayer}>
                    <TouchableOpacity style={styles.bgView3} onPress={()=> navigation.navigate("ReservedTime")}>
                        <Text style={styles.text}>Reserved Allocation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bgView4} onPress={()=> navigation.navigate("UnreservedTime")}>
                        <Text style={styles.text}>Unreserved Allocation</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        width: 370,
        height: 320,
        marginTop: 100,
        marginBottom: 20,
        borderRadius: 30,
        backgroundColor: '#789c6c',
        // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    bgImage: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        marginBottom: 50,
        width: 370,
        height: 320,
    },
    image: {
        width: 370,
        height: 320,
        borderRadius: 30
    },
    dateAndTime: {
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: '#789c6c',
    },
    descriptionText: {
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
        color: 'white',
    },
    layer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    upperLayer: {
        flexDirection: 'row',
        marginBottom: 15,
        marginRight: 15,
    },
    lowerLayer: {
        flexDirection: 'row',
        marginRight: 15,

    },
    bgView1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
        margin: 10,
        padding: 20,
        borderRadius: 15,
        backgroundColor: '#789c6c',
        elevation: 3,
    },
    bgView2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
        margin: 10,
        padding: 20,
        borderRadius: 15,
        backgroundColor: '#3f4a3c',
        elevation: 3,
    },
    bgView3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
        margin: 10,
        padding: 20,
        borderRadius: 15,
        backgroundColor: '#8b8954',
        elevation: 3,
    },
    bgView4: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 180,
        margin: 10,
        padding: 20,
        borderRadius: 15,
        backgroundColor: '#91b585',
        elevation: 3,
    },
    text: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
    },
    dateText: {
        color: 'white',
        fontSize: 24,
        marginBottom: 5,
    },
    timeText: {
        color: 'white',
        fontSize: 24,
    },
});
