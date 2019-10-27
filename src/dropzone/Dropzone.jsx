import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./dropzone.module.css";
import ImageRecognition from "./ImageRecognition";

export default function Dropzone() {
  const [path, setPath] = useState("");

  const openFile = input => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setPath(dataURL);
    };
    reader.readAsDataURL(input);
  };

  const onDrop = useCallback(acceptedFiles => {
    openFile(acceptedFiles[0]);
    ImageRecognition();
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Is it a Koala?</h1>
      <div className={styles.mycontainer}>
        <div className={styles.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        <div className={styles.image}>
          <img
            id="img"
            src={path}
            crossOrigin="true"
            style={{ marginBottom: "20px", borderRadius: "12px" }}
            width="50%"
            height="50%"
            alt=""
          />
          <div id="result"></div>
        </div>
      </div>
    </div>
  );
}
