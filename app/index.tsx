import { useRouter } from "expo-router";
import { Button } from "../components/Button";
import { View, Text, Image } from "react-native";
//importação do estilo da home, para ser utilizado na tela de boas-vindas, já que é a primeira tela do app
import {homeStyles as styles} from '../styles/screens/homeStyles';


export default function Welcome() {
    const router = useRouter();

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                
                <Image 
                    source={require('../assets/favicon.png')} 
                    resizeMode="contain" 
                />

                <Text>Bem-vindo ao MeetStranger</Text>
                
                <Text>Conecte-se com pessoas de todo o mundo para conversas casuais e divertidas</Text>

                <View>
                    <Button 
                        title="Começar" 
                        onPress={() => router.push('auth/login')} 
                    />
                    
                    <Text>Não possui conta ainda? Clique no botão abaixo</Text>
                    
                    <Button 
                        title="Registrar" 
                        onPress={() => router.push('auth/register')} 
                    />
                </View>
            </View>
        </View>
    );
}