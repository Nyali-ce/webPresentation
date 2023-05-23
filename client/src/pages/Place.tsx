import "./place.scss";
import { motion } from "framer-motion";

function Place() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <canvas></canvas>
    </motion.div>
  );
}

export default Place;
