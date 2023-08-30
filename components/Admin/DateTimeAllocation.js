import React, { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";

export default function DateTimeAllocation() {
  const [dateTitle, setDateTitle] = useState('Select Date');
  const [isOkAndCancelVisible, setOkAndCancelVisibility] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHours, setSelectedHours] = useState([]);
  const [message, setMessage] = useState('');
  const [cancelPressed, setCancelPressed] = useState(false);
  const [okPressed, setOkPressed] = useState(false);

  const handlePress = () => {
    setDatePickerVisibility(false);
    setOkAndCancelVisibility(false);
    setCancelPressed(true); // Set the state when "Cancel" is pressed
    setTimeout(() => {
      setCancelPressed(false); // Reset the state after a brief delay
    }, 1000);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setOkAndCancelVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setOkAndCancelVisibility(false);
    setSelectedDate(null);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    setDateTitle("Selected date");
    setIsDisabled(false);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    return formattedDate;
  };

  const handleHourSelection = (hour) => {
    // setSelectedHour(hour);
        // Check if the hour is already selected
        const isSelected = selectedHours.includes(hour);

        // Toggle the selection by adding or removing the hour from the selectedHours array
        if (isSelected) {
          setSelectedHours((prevSelectedHours) =>
            prevSelectedHours.filter((selectedHour) => selectedHour !== hour)
          );
        } else {
          setSelectedHours((prevSelectedHours) => [...prevSelectedHours, hour]);
        }
  };

  const renderHourButtons = () => {
    const hours = Array.from({ length: 24 }, (_, index) => index); // Generate an array of 0 to 23

    return hours.map(hour => (
      <TouchableOpacity
        key={hour}
        style={[styles.btn, selectedHours.includes(hour) && styles.selectedHourButton,]}
        onPress={() => handleHourSelection(hour)}
        disabled={selectedDate === null ? true : false}
      >
        <Text style={[ styles.btnText, selectedHours.includes(hour) && styles.selectedHourtext]}>{hour}:00</Text>
      </TouchableOpacity>
    ));
  };

  const createNotificationWindow = () =>
  Alert.alert('', 'Date and Time hava been set successfully', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      // style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

  const createErrorWindow = () =>
  Alert.alert('', 'Date has already been selected before', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      // style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);

  const sendDateTime = async () => {
    const url = "http://192.168.43.99:8080/soccer/api/setDate.php";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          availableDate: selectedDate,
          availableTime: selectedHours,
        }),
      });
    
      if (response.ok) {
        const jsonResponse = await response.json();
        const jsonMessage = jsonResponse.message;
        setMessage(jsonMessage);

        if(jsonMessage === "The Date and Time hava been set successfully"){
          setSelectedDate(null);
          setSelectedHours([]);

          createNotificationWindow();
        }
        else if(jsonMessage === "Date has already been selected before"){
          setSelectedDate(null);
          setSelectedHours([]);
          createErrorWindow();
        }
        }
      else {
        throw new Error('Request failed with status: ' + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <View style={styles.responseMsg}>
          <Text>{message}</Text>
        </View> */}
        <View style={styles.date}>
            <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>{dateTitle}: </Text>
            <Text style={styles.dateButtonText}>{selectedDate}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.calenderView}>
            {isDatePickerVisible && (
            <DatePicker        
                mode='calendar'
                minimumDate={getCurrentDate()} // Set minimum date as the current date
                initialDate={getCurrentDate()} // Set initial date as the current date
                isVisible={isDatePickerVisible}
                onSelectedChange={handleConfirm}
                onCancel={hideDatePicker}
                options={{      
                    textHeaderColor: 'green',
                    textDefaultColor: 'green',
                    selectedTextColor: '#ffffff',
                    mainColor: 'green',
                    textSecondaryColor: 'green',
                }}
            />
            )}
        </View>
      {isOkAndCancelVisible && 
        <View style={styles.okandcancel}>
          <TouchableOpacity onPress={hideDatePicker}
            style={[
              styles.button,
              cancelPressed && styles.cancelPressed, // Apply style when cancelPressed is true
            ]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePress}
                      disabled={isDisabled}
                      style={[
                        styles.button,
                        okPressed && styles.okPressed, // Apply style when okPressed is true
                      ]}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      }
        <View style={styles.timeView}>
        {/* <Text></Text>
        <Text></Text> */}
            <Text style={styles.timeText}>Select Time</Text>
            <View style={styles.hourBtnContainer}>
                {renderHourButtons()}
            </View>
            {/* <Text>Selected Hours: {selectedHours.join(", ")}</Text> */}
            <View style={styles.submitBtnView}>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={sendDateTime}
                  disabled={selectedDate === null /*&& selectedHours == []*/ ? true : false}
                  >
                  <Text style={styles.submitText}>submit</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 50,
    backgroundColor: '#789c6c'
  },
  responseMsg: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    width: 300,
    marginLeft: 15,
    marginBottom: 20,
    marginTop: 40
  },
  dateButton: {
    marginTop: 70,
    flexDirection: 'row',

  },
  dateButtonText: {
    color: 'white',
    fontSize: 20,
  },
  calenderView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 'auto',
  },
  okandcancel: {
    flexDirection: 'row',
    width: 400,
    justifyContent: 'space-around',
    color: 'white'
  },
  buttonText: {
    marginTop: -30,
    marginRight: 20,
    color: "#789c6c",
  },
  timeView: {
    width: 350,
    height: 'auto',
    backgroundColor: '#EAFEE3',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 40,
    marginTop: 30
  },
  timeText: {
    color: '#789c6c',
    fontSize: 20,
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 20
  },
  btn: {
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#789c6c',
    borderRadius: 15,
    margin: 8,
  },
  btnText: {
    textAlign: 'center',
    color: '#789c6c',
  },
  selectedHourtext: {
    color: 'white',
  },
  hourBtnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  selectedHourButton: {
    backgroundColor: '#789c6c',
    color: 'white',
  },
  submitBtnView: {
    flex: 1,
    alignItems: 'center',
  },
  submitBtn: {
    width: 200,
    height: 50,
    backgroundColor: '#789c6c',
    borderRadius: 30,
    marginTop: 20,
  },
  submitText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18,
    marginTop: 10
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'transparent',
    marginTop: -30,
    margin: 8,
  },
  cancelPressed: {
    backgroundColor: 'red', // Change the background color when cancelPressed is true
  },
  okPressed: {
    backgroundColor: 'green', // Change the background color when okPressed is true
  },
});
