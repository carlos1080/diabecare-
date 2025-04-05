// components/UserProfileDetails.js

import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { useUser } from "../context/UserContext";

export default function UserProfileDetails() {
  const { user, logout, updateField } = useUser();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenido {user.nombre}!</Text>
      <Text style={styles.subtitle}>Resumen de tu perfil:</Text>

      <Text style={styles.label}>Nombre completo:</Text>
      <Text style={styles.value}>{user.nombre} {user.apellido}</Text>

      <Text style={styles.label}>Tipo de sangre:</Text>
      <Text style={styles.value}>{user.tipoSangre}</Text>

      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={user.peso}
        onChangeText={(text) => updateField("peso", text)}
      />

      <Text style={styles.label}>Altura (cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={user.altura}
        onChangeText={(text) => updateField("altura", text)}
      />

      <Text style={styles.label}>Actividad física semanal (hs):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={user.actividadFisica}
        onChangeText={(text) => updateField("actividadFisica", text)}
      />

      <Button title="Cerrar sesión" color="#cc4444" onPress={logout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f8f8f8",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 16,
    color: "#444",
  },
  value: {
    fontSize: 16,
    color: "#222",
    marginTop: 4,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 6,
  },
});
