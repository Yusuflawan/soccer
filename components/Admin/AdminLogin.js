import * as React from "react";
import { useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// import axios from "axios";

export default function AdminLogin({navigation}) {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const { setAdminName } = useContext(CustomerContext);

  const [message, setMessage] = useState('');
 
  const [emptyFieldError, setEmptyFieldError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [invalidAdminError, setInvalidAdminError] = useState('');


  async function getAdminDetails() {

    const url = "http://192.168.43.99:8080/soccer/api/adminLogin.php";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });
    
      if (response.ok) {
        const jsonData = await response.json();
        const jsonMessage = jsonData.message;

        if (jsonMessage == "admin unauthorized") {
          setMessage(jsonMessage);         
        }
        else {
          navigation.navigate("Admin");    
        }

        }
      else {
        throw new Error('Request failed with status: ' + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const inputValidation = () => {
    if (email === '' || username === '' || password === '') {
      setEmptyFieldError('please enter all fields');
      setMessage('');         
      setEmailError('');
    }
    else if(!email.includes('@') || email.includes(' ')) {
      setEmailError('Invalid email');
      setEmptyFieldError('');
      setMessage('');         
    }
    else {
      setEmptyFieldError('');
      setEmailError('');
      setEmptyFieldError('');
      setMessage('');         

      getAdminDetails();
      
    }
  }

  return (
    <View style={styles.container}>
    <View>
      <Text style={styles.loginText}>Admin Login</Text>
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
        placeholder={'Username...'}
        value={username}
        onChangeText={setUsername}
        style={styles.textInput}
      />
      <TextInput
        placeholder={'Password…'}
        value={password}
        onChangeText={setPassword}
        style={styles.textInput}
      />
    <TouchableOpacity style={styles.button} onPress={inputValidation}>
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