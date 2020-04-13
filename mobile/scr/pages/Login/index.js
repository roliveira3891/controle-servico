import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, Alert, AsyncStorage } from 'react-native';

import styles from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

import { useNavigation } from '@react-navigation/native';


export default function Login(){
    const navigation = useNavigation();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    async function logon(){
        //await SyncStorage.init();
        if((user.trim())!='' && (password.trim()) !=''){
            await api.post('/user', {
                user: user, 
                password:password
            })
            .then(response => { 
                AsyncStorage.setItem('@user', response.data.login);
                if(response.data.login){
                    navigation.navigate('Servicos', {id:0});
                }else{
                    Alert.alert('Usuário e/ou Senha incorreto');
                }
            })
            .catch(error => {
                //console.log(error)
                Alert.alert(error);
            });
            
        }else{
            Alert.alert("Favor Inserir o Usuário e Senha");
        }
    }

    async function usuario(){
        const matricula = await AsyncStorage.getItem('@user');
        return matricula;
    }

    useEffect(()=>{
        const matricula = usuario();
        if(matricula)
        {
            navigation.navigate('Servicos', {id:0});
        }
        console.log(matricula);
    },[])


    
   return (
        
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logo} />
               </View>
                <View style={styles.box}>
                    <View >
                    
                        <TextInput style={styles.entrada}
                            onChangeText={(user) => setUser(user)}
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder="Matricula"
                            selectionColor="#fff"/>
                    </View>
                    <View >
                        <TextInput style={styles.entrada}
                            onChangeText={(password) => setPassword(password)} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder="Password"
                            secureTextEntry={true}/>
                    
                    </View>
                    <TouchableOpacity style={styles.botao} onPress={logon}>
                        <View>
                            <Text style={styles.botaotext}>ENTRAR</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.texto}>Para acesso, entre em contato com o responsável da sua cidade</Text>
            </View>
        
    );
}

