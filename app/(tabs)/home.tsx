import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { COLORS, FONT, SIZES } from "@/constants/theme";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUser } from "@clerk/clerk-expo";
import { LineChart } from "react-native-chart-kit";

export default function Home() {
  const { user, isLoaded } = useUser();

  const firstName = isLoaded && user?.firstName ? user.firstName : "👋";

  const currentGlucose = 118;
  const glucoseStatus =
    currentGlucose < 70 ? "Bajo" : currentGlucose > 180 ? "Alto" : "Normal";

  // 🔹 Datos simulados
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
        color: () => COLORS.primary,
        strokeWidth: 2,
      },
    ],
    legend: ["Glucosa diaria"],
  };

  return (
    <ProtectedRoute>
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
            backgroundColor: COLORS.white,
            backgroundGradientFrom: COLORS.background,
            backgroundGradientTo: COLORS.background,
            decimalPlaces: 0,
            color: () => COLORS.primary,
            labelColor: () => COLORS.text,
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: COLORS.primary,
            },
          }}
          style={{
            marginVertical: 12,
            borderRadius: 16,
          }}
        />
      </ScrollView>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontFamily: FONT.bold,
    color: COLORS.text,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 16,
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginBottom: 24,
  },
  glucoseCard: {
    backgroundColor: COLORS.white,
    padding: 32,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 24,
  },
  glucoseLabel: {
    fontSize: 16,
    color: COLORS.gray,
    fontFamily: FONT.regular,
    marginBottom: 8,
  },
  glucoseValue: {
    fontSize: 48,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    marginBottom: 8,
  },
  glucoseStatus: {
    fontSize: 16,
    fontFamily: FONT.bold,
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.text,
    marginTop: 12,
  },
});
