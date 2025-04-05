// screens/ProfileScreen.js

import { ScrollView, StyleSheet } from "react-native";
import { useUser } from "../context/UserContext";
import LoginForm from "../components/LoginForm";
import UserProfileDetails from "../components/UserProfileDetails";

export default function ProfileScreen() {
  const { user } = useUser();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? <UserProfileDetails /> : <LoginForm />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f8f8",
    padding: 0, // el padding lo maneja cada componente
  },
});
