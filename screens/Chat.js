import {View, Text,StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const Chat = ({navigation}) => {
  const [chatsection, setchatsection] = useState();

  useEffect(() => {
    alluser();
  }, []);

  const alluser = async () => {
    const user = await firestore().collection('users').get();
    const chatusers = user.docs.map(docs => docs.data());
    setchatsection(chatusers);
    // console.warn('////////////', chatsection);
  };

  const selectuser =(id)=>{
    navigation.navigate('chats', {id:id})
    // console.warn("usersid",id)
  }

  return (
    <>
      <View>
        <ScrollView>
        <View  style={styles.chatsec}>
          { chatsection ?
          (chatsection.map((e, id) => (
            <TouchableOpacity  key={id} onPress={()=>selectuser(e.id)}>
            <View>
              <Text  style={styles.chatperson} >{e.name}</Text>
            </View>
            </TouchableOpacity>
          ))):(<View>
            <Text>Please Wait</Text>
          </View>) 
          }
        </View>
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
    chatsec:{
        backgroundColor:'#f4f3fe',
        width:'100%',
        height:"100%",
        padding:20, 
    },
    chatperson:{
        backgroundColor:'white',
        width:'100%',
        marginBottom:15,
        height:60,
        color:'black',
        fontSize:20,
        padding: 15,
        shadowColor:'black',
        shadowOffset:{
          width:10 ,
          height:10,
        },
        shadowOpacity:8,
        shadowRadius:8.22,

        elevation:20 ,
        borderRadius:10,
        textTransform:'capitalize',
        fontWeight:'600'
        
    }
})

export default Chat;
