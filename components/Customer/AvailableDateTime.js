import React, { useEffect, useState, createContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, FlatList } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// import { useFocusEffect } from "@react-navigation/native";
import Payment from "../../Payment";
import {useContext} from "react";
import CustomerContext from "./CustomerContext";
// import DateAndTimeContext from './components/Customer/DateAndTimeContext';


export default function AvailableDateTime() {

  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false); // New state to track refreshing state
  const [showPayment, setShowPayment] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [price, setPrice] = useState(null);

  const { setSelectedDate } = useContext(CustomerContext);
  const { setSelectedTime } = useContext(CustomerContext);



  useEffect(() => {
    fetchAvailableDateTime();
    fetchPrice();

  }, []);

  const fetchAvailableDateTime = async () => {
    const url = "http://192.168.43.99:8080/soccer/api/fetchAvailableDateTime.php";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleProceed();
    fetchPrice();
  }, [date, time]); // This will call handleProceed whenever date or time changes

  const fetchPrice = async () => {
    const url = "http://192.168.43.99:8080/soccer/api/field.php";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();    
        setPrice(jsonData.price);
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProceed = () => {
    if (date && time) {
      Alert.alert('', `You are about to reserve the following \n Date: ${date} \n Time: ${time} \n At a cost of: ${price}`, [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel pressed'),
        },
        {
          text: 'Proceed',
          onPress: () => {
            setShowPayment(true); // Call the payment gateway
          },
        },
      ]);
    }
    else {
      Alert.alert('', 'Please select a date and time of your choice to proceed.');
    }
  };

  const handleTimePress = (selectedDate, selectedTime) => {
    setDate(selectedDate);
    setTime(selectedTime);
    setSelectedDate({ date: selectedDate });
    setSelectedTime({ time: selectedTime });
    fetchPrice();
    handleProceed();
  };
  
  const handleRefresh = () => {
    setIsRefreshing(true); // Set the refreshing state to true when refresh is triggered
    fetchAvailableDateTime(); // Call the fetchAvailableDateTime function to get updated data
    setShowPayment(false);
    setIsRefreshing(false); // After the refresh operation is complete, set the refreshing state back to false
    setDate(null);
    setTime(null);
  };

  const renderTimeItem = ({ item }) => {
    return (
      <View key={item.date} style={styles.dateItem}>
        <Text style={styles.dateText}>{item.date}</Text>
        <View style={styles.timeContainer}>
          {item.timeData.map((time) => (
            <TouchableOpacity key={time} style={styles.timeBtn}  onPress={() => handleTimePress(item.date, time)}>
              <Text style={styles.timeText}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };


return (
  <View style={styles.container}>
    <Text></Text>
    <FlatList
      data={data}
      renderItem={renderTimeItem}
      keyExtractor={(item, index) => index.toString()} // Use the array index as the key
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    />
    {showPayment && <Payment/>}
  </View>
);

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
    // padding: 16,
  },
  dateItem: {
    marginBottom: 16,
    backgroundColor: '#789c6c',
    borderRadius: 20,
    paddingBottom: 20,
  },
  dateText: {
    fontSize: 18,
    color: 'white',
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 10,
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeBtn: {

  },
  timeText: {
    textAlign: 'center',
    color: 'white',
    paddingTop: 12,
    margin: 5,
    borderWidth: 1,
    borderColor: "#EAFEE3",
    borderRadius: 15,
    width: 70,
    height: 40
  },

});
