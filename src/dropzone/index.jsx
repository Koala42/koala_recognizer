import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as mobilenet from "@tensorflow-models/mobilenet";
import styles from "./dropzone.module.css";
let net;
async function app() {
  // Load the model.
  document.getElementById("result").innerHTML = "Loading...";
  net = await mobilenet.load();
  const imgEl = document.getElementById("img");
  const result = await net.classify(imgEl);

  result[0].className.split(",")[0] === "koala"
    ? (document.getElementById("result").innerHTML = "This is a koala")
    : (document.getElementById("result").innerHTML = `This is not a koala, this is ${
        result[0].className.split(",")[0]
      }`);
}

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
    app();
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={styles.mycontainer}>
      <div className={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <img id="img" src={path} crossOrigin="true" width="50%" height="50%" alt="" />;
    </div>
  );
}
