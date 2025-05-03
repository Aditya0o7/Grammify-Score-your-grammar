import React from 'react';
import { motion } from 'framer-motion';

function ScoreDisplay({ result }) {
  if (!result) return null;

  const { text, score, highlights } = result;

  // Process the text and highlights
  const highlightedText = [];
  let currentIndex = 0;

  highlights.forEach(({ offset, length }) => {
    // Add text before the highlight
    if (currentIndex < offset) {
      highlightedText.push(
        <span key={currentIndex}>{text.slice(currentIndex, offset)}</span>
      );
    }

    // Add the highlighted text
    highlightedText.push(
      <span key={offset} className="text-red-500 font-bold">
        {text.slice(offset, offset + length)}
      </span>
    );

    // Update the current index
    currentIndex = offset + length;
  });

  // Add any remaining text after the last highlight
  if (currentIndex < text.length) {
    highlightedText.push(
      <span key={currentIndex}>{text.slice(currentIndex)}</span>

    );
  }

  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-2xl font-bold text-[#4F46E5] mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        You scored {score} out of 100
      </motion.h2>
      <motion.p
        className="text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="font-bold">What you said:</span> <br />
        {highlightedText}
      </motion.p>
    </motion.div>
  );
}

export default ScoreDisplay;