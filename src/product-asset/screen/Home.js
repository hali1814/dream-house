import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import * as getProduct from '../ApiProductService'
import Loading from '../../progess-bar/Loading'




const Home = ({navigation}) => {
  //loading 
  const [loading, setLoading] = React.useState(false)
  //data
  const [data, setData] = React.useState([])
  //load data
  const [loadData, setLoadData] = React.useState(false)



  const fullProduct = async () => {
    setLoading(true)
    try {
      console.log('111111111111111111111')
    const response = await getProduct.getFullProduct();
    console.log('2222222222222222222')
    console.log(response)
    setLoading(false)
    setData(response)
    }catch (e) {
      console.log('error Home', e)
    }
   
  }

  useEffect( () => {
    fullProduct();
    return () => {} // cleanup
  }, [loadData])


  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Edit', {...item, loadData})}>
        {/* //content */}
        <View style={styles.itemWrapContent}>
          {/* //star */}
          <View style={styles.itemHeader}>
            <Image source={require('../images/star.png')}/>
            <Text style={[styles.txtPrice, {marginLeft: 6}]}>4.2</Text>
            <Image width={60} height={163}
             source={{uri: item.images}} style={styles.imgProduct}
             />
          </View>
          {/* //price */}
          <View style={styles.itemWrapfooter}>
            <View style={styles.itemContent}>
              <Text style={styles.txtNameProduct}>
                {item.name}
              </Text>
              <TouchableOpacity style={styles.btnLove}>
              <Image source={require('../images/heart.png')}/>
              </TouchableOpacity>
            </View>
            <Text style={styles.txtPrice}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
      
        
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={styles.txtTitle}>Good Morning!</Text>
      <Text style={styles.txtMyName}>Nguyen Tan Hao</Text>
      <View style={styles.formSearch}>
        <Image style={styles.ic_search} source={require('../images/search.jpg')} />
        <TextInput placeholder='Search' style={styles.formTextinput} />
      </View>
      <View style={styles.wrapCategory}>
        <Text style={[styles.txtTextCategory, { color: '#225125' }]}>Popular</Text>
        <Text style={styles.txtTextCategory}>Coffee</Text>
        <Text style={styles.txtTextCategory}>Tea</Text>
        <Text style={styles.txtTextCategory}>Drink</Text>
      </View>
      <View style={styles.content}>
        <FlatList
        contentContainerStyle={{paddingBottom: 300}}
        showsVerticalScrollIndicator={false}
        data={data}
        numColumns={2}
        key={item => item._id}
        refreshing={loading}
        onRefresh={fullProduct}
        renderItem={renderItem}/>
      </View>
      {loading && <Loading />}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  content: {
    width: '100%',
    marginTop: 10,
    height: '100%'
    
  },
  txtTitle: {
    marginTop: 48,
    marginLeft: 19,
    color: '#000000',
    opacity: .60,
    fontSize: 15,
    fontWeight: '500'
  },
  txtMyName: {
    marginLeft: 19,
    marginTop: 2,
    color: '#225125',
    fontSize: 20,
    fontWeight: '500'
  },
  formSearch: {
    width: 364,
    height: 44,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginLeft: 19,
    marginTop: 14
  },
  ic_search: {

  },
  formTextinput: {
    paddingStart: 11,
    fontSize: 15,
    fontWeight: '400'

  },
  wrapCategory: {
    flexDirection: 'row',
    marginTop: 21,
    alignItems: 'center',
    marginLeft: 19

  },
  txtTextCategory: {
    color: '#999999',
    fontSize: 18,
    fontWeight: '500',
    marginRight: 30
  },
  item: {
    height: 182,
    width: 170,
    backgroundColor: '#225125',
    borderRadius: 20,
    marginHorizontal: 13,
    marginTop: 90,
    padding: 18

  },
  itemWrapContent:{
    flex: 1,
    justifyContent: 'space-between'
    
  },
  itemHeader:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemWrapfooter: {

  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  txtPrice: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400'
  },
  txtNameProduct: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4
  },
  imgProduct: {
    position: 'absolute',
    top: -65,
    left: 30,
    width: 125,
    height: 163,

  }
  ,
  btnLove: {
    height: 25,
    width: 25,
    backgroundColor: '#ffffff',
    marginLeft: 4,
    borderRadius: 360,
    justifyContent: 'center',
    alignItems: 'center'
  }



})