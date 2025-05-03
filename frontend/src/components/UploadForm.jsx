import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import axios from '../api';

function UploadForm({ setResult, setLoading }) {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'audio/*',
    multiple: false,
    noClick: true, // Prevents the browse dialog from opening when the box is clicked
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload a file');
    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/score', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });
      setResult(response.data);
    } catch (error) {
      alert('Error processing file: ' + error.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation(); // Prevents triggering the file input dialog
    setFile(null);
  };

  const handleBrowseClick = (e) => {
    e.stopPropagation(); // Prevents triggering the dropzone click
    document.querySelector('input[type="file"]').click();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-6"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div
  {...getRootProps()}
  className={`border-2 border-dashed rounded-lg p-6 w-full text-center transition-all duration-300 h-40 flex items-center justify-center ${
    isDragActive ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300'
  }`}
>
  <input {...getInputProps()} />
  {isDragActive ? (
    <motion.p
      className="text-blue-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      Drop your audio file here...
    </motion.p>
  ) : file ? (
    <div className="flex items-center gap-4">
      <p className="text-gray-700">{file.name}</p>
      <button
        type="button"
        className="text-red-500 font-bold hover:text-red-700 transition-all"
        onClick={handleRemoveFile}
      >
        ✕
      </button>
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <p className="text-gray-500 mb-2">Drag & drop your audio file here</p>
      <p className="text-gray-500 mb-4">or</p>
      <motion.button
        type="button"
        className="bg-[#4F46E5] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#9333EA] transition-all"
        onClick={handleBrowseClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        Upload Your Audio
      </motion.button>
    </div>
  )}
</motion.div>
      <motion.button
        type="submit"
        className="bg-[#4F46E5] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#9333EA] transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        Check Score
      </motion.button>
      {uploadProgress > 0 && (
        <motion.div
          className="w-full bg-gray-200 rounded-full h-2.5"
          initial={{ width: 0 }}
          animate={{ width: `${uploadProgress}%` }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div
            className="bg-[#4F46E5] h-2.5 rounded-full"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </motion.div>
      )}
    </motion.form>
  );
}

export default UploadForm;