import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UploadForm from './components/UploadForm';
import ScoreDisplay from './components/ScoreDisplay';
import Loader from './components/Loader';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#4F46E5] to-[#9333EA] text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl font-bold mb-8"
        variants={childVariants}
      >
        Grammify: Score Your Grammar
      </motion.h1>
      <motion.div
        className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 text-gray-800"
        variants={childVariants}
      >
        {loading ? (
          <Loader />
        ) : (
          <UploadForm setResult={setResult} setLoading={setLoading} />
        )}
        <ScoreDisplay result={result} />
      </motion.div>
    </motion.div>
  );
}

export default App;