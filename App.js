import * as React from 'react';
import {View, Text} from 'react-native';
import Screens from './tabs/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './tabs/Register';
import Login from './tabs/Login';
// import {UserAuthContextProvider} from './context/Authcontext';
import Home from './screens/Home';
import Allusers from './screens/Allusers';
import {enableLatestRenderer} from 'react-native-maps';
import {useState, useEffect} from 'react';
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore'
import Chat from './screens/Chat'
import Chatbox from './screens/Chatbox';

function App() {

  const Stack = createNativeStackNavigator();
  const [isUserExist, setUserExist] = useState(null);
  const [displayName , setdisplayName] = useState('')
  useEffect(() => {
   auth().onAuthStateChanged((info)=>{
       setUserExist(info)
        // setdisplayName( isUserExist._user.uid)
   },[])
 
// console.log('userdata',displayName)
  },[]);
  // const setusername =()=>{
    // setdisplayName(isUserExist._user)
  // }
 

    
// console.warn('user who loggedIn', id)
  const AuthStack = () => {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="register" component={Register} />
        </Stack.Navigator>
      </>
    );
  };
  const MainStack = () => {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen name='home' component={Home}  />
          <Stack.Screen name="allusers" component={Allusers} />
          <Stack.Screen name='chat' component={Chat} />
          <Stack.Screen name='chats' component={Chatbox} />
        </Stack.Navigator>
      </>
    );
  };
  return (
    <>
      <NavigationContainer>
        {isUserExist !== null ? <MainStack /> : <AuthStack />}
       
      </NavigationContainer>
    </>
  );
}

export default App;
