import { useRouter } from "expo-router";
//import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/Button";
import { View, Text, Image } from "react-native";
//import { WelcomeStyles as styles } from "../styles/screens/welcomeStyles";

export default function Welcome() {
    const router = useRouter();
    //const { user } = useAuth();
    //useEffect(() => {
    //    if (user) {
    //        router.push('/home');
    //    }
    //}, [user, router]);
    return (
        <View>
            <View>
                <Image source={require('../assets/favicon.png')} resizeMode="contain" />
                <Text>Bem-vindo ao MeetStranger</Text>
                <Text>Conecte-se com pessoas de todo o mundo para conversas casuais e divertida</Text>
                <View>
                <Button title="Começar" onPress={() => router.push('auth/login')} />
                    <Text>Não possui conta ainda clique no botão abaixo</Text>
                    <Button title="Registrar" onPress={() => router.push('auth/register')} />
                </View>
            </View>
        </View>
    )
};