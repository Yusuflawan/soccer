import * as React from "react";
import { useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";


export default function SignUp({navigation}) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');

  const [message, setMessage] = useState('');

  const [emptyFieldError, setemptyFieldError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const formData = {
    firstName : firstName,
    lastName : lastName,
    email : email,
    phone : phone,
    password : password,
  };

  const createNotificationWindow = () =>
  Alert.alert('', 'user have added successfully, You can login now', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      // style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
    
    async function signup() {
      const url = 'http://192.168.43.99:8080/soccer/api/userSignup.php';
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(formData)
        });
    
        if (response.ok) {
          const jsonData = await response.json();
          const msg = jsonData.message;
          
          if (msg === "user added successfully") {
            createNotificationWindow();
            navigation.navigate("Login");
          }
          else if(msg === "this user already exist,try logging"){
            setMessage('this user already exist,try logging')
          }
        }
        else{
          throw new Error('Request failed with status: ' + response.status);
        }
      }
      catch (error) {
          console.error(error);
      }
  
    }

  // form validation function
    const inputValidation = () => {
    if (firstName === '' || lastName === '' || email === '' || phone === '' || password === '' || comfirmPassword === '') {
      setemptyFieldError('please enter all fields');
    }
    else if(!email.includes('@') || email.includes(' ')){
      setEmailError('Invalid email');
      setemptyFieldError('');
      setPasswordError('');
    }
    else if(password != comfirmPassword){
      setPasswordError('please your password should match');
      setemptyFieldError('');
      setEmailError('');
    }
    else{
      // setEmailError('');
      // setEmailError('');
      // setPasswordError('');
      signup();
      }
  }



  return (
    <View style={styles.container}>
    <ScrollView>
  <View>
      <Text style={styles.loginText}>Signup</Text>
      <Text style={styles.errorMessage}>{emptyFieldError}</Text>
      <Text style={styles.errorMessage}>{passwordError}</Text>
      <Text style={styles.errorMessage}>{message}</Text>
    </View>
      <TextInput
        placeholder={'first name'}
        value={firstName}
        // onChangeText={setFirstName}
        onChangeText={text =>  setFirstName(text)}
        style={styles.textInput}
      />
      <TextInput
        placeholder={'last name'}
        value={lastName}
        // onChangeText={setlastName}
        onChangeText={text =>  setLastName(text)}
        style={styles.textInput}
      />
      <TextInput
        placeholder={'email'}
        value={email}
        // onChangeText={setEmail}
        onChangeText={text =>  setEmail(text)}
        style={styles.textInput}
      />
      <TextInput
        placeholder={'phone'}
        keyboardType="numeric"
        value={phone}
        // onChangeText={setPhone}
        onChangeText={Number =>  setPhone(Number)}
        style={styles.textInput}
      />
      <TextInput
        placeholder={'password'}
        value={password}
        // onChangeText={setPassword}
        onChangeText={text =>  setPassword(text)}
        style={styles.textInput}
      />
      <TextInput
        placeholder={'confirm password'}
        value={comfirmPassword}
        // onChangeText={setComfirmPassword}
        onChangeText={text =>  setComfirmPassword(text)}
        style={styles.textInput}
      />
    <TouchableOpacity style={styles.button} onPress={inputValidation}>
      <Text style={styles.buttonText}>signup</Text>
    </TouchableOpacity>
  </ScrollView>
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
    marginTop: 50,
    marginLeft: 50,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
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
    marginLeft: 50,
    height: 35,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 20
  },
  buttonText: {
    color: '#ffffff',
  }
});