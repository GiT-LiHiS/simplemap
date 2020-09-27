import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList } from 'react-native';
import * as Location from 'expo-location';
export default function App() {
    const [location, setLocation] = useState(null);
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        //Check permission
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No permission to access location');
        }
        else {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log(location.coords.latitude)
            console.log(location.coords.longitude)

            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            })
            setLat(location.coords.latitude)
            setLng(location.coords.longitude)

        }
    };







    const getAddredss = () => {
        const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=TerPEBVvyZVQKGlwWpEuPvytmk5Ekr4O&&location='+text1
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.results[0].locations[0].latLng.lat)
                console.log(data.results[0].locations[0].latLng.lng)
                setLat(data.results[0].locations[0].latLng.lat)
                setLng(data.results[0].locations[0].latLng.lng)
                console.log("lat" + lat)

                setRegion({
                    latitude: data.results[0].locations[0].latLng.lat,
                    longitude: data.results[0].locations[0].latLng.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                })
               
                
            })
            .catch((error) => {
                Alert.alert(error)
            });
           
    };
   


  return (
      <View style={styles.container}>

          <MapView
              style={styles.map}
              region={region}
              onRegionChangeComplete={region => setRegion(region)}
          >
              <Marker coordinate={{ latitude: lat, longitude: lng }} />
          </MapView>

          <TextInput style={{ width: 200, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white' }} placeholder="Street and city" onChangeText={text1 => setText1(text1)}/>
         
          <Button
              onPress={getAddredss} 
              title="navigate"
              color="#841584"
              
          />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});