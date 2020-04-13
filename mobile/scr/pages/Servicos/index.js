import React, { useState, useEffect }  from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import styles from './styles';
import imgLogo from '../../assets/logo.png';

import api from '../../services/api';


export default function Servicos() {
    const navigate = useNavigation();
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const route = useRoute();
    const servicorouteid = route.params.id;
    
    function navigateToDetail(servico){
        navigate.navigate('Detail', { servico });
    }
    function logoff(){
        AsyncStorage.setItem('@user','');    
        navigate.navigate('Login');
    }

    async function loadServicos() {
        let matricula =  await AsyncStorage.getItem('@user');
        if(loading){
            return;
        }
        if(total > 0 && servicos.length===total){
            return;
        }
        setLoading(true);
         
        const response = await api.get(`servicos/${matricula}`,{
            params: { page }
        });
        
        const dados = servicos.filter(servico => servico.id !== servicorouteid);
        setServicos([...dados, ...response.data]);
        setTotal(response.headers["x-total-count"]);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadServicos();
    }, [servicorouteid]);

   
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={imgLogo} />
                
                <TouchableOpacity onPress={logoff}>
                    <Text><Feather size={30} color="#38697A" name="log-in"></Feather></Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.headerText}> Total de {total} Serviços</Text>
           
        
            <FlatList
                style={styles.servicosList}
                data={servicos}
                keyExtractor={servico => String(servico.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadServicos}
                onEndReachedThreshold={0.2}
                renderItem={({ item: servico }) => (
                    <View style={styles.servico}>
                       
                        <Text style={styles.servicoProperty}>Instancia:</Text>
                        <Text style={styles.servicoValue}>{servico.telefone}</Text>

                        <Text style={styles.servicoProperty}>Armario:</Text>
                        <Text style={styles.servicoValue}>{servico.ard}</Text>
                        
                        <Text style={styles.servicoProperty}>Tecnico:</Text>
                        <Text style={styles.servicoValue}>{servico.tecnico}</Text>

                        <Text style={styles.servicoProperty}>Endereço:</Text>
                        <Text style={styles.servicoValue}>{servico.endereco}</Text>

                        <Text style={styles.servicoProperty}>Tipo Atividade:</Text>
                        <Text style={styles.servicoValue}>{servico.projeto}</Text>
                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(servico)}>
                            <Text style={styles.detailButtonText}>Ver mais detalhes</Text> 
                            <Feather name='arrow-right'  />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}
