
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/Home'

import Profile from '../screen/Profile'
import InsertProduct from '../screen/InsertProduct'
import InsertCategory from '../screen/InsertCategory'
import {
  View,
  Image,
  Text
} from 'react-native'
const Tab = createBottomTabNavigator();



const menuArr = [
  { label: 'Home', component: Home, icon: require('../images/menu_home.png') },
  { label: 'Products', component: InsertProduct, icon: require('../images/menu_product.png') },
  { label: 'Categorys', component: InsertCategory, icon: require('../images/menu_category.png') },
  { label: 'Account', component: Profile, icon: require('../images/menu_profile.png') }
]


const ProductNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,


      }}>
      {menuArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.label}
            component={item.component}
            options={{
              tabBarIcon: ({ focused, color, size }) => {
                return (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={item.icon} style={{ tintColor: focused ? '#225125' : '#999999', width: 25, height: 25 }} resizeMode='contain'/>
                    <Text style={{ color: focused ? '#225125' : '#999999' }}>{item.label}</Text>
                  </View>
                )
              }
            }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

export default ProductNavigation