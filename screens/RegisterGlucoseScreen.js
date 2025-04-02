// app/(tabs)/register-glucose.tsx
import { View, Text, StyleSheet, Alert } from "react-native";
import GlucoseForm from "../components/GlucoseForm";


export default function RegisterGlucose() {
  const handleSave = (data) => {
    console.log("Datos guardados:", data);
    Alert.alert("Registro guardado", `Glucosa: ${data.glucose} mg/dL`);
    // 👉 Acá podrías guardar en una API o AsyncStorage
  };

  return (

      <View style={styles.container}>
        <Text style={styles.title}>Registrar glucosa</Text>
        <GlucoseForm onSubmit={handleSave} />
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F5F8FA",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
