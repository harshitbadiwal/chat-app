import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
ScrollView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
// import firebase from '@react-native-firebase'
// import } from '@react-native-firebase/auth'
// import { useUserAuth } from '../context/Authcontext';
// import auth from '@react-native-firebase/auth'
// import firebase from '../firebase';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const FirebaseAuth = firebase.auth();
// const firestore = firebase.firestore();

const Register = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const [dbLatitude, setdbLatitude] = useState('');
  const [dbLongitude, setdbLongitude] = useState('');
  const [latitude, setlatitude] = useState('');
  const [logitude, setlogitude] = useState('');
  geolocation.getCurrentPosition(data => {
    setlatitude(data.coords.latitude);
  });
  geolocation.getCurrentPosition(datas => {
    setlogitude(datas.coords.longitude);
  });
  // console.warn('latitude',llocation)

  // const { signUp } = useUserAuth();

  // console.log('///////////////', result.user.uid);
  //    const users =  firestore
  //    .collection('users')
  //    .get()
  //    // .doc(result.user.uid)
  //    // .add({ name: name, email: result.user.email, uid: result.user.uid });

  //  const userList = users.docs.map((d) => ({...d.data(), id: d.id }));
  //  console.log('userss', userList);

  // const registeruser = async () => {
  //   console.log('function called');
  //   // const result = await FirebaseAuth.createUserWithEmailAndPassword(
  //   //   useremail,
  //   //   password,
  //   // );
  //   // console.log('///////////////', result.user.uid);
  //   const users = await firestore
  //     .collection('users')
  //     .get()
  //     // .doc(result.user.uid)
  //     // .add({ name: name, email: result.user.email, uid: result.user.uid });

  //   const userList = users.docs.map((d) => ({...d.data(), id: d.id }));

  //   console.log('userss', userList);

  //   console.log('123465',userList)
  // };

  const registeruser = async () => {
    console.log('registeruser called');

    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      )
     const users = await firestore()
        .collection('users')
        .doc(result.user.uid)
        .set({
          email: result.user.email,
          name: name,
          location: {
            latitude:latitude,
            logitude: logitude,
          },
          id: result.user.uid,
        });
       
    } catch (err) {
      console.log(err);
    }
  };
           
      // console.log('result', result);
     
    // console.log("users",users)

    //   const result = await FirebaseAuth.createUserWithEmailAndPassword(email, password);
    // //   //   const use = await firestore.collection('users').doc(result.user.uid).set({
    // //   //     name: name,
    // //   //     email: result.user.email,
    // //   //     uid: result.user.uid
    // //   // })
    //   console.log('///////////////', result.user.uid);
    //   try{
    //   const allusers = await firestore.collection('users').doc( result.user.uid).set({
    //     email:email,
    //     id: result.user.uid,
    //     // location: '',
    //     name: name,
    //   }).then((resp)=>console.log("Inserted",resp))
    //   .catch((err)=> console.log(err))
    // }
    // catch(e){
    //   console.log(e)

    // }
    // firebase.firestore().settings({ experimentalForceLongPolling: true });
    // const result = await FirebaseAuth.createUserWithEmailAndPassword(email, password);
    // try {
    //      await firestore
    //           .collection('users')
    //           .doc(result.user.uid)
    //            .set({
    //          uid: result.user.uid,
    //          name: name,
    //          email: result.user.email,
    //           image:"",
    //        }).then((value)=> {
    //         console.log(value)
    //        });
    //      } catch (e) {
    //       console.log(e)
    //      }

  // Future<void> createUserCredential(String name, String email) async {
  //   try {
  //     await _firebaseFirestore
  //         .collection('users')
  //         .doc(_auth.currentUser!.uid)
  //         .set({
  //       "uid": _auth.currentUser!.uid,
  //       "name": name,
  //       "email": email
  //     }).then((value) {
  //       Indicator.closeLoading();
  //       Get.toNamed(Routes.HOME);
  //     });
  //   } catch (e) {
  //     showAlert(e.toString());
  //   }
  // }

  return (
    <>
      <View>
        <ScrollView>
         { logitude ? 
         <View>
         <View style={StyleSheet.mainContainer}>
           <Text style={styles.mainHeader}>Register</Text>
           <Text style={styles.discription}>
             Connecting to your friends 👍
           </Text>
           <View style={styles.inputContainer}>
             <Text style={styles.labels}>Enter your Email</Text>
             <TextInput
               placeholder="email@gmail.com"
               style={styles.inputStyle}
               autoCapitalize="none"
               autoCorrect={false}
               onChangeText={e => setemail(e)}
             />
           </View>
           <View style={styles.inputContainer}>
             <Text style={styles.labels}>Enter your Name</Text>
             <TextInput
               placeholder="Name"
               style={styles.inputStyle}
               autoCapitalize="none"
               autoCorrect={false}
               onChangeText={e => setname(e)}
             />
           </View>

           <View style={styles.inputContainer}>
             <Text style={styles.labels}> your location</Text>
             <View style={styles.inputlocationcontain}>
             <Text style={styles.inputlocation}>latitude:{latitude}</Text>
               <Text style={styles.inputlocation}>logitude:{logitude}</Text>
             </View>
           </View>
           <View style={styles.inputContainer}>
             <Text style={styles.labels}>Enter your Password</Text>
             <TextInput
               placeholder="********************"
               style={styles.inputStyle}
               autoCapitalize="none"
               autoCorrect={false}
               secureTextEntry={true}
               onChangeText={e => setpassword(e)}
             />
           </View>
           <TouchableOpacity
             style={styles.buttonstyle}
             onPress={() => registeruser()}>
             <Text>Register</Text>
           </TouchableOpacity>
         </View>
          </View>
         :<View><Text>Please Wait...</Text></View>
         }
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: '90%',
    height: '100%',
    paddingHorizontal: 30,
    paddingTop: 30,
    marginLeft: 10,
    marginRight: 10,
    // paddingVertical:10
    // backgroundColor:"#fff"
  },
  mainHeader: {
    width: '80%',
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
    marginTop: 10,
    marginBottom: 10,
  },
  labels: {
    fontSize: 18,
    color: '#7d7d7d',
    marginTop: 5,
    marginBottom: 5,
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
  inputlocation: {
    borderWidth: 1,
    display: 'flex',
    color:'black',
    width: '45%',
    borderColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
    flexDirection: 'column',
  },
  inputlocationcontain: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Register;
