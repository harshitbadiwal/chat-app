import {View, Text, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons';
const Allusers = () => {
  const [users, setusers] = useState();
  const [search, setsearch] = useState('');
  const [input, setinput] = useState('')
//   console.log("\\\\\\\\\\", search);
  useEffect(() => {
    allfriends();
  }, [search,input]);
  const allfriends = async () => {
    // let ress = await firestore().collection('users').doc().get()
    // const data = ress.docs.map((d) => ({ ...d.data(), id: d.id }))
    // const reusers =(await firestore().collection('users').get()).docs
    // const data = reusers.
    const quarySnap = await firestore().collection('users').get();
    const allUsers = quarySnap.docs.map(docSnap => docSnap.data());
    // console.log('=====All Users======', allUsers);
    setusers(allUsers);

    // console.warn('userss', users);
  };

  const usersearch = (val) => {
    if (input.users) return setusers(users);
    const filterdata = users.filter((item) => {
    return(
         item.name.toLowerCase().includes(input.toLowerCase())
    )
    });
        // console.warn('filterdata',filterdata)
    if (filterdata.length) {
      setusers(filterdata);
    } else {
      setusers(users);
    }
  };

//   const filterData = NFTData.filter((item)=>{
//     return(
//        item.name.toLowerCase().includes(value.toLowerCase())
//     )
//   })

//   if(filterData.length){
//    setNftData(filterData)
//   }else{
//    setNftData(NFTData)
//   }

  return (
    <>
    
      <View>
        <View style={sytles.searchbar}>
          <View style={sytles.name}>
            <TextInput
            
              style={sytles.showname}
              placeholder="Search"

              onChangeText={e => setinput(e)}
            />
          </View>
          <TouchableOpacity onPress={()=>usersearch()} >
            <Ionicon name="search" size={35} style={{color: 'black'}} />
          </TouchableOpacity>
        </View>
        <View style={sytles.name}>
          <Text style={sytles.showname}>All users</Text>
        </View>
        <ScrollView>
        <View>
          {users ? (
            users.map((e, id) => (
              <View key={id} style={sytles.user}>
                <Text style={sytles.username}>{e.name}</Text>
              </View>
            ))
          ) : (
            <View>
              <Text style={sytles.username}>Please Wait</Text>
            </View>
          )}
        </View>
        </ScrollView>
      </View>
      
    </>
  );
};
const sytles = StyleSheet.create({
  name: {
    // marginTop:-60,
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 5,
    width: '90%',
  },
  showname: {
    color: '#7d7d7d',
    padding: 12,
    marginLeft: 20,
    fontSize: 22,
    // marginB/ottom:
  },
  user: {
    backgroundColor: '#7d7d7d',
    borderRadius: 25,
    marginTop: 8,
    // width:'0%',
    // display:'flex',
    marginLeft: '2%',
    marginRight: '2%',
    // alignItems:'center',
    // justifyContent:'center'
  },
  username: {
    color: 'black',
    padding: 12,
    marginLeft: 20,
    fontSize: 22,
    fontWeight: '400',
  },
  searchbar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
});
export default Allusers;
