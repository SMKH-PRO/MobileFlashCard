import React, { Component } from "react";
import { View } from 'react-native'
import DrawerCard from './component/DrawerCard'
import Loading from './component/Loading'
import AppBar from './component/AppBar'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux'
import Home from './screens/home'
import Deck from './screens/deck'
import Quiz from './screens/quiz'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const showLoading = () => (

  <View>
    <AppBar title="Please wait...." />
    <View style={{ height: '100%', justifyContent: 'center', alignItem: 'center' }}>
      <Loading />
    </View>
  </View>

)

//  console.log("ONAUTHSTATE CHANGED *********** ",user)







const DrawerNavigation = () => (
  <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <DrawerCard {...props} />}>
    <Drawer.Screen name="Home" component={Home} />

  </Drawer.Navigator>
)


const Routes = () => {
  const loading = useSelector(state => state.loading)
  const conditionalComponent = (component) => {
    return loading ? showLoading : component
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* // add the whole drawer as a stack screen and you shall have what you want */}
        <Stack.Screen
          name="drawer"
          component={conditionalComponent(DrawerNavigation)}
          headerShown={false}
          options={{ headerMode: 'none', headerShown: false }}
        />
        
        <Stack.Screen
          name="Deck"
          component={conditionalComponent(Deck)}
        />
         <Stack.Screen
          name="Quiz"
          component={conditionalComponent(Quiz)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes