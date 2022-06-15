// import { StatusBar } from 'expo-status-bar';
// import React, {useState, useEffect} from 'react';
// import { Button, StyleSheet, Text, View, Image} from 'react-native';
// import {Camera} from 'expo-camera';
// import { NavigationContainer } from '@react-navigation/native';
// import axios from 'axios';

// const MyCamera = ({navigaton}) =>{

//     const [hasCameraPermission, setHasCameraPermission] = useState(null);
//     const [camera, setCamera] = useState(null);
//     const [image, setImage] = useState(null);
//     const [type, setType] = useState(Camera.Constants.Type.back);
  
//     useEffect(()=>{
//       (async () =>{
//         const cameraStatus = await Camera.requestCameraPermissionsAsync();
//         setHasCameraPermission(cameraStatus.status === 'granted');
//       })();
//     }, []);
  
//     const takePicture = async () =>{
//     //   axios
//     //     .get('http://example.com/movies.json')
//     //     .then(function (response) {
//     //       alert(JSON.stringify(response.data));
//     //     })
//     //     .catch(function (error) {
//     //       alert(error.message);
//     //     })
//     //     .finally(function () {
//     //       alert('Finally called');
//     //     });
  
  
//       if (camera){
//         const data =await camera.takePictureAsync(null);
//         setImage(data.uri);
//       }
//     }
  
//     if(hasCameraPermission === false){
//       return <Text>No camera access</Text>;
//     }
//     return(
//         <View style={{flex:1}}>
//         <View style={styles.cameraContainer}>
//           <Camera ref={ref => setCamera(ref)}
//           style={styles.fixedRatio}
//           type = {type}
//           ratio = {'1:1'}
//           />
//         </View>
//         <Button
//         title = "Flip camera"
//         onPress={()=>{
//           setType(type===Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
//         }}></Button>
//         <Button title='Take picture'
//         onPress={()=>takePicture()}
//         />
//         {image && <Image source={{uri:image}} style={{flex:1}}/>}
  
//       </View>
//     );
// };

// const styles = StyleSheet.create({
//     cameraContainer: {
//       flex: 1,
//       flexDirection:'row'
//     },
//     fixedRatio : {
//       flex:1,
//       aspectRatio: 1
//     }
//   });

// export default MyCamera;



// import  React, {useState, useEffect} from 'react';
// import { Button, View, Image, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import {Camera} from 'expo-camera';


// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Camera"
//         onPress={() => navigation.navigate('Camera')}
//       />
//       <Image src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2F%25E6%258D%2595%25E7%258D%25B2%25E3%2581%2599%25E3%2582%258B&psig=AOvVaw2E6Rjd8DThD0eF58ZuiY3h&ust=1650088466526000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCIjj2dmwlfcCFQAAAAAdAAAAABAD'></Image>
//     </View>
//   );
// }

// function CameraScreen({ navigation }) {
//    const [hasCameraPermission, setHasCameraPermission] = useState(null);
//     const [camera, setCamera] = useState(null);
//     const [image, setImage] = useState(null);
//     const [type, setType] = useState(Camera.Constants.Type.back);
  
//     useEffect(()=>{
//       (async () =>{
//         const cameraStatus = await Camera.requestCameraPermissionsAsync();
//         setHasCameraPermission(cameraStatus.status === 'granted');
//       })();
//     }, []);
  
//     const takePicture = async () =>{
//       if (camera){
//         const data =await camera.takePictureAsync(null);
//         setImage(data.uri);
//       }
//     }
  
//     if(hasCameraPermission === false){
//       return(
//         <Text>No camera access</Text>
//       ); 
//     }
//     return(
//         <View>
//         <View>
//           <Camera/>
//         </View>
//         <Button
//         title = "Flip camera"
//         onPress={()=>{
//           setType(type===Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
//         }}></Button>
//         <Button title='Take picture'
//         onPress={()=>takePicture()}
//         />
//         {image && <Image source={{uri:image}} style={{flex:1}}/>}
  
//       </View>
//     );
//   // return (
//   //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//   //     <Button
//   //       title="Go to Notifications"
//   //       onPress={() => navigation.navigate('Notifications')}
//   //     />
//   //     <Button title="Go back" onPress={() => navigation.goBack()} />
//   //   </View>
//   // );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         title="Go to Settings"
//         onPress={() => navigation.navigate('Settings')}
//       />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }


// const Stack = createStackNavigator();

// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Notifications" component={NotificationsScreen} />
//       <Stack.Screen name="Camera" component={CameraScreen} />
//       <Stack.Screen name="Settings" component={SettingsScreen} />
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }
