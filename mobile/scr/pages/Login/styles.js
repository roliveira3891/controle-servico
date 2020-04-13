import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:24,
        paddingTop: Constants.statusBarHeight + 60
    },

    header: {
       
        alignItems: 'center'
    },

    box:{
        borderRadius: 8,
        marginTop:24,
        padding: 24,
        backgroundColor:'#fff',
        alignItems:"center",
        marginBottom: 16,
        marginTop: 48,
    },
    entrada:{
        width:300,
        height:50,
        borderColor:'#fff',
        borderWidth:1,
        backgroundColor:'#fff',
        marginTop:10,
        fontSize:18,
        paddingHorizontal: 40,

    },
    botao: {
        marginTop: 40,
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: '#38697A',
        color:'#fff',
        
    },
    botaotext: {
        color: '#fff'
    },
    texto: {
        color: '#47454c',
       paddingVertical: 20,
        paddingHorizontal: 60,  
    }
})

