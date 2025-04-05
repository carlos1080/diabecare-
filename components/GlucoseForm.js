import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { GLUCOSE_MAX_VALID, GLUCOSE_MIN_VALID } from "../constants/glucoseConstants";

export default function GlucoseForm({ onSubmit }) {
  const [glucose, setGlucose] = useState("");
  const [note, setNote] = useState("");


  const handleSave = () => {
    const parsedGlucose = parseInt(glucose);
    console.log(parsedGlucose)

    if (isNaN(parsedGlucose)) {
      Alert.alert("Error", "Por favor, ingrese un número válido de glucosa.");
      return;
    }

    if (parsedGlucose < GLUCOSE_MIN_VALID || parsedGlucose > GLUCOSE_MAX_VALID) {
      Alert.alert(
        "Valor fuera de rango",
        `Ingrese un valor de glucosa entre ${GLUCOSE_MIN_VALID} y ${GLUCOSE_MAX_VALID} mg/dL.`
      );
      return;
    }

    const entry = {
      glucose: parsedGlucose,
      note,
      timestamp: new Date().toISOString(),
    };

    onSubmit(entry);
    setGlucose("");
    setNote("");
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nivel de glucosa (mg/dL)"
        keyboardType="numeric"
        value={glucose}
        onChangeText={setGlucose}
      />
      <TextInput
        style={styles.input}
        placeholder="Nota (opcional)"
        value={note}
        onChangeText={setNote}
      />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
