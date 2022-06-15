// import * as React from 'react';
import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
// import { Button, View, StyleSheet, Text,  } from 'react-native';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Camera} from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import * as faceapi from 'face-api.js';

function HomeScreen({ navigation }) {
  return (
    <View>
      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello World</Text>
      </View>
      <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Button
        title="Camera"
        onPress={() => navigation.navigate('Profile')}
      /></View> */}

      <View style={{ backgroundColor: "#051710", height: '90%'}}>
        <Text style={styles.titleText}>Music4Mood</Text>
        <View style={styles.contentText}>
          <Image style={{height: 120, width: 120}} source={require('./assets/M4M.png')}/>
          <Text style={{fontSize: 25, fontFamily: 'sans-serif'}}>Playlist</Text>
         <Text style={{fontSize: 25, fontFamily: 'sans-serif', marginTop: 20}}>Tutorials</Text>
          <Text style={{fontSize: 25, fontFamily: 'sans-serif', marginTop: 20}}>About Us</Text>
        </View>
        </View>
      <View style={{ backgroundColor: "#000000", height: '10%' }} />
      <View style={{alignItems: 'flex-end', justifyContent:'center',alignItems:'center',alignSelf:'center', position:'absolute'}}>
        {/* <View style={{backgroundColor:'blue', borderRadius:10,height:100, width:100, borderRadius:100/2, marginTop: "240%"}}>
        <Button style={{marginTop: '40%', }}
        title="Camera"
        onPress={() => navigation.navigate('Profile')}
        />
          </View> */}
          <TouchableOpacity style = {styles.roundButton1} onPress={() => navigation.navigate('Profile')} >
          <Image style={styles.captureLogo} source={require('./assets/capture.png')} />
          </TouchableOpacity>
    </View>
    </View>
  );
}

function ProfileScreen({ navigation }) {
  // return (
  //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //     <Button
  //       title="Go to Notifications"
  //       onPress={() => navigation.navigate('Notifications')}
  //     />
  //     <Button title="Go back" onPress={() => navigation.goBack()} />
  //   </View>
  // );

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [emotion, setEmotion] = useState();
    const [imageResponse, setImageResponse] = useState();

    useEffect(()=>{
      (async () =>{
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');
      })();
    }, []);
  
    const takePicture = async () =>{
      if (camera){

        const data =await camera.takePictureAsync(null);
        setImage(data.uri);
        // try{
        //   const detections = await faceapi.detectSingleFace(data)
        //   const detections2 = await faceapi.
        // }  
        // catch(error){
        //   console.log(error)
        // }
        // console.log(detections)
        const myimg = await FileSystem.readAsStringAsync(data.uri, { encoding: 'base64' });
        // console.log(myimg);

        const data1 = {
          "imageResponse" : myimg
        }
        
        // try{
        //   requestUrl = 'http://192.168.56.1:8000/predict';
        //   const response = await axios.post(requestUrl, data1);
        //   console.log(response.data);
        // }
        // catch(error){
        //   console.log(error);
        // }
        

        
        // const requestOptions = {
        //   method : "POST",
        //   headers: {"Content-Type" : "application/json"},
        //   body : JSON.stringify(
        //     `"imgcode" : ${myimg}"`
        //   )
        // }

        // const myresponse = await fetch("http://192.168.56.1:8000/predict", requestOptions);
        // const mydata = await myresponse.json();

        // console.log(mydata)


        // fetch("http://192.168.56.1:8000/predict", {
        //   method: "POST",
        //   headers: {
        //     'Accept': "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     name: myimg
        //   }),
        // })
        // .then(_=> console.log('rea for the minute'))
        // .catch(e => console.log(e))
      
    
      const headers = {
        "Content-Type": "application/json",
      };
        axios.post("http://192.168.56.1:8000/predict", { data1 })
        .then(res => {
          setEmotion(res.Emotion)
          console.log(res);
          console.log(res.data);
        })
        .catch(error => {
          console.log(error)
        })

      }
     
    }
    if(hasCameraPermission === false){
      return <Text>No camera access</Text>;
    }
    return(
        <View style={{flex:1}}>
        <View style={styles.cameraContainer}>
          <Camera ref={ref => setCamera(ref)}
          style={styles.fixedRatio}
          type = {type}
          ratio = {'1:1'}
          />
        </View>
        <TouchableOpacity style={styles.roundButton3}
        onPress={()=>{
          setType(type===Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
        }} >
          <Text>Flip Camera</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.roundButton2}
        onPress={()=>takePicture()}
        ><Image style={{height: 50, width: 50}}source={require('./assets/capture2.jpg')}/></TouchableOpacity>
        {image && <Image source={{uri:image}} style={{height: 140, width: 140, position: 'absolute', marginTop: 400, marginStart: 50}}/>}
        <Text style={{position: 'absolute', fontFamily: 'sans-serif', fontSize: 30, marginTop: 450, marginStart: 230}}>{emotion}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
    captureButton:{
      backgroundColor: '#004f17',
      color: '#e0ffe9'
    },
    flipButton:{
      width: 100,
      height: 50
    },
    cameraContainer: {
      flex: 1,
      flexDirection:'row',
      height: 40
    },
    fixedRatio : {
      flex:3,
      aspectRatio: 1
    },
    titleText :{
      fontSize: 55,
      fontWeight: "bold",
      fontFamily: 'sans-serif-medium', 
      marginTop: '20%', 
      marginStart: '9%',
      color: '#e0ffe9'
    },
    roundButton1: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: '#078a2a',
      marginTop: "240%"
    },
    roundButton2: {
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 6,
      borderRadius: 80,
      backgroundColor: '#078a2a',
      marginTop: "1%",
      marginStart: '39%',
      marginBottom: '5%'
    },
    roundButton3: {
      width: 120,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 6,
      borderRadius: 20,
      backgroundColor: '#078a2a',
      marginStart: '34%',
      marginBottom: '5%'
    },
    captureLogo: {
      height: 60,
      width: 60
    },
    contentText: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center', 
    }
  });

function Playlist({ navigation }) {
  return (
    <view style={{backgroundColor:"white", flex:1, alignItems:'center', justifyContent:'center', borderRadius: 50, margin: 10}}>
      <view>

      </view>
    </view>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Playlist" component={Playlist} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

      //   fetch("http://127.0.0.1:8000/predict", {
      //   method: "POST",
        
      //   headers: {
      //     // "Content-Type": "application/json",
      //     "Content-Type": "text/xml",
      //   },
      //   body: JSON.stringify(data1)
      // })
      // .then((r)=> {
      //   r.json().then((response)=>{
      //     setEmotion(response.Emotion);
      //   })
      // })
      // .catch(e => console.log(e))
      // }