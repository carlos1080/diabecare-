// app/(tabs)/register-glucose.tsx
import { View, Text, StyleSheet, Alert } from "react-native";
import GlucoseForm from "../components/GlucoseForm";
import { useGlucose } from "../context/GlucoseContext";



export default function RegisterGlucose() {

  const { addEntry, entries} = useGlucose()

  // ! * data se refiere a el objeto "entry" definido en el componen "GLucose form"
  // ! * que se pasa por parametro al enviar el forms

  const handleSave = (data) => {
    console.log("Datos guardados:", data);
    addEntry(data)
    Alert.alert("Registro guardado", `Glucosa: ${data.glucose} mg/dL`);
    // 👉 Acá guardar datos a una api, context o async storage
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
