import { StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    Image, 
    TextInput,
    ScrollView

  } from 'react-native'
import React from 'react'

const InsertCategory = () => {
return (
   <ScrollView style={styles.container}>
       
      
       <View style={styles.from}>
        
           <Text style={{ alignSelf: "flex-start", marginStart: 18, fontWeight: '700', fontSize: 12, marginTop: 11 , color: '#000000'}}>Name Category:</Text>
           <TextInput style={styles.fromUser}></TextInput>
           <Text style={{ alignSelf: "flex-start", marginStart: 18, fontWeight: '700', fontSize: 12, marginTop: 11 , color: '#000000'}}>Describe:</Text>
           <TextInput  multiline
                       numberOfLines={6}
                       style={[styles.fromUserDescription,]}></TextInput>
       </View>
       <View style={styles.wrapBtn}>
           <TouchableOpacity style={styles.btnSave}>
               <Image style={{height:45, width:45, tintColor: 'white'}} source={require('../images/ic_insert.png')}/>
               <Text style={styles.txtBtnSave}>Update</Text>
           </TouchableOpacity>
          
       </View>
       
   </ScrollView>
)
}

export default InsertCategory

const styles = StyleSheet.create({
container: {
   padding: 6,
   flex: 1,
   backgroundColor: 'white'
},
from: {
   marginTop: 43,
   alignItems: 'center'

},
fromUser: {
   height: 34,
   marginTop: 5,
   width: 359,
   paddingStart: 19,
   padding: 8,
   backgroundColor: '#F3F3F3',
   borderRadius: 15,
   fontSize: 15,
   fontWeight: '400',
   shadowColor: '#000',
   elevation: 2,
   color: '#000000',
   textAlignVertical: 'top',
   letterSpacing: 0.5,


},
fromUserDescription: {

   marginTop: 5,
   width: 359,
   paddingStart: 19,
   padding: 8,
   backgroundColor: '#F3F3F3',
   borderRadius: 15,
   fontSize: 15,
   fontWeight: '400',
   shadowColor: '#000',
   elevation: 2,
   color: '#000000',
   textAlignVertical: 'top',
   letterSpacing: 0.5,


}
,
wrapBtn: {
   paddingHorizontal: 18,
   marginTop: 26,
   flex: 1,
   alignItems:'center'

},
btnSave: {
   height: 84,
   width: 140, 
   backgroundColor: '#225125',
   borderRadius: 25,
   justifyContent: 'center',
   alignItems: 'center',
   paddingVertical: 10
 
},
txtBtnSave: {
   color: '#ffff',
   fontWeight: '700',
   fontSize: 18,
   marginTop: 1
   
}
})