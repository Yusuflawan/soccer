import { createContext, useState } from 'react';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customerName, setCustomerName] = useState(null);
  const [customerEmail, setCustomerEmail] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <CustomerContext.Provider value={{ customerId, setCustomerId, customerName, setCustomerName,  customerEmail, setCustomerEmail, selectedDate, setSelectedDate, selectedTime, setSelectedTime  } }>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext;
