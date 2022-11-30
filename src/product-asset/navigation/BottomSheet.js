import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
const { height } = Dimensions.get('window')
import BottomSheet from 'reanimated-bottom-sheet';


const BottomSheetaa = () => {
    const renderContent = () => (
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            height: 450,
          }}
        >
          <Text>Swipe down to close</Text>
        </View>
      );
    
      const sheetRef = React.useRef(null);
    const translateY = useSharedValue(0)
    const context = useSharedValue({ y: 0 })
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { y: translateY.value }
        })
        .onUpdate(event => {
            translateY.value = event.translationY + context.value.y
            translateY.value = Math.max(translateY.value, -height)
            console.log(event.translationY)
        })


    useEffect(() => { 
        translateY.value = withTiming(-height/14, {damping: 50})
    }, [])
    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    })
    return (
        <GestureDetector gesture={gesture}>

            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                <View style={styles.line} />
                {console.log('hihi')}
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.txtButton}>Chụp hình</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.txtButton}>Thư viện của bạn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.txtButton}>Hủy bỏ</Text>
                    </TouchableOpacity>
                </View>
                <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
            </Animated.View>
        </GestureDetector>
    )
}

export default BottomSheetaa

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#225125',
        width: '100%',
        height: 50,
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtButton: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500'
    },
    bottomSheetContainer: {
        height: height,
        width: '100%',
        backgroundColor: '#F4F9F9',
        position: 'absolute',
        top: height / 1.5,
        borderRadius: 25,
        paddingHorizontal: 20
    },
    line: {
        width: '18%',
        height: 3,
        backgroundColor: 'gray',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10
    }
})