import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Image,
   TextInput,
   ScrollView
} from 'react-native'
import React, { useState } from 'react'
import Animated, {useSharedValue, useAnimatedStyle} from 'react-native-reanimated'
import ImagePicker from 'react-native-image-crop-picker'
import * as api_service from '../ApiProductService'
import Loading from '../../progess-bar/Loading'

const InsertProduct = ({ navigation }) => {
   //name product
   const [nameProduct, setNameProduct] = useState('')
   const [price, setPrice] = useState('')
   const [quantity, setQuantity] = useState('')
   const [describe, setDescribe] = useState('')
   //
   const [image, setImage] = React.useState(null)
   //loading 
   const [loading, setLoading] = useState(false)
   const onCamera = () => {
      ImagePicker.openCamera({
         width: 300,
         height: 400,
         cropping: true,
       }).then(image => {
         setImage(image.path)
       });
   }


   const onLoadImage = async () => {
      try {
         const item = {
            uri: image,
            name: 'image.jpg',
            type: 'image/jpg'
         }
         const data = await api_service.upLoadImage(item)
         console.log(data.path, 'data.path');
         return data.path
      }catch(e) {
         console.log(e.response, 'errr')
      }
      
   }
   const insertProduct = async () => {
      setLoading(true)
      try {
         const linkPath = await onLoadImage()
         const data = {
            images: linkPath,
            name: nameProduct,
            price,
            quantity,
            category: '61d11c4b86511f0016f490ed'
         }
         const response = await api_service.insertProduct(data)
         setLoading(false)
         alert('Thêm thành công')
         console.log(response, 'response');
         return response
      }catch(e) {
         console.log(e.response, 'insertProduct err')
      }
   }
      
   

   return (
      <ScrollView style={styles.container}
         showsVerticalScrollIndicator={false}>
         <Image source={image ? {uri:image} : require("../images/product.jpg")} style={{ marginTop: 15, height: 210, width: 200, alignSelf: 'center' }} resizeMode={'stretch'} />
         <TouchableOpacity onPress={onCamera}>
            <Image source={require("../images/edit-product.jpg")} style={{ alignSelf: 'flex-end', marginTop: 10, marginEnd: 19 }} />
         </TouchableOpacity>
         <View style={styles.from}>
            <Text style={{ alignSelf: "flex-start", marginStart: 18, fontWeight: '700', fontSize: 12, marginTop: 11 }}>Name Product:</Text>
            <TextInput placeholder='Iced Caffe Americano' style={styles.fromUser} value={nameProduct} onChangeText={setNameProduct}/>
            <Text style={{ alignSelf: "flex-start", marginStart: 18, fontWeight: '700', fontSize: 12, marginTop: 11 }}>Manufacturing Date:</Text>
            <TextInput keyboardType='number-pad' placeholder='price' style={styles.fromUser} value={price} onChangeText={setPrice}/>
            <Text style={{ alignSelf: "flex-start", marginStart: 18, fontWeight: '700', fontSize: 12, marginTop: 11 }}>Quantity:</Text>
            <TextInput placeholder='30' style={styles.fromUser} value={quantity} onChangeText={setQuantity}></TextInput>
            <Text style={{ alignSelf: "flex-start", marginStart: 18, fontWeight: '700', fontSize: 12, marginTop: 11 }}>Describe:</Text>
            <TextInput multiline
               numberOfLines={6}
               value={describe}
               onChangeText={setDescribe}
               placeholder='Espresso shots topped with cold water produce a light layer of crema, then served over ice. The result: a wonderfuly rich cup with depth and nuance.' style={[styles.fromUserDescription,]}></TextInput>
         </View>
         <View style={styles.wrapBtn}>
            <TouchableOpacity style={styles.btnInsert} onPress={insertProduct}>
               <Image style={{ height: 25, width: 25 }} source={require('../images/ic_insert.png')} />
               <Text style={styles.txtbtnInsert}>Insert</Text>
            </TouchableOpacity>
         </View>
         {loading ? <Loading /> : null}
      </ScrollView>
   )
}

export default InsertProduct

const styles = StyleSheet.create({
   container: {
      paddingTop: 6,
      backgroundColor: 'white'

   },



   from: {
      marginTop: 11,
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

      marginTop: 32,
      marginBottom: 30,

      width: '100%',
      alignItems: 'center',
   },
   btnInsert: {
      height: 37,
      width: '33%',
      backgroundColor: '#225125',
      borderRadius: 25,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',


   },
   txtbtnInsert: {
      color: '#ffff',
      fontWeight: '700',
      fontSize: 18,
      marginStart: 10
   }
})