import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import { supabase } from "../supabase/supabaseConfig";

const BUCKET_NAME = "project-submissions";
const MAX_FILE_SIZE = 20 * 1024 * 1024;

export async function createSubmission({ internName, projectTitle, file }) {
  if (!internName || !projectTitle || !file) {
    throw new Error("Intern name, project title, and file are required.");
  }

  const fileName = file.name || "submission_file";
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!["pdf", "zip"].includes(extension)) {
    throw new Error("Only PDF and ZIP files are allowed.");
  }

  if (file.size && file.size > MAX_FILE_SIZE) {
    throw new Error("File size must be less than 20 MB.");
  }

  const response = await fetch(file.uri);
  const arrayBuffer = await response.arrayBuffer();

  const safeInternName = internName.trim().replace(/\s+/g, "_");
  const safeFileName = `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const filePath = `${safeInternName}/${safeFileName}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, arrayBuffer, {
      contentType: file.mimeType || file.type || "application/octet-stream",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  const fileUrl = data.publicUrl;

  const docRef = await addDoc(collection(db, "submissions"), {
    internName: internName.trim(),
    internKey: internName.trim().toLowerCase(),
    projectTitle: projectTitle.trim(),
    fileName,
    fileSize: file.size || null,
    fileType: file.mimeType || file.type || null,
    fileUrl,
    storageProvider: "Supabase Storage",
    storagePath: filePath,
    status: "Pending",
    adminComment: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    reviewedAt: null,
  });

  return docRef.id;
}

export function listenSubmissions(callback) {
  const submissionsQuery = query(
    collection(db, "submissions"),
    orderBy("createdAt", "desc")
  );

  const unsubscribe = onSnapshot(submissionsQuery, (snapshot) => {
    const submissions = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    callback(submissions);
  });

  return unsubscribe;
}

export async function updateSubmissionFeedback({
  submissionId,
  status,
  adminComment,
}) {
  if (!submissionId) {
    throw new Error("Submission ID is required.");
  }

  await updateDoc(doc(db, "submissions", submissionId), {
    status,
    adminComment: adminComment.trim(),
    reviewedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}