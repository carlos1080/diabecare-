import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useGlucose } from "../context/GlucoseContext";
import {getGlucoseStatus} from "../constants/glucoseConstants"
import {useUser} from "../context/UserContext"

export default function Home() {
  const { entries } = useGlucose();
  const {user} = useUser()
  const firstName = user?.nombre ?? "Usuario";

  const latest = entries.length > 0 ? entries[entries.length - 1] : null;
  const currentGlucose = latest?.glucose ?? null;

  const glucoseStatus = currentGlucose == null
    ? "Sin datos"
    : getGlucoseStatus(currentGlucose);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Hola {firstName}!</Text>
      <Text style={styles.subheading}>Aquí tienes tu resumen de salud</Text>

      <View style={styles.glucoseCard}>
        <Text style={styles.glucoseLabel}>Glucosa actual</Text>
        {currentGlucose !== null ? (
          <>
            <Text style={styles.glucoseValue}>{currentGlucose} mg/dL</Text>
            <Text style={styles.glucoseStatus}>Estado: {glucoseStatus}</Text>
          </>
        ) : (
          <Text style={styles.noData}>Aún no se han registrado datos</Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>Glucosa diaria</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f5f7fa",
    flexGrow: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1e1e1e",
    marginBottom: 4,
  },
  subheading: {
    fontSize: 16,
    color: "#555",
    marginBottom: 24,
  },
  glucoseCard: {
    backgroundColor: "#ffffff",
    padding: 28,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24,
  },
  glucoseLabel: {
    fontSize: 15,
    color: "#777",
    marginBottom: 6,
  },
  glucoseValue: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#4e9bde",
    marginBottom: 6,
  },
  glucoseStatus: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  noData: {
    fontSize: 16,
    color: "#aaa",
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e1e1e",
    marginBottom: 8,
  },
});
