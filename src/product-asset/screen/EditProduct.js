import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Alert
} from 'react-native'
import React, { useState } from 'react'
import * as api_product from '../ApiProductService'
import Loading from '../../progess-bar/Loading'
import ImagePicker, { openCamera } from 'react-native-image-crop-picker'

const EditProduct = ({ navigation, route }) => {
    const { params } = route
    const [nameProduct, setNameProduct] = useState(params.name)
    const [price, setPrice] = useState(params.price)
    const [quantity, setQuantity] = useState(params.quantity)
    const [describe, setDescribe] = useState(params.quantity)
    //
    const [image, setImage] = useState(params.images)
    //loading
    const [loading, setLoading] = useState(false)


    const openCamera = () => {
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
            const data = await api_product.upLoadImage(item)
            console.log(data.path, 'data.path');
            return data.path
        } catch (e) {
            console.log(e.response, 'errr')
        }

    }

    const update = async () => {
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
            const response = await api_product.updateProduct(data, params._id)
            setLoading(false)
            alert('Sữa thành công')
            navigation.goBack()
            console.log(response, 'response');
            return response
        } catch (e) {
            console.log(e.response, 'insertProduct err')
        }
    }

    const onDeleteProduct = async () => {
        try {
            setLoading(true)
            const response = await api_product.deleteProduct(params._id)
            console.log(params.id, 'id')
            console.log(response, 'response')
            Alert.alert('Thông báo', 'Xóa thành công')
            setLoading(false)
            navigation.goBack()
        } catch (e) {
            console.log(e.response)
        }

    }

    const pressAlert = () => {

        Alert.alert('Thông báo', 'Bạn có muốn xóa sản phẩm này không?', [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => onDeleteProduct() },
        ])
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
                    <Image source={require("../images/ic_back.jpg")} style={{}} />
                </TouchableOpacity>
                <Text style={styles.txtTitle}>Update Product</Text>
            </View>
            <Image source={{ uri: image }} style={{ marginTop: 15, height: 210, width: 200, alignSelf: 'center' }} resizeMode={'stretch'} />
            <TouchableOpacity onPress={openCamera}>
                <Image source={require("../images/edit-product.jpg")} style={{ alignSelf: 'flex-end', marginTop: 10, marginEnd: 19 }} />
            </TouchableOpacity>
            <View style={styles.from}>
                <Text style={{ alignSelf: "flex-start", marginStart: 18, fontWeight: '700', fontSize: 12, marginTop: 11 }}>Name Product:</Text>
                <TextInput placeholder='Iced Caffe Americano' style={styles.fromUser} value={nameProduct}
                    onChangeText={setNameProduct} />
                <Text style={{ alignSelf: "flex-start", marginStart: 18, fontWeight: '700', fontSize: 12, marginTop: 11 }}>Price:</Text>
                <TextInput placeholder='price' style={styles.fromUser} value={price.toString()} onChangeText={setPrice} />
                <Text style={{ alignSelf: "flex-start", marginStart: 18, fontWeight: '700', fontSize: 12, marginTop: 11 }}>Quantity:</Text>
                <TextInput placeholder='30' style={styles.fromUser} value={quantity.toString()} onChangeText={setQuantity} />
                <Text style={{ alignSelf: "flex-start", marginStart: 18, fontWeight: '700', fontSize: 12, marginTop: 11 }}>Describe:</Text>
                <TextInput multiline
                    value={quantity.toString()}
                    onChangeText={setDescribe}
                    numberOfLines={6}
                    placeholder='Espresso shots topped with cold water produce a light layer of crema, then served over ice. The result: a wonderfuly rich cup with depth and nuance.' style={[styles.fromUserDescription,]} />
            </View>
            <View style={styles.wrapBtn}>
                <TouchableOpacity style={styles.btnSave} onPress={pressAlert}>
                    <Image style={{ height: 25, width: 25 }} source={require('../images/ic_delete.png')} />
                    <Text style={styles.txtBtnSave}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSave} onPress={update}>
                    <Image style={{ height: 25, width: 25 }} source={require('../images/ic_pencil.png')} />
                    <Text style={styles.txtBtnSave}>Update</Text>
                </TouchableOpacity>
            </View>
            {loading ? <Loading /> : null}
        </ScrollView>
    )
}

export default EditProduct

const styles = StyleSheet.create({
    container: {
        padding: 6,
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    btnBack: {
        width: 32,
        height: 32,
        borderRadius: 50

    },
    txtTitle: {
        flex: 1,
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'center'

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
        paddingHorizontal: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
        paddingBottom: 30
    },
    btnSave: {
        height: 84,
        width: 140,
        backgroundColor: '#225125',
        borderRadius: 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,

    },
    txtBtnSave: {
        color: '#ffff',
        fontWeight: '700',
        fontSize: 18
    }
})