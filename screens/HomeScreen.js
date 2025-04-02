import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Home() {
  const firstName = "User";

  const currentGlucose = 118;
  const glucoseStatus =
    currentGlucose < 70 ? "Bajo" : currentGlucose > 180 ? "Alto" : "Normal";

  const mockData = [
    { time: "8am", value: 110 },
    { time: "12pm", value: 135 },
    { time: "16pm", value: 128 },
    { time: "20pm", value: 120 },
  ];

  const glucoseData = {
    labels: mockData.map((d) => d.time),
    datasets: [
      {
        data: mockData.map((d) => d.value),
        color: () => "#4e9bde",
        strokeWidth: 2,
      },
    ],
    legend: ["Glucosa diaria"],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Hola {firstName}!</Text>
      <Text style={styles.subheading}>Aquí tienes tu resumen de salud</Text>

      <View style={styles.glucoseCard}>
        <Text style={styles.glucoseLabel}>Glucosa actual</Text>
        <Text style={styles.glucoseValue}>{currentGlucose} mg/dL</Text>
        <Text style={styles.glucoseStatus}>Estado: {glucoseStatus}</Text>
      </View>

      <Text style={styles.sectionTitle}>Glucosa diaria</Text>
      <LineChart
        data={glucoseData}
        width={Dimensions.get("window").width - 48}
        height={180}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f5f7fa",
          backgroundGradientTo: "#f5f7fa",
          decimalPlaces: 0,
          color: () => "#4e9bde",
          labelColor: () => "#333333",
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#4e9bde",
          },
        }}
        style={{
          marginVertical: 12,
          borderRadius: 12,
        }}
      />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e1e1e",
    marginBottom: 8,
  },
});
