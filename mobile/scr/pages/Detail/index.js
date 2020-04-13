import React, { useState} from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    Picker, 
    ScrollView,
    TextInput,
    FlatList,
    Button,
    TouchableWithoutFeedback,
    Alert,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import { format } from 'date-fns'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import ImgLogo from '../../assets/logo.png';
import api from '../../services/api';
import * as firebase from 'firebase';

import firebaseConfig from '../../../firebase';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function Detail() {
    const navigate = useNavigation();
   
    const [tecnologia, setTecnologia] = useState();
    const [pacote, setPacote] = useState();
    const [tipoTv, setTipoTv] = useState();
    const [facilidade, setFacilidade] = useState();
    const [jumper, setJumper] = useState();
    const [equipagem, setEquipagem] = useState();
    const [dropfeb, setDropFeb] = useState();
    const [cto, setCto] = useState();
    const [etiqueta, setEtiqueta] = useState();
    const [pingadeira, setPingadeira] = useState();
    const [parametro, setParametro] = useState();
    const [tomada, setTomada] = useState();
    const [acabamentoInterna, setAcabamentoInterna] = useState();
    const [extencaolinha, setExtencaoLinha] = useState();

    const [wifiCanais, setWifiCanais] = useState();
    const [wifiGuiaRapido, setWifiGuiaRapido] = useState();
    const [wifiModemLocal, setWifiModemLocal] = useState();
    const [wifiConfCliente, setWifiConfCliente] = useState();
    const [wifiEquipamento, setWifiEquipamento] = useState();
    const [wifiFita, setWifiFita] = useState();
    const [wifiFragilidade, setWifiFragilidade] = useState();
    
    const [satCordial, setSatCordial] = useState();
    const [satTecnicoAcoes, setSatTecnicoAcoes] = useState();
    const [satAvaliaTecnico, setSatAvaliaTecnico] = useState();
    const [satQuestionamentoaoTecnico, setSatQuestionamentoaoTecnico] = useState();
    const [satPosturaTecnico, setSatPosturaTecnico] = useState();
    const [satSatisfacaoProduto, setSatSatisfacaoProduto] = useState();
    const [satEstrutura, setSatEstrutura] = useState();
    const [satObservacao, setSatObservacao] = useState();
    const [statusservico, setStatusservico] = useState('ENCERRAR');

    const matriculalogin = AsyncStorage.getItem('@user');
   

    const [images, setImages] =  useState([]);
    const createTwoButtonAlert = () =>
        Alert.alert(
            "Finalizar",
            "Deseja Salvar as Informações?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: () => handleUpdateItem()
                }
            ],
            { 
                cancelable: false 
            }
        );
    

    const route = useRoute();
    const servicoroute = route.params.servico;

    function navigateBack(){
        navigate.goBack();
        
    }

    async function getPermissionAsync(){
        const { status } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
            Permissions.CAMERA
        );
        if (status !== 'granted') {
            alert('Desculpe, precisa autorizar a Câmera!');
        }
    }


    async function handlePickImageCamera(){
        getPermissionAsync();
        let result = await ImagePicker.launchCameraAsync({
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setImages(images => [...images, result]);
        }
    }
    async function handlePickImage(){
        getPermissionAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            //setImages([result.uri]);
            setImages(images => [...images, result]);
            console.log('images -> ');
            console.log(images);
        }
    }
    async function handleRemoveItem(uri){
        setImages(images.filter(item => item.uri !== uri));
    }
    
    


    async function handleUpdateItem(){
        
        let dataagora = format(new Date(), 'yyyy-MM-dd HH:mm');
        let i = 0;
        images.map(item => {
            console.log('images');
            try {
                let retorns = uploadImageAsync(item.uri,i);
            }  catch (e) {
                alert('Erro ao Salvar Imagem');
            } finally {
                //console.log('finalizar');
            }
            i++
        })

        
        //Corrigir a matricula do super
        let data = {
            tecnologia : tecnologia,
            pacote : pacote,
            tipo_tv : tipoTv,
            facilidades_atualiadas : facilidade,
            jumper_padrao : jumper,
            equipagem_postes : equipagem,
            drop_feb : dropfeb,
            cto_dgoi_cdoi_cdoe_caixa_tar : cto,
            etiqueta_identificacao : etiqueta,
            pingadeira_reserva_tecnica : pingadeira,
            parametros_modem : parametro,
            tomada_padrao : tomada,
            acabamento_rede_interna : acabamentoInterna,
            extencao_linha : extencaolinha,
        
            configurado_canais : wifiCanais,
            cliente_orientado : wifiGuiaRapido,
            modem_melhor_local : wifiModemLocal,
            clientes_configurados : wifiConfCliente,
            equipamento_rede_cliente : wifiEquipamento,
            clientes_conector_autofusao : wifiFita,
            orientacao_movimentacao_fibra : wifiFragilidade,
            
            tecnico_foi_cordial : satCordial,
            tecnico_deixou_cliente_acoes : satTecnicoAcoes,
            avalicao_tecnico_pelo_cliente : satAvaliaTecnico,
            questionamento_tecnico_n_soube : satQuestionamentoaoTecnico,
            postura_tecnico : satPosturaTecnico,
            satisfacao_produto : satSatisfacaoProduto,
            estrutura : satEstrutura,
            observacao : satObservacao,
            encerramento: dataagora,
            cadastrado: statusservico
        }
        
            
        await api.post(`servicos/${servicoroute.id}/update`, data ,{
            headers: {
                    Authorization: matriculalogin,
            }
        });
        
        navigate.navigate('Servicos', {id:servicoroute.id});
        
    }

    
    async function uploadImageAsync(uri, i) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });
      
        

        const ref = firebase
          .storage()
          .ref()
          .child(`files/${servicoroute.documento}/${i}.png`);
        const snapshot = await ref.put(blob);
        blob.close();
        
        return await snapshot.ref.getDownloadURL();
    }


    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={ImgLogo} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#38697A"></Feather>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.servicoscroll} > 
                <View style={styles.servico}>
                    <Text style={styles.titleBox}>Dados do Serviços</Text>

                    <Text style={styles.servicoPropety}>Cluster:</Text>
                    <Text style={styles.servicoValue}>{servicoroute.cluster}</Text>

                    <Text style={styles.servicoPropety}>Armario:</Text>
                    <Text style={styles.servicoValue}>{servicoroute.ard}</Text>
                
                    <Text style={styles.servicoPropety}>Instancia:</Text>
                    <Text style={styles.servicoValue}>{servicoroute.telefone}</Text>

                    <Text style={styles.servicoPropety}>Documento:</Text>
                    <Text style={styles.servicoValue}>{servicoroute.documento}</Text>
                    
                    <Text style={styles.servicoPropety}>EndereÃ§o:</Text>
                    <Text style={styles.servicoValue}>{servicoroute.endereco}</Text>

                    <Text style={styles.servicoPropety}>Cliente:</Text>
                    <Text style={styles.servicoValue}>{servicoroute.cliente}</Text>
                
                    <Text style={styles.servicoPropety}>Data Cadastro:</Text>
                    <Text style={styles.servicoValue}>{servicoroute.envio}</Text>

                    <Text style={styles.servicoPropety}>Data Vencimento:</Text>
                    <Text style={styles.servicoValue}>{servicoroute.vencimento}</Text>
               
                    <Text style={styles.servicoPropety}>Tipo Serviço:</Text>
                    <Text style={styles.servicoValue}>{servicoroute.projeto}</Text>
                    
                
                </View>

                <View style={styles.boxcadastro}>
                    <Text style={styles.titleBox}>Produto</Text>

                   <Text style={styles.servicoPropety}>Tecnologia</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={tecnologia}
                    onValueChange={(itemValue, itemIndex) => setTecnologia(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="Premium" value="Premium" />
                        <Picker.Item label="Massiva" value="Massiva" />
                    </Picker>
                    <Text style={styles.servicoPropety}>Pacote</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={pacote}
                    onValueChange={(itemValue, itemIndex) => setPacote(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="DUO" value="DUO" />
                        <Picker.Item label="TRIO" value="TRIO" />
                    </Picker>

                    <Text style={styles.servicoPropety}>Tipo TV</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={tipoTv}
                    onValueChange={(itemValue, itemIndex) => setTipoTv(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="IPTV" value="IPTV" />
                        <Picker.Item label="DTH" value="DTH" />
                        <Picker.Item label="HIBRIDA" value="HIBRIDA" />
                        <Picker.Item label="N/A" value="N/A" />
                    </Picker>
                </View>

                
                <View style={styles.boxcadastro}>
                    <Text style={styles.titleBox}>Auditoria</Text>

                    <Text style={styles.servicoPropety}>Facilidade Atualizado</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={facilidade}
                    onValueChange={(itemValue, itemIndex) => setFacilidade(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                    </Picker>

                    <Text style={styles.servicoPropety}>Jumper Padrão</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={jumper}
                    onValueChange={(itemValue, itemIndex) => setJumper(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                   </Picker>

                    <Text style={styles.servicoPropety}>Equipagem dos Postes</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={equipagem}
                    onValueChange={(itemValue, itemIndex) => setEquipagem(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                    </Picker>

                    <Text style={styles.servicoPropety}>DROP e FEB</Text>
                   <Picker 
                    style={styles.sevicopicker}
                    selectedValue={dropfeb}
                    onValueChange={(itemValue, itemIndex) => setDropFeb(itemValue)}>
                       <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                    </Picker>

                    <Text style={styles.servicoPropety}>CTO/DGOI/CDOI/CDOE/Caixa e TAR</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={cto}
                    onValueChange={(itemValue, itemIndex) => setCto(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK-PADRAO" value="OK-PADRAO" />
                        <Picker.Item label="NOK-FORA DO PADRAO" value="NOK-FORA DO PADRAO" />
                        <Picker.Item label="NOK-EMENDA ABERTA" value="NOK-EMENDA ABERTA" />
                   </Picker>

                   <Text style={styles.servicoPropety}>Etiqueta Identificação</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={etiqueta}
                    onValueChange={(itemValue, itemIndex) => setEtiqueta(itemValue)}>
                       <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK-PADRAO" value="OK-PADRAO" />
                        <Picker.Item label="NOK-AUSENTE" value="NOK-AUSENTE" />
                        <Picker.Item label="NOK-FORA DO PADRAO" value="NOK-FORA DO PADRAO" />
                        <Picker.Item label="N/A-MASSIVO" value="N/A-MASSIVO" />
                    </Picker>

                    <Text style={styles.servicoPropety}>Pingadeira Reserva Tecnica(1M)</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={pingadeira}
                    onValueChange={(itemValue, itemIndex) => setPingadeira(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK-PADRAO" value="OK-PADRAO" />
                        <Picker.Item label="NOK-TAMANHO INFERIOR" value="NOK-TAMANHO INFERIOR" />
                        <Picker.Item label="NOK-AUSENTE" value="NOK-AUSENTE" />
                        <Picker.Item label="N/A REDE INTERNA" value="N/A REDE INTERNA" />
                    </Picker>

                    <Text style={styles.servicoPropety}>Parametros Modem</Text>
                    <Picker 
                    style={styles.sevicopicker}
                   selectedValue={parametro}
                    onValueChange={(itemValue, itemIndex) => setParametro(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                    </Picker>
                    <Text style={styles.servicoPropety}>Tomada Padrão</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={tomada}
                    onValueChange={(itemValue, itemIndex) => setTomada(itemValue)}>
                       <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                    </Picker>

                    <Text style={styles.servicoPropety}>Acabamento Rede Interna</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={acabamentoInterna}
                    onValueChange={(itemValue, itemIndex) => setAcabamentoInterna(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK-DROP/FEB COM CANALETA" value="OK-DROP/FEB COM CANALETA" />
                       <Picker.Item label="OK-TUBULACAO INTERNA" value="OK-TUBULACAO INTERNA" />
                        <Picker.Item label="NOK-DROP/FEB SOLTO" value="NOK-DROP/FEB SOLTO" />
                        <Picker.Item label="NOK-DROP/FEB COM FIXA FIO" value="NOK-DROP/FEB COM FIXA FIO" />
                    </Picker>

                    <Text style={styles.servicoPropety}>Informe Total Extensão de Linha</Text>
                    <TextInput
                    style={styles.sevicotextinput}
                    onChangeText={text => setExtencaoLinha(text)}
                    value={extencaolinha}
                    placeholder="Resposta"/>

                </View>



                <View style={styles.boxcadastro}>
                    <Text style={styles.titleBox}>WI-FI</Text>

                    <Text style={styles.servicoPropety}>Configurado Canais Cliente</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={wifiCanais}
                    onValueChange={(itemValue, itemIndex) => setWifiCanais(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK-CLIENTE ORIENTADO E CONFIGURADO" value="OK-CLIENTE ORIENTADO E CONFIGURADO" />
                        <Picker.Item label="NOK-CLIENTE NAO ORIENTADO E CONFIGURADO" value="NOK-CLIENTE NAO ORIENTADO E CONFIGURADO" />
                        <Picker.Item label="NOK-ORIENTADO E NAO CONFIGURADO" value="NOK-ORIENTADO E NAO CONFIGURADO" />
                        <Picker.Item label="NOK-CLIENTE NAO ORIENTADO E NAO CONFIGURADO" value="NOK-CLIENTE NAO ORIENTADO E NAO CONFIGURADO" />
                    </Picker>
                

                    <Text style={styles.servicoPropety}>Tecnico entregou e orientou cliente sobre o Guia Rápido Modem WI-FI?</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={wifiGuiaRapido}
                    onValueChange={(itemValue, itemIndex) => setWifiGuiaRapido(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK-ORIENTOU E ENTREGOU AO CLIENTE" value="OK-ORIENTOU E ENTREGOU AO CLIENTE" />
                        <Picker.Item label="NOK-NAO ENTREGOU E NAO ORIENTOU" value="NOK-NAO ENTREGOU E NAO ORIENTOU" />
                        <Picker.Item label="NOK-NAO ENTREGOU" value="NOK-NAO ENTREGOU" />
                        <Picker.Item label="NOK-NAO ORIENTOU ADEQUADAMENTE" value="NOK-NAO ORIENTOU ADEQUADAMENTE" />
                   </Picker>
                    <Text style={styles.servicoPropety}>Tecnico questionou e instalou o modem no melhor local WI-FI?</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={wifiModemLocal}
                    onValueChange={(itemValue, itemIndex) => setWifiModemLocal(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK-MODEM INSTALADO NO LOCAL CORRETO" value="OK-MODEM INSTALADO NO LOCAL CORRETO" />
                        <Picker.Item label="NOK-NAO INSTALOU E NAO QUESTIONOU" value="NOK-NAO INSTALOU E NAO QUESTIONOU" />
                        <Picker.Item label="NOK-CLIENTE NAO AUTORIZA" value="NOK-CLIENTE NAO AUTORIZA" />
                    </Picker>


                    <Text style={styles.servicoPropety}>Técnico questionou e configurou o WI-FI em todos os Clientes?</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={wifiConfCliente}
                    onValueChange={(itemValue, itemIndex) => setWifiConfCliente(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK-TODOS CONFIGURADOS" value="OK-TODOS CONFIGURADOS" />
                        <Picker.Item label="OK-CONFIGUROU SOMENTE CLIENTE" value="OK-CONFIGUROU SOMENTE CLIENTE" />
                        <Picker.Item label="NOK-NAO QUESTIONOU E NAO CONFIGUROU" value="NOK-NAO QUESTIONOU E NAO CONFIGUROU" />
                        <Picker.Item label="NOK-CLIENTE NAO AUTORIZA" value="NOK-CLIENTE NAO AUTORIZA" />
                    </Picker>

                    <Text style={styles.servicoPropety}>Cliente possui algum equipamento de rede como Repetidor, Roteador ou Switch?</Text>
                    <TextInput
                        style={styles.sevicotextinput}
                        onChangeText={text => setWifiEquipamento(text)}
                       value={wifiEquipamento}
                        placeholder="Resposta"/>

                    <Text style={styles.servicoPropety}>Técnico reforçou o conector GPON com auto-fisão e fita hellerman do DROP e cabo de força?</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={wifiFita}
                    onValueChange={(itemValue, itemIndex) => setWifiFita(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK-PADRAO" value="OK-PADRAO" />
                        <Picker.Item label="NOK-NAO REFORCOU" value="NOK-NAO REFORCOU" />
                        <Picker.Item label="N/A-PTO" value="N/A-PTO" />
                        <Picker.Item label="N/A-MASSIVO" value="N/A-MASSIVO" />
                    </Picker>


                    <Text style={styles.servicoPropety}>Técnico orientou o cliente sobre a fragilidade da fibra quanto a movimentaÃ§Ã£o e curvatura?</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={wifiFragilidade}
                    onValueChange={(itemValue, itemIndex) => setWifiFragilidade(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                        <Picker.Item label="N/A MASSIVO" value="N/A MASSIVO" />
                    </Picker>
                </View>




            
                <View style={styles.boxcadastro}>
                    <Text style={styles.titleBox}>Satisfação do Cliente</Text>

                   <Text style={styles.servicoPropety}>Técnico foi cordial com o cliente?</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={satCordial}
                    onValueChange={(itemValue, itemIndex) => setSatCordial(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                       <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                        <Picker.Item label="N/A MASSIVO" value="N/A MASSIVO" />
                    </Picker>
                    <Text style={styles.servicoPropety}>Técnico deixou o Cliente ciente de todas ações?</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={satTecnicoAcoes}
                    onValueChange={(itemValue, itemIndex) => setSatTecnicoAcoes(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                        <Picker.Item label="N/A MASSIVO" value="N/A MASSIVO" />
                    </Picker>

                    <Text style={styles.servicoPropety}>Como cliente avalia o atendimento do técnico?</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={satAvaliaTecnico}
                    onValueChange={(itemValue, itemIndex) => setSatAvaliaTecnico(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                        <Picker.Item label="N/A MASSIVO" value="N/A MASSIVO" />
                    </Picker>

                    <Text style={styles.servicoPropety}>Foi Feito algum questionamento que o técnico não soube responder? Se sim, qual?</Text>
                    <TextInput
                    style={styles.sevicotextinput}
                    onChangeText={text => setSatQuestionamentoaoTecnico(text)}
                    value={satQuestionamentoaoTecnico}
                    placeholder="Resposta"/>

                   <Text style={styles.servicoPropety}>Como cliente avalia a postura do tecnico durante a atividade?</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={satPosturaTecnico}
                    onValueChange={(itemValue, itemIndex) => setSatPosturaTecnico(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                       <Picker.Item label="N/A MASSIVO" value="N/A MASSIVO" />
                    </Picker>


                    <Text style={styles.servicoPropety}>Qual o nível de satisfação do cliente como o produto?</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={satSatisfacaoProduto}
                    onValueChange={(itemValue, itemIndex) => setSatSatisfacaoProduto(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                        <Picker.Item label="N/A MASSIVO" value="N/A MASSIVO" />
                    </Picker>


                    <Text style={styles.servicoPropety}>Estrutura</Text>
                    <Picker 
                    style={styles.sevicopicker}
                   selectedValue={satEstrutura}
                    onValueChange={(itemValue, itemIndex) => setSatEstrutura(itemValue)}>
                        <Picker.Item label="Escolha Opção" value="" />
                        <Picker.Item label="OK" value="OK" />
                        <Picker.Item label="NOK" value="NOK" />
                        <Picker.Item label="N/A MASSIVO" value="N/A MASSIVO" />
                    </Picker>

                    <Text style={styles.servicoPropety}>Outras Observações</Text>
                    <TextInput
                    multiline={true}
                    style={styles.sevicotextinput}
                    onChangeText={text => setSatObservacao(text)}
                    value={satObservacao}
                    placeholder="Resposta"/>
                </View>

               

                <View style={styles.boxcadastro}>
                    <View style={styles.buttonupload}>
                        <View style={styles.button}>
                            <Button 
                                color="#38697A"
                                title="Câmera"
                                onPress={handlePickImageCamera}
                            />
                       </View>
                        <View style={styles.button}>
                            <Button 
                                color="#38697A"
                                title="Biblioteca"
                                onPress={handlePickImage}
                            />
                        </View>
                    </View>
                    
                    <FlatList
                        data={images}
                        renderItem={({ item }) => (
                            <TouchableWithoutFeedback onPress={ () => handleRemoveItem(item.uri)}>
                                <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                                    <Image style={styles.imageThumbnail} source={{ uri: item.uri }} />
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        //Setting the number of column
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={styles.boxcadastro}>
                <Text style={styles.servicoPropety}>Status</Text>
                    <Picker 
                    style={styles.sevicopicker}
                    selectedValue={statusservico}
                    onValueChange={(itemValue, itemIndex) => setStatusservico(itemValue)}>
                        <Picker.Item label="ENCERRADO" value="ENCERRAR" />
                        <Picker.Item label="CANCELADO" value="CANCELAR" />
                        <Picker.Item label="RECUSA VISITA" value="RECUSA VISITA" />
                        <Picker.Item label="CASA FECHADA" value="CASA FECHADO" />
                    </Picker>
                    <Text style={styles.header}>Confirma que todos os items foram preechidos? Se sim, Clique em Gravar.</Text>
                
                    <Button 
                        color="#38697A"
                        title="Enviar Dados"
                        onPress={createTwoButtonAlert}/>                
                </View>
            </ScrollView>
            </SafeAreaView>
           
        </View>
   )
}