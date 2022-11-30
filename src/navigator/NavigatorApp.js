
import React, {useContext} from 'react'
import NavigationUser from '../user-asset/navigation/NavigationUser'
import ProductStack from '../product-asset/navigation/ProductStack';
import {LOGIN_CONTEXT} from '../context-global/LoginContext'
import {
    View
  } from 'react-native';
const NavigatorApp = () => {
  const {isLogin} = useContext(LOGIN_CONTEXT);

  return (
    <View style= {{flex: 1, backgroundColor: 'white'}}>
        {isLogin ? <ProductStack /> : <NavigationUser />}
    </View>
  )
}

export default NavigatorApp