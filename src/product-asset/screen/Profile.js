import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState, useLayoutEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../progess-bar/Loading'
import ImagePicker from 'react-native-image-crop-picker'
import * as api_service from '../ApiProductService'
import { LOGIN_CONTEXT } from '../../context-global/LoginContext';
const Profile = () => {
    const logOut = useContext(LOGIN_CONTEXT)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [address, setAddress] = useState('')
    //loading 
    const [loading, setLoading] = useState(false)

    const logout = async () => {
        setLoading(true)
        try {
            const response = await api_service.logOut()
            if (response.logout) {
                AsyncStorage.clear()
                logOut.setIsLogin(false)
            }
            
        } catch (e) {
            console.log(e)
        }
    }

    const showAlert = () => {
        Alert.alert(
            'Thông báo',
            'Bạn có muốn đăng xuất không?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => logout() },
            ],
            { cancelable: false }
        )
    }

    const onCamera = () => {
        ImagePicker.openCamera({
           width: 300,
           height: 400,
           cropping: true,
         }).then(image => {
           setAvatar(image.path)
         });
     }

     const onLoadImage = async () => {
        try {
           const item = {
              uri: avatar,
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


     const updateUser = async () => {
        setLoading(true)
        try {
           const linkPath = await onLoadImage()
           const data = {
              avatar: linkPath,
              address,
              name
              
           }
           const response = await api_service.updateUser(data)
           setLoading(false)
           alert('Cập nhật thành công')
           console.log(response, 'response');
           return response
        }catch(e) {
           console.log(e.response, 'insertProduct err')
        }
     }



    const getUser = async () => {
        try {
            const response = await AsyncStorage.getItem('user')
            const user = JSON.parse(response)
            setEmail(user.email)
            setAddress(user.address)
            setName(user.name)
            setAvatar(user.avatar)
            setLoading(false)
            console.log(avatar)
        } catch (error) {
            console.log(error)
        }



    }
    useLayoutEffect(() => {
        setLoading(true)
        getUser()

        return () => {

        }
    }, [])


    return (
        <View style={{ flex: 1, backgroundColor: '#225125' }}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    width={115}
                    height={115}
                    defaultSource={require('../images/avatar.png')}
                    source={{ uri: avatar || 'https://fpoly-hcm.herokuapp.com/uploads/1655522684885-avatar.png' }} />
                <TouchableOpacity style={styles.imageChange} onPress={onCamera}>
                    <Image

                        source={require('../images/change-user.png')} />
                </TouchableOpacity>
                <Text style={{ alignSelf: 'center', marginTop: 70, fontSize: 16, fontWeight: '700', color: '#000000' }}>{name}</Text>
                <View style={styles.from}>
                    <Text style={{ alignSelf: "flex-start", marginStart: 18, fontWeight: '700', fontSize: 12, color: '#000000', marginTop: 10 }}>Address:</Text>
                    <TextInput style={styles.fromUser} value={address} onChangeText={setAddress} />
                    <Text style={{ alignSelf: "flex-start", marginStart: 18, fontWeight: '700', fontSize: 12, color: '#000000', marginTop: 10 }}>Name:</Text>
                    <TextInput style={styles.fromUser} value={name} onChangeText={setName} />
                </View>
                <TouchableOpacity style={{backgroundColor: '#225125', height: 40, width: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 40}}
                onPress={updateUser}>
                    <Text style={styles.txt}>Cập nhật</Text>
                </TouchableOpacity>
                <View style={{height: 200,width:'100%', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View></View>
                    <TouchableOpacity style={{backgroundColor: '#990000', width: 359, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10}}
                    onPress={showAlert}>
                    <Text style={styles.txt}>Đăng xuất</Text>
                </TouchableOpacity>
                </View>
            </View>

            {loading ? <Loading /> : null}
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    txt: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    content: {
        width: '100%',
        backgroundColor: 'white',
        height: '80%',
        position: 'absolute',
        bottom: 0,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center'
    },
    image: {
        position: 'absolute',
        top: -55,
        borderRadius: 115,
    },
    imageChange: {
        position: 'absolute',
        top: 30,
        right: '35%'
    },
    from: {
        width: '100%',

        marginTop: '10%',
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


    }
})