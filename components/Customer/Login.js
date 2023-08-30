import * as React from "react";
import { useState } from "react";
import {useContext} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';


import CustomerContext from "./CustomerContext";

export default function Login({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { setCustomerName } = useContext(CustomerContext);
  const { setCustomerEmail } = useContext(CustomerContext);
  const { setCustomerId } = useContext(CustomerContext);


  const [emptyFieldError, setEmptyFieldError] = useState('');
  const [emailError, setEmailError] = useState('');


  async function userAuthentication() {
    const url = "http://192.168.43.99:8080/soccer/api/userLogin.php";
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const jsonData = await response.json();
        const jsonMessage = jsonData.message;
        // const jsonCustomerName = jsonData.customerName;
  
        // Perform further actions based on the response
        if (jsonMessage === "user exist") {
          // setCustomerName(jsonCustomerName);
          const customerId = jsonData.id;
          const customerName = jsonData.customerName; // Retrieve the customer's name from the API response
          const customerEmail = jsonData.email;
          // Update the customer information in the context
          setCustomerId({ id: customerId });
          setCustomerName({ name: customerName });
          setCustomerEmail({ email: customerEmail });
          
          navigation.navigate("CustomerHome");
        }
        else if (jsonMessage === "user does not exist") {
          setEmptyFieldError('');
          setEmailError('');
          setMessage(jsonMessage);
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
  const inputValidation = () => {
    if (email === '' || password === '') {
      setEmptyFieldError('please enter all fields');
      setMessage('');
    }
    else if(!email.includes('@') || email.includes(' ')){
      setEmailError('Invalid email');
      setMessage('');
      setEmptyFieldError('');
    }
    else{
      setEmailError('');
      setEmptyFieldError('');

      userAuthentication();
    }

  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.loginText}>Login</Text>
      </View>
      <Text style={styles.errorMessage}>{emptyFieldError}</Text>
      <Text style={styles.errorMessage}>{emailError}</Text>
      <Text style={styles.errorMessage}>{message}</Text>
        <TextInput
          placeholder={'Email…'}
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
        <TextInput
          placeholder={'Password…'}
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
        />
      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate("AdminLogin")} >           
          <Text>admin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signup} onPress={() => navigation.navigate("SignUp")} >
          <Text>signup</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={inputValidation} >
        <Text style={styles.buttonText}>login</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 40,
    marginBottom: 10
  },
  errorMessage: {
    color: 'red',
  },
  textInput: {
    width: 240,
    marginTop: 30,
    height: 40,
    paddingLeft: 10,
    borderRadius: 20,
    backgroundColor: '#ccc',
  },
  links: {
    width: 230,
    marginTop: 15,
    flexDirection: 'row',
  },
  signup: {
    marginLeft: 'auto',
  },
  button: {
    width: 150,
    height: 35,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#46693B',
    borderRadius: 20
  },
  buttonText: {
    color: '#ffffff',
  }
});