import React, { useState } from 'react'

import { Image, Text, ScrollView, View, ImageBackground, Linking, TouchableOpacity, ToastAndroid,Animated } from "react-native";
import { Avatar, Title, IconButton, Divider, Button } from "react-native-paper";

import {
  SafeAreaView
} from "react-navigation";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

let BackGround = [
  require("../assets/NavigationBackground/1.jpg"),
  require("../assets/NavigationBackground/2.jpg"),
  require("../assets/NavigationBackground/3.jpg"),
  require("../assets/NavigationBackground/4.jpg"),
  require("../assets/NavigationBackground/5.jpg"),
  require("../assets/NavigationBackground/6.jpg"),
  require("../assets/NavigationBackground/7.jpg"),
  require("../assets/NavigationBackground/8.jpg"),
  require("../assets/NavigationBackground/9.jpg"),
  require("../assets/NavigationBackground/10.jpg"),
  require("../assets/NavigationBackground/11.jpg")
];
var RandomNumber = Math.floor(Math.random() * BackGround.length); //Random Number Between 0 to length of array!!


let RandomBackground = BackGround[RandomNumber];

const DrawerCard= (props)=>{
  const { progress, ...rest }=props
 

  const [image, setimage] = useState(null)
  const [UserName, setUserName] = useState("FlashCards ")
  const [Subtitle, setSubtitle] = useState("Welcome To Mobile Flash Card.")





  const txtShadow = {
    textShadowColor: "black",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  };
  let TouchableOpacityStyle = { margin: 2, padding: 5, flexDirection: 'row', marginTop: -6 }
  let TextStyle = { top: 10, fontWeight: '800', color: 'gray' }

  return (
    <SafeAreaView style={{flex: 1 }}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <ImageBackground
        source={RandomBackground}
        resizeMode="cover"
        style={{ width: "100%", height: 150 }}
      >
        <View style={{ position: "absolute", bottom: 4, padding: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Avatar.Image
              size={50}
              source={
                image == null ? require("../assets/user.png") : { uri: image }
              }
            />
            <Title
              style={[
                { top: 10, left: 5, fontWeight: "800", color: "white" },
                txtShadow
              ]}
            >
              {UserName.split(" ")[0]}
            </Title>
          </View>
          <Text style={[txtShadow, { color: "white", fontWeight: "400" }]}>
            {Subtitle}
          </Text>
        </View>
      </ImageBackground>

      <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>




      <View style={{ position: 'absolute', bottom: 0, padding: 3, justifyContent: 'center', width: '100%', flexDirection: 'row', backgroundColor: 'silver', borderTopWidth: 1, borderColor: 'gray' }}>
        <IconButton icon={require('../assets/IconFacebook.png')} color="#f5f5f5" size={20} onPress={() => Linking.openURL("https://www.facebook.com/139766653314757/")} />
        <IconButton icon={require('../assets/IconYoutube.png')} color="#f5f5f5" size={25} onPress={() => Linking.openURL("https://www.youtube.com/smkh_pro")} />
      
        <IconButton icon={require('../assets/IconGithub.png')} color="#f5f5f5" size={25} onPress={() => Linking.openURL("https://github.com/SMKH-PRO")} />

      </View>



    </SafeAreaView>
  )
}


export default DrawerCard









