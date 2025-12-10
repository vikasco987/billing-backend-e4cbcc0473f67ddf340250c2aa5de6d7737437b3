// "use client";

// import { useState, useRef, ChangeEvent, DragEvent } from "react";

// export default function UploadExcelPage() {
//   const [dragActive, setDragActive] = useState(false);
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState<any>(null);
//   const [error, setError] = useState("");

//   const inputRef = useRef<HTMLInputElement>(null);

//   // Handle drag events
//   const handleDrag = (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
//     else if (e.type === "dragleave") setDragActive(false);
//   };

//   // Handle drop event
//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       validateAndSetFile(e.dataTransfer.files[0]);
//     }
//   };

//   // Handle manual selection
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     if (e.target.files && e.target.files[0]) {
//       validateAndSetFile(e.target.files[0]);
//     }
//   };

//   const validateAndSetFile = (file: File) => {
//     if (
//       file.type ===
//         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
//       file.type === "application/vnd.ms-excel"
//     ) {
//       setFile(file);
//       setError("");
//       setResponse(null);
//     } else {
//       setError("Please upload a valid Excel file (.xls or .xlsx)");
//     }
//   };

//   const uploadFile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return;

//     setLoading(true);
//     setError("");
//     setResponse(null);

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("/api/upload-excel", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Upload failed");
//       }

//       setResponse(data);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong during the upload.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeFile = () => {
//     setFile(null);
//     setResponse(null);
//     if (inputRef.current) inputRef.current.value = "";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//       <div className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-indigo-600 p-6 text-center">
//           <h1 className="text-2xl font-bold text-white">Upload Data</h1>
//           <p className="text-indigo-200 text-sm mt-1">
//             Import your Excel sheets for processing
//           </p>
//         </div>

//         <div className="p-8">
//           <form
//             onSubmit={uploadFile}
//             onDragEnter={handleDrag}
//             className="relative"
//           >
//             <input
//               ref={inputRef}
//               type="file"
//               accept=".xlsx, .xls"
//               className="hidden"
//               onChange={handleChange}
//             />

//             {/* Drop Zone */}
//             {!file ? (
//               <div
//                 className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 transition-colors cursor-pointer
//                   ${dragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:bg-gray-50"}`}
//                 onDragEnter={handleDrag}
//                 onDragLeave={handleDrag}
//                 onDragOver={handleDrag}
//                 onDrop={handleDrop}
//                 onClick={() => inputRef.current?.click()}
//               >
//                 {/* Upload Icon */}
//                 <svg
//                   className="w-12 h-12 text-gray-400 mb-3"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                   />
//                 </svg>
//                 <p className="text-gray-700 font-medium">
//                   Click to upload or drag and drop
//                 </p>
//                 <p className="text-gray-400 text-sm mt-1">XLSX or XLS files only</p>
//               </div>
//             ) : (
//               /* Selected File View */
//               <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-lg p-4">
//                 <div className="flex items-center space-x-3 overflow-hidden">
//                   <div className="bg-white p-2 rounded text-indigo-600">
//                     <svg
//                       className="w-6 h-6"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
//                     </svg>
//                   </div>
//                   <div className="flex flex-col overflow-hidden">
//                     <span className="font-medium text-gray-700 truncate">
//                       {file.name}
//                     </span>
//                     <span className="text-xs text-gray-500">
//                       {(file.size / 1024).toFixed(2)} KB
//                     </span>
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={removeFile}
//                   className="text-gray-400 hover:text-red-500 transition-colors"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             )}

//             {/* Error Message */}
//             {error && (
//               <div className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200 flex items-center">
//                 <svg
//                   className="w-4 h-4 mr-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 {error}
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading || !file}
//               className={`w-full mt-6 py-3 px-4 rounded-lg text-white font-semibold transition-all shadow-md
//                 ${
//                   loading || !file
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-95"
//                 }`}
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Processing...
//                 </div>
//               ) : (
//                 "Upload File"
//               )}
//             </button>
//           </form>

//           {/* Response / Result Area */}
//           {response && (
//             <div className="mt-8 animate-fade-in-up">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
//                   Results
//                 </h3>
//                 <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
//                   Success
//                 </span>
//               </div>
//               <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto shadow-inner">
//                 <pre className="text-green-400 text-xs font-mono">
//                   {JSON.stringify(response, null, 2)}
//                 </pre>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
















"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";

export default function UploadExcelPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  // -------------------------------
  // VALIDATE FILE
  // -------------------------------
  const validateAndSetFile = (file: File) => {
    const allowed = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!allowed.includes(file.type)) {
      setError("❌ Please upload a valid Excel file (.xlsx or .xls)");
      setFile(null);
      return;
    }

    setError("");
    setFile(file);
  };

  // -------------------------------
  // FILE SELECT BUTTON
  // -------------------------------
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) validateAndSetFile(e.target.files[0]);
  };

  // -------------------------------
  // DRAG & DROP
  // -------------------------------
  const handleDrag = (e: DragEvent<HTMLDivElement | HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // -------------------------------
  // UPLOAD TO API
  // -------------------------------
  const handleUpload = async () => {
    if (!file) {
      setError("❌ Please select a file first");
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-excel", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "❌ Upload failed");
      } else {
        setResponse(json);
      }
    } catch (err) {
      setError("❌ Network error while uploading");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📤 Upload Excel File</h1>

      {/* Drag Area */}
      <form
        className={`border-2 border-dashed p-8 rounded-lg text-center transition ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={handleFileSelect}
        />

        <div
          className="py-10"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <p className="text-lg font-medium">Drag & Drop your Excel file here</p>
          <p className="text-gray-500 text-sm">or click below</p>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Select File
          </button>

          {file && (
            <p className="mt-3 text-green-700 font-semibold">
              Selected: {file.name}
            </p>
          )}
        </div>
      </form>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`w-full mt-6 px-4 py-3 rounded-lg text-white font-semibold ${
          loading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload Excel"}
      </button>

      {/* Error */}
      {error && (
        <p className="mt-4 text-red-600 font-semibold bg-red-100 p-3 rounded-lg">
          {error}
        </p>
      )}

      {/* Success Response */}
      {response && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">✅ Upload Summary</h2>
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
