// LoginForm.js
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useUser } from "../context/UserContext";

export default function LoginForm() {
  const { login } = useUser();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    tipoSangre: "",
    peso: "",
    altura: "",
    actividadFisica: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { nombre, apellido, tipoSangre, peso, altura, actividadFisica } = form;
    return (
      nombre && apellido && tipoSangre && peso && altura && actividadFisica
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert("Por favor completá todos los campos.");
      return;
    }
    login(form);
  };

  return (
    <View>
      <Text style={styles.title}>Perfil del Usuario</Text>
      {Object.entries(form).map(([key, value]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          keyboardType={["peso", "altura", "actividadFisica"].includes(key) ? "numeric" : "default"}
          value={value}
          onChangeText={(text) => handleChange(key, text)}
        />
      ))}
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    color: "#222",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
  },
});
