import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerText: {
        fontSize: 15,
        color: '#737380'

    },

    headerTextBold: {
        fontWeight: 'bold',
   },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 20,
        color:'#13131a',
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380',
    },

   servicosList: {
        marginTop: 32
    },

    servico: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
       marginBottom: 16
    },

    servicoInstancia: {
        marginBottom:16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    servicoProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },

    servicoValue: {
        fontSize:15,
        marginBottom:24,
        color: '#737380'

    },
   detailsButton: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    detailButtonText:{
        color: '#38697A',
   }
   

})