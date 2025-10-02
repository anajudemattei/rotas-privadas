import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {  
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true); 
        try {	
            const result = await signIn(email, password);
            if (!result.success) {
                Alert.alert('Erro', result.message || "Falha ao fazer login" );
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
        }finally {
        setLoading(false);
    }
    };
    
    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                <Text style={styles.emoji}>🔒</Text>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Bem-vindo de volta! Por favor, faça login para continuar.</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                />

<TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Entrar</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Não tem uma conta?</Text>
                    <Link href="/(auth)/register" asChild>
                        <TouchableOpacity disabled={loading}>
                            <Text style={styles.registerLink}> cadastre-se</Text>
                        </TouchableOpacity>    
                    </Link>
                </View>

                <Text style={styles.infoText}>
                    💡 Dica: se não tiver uma conta, crie uma nova!
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}
 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        padding: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    emoji: {
        fontSize: 64,
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#007Aff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        minHeight: 50,
        justifyContent: 'center',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        color: '#666',
        fontSize: 14,
    },  
    registerLink: {
        color: '#007Aff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    infoText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
        marginTop: 30,
        paddingHorizontal: 20,
    },
});