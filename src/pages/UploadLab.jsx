import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Image,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../services/api";

export default function UploadLab() {
  const { token } = useAuth();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [uploadedFile, setUploadedFile] = useState(null);

  const [uploads, setUploads] = useState([]);
  const [fetchingUploads, setFetchingUploads] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (token) {
      fetchUploads();
    }
  }, [token]);

  function handleFileChange(event) {
    const file = event.target.files[0];

    setSuccess("");
    setError("");
    setUploadedFile(null);

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    setSelectedFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file.type.startsWith("image/")) {
      const localPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(localPreviewUrl);
    } else {
      setPreviewUrl("");
    }
  }

  async function fetchUploads() {
    if (!token) {
      return;
    }

    try {
      setFetchingUploads(true);

      const response = await fetch(`${API_BASE_URL}/uploads`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch uploads.");
      }

      setUploads(data.uploads || []);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingUploads(false);
    }
  }

  async function handleUpload(event) {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    if (!token) {
      setError("You must be logged in to upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/uploads`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload file.");
      }

      setUploadedFile(data.file);
      setSuccess(data.message || "File uploaded successfully.");

      await fetchUploads();

      setSelectedFile(null);
      setPreviewUrl("");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteUpload(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/uploads/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete file.");
      }

      await fetchUploads();

      setSuccess(data.message || "File deleted successfully.");
      setError("");
      setUploadedFile(null);
    } catch (err) {
      setError(err.message || "Failed to delete file.");
    }
  }

  function getFileUrl(file) {
    if (!file?.file_path) {
      return "";
    }

    return `${API_BASE_URL}/${file.file_path}`;
  }

  function isImage(file) {
    return file?.mime_type?.startsWith("image/");
  }

  function isSelectedImage() {
    return selectedFile?.type?.startsWith("image/");
  }

  function formatFileSize(size) {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  }

  function formatDate(dateValue) {
    if (!dateValue) {
      return "-";
    }

    return new Date(dateValue).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            ReactLab
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            File Upload Lab
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Select an image or PDF, preview it locally, then upload it to the
            Express backend using FormData and JWT authentication.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleUpload}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl"
        >
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-slate-200">
              Choose file
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              onChange={handleFileChange}
              className="block w-full cursor-pointer rounded-2xl border border-white/10 bg-slate-900 p-4 text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-500"
            />

            <p className="mt-3 text-sm text-slate-400">
              Allowed files: JPG, PNG and PDF. Maximum size: 5 MB.
            </p>
          </div>

          {selectedFile && (
            <div className="mb-6 rounded-2xl border border-white/10 bg-slate-900 p-5">
              <div className="mb-4 flex items-center gap-3">
                {isSelectedImage() ? (
                  <Image className="h-5 w-5 text-blue-400" />
                ) : (
                  <FileText className="h-5 w-5 text-blue-400" />
                )}

                <div>
                  <p className="font-medium text-white">{selectedFile.name}</p>
                  <p className="text-sm text-slate-400">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>

              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Selected preview"
                  className="max-h-80 rounded-2xl border border-white/10 object-contain"
                />
              )}
            </div>
          )}

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300">
              <CheckCircle className="h-5 w-5" />
              <p>{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload className="h-5 w-5" />
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </motion.form>

        {uploadedFile && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h2 className="mb-4 text-2xl font-semibold">Latest Upload</h2>

            <div className="mb-5 rounded-2xl bg-slate-900 p-5">
              <p className="text-sm text-slate-400">Original filename</p>
              <p className="mb-4 text-white">{uploadedFile.original_name}</p>

              <p className="text-sm text-slate-400">Stored filename</p>
              <p className="mb-4 text-white">{uploadedFile.stored_name}</p>

              <p className="text-sm text-slate-400">File type</p>
              <p className="text-white">{uploadedFile.mime_type}</p>
            </div>

            {isImage(uploadedFile) ? (
              <img
                src={getFileUrl(uploadedFile)}
                alt={uploadedFile.original_name}
                className="max-h-96 rounded-2xl border border-white/10 object-contain"
              />
            ) : (
              <a
                href={getFileUrl(uploadedFile)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-800 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                <FileText className="h-5 w-5" />
                Open uploaded PDF
              </a>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Upload History</h2>
              <p className="mt-2 text-sm text-slate-400">
                Files uploaded by the currently logged-in user.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchUploads}
              disabled={fetchingUploads}
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {fetchingUploads ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {fetchingUploads && uploads.length === 0 ? (
            <p className="text-slate-400">Loading uploads...</p>
          ) : uploads.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900 p-6 text-slate-400">
              No uploads yet.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">ID</th>
                    <th className="px-4 py-3 font-semibold">File</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Size</th>
                    <th className="px-4 py-3 font-semibold">Uploaded</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {uploads.map((file) => (
                    <tr
                      key={file.id}
                      className="transition hover:bg-slate/50"
                    >
                      <td className="px-4 py-4 text-slate-600">
                        {file.id}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-800">
                            {isImage(file) ? (
                              <img
                                src={getFileUrl(file)}
                                alt={file.original_name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <FileText className="h-5 w-5 text-blue-400" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-xs truncate font-medium text-slate-900">
                              {file.original_name}
                            </p>
                            <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                              {file.stored_name}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        {file.mime_type}
                      </td>

                      <td className="px-4 py-4 text-slate-700">
                        {formatFileSize(file.size)}
                      </td>

                      <td className="px-4 py-4 text-slate-300">
                        {formatDate(file.created_at)}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <a
                            href={getFileUrl(file)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-500"
                          >
                            {isImage(file) ? (
                              <Image className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                            Open
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDeleteUpload(file.id)}
                            className="rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}