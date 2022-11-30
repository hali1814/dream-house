import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{position:'absolute',width: '100%', height: '100%', justifyContent: 'center', alignItems:'center'}}>
<View style={styles.container}>
      <ActivityIndicator size={50} color={'green'} style={styles.styLoading}/>
      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 20}}>Loading !!!</Text>
    </View>
    </View>
    
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        height: '20%',
        width: '60%',
        backgroundColor: 'black',
        opacity: 0.8,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    styLoading:{

    }
})