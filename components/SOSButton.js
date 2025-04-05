// components/SOSButton.js
import { TouchableOpacity, Text, StyleSheet, Linking } from "react-native";

export default function SOSButton() {
  const handleEmergencyCall = () => {
    Linking.openURL("tel:911");
  };

  return (
    <TouchableOpacity style={styles.sosButton} onPress={handleEmergencyCall}>
      <Text style={styles.sosText}>SOS</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sosButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#cc0000",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 50,
    zIndex: 9999,
    elevation: 6,
  },
  sosText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
