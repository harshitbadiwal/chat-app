import { View, Text, TouchableOpacity,StyleSheet, ScrollView } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps'
import { Marker } from 'react-native-maps'; 
import firestore from '@react-native-firebase/firestore'

const Home = ({navigation,user}) => {
  const [users,setusers] = useState()
  useEffect(()=>{
    allfriends()
  },[])
const allfriends = async()=>{
  // let ress = await firestore().collection('users').doc().get()
  // const data = ress.docs.map((d) => ({ ...d.data(), id: d.id }))
  // const reusers =(await firestore().collection('users').get()).docs
  // const data = reusers.
  const quarySnap = await firestore().collection('users').get();
  const allUsers = quarySnap.docs.map(docSnap => docSnap.data());
  // console.log('=====All Users======', allUsers);
  setusers(allUsers)
  // console.warn('users',users)
  // console.warn("res",data);console.warn('users',users)
  // console.log('reusers', reusers)
}
// console.log('user',user)





    // console.log("users",user)
const logout= ()=>{
  // console.log("logout called ");
  auth().signOut()

}

const friends=()=>{
  navigation.navigate('allusers')
}

const chatbox =()=>{
  navigation.navigate('chat')
}
// console.warn(result.users.uid)

  return <>
  <View>
   
    <View style= {styles.header}>
      <Text style={styles.headertext}>
        Friends
      </Text>
      <TouchableOpacity onPress={()=>logout()}>
      <Ionicon name='exit'style={styles.exit} size={30}/>
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={()=>friends()}>
    <View style= {styles.name}>
      <Text style= {styles.showname}>
        All users
      </Text>
    </View>
    </TouchableOpacity>
    <View style={styles.chatsection}>
    
      <Text style={styles.chattext}>
        Hey ! Name want to chat with your Friends
      </Text>
      <TouchableOpacity onPress={()=> chatbox()}>
        <Ionicon name='chatbox-outline' size={35} style={{color:"black"}}/>
      </TouchableOpacity>
    </View>

    <View style={styles.mapdata}>
      <MapView
      showsUserLocation={true}  
      zoomEnabled={true}  
      zoomControlEnabled={true}  
      style ={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      />
          {/* <Marker  
            coordinate={{ latitude: 28.579660, longitude: 77.321110 }}  
            title={"JavaTpoint"}  
            description={"Java Training Institute"}  
          /> 
      </MapView> */}
        {/* <ScrollView style={styles.name}> */}
    
    {/* <Text style={styles.showname}>users</Text> */}
    {/* <Text style={styles.showname}> */}
      {/* abc */}
    {/* </Text> */}
  
  {/* </ScrollView> */}
    </View>
  
  </View>
  </>
 
}
const styles= StyleSheet.create({
header:{
  width: '100%',
display:"flex",

flexDirection:'row',
justifyContent:"space-between",
backgroundColor:"black",
  paddingTop: 7,
  paddingBottom: 7,
},
headertext:{
  fontSize:25,
  marginLeft:10,
},
exit:{
  color:"white", 
  marginRight:15
}, 
chatsection:{
display:"flex",
alignItems:"center",
justifyContent:"center"
},
chattext:{
  fontSize:20,
  display:"flex",
  alignItems:"center",
  textAlign:'center',
  color:"#7d7d7d",
  justifyContent:"center",

}, mapdata:{
  marginTop:20,
  display:"flex",
  marginBottom:0,
  heigth:"100%"


},map:{
  display:"flex",
height:"75%",
width:"100%"

},
name:{
// marginTop:-60,
backgroundColor:"white",
borderRadius:25,
marginTop:5,
marginBottom:5

},
showname:{
  color:"#7d7d7d",
  padding:12,
  marginLeft:20,
  fontSize:22,
  // marginB/ottom:

  
}
})

export default Home