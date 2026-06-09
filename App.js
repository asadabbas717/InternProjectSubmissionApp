import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";

import RoleScreen from "./src/screens/RoleScreen";
import InternScreen from "./src/screens/InternScreen";
import AdminScreen from "./src/screens/AdminScreen";
import { styles } from "./src/styles/styles";

export default function App() {
  const [role, setRole] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6fb" />

      {role === null && <RoleScreen onSelectRole={setRole} />}

      {role === "intern" && (
        <InternScreen onBack={() => setRole(null)} />
      )}

      {role === "admin" && (
        <AdminScreen onBack={() => setRole(null)} />
      )}
    </SafeAreaView>
  );
}