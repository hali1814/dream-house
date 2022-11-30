import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity

} from 'react-native'
import React from 'react'


const SayHello = ({navigation}) => {
    
    
    return (
        <View style={{ flex: 1, paddingTop: 16, paddingHorizontal: 9, backgroundColor: 'white' }}>
            <View style={styles.backgroundHeader}>
                <Image
                    source={require('../images/sayhi-product.png')}
                    resizeMode='stretch'
                    width={'100%'}
                    height={'100%'}
                    style={{ width: 226, height: 339 }} />
            </View>
            <View style={styles.backgroundContent}>
                <Text style={styles.textTitle}>Discover Your</Text>
                <Text style={styles.textTitle}>Own Dream House</Text>
                <Text style={styles.textContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam maecenas mi non sed ut odio. Non, justo, sed facilisi et. Eget viverra urna, vestibulum egestas faucibus egestas. Sagittis nam velit volutpat eu nunc.</Text>

            </View>
            <View style={styles.backgroundFooter}>
                <TouchableOpacity 
                    style={styles.btnLogin}
                    onPress={() => navigation.navigate('login')}>
                    <Text style={{ fontSize: 22, fontWeight: '700', color: 'white' }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btnRigister}
                    onPress={() => navigation.navigate('register')}>
                    <Text style={{ fontSize: 22, fontWeight: '700', color: '#545151' }}>Register</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default SayHello

const styles = StyleSheet.create({
    backgroundHeader: {
        backgroundColor: '#225125',
        width: '100%',
        height: '50%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    backgroundContent: {
        paddingTop: 43
    },
    textTitle: {
        fontSize: 30,
        color: '#464444',
        fontWeight: '700',
        alignSelf: 'center',

    },
    textContent: {
        fontSize: 13,
        fontWeight: '300',
        lineHeight: 16,
        textAlign: 'center',

        color: '#000000',
        marginTop: 19
    },
    backgroundFooter: {
        marginTop: 70,
        flexDirection: 'row',
        width: '100%',
        height: 65,
        justifyContent: 'space-between',

    },
    btnLogin: {
        width: '50%',
        backgroundColor: '#225125',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopStartRadius: 15,
        borderBottomStartRadius: 15,
        elevation: 2

    },
    btnRigister: {
        width: '50%',
        backgroundColor: '#F3F3F3',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        elevation: 2
        
    }

})