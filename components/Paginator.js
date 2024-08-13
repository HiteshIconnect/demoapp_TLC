import React,{useEffect,useState} from 'react'
import { Text, View, ImageBackground, Image, TextInput, TouchableOpacity,StyleSheet,ScrollView, Button } from 'react-native';
import {paginatorStyles} from '../styles/paginatorStyles'

const paginator = ({list,customPageNumber,changeCustomPage,postsPerPage}) => {
  
  const [allPages,setAllPages] = useState([])
   const [tempPageArray,setTempPageArray] = useState([]);
   const [prev,setPrev] = useState(0);
   const [next,setNext] = useState(0);
  const [currentButton, setCurrentButton] = useState(1)

  useEffect(()=>{
    const numberOfPages = []
    const p=Math.ceil(list/ postsPerPage);
    for (let i = 1; i <= p; i++) {
      numberOfPages.push(i)
    }
    setAllPages(numberOfPages)
  },[])
  
  useEffect(() => {
    if(allPages.length){
      if(allPages.length<5){
        setTempPageArray([...allPages])
      }else{
        setTempPageArray(allPages.slice(0,5))
      }
    }
  },[allPages])

  useEffect(()=>{
    if(tempPageArray[tempPageArray.length - 1] < allPages[allPages.length-1] ){
      const startPostn = tempPageArray.length ? tempPageArray[tempPageArray.length - 1]: 0 ;
      const endPostn = startPostn + 5;
      const newVal = allPages.slice(startPostn,endPostn)
      setTempPageArray(newVal);
    }
    return 
  },[next])

  useEffect(()=>{
    if(allPages.length < 5) return
      const endPostn = tempPageArray.length ? tempPageArray[0] - 1 : allPages[allPages.length-1] ;
      const startPostn = allPages.length < 5 ? endPostn - tempPageArray.length : endPostn - 5
      const newVal = allPages.slice(startPostn,endPostn)
      setTempPageArray(newVal);
    
  },[prev])

  
    return (
        <View style={paginatorStyles.container}>
            <TouchableOpacity onPress={() =>{
              setPrev(currentButton-5)
              changeCustomPage(currentButton-5)
             setCurrentButton(() => {
              return currentButton-5
            })}}
            disabled={customPageNumber <= 5 }
            >
                <Image source={require('../assets/left-icon.png')} />
            </TouchableOpacity>
            
            <View style={{display:'flex',flexDirection:'row'}}>
            {
                tempPageArray.map((item)=>{
                return (
                    <TouchableOpacity onPress={()=>{
                      changeCustomPage(item)
                      setCurrentButton(item)
                    }} key={item} style={paginatorStyles.makeLeftMargin5}>
                       { 
                       /* <Image source={require('../assets/paginatorellipse.png')} />
                       <Text style={{fontSize:12,fontFamily:'Poppins',position:'absolute',bottom:7,left:14}}>{item}</Text> */}
                       <View style={(item===customPageNumber? paginatorStyles.pageCircleActive : paginatorStyles.pageCircle)}>
                           <Text style={(item===customPageNumber? paginatorStyles.pageNoTextActive:paginatorStyles.pageNoText)}>{item}</Text>
                       </View>
                    </TouchableOpacity>
                )
            })
            }
            </View>
            <TouchableOpacity
             onPress={()=>{
              setNext(currentButton+5)
              changeCustomPage(currentButton+5)
               setCurrentButton(() => {
                return currentButton+5
              } )
            }
           }
           disabled={tempPageArray[tempPageArray.length-1] === allPages[allPages.length-1]}
           >
                <Image source={require('../assets/right-icon.png')} />
            </TouchableOpacity>
        </View>
    )
}


export default paginator
