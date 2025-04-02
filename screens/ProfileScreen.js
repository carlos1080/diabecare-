import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Profile() {

  const [userName, setUserName] = useState({
    name: "User",
    email: "user@mail.com",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {userName.name}!</Text>
      <Text style={styles.email}>{userName.email}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3478f6",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
