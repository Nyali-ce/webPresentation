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
      <h1 className="header">Files and stuff</h1>
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
          <div className="file">
            <p className="downloadText">flstudio.zip</p>
            <form action="/api/download/flstudio.zip" method="get">
              <button
                onClick={download}
                className="downloadButton"
                type="submit"
              >
                bro look at this fancy button I made 🥰
              </button>
            </form>
          </div>
          <div className="file">
            <p className="downloadText">Superforce.wav</p>
            <form action="/api/download/Superforce.wav" method="get">
              <button
                onClick={download}
                className="downloadButton"
                type="submit"
              >
                Download Superforce.wav ✨
              </button>
            </form>
          </div>
          <div className="file">
            <p className="downloadText">CLUB_DES_PETIES_1.0</p>
            <form action="/api/download/CLUB_DES_PETIES_1.0.wav" method="get">
              <button
                onClick={download}
                className="downloadButton"
                type="submit"
              >
                Download CLUB_DES_PETIES_1.0.wav 🎶
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Files;
