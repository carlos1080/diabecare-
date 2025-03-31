import { View, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";

export default function GlucoseForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [glucose, setGlucose] = useState("");
  const [note, setNote] = useState("");

  const handleSave = () => {
    const entry = {
      glucose: parseInt(glucose),
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
