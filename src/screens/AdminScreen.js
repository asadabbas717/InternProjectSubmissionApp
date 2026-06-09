import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  listenSubmissions,
  updateSubmissionFeedback,
} from "../services/submissionService";

import { styles } from "../styles/styles";

const ADMIN_PASSWORD = "1234";

function formatDate(timestamp) {
  if (!timestamp?.toDate) return "Processing...";
  return timestamp.toDate().toLocaleString();
}

export default function AdminScreen({ onBack }) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    if (!unlocked) return;

    const unsubscribe = listenSubmissions(setSubmissions);
    return unsubscribe;
  }, [unlocked]);

  const loginAdmin = () => {
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      setPassword("");
    } else {
      Alert.alert("Access Denied", "Incorrect admin password.");
    }
  };

  const saveFeedback = async (submissionId, status) => {
    try {
      const adminComment = comments[submissionId] || "";

      await updateSubmissionFeedback({
        submissionId,
        status,
        adminComment,
      });

      Alert.alert("Success", "Feedback saved successfully.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  if (!unlocked) {
    return (
      <View style={styles.centerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.screenTitle}>Admin Login</Text>
        <Text style={styles.subtitle}>
          Enter admin password to review submissions.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter admin password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={loginAdmin}>
          <Text style={styles.buttonText}>Login as Admin</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>Demo password: admin123</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.screenTitle}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>
        Review intern submissions and provide feedback.
      </Text>

      {submissions.length === 0 && (
        <Text style={styles.infoText}>No submissions available yet.</Text>
      )}

      {submissions.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.projectTitle}</Text>

          <Text style={styles.detailText}>Intern: {item.internName}</Text>
          <Text style={styles.detailText}>File: {item.fileName}</Text>
          <Text style={styles.detailText}>Status: {item.status}</Text>
          <Text style={styles.detailText}>
            Submitted: {formatDate(item.createdAt)}
          </Text>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => Linking.openURL(item.fileUrl)}
          >
            <Text style={styles.smallButtonText}>Open Submitted File</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Admin Comment</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write feedback for this submission"
            multiline
            value={comments[item.id] ?? item.adminComment ?? ""}
            onChangeText={(text) =>
              setComments((previous) => ({
                ...previous,
                [item.id]: text,
              }))
            }
          />

          <View style={styles.statusRow}>
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => saveFeedback(item.id, "Reviewed")}
            >
              <Text style={styles.statusButtonText}>Reviewed</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.approveButton}
              onPress={() => saveFeedback(item.id, "Approved")}
            >
              <Text style={styles.statusButtonText}>Approved</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => saveFeedback(item.id, "Rejected")}
            >
              <Text style={styles.statusButtonText}>Rejected</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}