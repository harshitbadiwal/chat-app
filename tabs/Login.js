import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React,{useState} from 'react'
import auth from '@react-native-firebase/auth'
// import { useUserAuth } from '../context/Authcontext'
// Geolocation.setRNConfiguration(config);


const Login = ({navigation}) => {
  const [email,setemail] = useState()
  const [password, setpassword]= useState()
  const [location, setlocation] = useState('')
 
  // const {Login} = useUserAuth()
  // const userlogin = async()=>{
  //    await Login(email, password)
  //    navigation.navigate('home')
  // }
  const userlogin =async()=>{
    
    // console.log("userlogin called")
      const users = await auth().signInWithEmailAndPassword(email,password)
      // console.warn(users.user.uid)
  }
  

  // console.log('login', Login)
  const register =()=>{
    navigation.navigate('register')
  }
  return <>
    <View>
        <View style={StyleSheet.mainContainer}>
            <Text style={styles.mainHeader}>Login</Text>
            <Text style={styles.discription}> Connecting to your friends 👍</Text>
            <View style={styles.inputContainer}>
                
                <TextInput 
                placeholder='Email'
                style={styles.inputStyle}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText= {e => setemail(e)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.labels}>
                    Enter your Password
                </Text>
                <TextInput
                placeholder='*****************'
                style={styles.inputStyle}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText= {e => setpassword(e)}
                />
            </View>
            <TouchableOpacity  style= {styles.buttonstyle} onPress={( )=>userlogin()}>
                <Text>
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>register()}>
            <View style={styles.inputContainer}>
                <Text style={styles.labels}>Register! Account</Text>
            </View>
            </TouchableOpacity>
        </View>
    </View>
  </>
}
const styles = StyleSheet.create({
    mainContainer: {
      width:'100%',
      height: '100%',
      paddingHorizontal: 30,
      paddingTop: 30,
      marginLeft:10,
      marginRight:10
      // paddingVertical:10
      // backgroundColor:"#fff"
    },
    mainHeader: {
      width:'100%',
      fontSize: 25,
      color: '#344055',
      fontWeight: '500',
      paddingTop: 20,
      paddingBottom: 15,
    },
    discription: {
      fontSize: 15,
      color: '#7d7d7d',
      paddingBottom: 15,
      paddingTop: 15,
      fontFamily: 'bold',
    },
    inputContainer: {
      marginTop: 15,
      marginBottom:15,
    },
    labels: {
      fontSize: 18,
      color: '#7d7d7d',
      marginTop: 10,
      marginBottom: 10,
      lineHeight: 25,
    },
    inputStyle: {
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.3)',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      fontSize: 18,
    },
    condition: {
      display: 'flex',
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 20,
    },
    btn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      Color: 'blue',
      padding: 15,
    },
    buttonstyle: {
      fontSize: 15,
      backgroundColor: '#7d7d7d',
      padding: 15,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
  });

export default Login