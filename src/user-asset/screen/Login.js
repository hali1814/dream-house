import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image,Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LOGIN_CONTEXT } from '../../context-global/LoginContext'
import * as user from '../ApiService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../progess-bar/Loading'

const Login = ({route}) => {

    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const [isShowPass, setShowPass] = useState(true)
    const { setIsLogin } = React.useContext(LOGIN_CONTEXT);
    const [email, setEmail] = useState('ahihidongoc@gmail.com')
    const checkEmail = regexEmail.test(email)
    const [pass, setPass] = useState('123')
    const [error, setError] = useState(true)
    //focus style 
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusPass, setFocusPass] = useState(false)
    //loading 
    const [isLoading, setIsLoading] = useState(false)
    // validate 
    useEffect(() => {
        if (route.params) {
            setEmail(route.params.newMember)
        }
    }, [route.params])
    const login = async () => {
        Keyboard.dismiss()
        try {
            console.log('vo ne')
            setIsLoading(true)
            const data = { email, password: pass };
            const res = await user.login(data);
            console.log(res)
            if (res.error == false) {
                const { token, user } = res.data;
                const userJson = JSON.stringify(user);
                await AsyncStorage.setItem('user', userJson);
                await AsyncStorage.setItem('token', token);
                setIsLoading(false)
                setIsLogin(true);    
            } else {
                setIsLoading(false);
                alert('Email hoặc password không đúng');
            }
        } catch (e) {
            console.log('HUHU: ', e);
        }
      
    }

    const checkLogin = (e) => {
        setError(false)
        if (email && pass && checkEmail) {
            login();
          
        }
    }
    return (
        <View style={styles.container}>
        
            <View style={styles.wrapTitle}>
                <Text style={styles.title}>Welcome Back</Text>
            </View>
            <View style={styles.wrapContentTitle}>
                <Text style={styles.contentTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam maecenas mi non sed ut odio. Non, justo, sed facilisi et. </Text>
            </View>
            <View style={styles.from}>
                <TextInput placeholder='Username , Email & Phone Number' maxLength={30} style={[styles.inputTextEmail, {
                    borderWidth: focusEmail ? 1 : 0,
                    borderColor: (email == false && !error || !checkEmail && !error) ? 'red' : 'gray',
                }]} value={email} onChangeText={setEmail}
                    autoFocus={true}
                    onBlur={() => setFocusEmail(false)}
                    onFocus={() => setFocusEmail(true)} />
                {(email == false && !error || !checkEmail && !error) && <Text style={{ fontSize: 14, color: 'red', marginTop: 5, alignSelf: 'flex-start' }}>Bạn chưa nhập hoặc email không hợp lệ!</Text>}
                <View style={[styles.inputTextPass, {
                    borderWidth: focusPass ? 1 : 0,
                    borderColor: (pass == false && !error) ? 'red' : 'gray',
                }]}>
                    <TextInput placeholder='Password'
                        style={{ flex: 2 }}
                        onFocus={() => { setFocusPass(true) }}
                        onBlur={() => { setFocusPass(false) }}
                        secureTextEntry={isShowPass}
                        maxLength={30}
                        value={pass}
                        onChangeText={setPass} />
                    <TouchableOpacity
                        onPress={() => setShowPass(!isShowPass)}>
                        <Image style={{}} source={isShowPass ? require('../images/show.png') : require('../images/hide.png')} />
                    </TouchableOpacity>
                </View>
                {(pass == false && !error) && <Text style={{ fontSize: 14, color: 'red', marginTop: 5, alignSelf: 'flex-start' }}>Bạn chưa nhập mật khẩu!</Text>}

            </View>
            <View style={styles.wrapForgot}>
                <Text style={styles.forgotPass}>Forgot Password?</Text>
            </View>
            <TouchableOpacity
                style={styles.btnLogin}
                onPress={checkLogin}>

                <Text style={styles.txtBtn}>Sign In</Text>
            </TouchableOpacity>
            <Text style={styles.txtOr}>
                Or Sign up With
            </Text>

            <View style={styles.wrapIcons}>
                <TouchableOpacity style={styles.btnGoogle}>
                    <Image style={styles.imgGG} source={require('../images/google.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnGoogle}>
                    <Image style={styles.imgGG} source={require('../images/facebook.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnGoogle}>
                    <Image style={styles.imgGG} source={require('../images/apple.png')} />
                </TouchableOpacity>
            </View>
            {isLoading && <Loading />}
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'


    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        fontStyle: 'normal',

    },
    wrapTitle: {
        marginTop: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentTitle: {
        fontSize: 13,
        fontWeight: '300',
        textAlign: 'center',
        color: '#000000'
    },
    wrapContentTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        paddingStart: 32,
        paddingEnd: 36,
        marginBottom: 26

    },
    from: {
        marginTop: 24,
        alignItems: 'center',
        paddingHorizontal: 20

    },
    wrapForgot: {
        alignItems: 'flex-end',
        paddingEnd: 27,
        marginTop: 13
    },
    forgotPass: {
        fontWeight: '500',
        fontSize: 15,
        color: '#2D2626'
    },
    btnLogin: {
        marginTop: 25,
        alignItems: 'center',
        backgroundColor: '#225125',
        height: 59,
        width: 359,
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center'
    },
    txtBtn: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700'
    },
    txtOr: {
        fontSize: 12,
        fontWeight: '500',
        color: '#555252',
        alignSelf: 'center',
        marginTop: 29
    },
    wrapIcons: {
        width: 250,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30
    },
    btnGoogle: {
        borderColor: '#225125',
        width: 52,
        height: 52,
        backgroundColor: '#ECE9EC',

        borderRadius: 360,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    imgGG: {

    },
    inputTextEmail: {

        marginTop: 10,
        width: 359,
        height: 59,
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        elevation: 2,


        backgroundColor: '#F3F3F3'

    },
    inputTextPass: {
        width: 359,
        height: 59,
        borderRadius: 15,
        borderColor: 'gray',
        elevation: 2,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,

        backgroundColor: '#F3F3F3'
    }


})
export default Login