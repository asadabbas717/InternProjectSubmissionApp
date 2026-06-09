import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },

  centerContainer: {
    flex: 1,
    backgroundColor: "#f4f6fb",
    padding: 24,
    justifyContent: "center",
  },

  screen: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  appTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },

  screenTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#111827",
    marginTop: 8,
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#111827",
    marginBottom: 8,
  },

  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 14,
  },

  secondaryButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#2563eb",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  secondaryButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "800",
  },

  disabledButton: {
    opacity: 0.6,
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 18,
  },

  backButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "700",
  },

  fileButton: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#93c5fd",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },

  fileButtonText: {
    color: "#1d4ed8",
    fontWeight: "800",
    fontSize: 15,
  },

  fileBox: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  fileText: {
    color: "#374151",
    fontSize: 14,
    marginBottom: 3,
  },

  detailText: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 5,
  },

  commentLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
    marginTop: 10,
    marginBottom: 4,
  },

  commentText: {
    fontSize: 14,
    color: "#4b5563",
    backgroundColor: "#f9fafb",
    padding: 10,
    borderRadius: 10,
    lineHeight: 20,
  },

  smallButton: {
    backgroundColor: "#111827",
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
  },

  smallButtonText: {
    color: "#ffffff",
    fontWeight: "800",
  },

  statusRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },

  reviewButton: {
    flex: 1,
    backgroundColor: "#7c3aed",
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center",
  },

  approveButton: {
    flex: 1,
    backgroundColor: "#16a34a",
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center",
  },

  rejectButton: {
    flex: 1,
    backgroundColor: "#dc2626",
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center",
  },

  statusButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
  },

  infoText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginVertical: 12,
    lineHeight: 20,
  },
});