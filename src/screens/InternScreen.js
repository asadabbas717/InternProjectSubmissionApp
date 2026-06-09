import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";

import {
  createSubmission,
  listenSubmissions,
} from "../services/submissionService";

import { styles } from "../styles/styles";

function formatDate(timestamp) {
  if (!timestamp?.toDate) return "Processing...";
  return timestamp.toDate().toLocaleString();
}

export default function InternScreen({ onBack }) {
  const [internName, setInternName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = listenSubmissions(setSubmissions);
    return unsubscribe;
  }, []);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/zip",
          "application/x-zip-compressed",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      Alert.alert("File Error", error.message);
    }
  };

  const submitProject = async () => {
    if (!internName.trim()) {
      Alert.alert("Missing Name", "Please enter your name.");
      return;
    }

    if (!projectTitle.trim()) {
      Alert.alert("Missing Project Title", "Please enter your project title.");
      return;
    }

    if (!selectedFile) {
      Alert.alert("Missing File", "Please select a PDF or ZIP file.");
      return;
    }

    try {
      setUploading(true);

      await createSubmission({
        internName,
        projectTitle,
        file: selectedFile,
      });

      Alert.alert("Success", "Project submitted successfully.");

      setProjectTitle("");
      setSelectedFile(null);
    } catch (error) {
      Alert.alert("Upload Failed", error.message);
    } finally {
      setUploading(false);
    }
  };

  const internKey = internName.trim().toLowerCase();

  const mySubmissions = submissions.filter(
    (item) => item.internKey === internKey
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.screenTitle}>Intern Dashboard</Text>
      <Text style={styles.subtitle}>
        Upload your project file and track admin feedback.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Submit New Project</Text>

        <Text style={styles.label}>Intern Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={internName}
          onChangeText={setInternName}
        />

        <Text style={styles.label}>Project Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: React Native Portfolio App"
          value={projectTitle}
          onChangeText={setProjectTitle}
        />

        <Text style={styles.label}>Project File</Text>

        <TouchableOpacity style={styles.fileButton} onPress={pickFile}>
          <Text style={styles.fileButtonText}>
            {selectedFile ? "Change Selected File" : "Select PDF or ZIP File"}
          </Text>
        </TouchableOpacity>

        {selectedFile && (
          <View style={styles.fileBox}>
            <Text style={styles.fileText}>File: {selectedFile.name}</Text>
            <Text style={styles.fileText}>
              Size: {selectedFile.size ? `${Math.round(selectedFile.size / 1024)} KB` : "Unknown"}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.primaryButton, uploading && styles.disabledButton]}
          onPress={submitProject}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit Project</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>My Submission History</Text>

      {!internName.trim() && (
        <Text style={styles.infoText}>
          Enter your intern name above to view your submission history.
        </Text>
      )}

      {internName.trim() && mySubmissions.length === 0 && (
        <Text style={styles.infoText}>No submissions found for this name.</Text>
      )}

      {mySubmissions.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.projectTitle}</Text>

          <Text style={styles.detailText}>File: {item.fileName}</Text>
          <Text style={styles.detailText}>Status: {item.status}</Text>
          <Text style={styles.detailText}>
            Submitted: {formatDate(item.createdAt)}
          </Text>

          <Text style={styles.commentLabel}>Admin Feedback</Text>
          <Text style={styles.commentText}>
            {item.adminComment || "No feedback yet."}
          </Text>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => Linking.openURL(item.fileUrl)}
          >
            <Text style={styles.smallButtonText}>Open Submitted File</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}