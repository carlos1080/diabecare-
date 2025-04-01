import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useAuth, useOAuth, useUser } from "@clerk/clerk-expo";
import { COLORS, FONT, SIZES } from "@/constants/theme";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

export default function Profile() {
  useWarmUpBrowser();
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId && setActive) await setActive({ session: createdSessionId });
    } catch (err) {
      Alert.alert("Error al iniciar sesión", (err as Error).message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert("Error", "No se pudo cerrar la sesión");
    }
  };

  return (
    <View style={styles.container}>
      {isSignedIn ? (
        <>
          <Text style={styles.title}>Bienvenido, {user?.firstName}!</Text>
          <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress}</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>¡Hola! 👋</Text>
          <Text style={styles.subtitle}>Iniciá sesión para acceder a tus datos</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginBottom: 20,
    textAlign: "center",
  },
  email: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.text,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
});
