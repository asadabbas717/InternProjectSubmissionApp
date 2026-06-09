import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/styles";

export default function RoleScreen({ onSelectRole }) {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.appTitle}>Intern Project Submission App</Text>
      <Text style={styles.subtitle}>
        Select your role to continue
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => onSelectRole("intern")}
      >
        <Text style={styles.buttonText}>Continue as Intern</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => onSelectRole("admin")}
      >
        <Text style={styles.secondaryButtonText}>Continue as Admin</Text>
      </TouchableOpacity>
    </View>
  );
}