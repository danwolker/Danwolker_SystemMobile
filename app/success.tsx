import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SuccessScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    router.replace('/'); 
  };

  const handleRefresh = () => {
    router.replace('./success');  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>✅ Você está logado com sucesso!</Text>

      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Voltar para o Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRefresh}>
        <Text style={styles.buttonText}>Recarregar Página</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  text: { fontSize: 18, fontWeight: 'bold', color: 'green', marginBottom: 20 },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
