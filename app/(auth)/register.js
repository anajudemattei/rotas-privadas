import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyBoardAvoidinfView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
    }

    //Valiação básia de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "Email inválido.");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn(name, email, password);
      if (!result.success) {
        Alert.alert("Sucesso", "Conta Criada com sucesso!", [{ text: "Ok" }]);
      } else {
        Alert.alert("Erro", result.message || "Falha ao criar conta.");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyBoardAvoidinfView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text style={styles.emoji}>✨</Text>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Preencha os dados abaixo</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            editable={!loading}
          />

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
            editable={!loading}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            styles={styles.backButton}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text styles={styles.backButtonText}>Voltar para Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyBoardAvoidinfView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    scrollContent: {
      flexGrow: 1,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      paddingTop: 60,
      paddingBottom: 40,
    },
    emoji: {
      fontSize: 60,
      textAlign: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: "#666",
      marginBottom: 40,
      textAlign: "center",
    },
    input: {
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      fontSize: 16,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    button: {
      backgroundColor: "#007AFF",
      borderRadius: 8,
      padding: 15,
      alignItems: "center",
      marginTop: 10,
      minHeight: 50,
      justifyContent: "center",
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    backButton: {
      marginTop: 20,
      alignItems: "center",
      padding: 10,
    },
    backText: {
      color: "#007AFF",
      fontSize: 14,
      fontWeight: "bold",
    },
  });