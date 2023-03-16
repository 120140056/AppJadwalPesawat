import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const rows = [
  { asal: 'JKT', tujuan: 'DPS', tanggal: '2022-05-15', merk: 'Elang'},
  { asal: 'JKT', tujuan: 'DPS', tanggal: '2022-05-16', merk: 'Elang'},
  { asal: 'JKT', tujuan: 'DPS', tanggal: '2022-05-16', merk: 'Tapis Air'},
  { asal: 'JKT', tujuan: 'DPS', tanggal: '2022-05-17', merk: 'Elang'},
  { asal: 'JKT', tujuan: 'DPS', tanggal: '2022-05-17', merk: 'Majapahit Air'},
];

// Halaman pertama
function Main({ navigation }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hiling.id</Text>
      <Text style={styles.ch2}>Lokasi Keberangkatan</Text>
      <TextInput
        style={styles.input}
        value={origin}
        onChangeText={text => setOrigin(text)}
        placeholder="Masukan lokasi keberangkatan"
      />
      <Text style={styles.ch2}>Lokasi Tujuan</Text>
      <TextInput
        style={styles.input}
        value={destination}
        onChangeText={text => setDestination(text)}
        placeholder="Masukan lokasi tujuan"
      />
      <Text style={styles.ch2}>Tanggal Keberangkatan</Text>
      <TextInput
        style={styles.input}
        value={departureDate}
        onChangeText={text => setDepartureDate(text)}
        placeholder="Masukan tanggal keberangkatan"
      />
      <Button
        title="Cari"
        onPress={() => {
          const filteredRows = rows.filter(row => row.asal === origin && row.tujuan === destination && row.tanggal === departureDate);
          navigation.navigate('SearchResult', { rows: filteredRows});
        }}
      />
      <Text style={styles.footer}>Copyright Christian-120140056</Text>
    </View>
  );
}

// Halaman kedua
function Result({ route }) {
  const { rows } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.ch1}>{item.asal} - {item.tujuan}</Text>
      <Text style={styles.ch2}>Tanggal : {item.tanggal}   Maskapai : {item.merk}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.footer}>Copyright Christian-120140056</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SearchMenu"
          component={Main}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="SearchResult"
          component={Result}
          options={{ title: 'Hiling.id' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 75,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    width: '80%',
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ch1: {
    fontWeight: 'bold',
    fontSize: 50,
    flex: 1,
    textAlign: 'center',
  },
  ch2: {
    color: '#666',
    textAlign: 'left',
  },
  footer: {
    padding: 20,
    textAlign: 'center',
    borderTopWidth: 1,
    bottom: 5,
    left: 5,
    right: 5,
    position: 'absolute',
  }
});