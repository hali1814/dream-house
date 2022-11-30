import { createStackNavigator } from '@react-navigation/stack';
import ProductNavigation from './ProductNavigation';
import EditProduct from '../screen/EditProduct';
import React from 'react'





const Stack = createStackNavigator();

const StackProduct = () => {
    return (
      <Stack.Navigator initialRouteName='HomeMain' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeMain" component={ProductNavigation} />
        <Stack.Screen name="Edit" component={EditProduct} />
      </Stack.Navigator>
    )
  }

export default StackProduct;