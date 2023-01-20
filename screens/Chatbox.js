import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const Chatbox = ({route}) => {
  const [userchat, setuserchat] = useState('');
  const [chat, setchat] = useState('');
  const [message, setmessage] = useState('')
  const {id} = route.params;
  useEffect(() => {
    userdetails();
    msgreciver(id)
  }, [id,chat]);
  const userdetails = async () => {
    const detail = await firestore().collection('users').doc(id).get();

    setuserchat(detail.data());
  };

  const messageSend = () => {
    firestore().collection('users').doc(id).collection('chats').add({
      msg: chat,
      time: new Date()
    });
    setchat();
  };

  const msgreciver = async(id)=>{
    const msg = await firestore().collection('users').doc(id).collection('chats').get()
    console.log('mseeage', msg)
    const messages=[]
    msg.forEach((doc) => {
        // console.log("doc.data()",doc.data().msg);
        messages.unshift(doc.data().msg)
    })
    setmessage(messages)
    // console.warn('snap shot',message)
  }

  return (
    <>
      <View style={styles.chatsection}>
        <View>
          <Text style={styles.userName}>{userchat.name}</Text>
        </View>

        <View style={styles.messagebox}>
          <ScrollView>{
            message ? (message.map ((message) =>  <Text style={styles.messagestyle}> {message}</Text>) ):(<View><Text>wait</Text></View>)
          }
          </ScrollView>
        </View>
        <View style={styles.sendbox}>
          <TextInput
            style={styles.inputStyle}
            autoCapitalize={true}
            autoCorrect={true}
            placeholder="Message"
            value={chat}
            onChangeText={e => setchat(e)}
          />
          <TouchableOpacity onPress={() => messageSend()}>
            <FontAwesome name="send" size={35} style={{color: 'black'}} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  userName: {
    textTransform: 'capitalize',
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 15,
    paddingLeft: 25,
    marginTop: 5,
    height: 60,
    color: 'black',
    fontSize: 20,
    padding: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 8,
    shadowRadius: 8.22,

    elevation: 20,
    borderRadius: 10,
    fontWeight: '600',
  },
  chatsection: {
    display: 'flex',
    // width: '100%'
  },
  messagebox: {
    height: '80%',
    backgroundColor: 'black',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    // height:'80%'
  },

  inputStyle: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
    display: 'flex',
    width: '80%',
    height: 50,
    marginLeft: 10,
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  sendbox: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  messagestyle: {
    padding: 10,
    backgroundColor: 'white',
    // width:'20%',
    borderRadius: 15,
    color: 'black',
    fontSize: 18,
    marginBottom:5 
  },
});

export default Chatbox;
