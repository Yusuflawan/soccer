import * as React from "react";
import { useState } from "react";
import {useContext} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import Textarea from "react-native-textarea/src/Textarea";
import CustomerContext from './CustomerContext';


// import CustomerContext from "./CustomerContext";
export default function Contact() {
    const { customerId, setCustomerId, customerName, setCustomerName, customerEmail, setCustomerEmail, } = useContext(CustomerContext);

    const [review,  setReview] = useState(null);
    const [emptyReview,  setEmptyReview] = useState(null);
    const [returnMessage,  setMessage] = useState(null);
    const [location,  setLocation] = useState(null);
    const [name,  setName] = useState(null);
    const [email,  setEmail] = useState(null);
    const [phone,  setPhone] = useState(null);

    
    
  async function sendinReview() {

    const url = "http://192.168.43.99:8080/soccer/api/sendReview.php";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            review: review,
          customerId: customerId?.id
        }),
      });
    
    if (response.ok) {
        const jsonData = await response.json();
        const jsonMessage = jsonData.message;
        setMessage(jsonMessage);

        // if (jsonMessage == "review sent successfully") {
        //   setMessage(jsonMessage);         
        // }
    }
      else {
        throw new Error('Request failed with status: ' + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchField = async () => {
    const url = "http://192.168.43.99:8080/soccer/api/field.php";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();    
        setLocation(jsonData.location);
        setName(jsonData.name);
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  fetchField();

  const fetchEmailAndPhone = async () => {
    const url = "http://192.168.43.99:8080/soccer/api/fetchAdmin.php";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();    
        setPhone(jsonData.phone);
        setEmail(jsonData.email);
        // setPrice(jsonData.price);
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  fetchEmailAndPhone();

  const notificationWindow = () => {
      Alert.alert('', 'Your Review has been sent successfully \n Thank You!', [
        {
          text: 'Ok',
          onPress: () => console.log('Ok pressed'),
        },
      ]);
  };

const handleReview = () => {
    if (!review) {
        setEmptyReview('Cannot send an empty review');
    } else {
        setEmptyReview(''); // Clear the emptyReview message
        sendinReview(); // Call the function to send the review
        setReview('');
        notificationWindow();
    }
}


    return(
    <View>
        <View style={styles.layer1}>
            <Text style={styles.cName}>{name}</Text>
            <Text style={styles.cLocation}>location: {location}</Text>
            <Text style={styles.cEmail}>email: {email}</Text>
            <Text style={styles.cPhone}>phone: {phone}</Text>
        </View>

        <Text style={styles.errMsg}>{emptyReview}</Text>
        <View style={styles.textareaView}>
            <Textarea
                containerStyle={styles.TextareaContainer}
                style={styles.Textarea}
                placeholder={'send a review/recommendation…'}
                // placeholderTextColor={'gray'}
                maxLength={200}
                underlineColorAndroid={'gray'}
                value={review}
                onChangeText={setReview}
            />
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleReview}>
            <Text style={styles.btnText}>send</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    errMsg: {
        marginTop: 20,
        marginLeft: 20,
        marginBottom: -10,
        color: 'maroon',
    },
    layer1: {
        backgroundColor: '#46693B',
        borderRadius: 15,
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 20,
        paddingBottom: 20
    },
    cName: {
        fontSize: 40,
        margin: 20,
        color: 'white'
    },
    cLocation: {
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20,
        color: 'white'
    },
    cEmail: {
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20,
        color: 'white'
    },
    cPhone: {
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20,
        color: 'white'
    },
    textareaView: {
        marginRight: 30
    },
    TextareaContainer: {
        marginTop: 20,
        marginBottom: 20,
        marginRight: 30,
        marginLeft: 15,
        borderRadius: 15,
        height: 150,
        padding: 10,
        backgroundColor: 'white',
    },
    Textarea: {
        textAlignVertical: 'top',
        height: 120,
        fontSize: 20,
        color: 'gray'
    },

    btn: {
        marginLeft: 15,
        marginRight: 15,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#46693B',
    },
    btnText: {
        color: 'white',
        marginTop: 12,
        textAlign: 'center',
        fontSize: 20
    }
})