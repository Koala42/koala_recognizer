import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./dropzone.module.css";
import imageRecognition from "./ImageRecognition";
export default function Dropzone() {
  const [path, setPath] = useState("");
  const [text, setText] = useState("");
  const [margin, setMargin] = useState("100px");
  const openFile = input => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setPath(dataURL);
    };
    reader.readAsDataURL(input);
  };

  const onDrop = useCallback(async acceptedFiles => {
    openFile(acceptedFiles[0]);
    const file = acceptedFiles[0],
      url = URL.createObjectURL(file),
      img = new Image();

    img.onload = function() {
      URL.revokeObjectURL(this.src);
    };
    img.src = url;
    setText("Loading...");
    setMargin("0px");
    let text = await imageRecognition(img);
    setText(text);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div style={{ marginTop: margin }}>
        <h1 style={{ textAlign: "center" }}>Is it a Koala?</h1>
        <div className={styles.container}>
          <div className={styles.dropzone} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>

          <div>
            <img id="img" src={path} crossOrigin="true" class={styles.image} alt="" />
          </div>
          <div id="result" class={styles.result}>
            {text}
          </div>
          {/* <div className={styles.image} style={{ backgroundImage: `url(${path})` }}> */}
        </div>
      </div>
    </div>
  );
}
