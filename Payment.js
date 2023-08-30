import React from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { View, TouchableOpacity, Text } from 'react-native';
import { useContext } from 'react';
import CustomerContext from './components/Customer/CustomerContext';
import { useState } from "react";
// import DateAndTimeContext from './components/Customer/DateAndTimeContext';

export default function Payment() {
  const [price,  setPrice] = useState(null);
    const { customerId, setCustomerId, customerName, setCustomerName, customerEmail, setCustomerEmail, selectedDate, setSelectedDate, selectedTime, setSelectedTime } = useContext(CustomerContext);
    // const { selectedDate, setSelectedDate, selectedTime, setselectedTime } = useContext(DateAndTimeContext);

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
    fetchPrice();

    async function reservation() {
    const url = "http://192.168.43.99:8080/soccer/api/reservation.php";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         customerId: customerId?.id,
          date: selectedDate?.date,
          time: selectedTime?.time,
          amountPaid: price
        }),
      });
    
      if (response.ok) {
        const jsonData = await response.json();
        // const jsonMessage = jsonData.message;
        }
      else {
        throw new Error('Request failed with status: ' + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
        <Paystack  
            paystackKey="pk_live_65b2bbe18d55af377b00dd78b3ad7c0541f93e12"
            // amount={'1000'}
            amount={price}
            currency='NGN'
            // billingEmail="yusuflawan982@gmail.com"
            billingEmail={customerEmail?.email}
            activityIndicatorColor="green"
            // onClose={(e) => {
            
            // }}
            onCancel={(e) => {
            // handle response here
            }}
            onSuccess={(res) => {
            // handle response here
            console.log('Payment succeeded:', res);
            reservation();
            }}
            autoStart={true}
            // autoStart={false}
        />     
    </View>
  );
}