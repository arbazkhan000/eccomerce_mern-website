import React from 'react'
import { motion } from "framer-motion";
const LoaderSpinner = () => {
  return (
      <div>
          {" "}
          <div className="flex justify-center items-center">
              <motion.div
                  style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: "3px solid rgba(0, 0, 0, 0.2)",
                      borderTopColor: "#000",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
          </div>
      </div>
  );
}

export default LoaderSpinner