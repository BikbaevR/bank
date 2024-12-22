import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = ({ navigation }) => (
    <View style={styles.container}>
      <Button title="Ваш счёт" onPress={() => navigation.navigate('Account')} />
      <Button title="Помощь" onPress={() => navigation.navigate('Help')} />
      <Button title="Информация о пользователе" onPress={() => navigation.navigate('UserInfo')} />
    </View>
);

const AccountScreen = () => {
  const [balance, setBalance] = useState(1000);

  const handleTransaction = (type) => {
    Alert.prompt(
        type === 'Пополнить' ? 'Введите сумму для пополнения' : 'Введите сумму для снятия',
        '',
        (amount) => {
          const numericAmount = parseFloat(amount);
          if (!isNaN(numericAmount) && numericAmount > 0) {
            setBalance((prev) => (type === 'Пополнить' ? prev + numericAmount : prev - numericAmount));
          }
        }
    );
  };

  return (
      <View style={styles.container}>
        <Text>Ваш счёт: {balance}₽</Text>
        <Button title="Пополнить" onPress={() => handleTransaction('Пополнить')} />
        <Button title="Снять" onPress={() => handleTransaction('Снять')} />
      </View>
  );
};

const HelpScreen = () => (
    <View style={styles.container}>
      <Text>Рекомендации по использованию приложения.</Text>
    </View>
);

const UserInfoScreen = () => {
  const user = {
    name: 'Александров Александр Александрович',
    email: 'alex@gmail.com',
    phone: '+1234567890',
    address: 'Адрес',
  };

  return (
      <View style={styles.container}>
        <Text>Имя: {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Телефон: {user.phone}</Text>
        <Text>Адрес: {user.address}</Text>
      </View>
  );
};



const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" id="stack">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
          <Stack.Screen name="UserInfo" component={UserInfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
