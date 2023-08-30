import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, FlatList } from "react-native";
import { color } from "react-native-reanimated";

export default function UnreservedTime() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false); // New state to track refreshing state

  useEffect(() => {
    fetchAvailableDateTime();
  }, []);

  const fetchAvailableDateTime = async () => {
    const url = "http://192.168.43.99:8080/soccer/api/unreserved.php";
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

  const handleRefresh = () => {
    setIsRefreshing(true); // Set the refreshing state to true when refresh is triggered
    fetchAvailableDateTime(); // Call the fetchAvailableDateTime function to get updated data
    setIsRefreshing(false); // After the refresh operation is complete, set the refreshing state back to false
  };

const renderTimeItem = ({ item }) => {
    return (
        <View key={item.date} style={styles.dateItem}>
            <Text style={styles.dateText}>{item.date}</Text>
            {item.hours && (
                <View style={styles.timeContainer}>
                    {item.hours.map((time) => (
                        <TouchableOpacity key={time} style={styles.timeBtn}>
                            <Text style={styles.timeText}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

    return (
    <View style={styles.container}>
        <FlatList
        data={data}
        renderItem={renderTimeItem}
        keyExtractor={(item, index) => index.toString()} // Use the array index as the key
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        />
    </View>
    );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dateItem: {
    marginBottom: 16,
    backgroundColor: '#789c6c',

    borderRadius: 20,
    paddingBottom: 20,
  },
  dateText: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    color: '#ffffff'
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeText: {
    textAlign: 'center',
    paddingTop: 12,
    margin: 5,
    borderWidth: 1,
    color: '#ffffff',
    borderColor: "#789c6c",
    borderRadius: 15,
    width: 70,
    height: 40,
    backgroundColor: '#46693b',

  },
});
