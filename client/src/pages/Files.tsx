import "./about.scss";
import { motion } from "framer-motion";

function Files() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="header">File transfer bitches😎</h1>
      <div className="mainContent">
        <h1>File Upload Example</h1>
        <form action="/api/upload" method="post" encType="multipart/form-data">
          <input type="file" name="file" />
          <button type="submit">Upload</button>
        </form>
      </div>
    </motion.div>
  );
}

export default Files;
