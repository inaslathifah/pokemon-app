import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ y: -10 }}
        animate={{ y: 10, transition: { yoyo: Infinity, duration: 0.5 } }}
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          backgroundColor: "white",
        }}
      />
    </motion.div>
  );
};

export default Loading;
