import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:16
    },

    servico : {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom:16
    },

    

    servicoPropety:{
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
    },

    servicoValue:{
       marginBottom:16,
       fontSize: 15,
        color: '#737380'
    },

    boxcadastro: {
        padding: 24,
        borderRadius:8,
        backgroundColor: '#fff',
        marginBottom:16
    },



    sevicopicker:{
       fontSize: 14,
       padding:24,
       marginBottom:16,
       
    },

   sevicotextinput: {
       
        marginBottom:16,

        color: 'gray'
    },

    titleBox :{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom:16,
        textAlign:'center',
        borderWidth:0,
        color: '#fff',
        backgroundColor: '#38697A'
    },

    imagegrid:{
        flex: 1,
        width: 100, 
        height: 100,
        
    },

    buttonupload:{
      
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    button:{
       marginBottom: 14
        
    },
    imageThumbnail: {
        marginTop:10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width:100,
   },





})

