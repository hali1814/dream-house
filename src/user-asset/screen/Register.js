import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native'
import React, { useState } from 'react'
import Loading from '../../progess-bar/Loading'
import * as user from '../ApiService'
const Register = ({ navigation }) => {
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const [isShowPass, setShowPass] = useState(true)
    const [isShowConfirmPass, setShowConfirmPass] = useState(true)
    const [email, setEmail] = useState('')
    const checkEmail = regexEmail.test(email)
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [address, setAddress] = useState('')
    const [error, setError] = useState(true)
    //focus style 
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusPass, setFocusPass] = useState(false)
    const [focusConfirmPass, setConfirmFocusPass] = useState(false)
    const [focusAddress, setFoucusAddress] = useState(false)
    //loading
    const [isLoading, setIsLoading] = useState(false)

    const callApi = async () => {
        try {
            const res = await user.register({ email, password: pass, address });
            console.log('ahaha', res);
            setIsLoading(false);
            navigation.navigate('login', { newMember: email });

        } catch (e) {
            console.log('checkRegister: ', e);
        }
    }

    const checkRegister = (e) => {
        Keyboard.dismiss();
        setError(false)
        if (email && pass && checkEmail && pass && confirmPass && address) {
            if (pass === confirmPass) {
                setIsLoading(true);

                callApi();
            } else {
                alert('Password không trùng khớp');
            }
        }
    }

    return (


        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "heigth" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Hello New Friend</Text>
                <View style={styles.wrapContentTitle}>
                    <Text style={styles.contentTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam maecenas mi non sed ut odio. Non, justo, sed facilisi et. </Text>
                </View>

                <View style={styles.from}>
                    <TextInput placeholder='Username , Email & Phone Number' style={[styles.fromUser, {
                        borderWidth: focusEmail ? 1 : 0,
                        borderColor: (email == false && !error || !checkEmail && !error) ? 'red' : 'gray',
                    }]}

                        value={email}
                        onChangeText={setEmail}
                        autoFocus={true}
                        onBlur={() => setFocusEmail(false)}
                        onFocus={() => setFocusEmail(true)} />
                    {(email == false && !error || !checkEmail && !error) && <Text style={{ fontSize: 14, color: 'red', marginTop: 5, alignSelf: 'flex-start' }}>Bạn chưa nhập hoặc email không hợp lệ!</Text>}

                    {/* password */}

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

                    {/* confirm password */}

                    <View style={[styles.inputTextPass, {
                        borderWidth: focusConfirmPass ? 1 : 0,
                        borderColor: (confirmPass == false && !error) ? 'red' : 'gray',
                    }]}>
                        <TextInput placeholder='Confirm Password'
                            style={{ flex: 2 }}
                            onFocus={() => { setConfirmFocusPass(true) }}
                            onBlur={() => { setConfirmFocusPass(false) }}
                            secureTextEntry={isShowConfirmPass}
                            maxLength={30}
                            value={confirmPass}
                            onChangeText={setConfirmPass} />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPass(!isShowPass)}>
                            <Image style={{}} source={isShowPass ? require('../images/show.png') : require('../images/hide.png')} />
                        </TouchableOpacity>

                    </View>
                    {(confirmPass == false && !error) && <Text style={{ fontSize: 14, color: 'red', marginTop: 5, alignSelf: 'flex-start' }}>Bạn chưa nhập xác nhận mật khẩu!</Text>}

                    {/* address */}

                    <TextInput placeholder='Address' style={[styles.fromUser, {
                        borderWidth: focusAddress ? 1 : 0,
                        borderColor: (address == false && !error) ? 'red' : 'gray'
                    }]}

                        value={address}
                        onChangeText={setAddress}
                        onBlur={() => setFoucusAddress(false)}
                        onFocus={() => setFoucusAddress(true)} />
                    {(address == false && !error) && <Text style={{ fontSize: 14, color: 'red', marginTop: 5, alignSelf: 'flex-start' }}>Bạn chưa địa chỉ!</Text>}

                </View>

                <TouchableOpacity style={styles.btnLogin}
                    onPress={checkRegister}>
                    <Text style={styles.txtBtn}>Register</Text>
                </TouchableOpacity>
            </ScrollView>
            {isLoading && <Loading />}
        </KeyboardAvoidingView>

    )
}



const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: '700',
        alignSelf: 'center',
        marginTop: 60,
        color: '#464444'
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
        marginTop: 26,
        alignItems: 'center'
        , paddingHorizontal: 20

    },
    fromUser: {
        marginTop: 10,
        width: 359,
        height: 59,
        backgroundColor: '#F3F3F3',
        padding: 20,
        borderRadius: 15,
        fontSize: 15,
        fontWeight: '500',
        shadowColor: '#000',
        elevation: 2
    },
    btnLogin: {
        marginTop: 42,
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
    },
    container: {
        flex: 1,
    }

})

export default Register