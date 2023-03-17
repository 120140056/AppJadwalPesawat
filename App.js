import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TextInput, Button, FlatList, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// data dummy
const rows = [
  { asal: 'CGK', tujuan: 'DPS', tanggal: '2023-03-20', merk: 'Garuda Indonesia' },
  { asal: 'DPS', tujuan: 'CGK', tanggal: '2023-03-22', merk: 'Citilink' },
  { asal: 'SUB', tujuan: 'CGK', tanggal: '2023-03-23', merk: 'Lion Air' },
  { asal: 'CGK', tujuan: 'UPG', tanggal: '2023-03-24', merk: 'Batik Air' },
  { asal: 'BTH', tujuan: 'CGK', tanggal: '2023-03-25', merk: 'Garuda Indonesia' },
  { asal: 'CGK', tujuan: 'PNK', tanggal: '2023-03-26', merk: 'Sriwijaya Air' },
  { asal: 'PLM', tujuan: 'CGK', tanggal: '2023-03-27', merk: 'Citilink' },
  { asal: 'CGK', tujuan: 'KNO', tanggal: '2023-03-28', merk: 'Lion Air' },
  { asal: 'DPS', tujuan: 'SUB', tanggal: '2023-03-29', merk: 'Garuda Indonesia' },
  { asal: 'CGK', tujuan: 'PKU', tanggal: '2023-03-30', merk: 'Batik Air' },
  { asal: 'KNO', tujuan: 'CGK', tanggal: '2023-04-01', merk: 'Sriwijaya Air' },
  { asal: 'UPG', tujuan: 'CGK', tanggal: '2023-04-03', merk: 'Lion Air' },
  { asal: 'CGK', tujuan: 'BTH', tanggal: '2023-04-04', merk: 'Garuda Indonesia' },
  { asal: 'PNK', tujuan: 'CGK', tanggal: '2023-04-06', merk: 'Citilink' },
  { asal: 'CGK', tujuan: 'PLM', tanggal: '2023-04-08', merk: 'Lion Air' },
  { asal: 'SUB', tujuan: 'DPS', tanggal: '2023-04-09', merk: 'Batik Air' },
  { asal: 'CGK', tujuan: 'DPS', tanggal: '2023-04-11', merk: 'Sriwijaya Air' },
  { asal: 'PKU', tujuan: 'CGK', tanggal: '2023-04-12', merk: 'Garuda Indonesia' },
  { asal: 'CGK', tujuan: 'KNO', tanggal: '2023-04-14', merk: 'Citilink' },
  { asal: 'DPS', tujuan: 'SUB', tanggal: '2023-04-15', merk: 'Lion Air' }
];

const Bandara = [
  { kode: 'CGK', nama: 'Soekarno-Hatta International Airport' },
  { kode: 'DPS', nama: 'Ngurah Rai International Airport' },
  { kode: 'SUB', nama: 'Juanda International Airport' },
];

const Maskapai = [
  { id: 1, nama: 'Garuda Indonesia', logo: require('./assets/n-plane.png') },
  { id: 2, nama: 'Lion Air', logo: require('./assets/n-plane.png') },
  { id: 3, nama: 'Air Asia', logo: require('./assets/n-plane.png') },
];

const Jadwal = [
  { id: 1, tanggal: '2022-06-03', asal: 'CGK', tujuan: 'DPS', maskapai: 'Garuda Indonesia' },
  { id: 2, tanggal: '2022-06-03', asal: 'DPS', tujuan: 'CGK', maskapai: 'Lion Air' },
  { id: 3, tanggal: '2022-06-03', asal: 'SUB', tujuan: 'CGK', maskapai: 'Air Asia' },
  { id: 4, tanggal: '2022-06-04', asal: 'CGK', tujuan: 'SUB', maskapai: 'Garuda Indonesia' },
  { id: 5, tanggal: '2022-06-04', asal: 'DPS', tujuan: 'SUB', maskapai: 'Lion Air' },
  { id: 6, tanggal: '2022-06-06', asal: 'SUB', tujuan: 'DPS', maskapai: 'Air Asia' },
  { id: 7, tanggal: '2022-06-06', asal: 'CGK', tujuan: 'DPS', maskapai: 'Garuda Indonesia' },
];

function Main({ navigation }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Hiling.id</Text>
        <Text style={styles.ch3}>Lokasi Keberangkatan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-origin.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={origin}
            onChangeText={text => setOrigin(text)}
            placeholder="Masukan lokasi keberangkatan"
          />
        </View>
        <Text style={styles.ch3}>Lokasi Tujuan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-destination.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={destination}
            onChangeText={text => setDestination(text)}
            placeholder="Masukan lokasi tujuan"
          />
        </View>
        <Text style={styles.ch3}>Tanggal Keberangkatan</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./assets/n-date.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <TextInput
            style={styles.input}
            value={departureDate}
            onChangeText={text => setDepartureDate(text)}
            placeholder="Masukan tanggal keberangkatan (yyyy-mm-dd)"
          />
        </View>
        <Button
          title="Cari"
          onPress={() => {
            const filteredRows = rows.filter(row => row.asal === origin || row.tujuan === destination || row.tanggal === departureDate);
            navigation.navigate('SearchResult', { rows: filteredRows});
          }}
        />
      </View>
      <Text style={styles.footer}>Copyright Christian-120140056</Text>
    </View>
  );
}

function Result({ route }) {
  const { rows } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.ch1}>{item.asal}{'\t'}-{'\t'}{item.tujuan}</Text>
      <View style={styles.item2}>
        <View style={styles.item3}>
          <Image
            source={require('./assets/n-plane.png')}
            style={{ width: 30, height: 30 }}
            resizeMode='contain'
          />
          <Text style={styles.ch2}>  {item.merk}</Text>
        </View>
        <Text>{item.tanggal}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={{height: 45}}>
        <Text style={styles.footer}>Copyright Christian-120140056</Text>
      </View>
    </View>
  );
}

function info() {
  alert('coming soon!')
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SearchMenu"
          component={Main}
          options={{
            headerStyle: {
              backgroundColor: '#5ced73',
            },
            headerRight: () => (
              <TouchableOpacity onPress={info}>
                <Image source={require('./assets/n-user.png')} style={{ width: 50, height: 50, right: 10 }}/>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={info}>
                <Image source={require('./assets/n-menu.png')} style={{ width: 35, height: 50, left: 10}}/>
              </TouchableOpacity>
            ),
            title: ''
          }}
        />
        <Stack.Screen
          name="SearchResult"
          component={Result}
          options={{
            headerStyle: {
              backgroundColor: '#5ced73',
            },
            headerRight: () => (
              <TouchableOpacity onPress={info}>
                <Image source={require('./assets/n-user.png')} style={{ width: 50, height: 50, right: 10}}/>
              </TouchableOpacity>
            ),
            title: 'Hiling.id'
          }}
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
    backgroundColor: '#5ced73',
  },
  container2: {
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 20,
  },
  title: {
    fontSize: 75,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    flex: 1,
    borderRadius: 8,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 15,
    marginBottom: 10,
  },
  item2: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  item3: { 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  ch1: {
    fontWeight: 'bold',
    fontSize: 50,
    flex: 1,
    textAlign: 'center',
  },
  ch2: {
    color: '#666',
    textAlign: 'center',
  },
  ch3: {
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  footer: {
    padding: 10,
    textAlign: 'center',
    bottom: 0,
    left: 5,
    right: 5,
    position: 'absolute',
    color: '#000',
    marginTop: 15,
  }
});