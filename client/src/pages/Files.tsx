import "./files.scss";
import { motion } from "framer-motion";

function Files() {
  const download = () => {
    fetch(`/api/download`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // download the file
        response.blob().then((blob) => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = "flstudio.zip";
          a.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="header">File transfer bitches😎</h1>
      <div className="mainContent">
        {/* <div className="files">
          <h1>Upload</h1>
          <form
            action="/api/upload"
            method="post"
            encType="multipart/form-data"
          >
            <input type="file" name="file" />
            <button type="submit">Upload</button>
          </form>
        </div> */}
        <div className="files">
          {/* <h1>Download</h1> */}
          <button onClick={download} className="downloadButton">
            Omg Marie have you seen how sexy this button is 😩
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Files;
