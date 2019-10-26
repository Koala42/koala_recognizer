import * as mobilenet from "@tensorflow-models/mobilenet";
import React from "react";
export default async function ImageRecognition() {
  let net;

  // Load the model.
  document.getElementById("result").innerHTML = "Loading...";
  net = await mobilenet.load();
  const imgEl = document.getElementById("img");
  const result = await net.classify(imgEl);

  result[0].className.split(",")[0] === "koala"
    ? (document.getElementById("result").innerHTML = "This is a koala")
    : (document.getElementById("result").innerHTML = `This is not a koala, this is a ${
        result[0].className.split(",")[0]
      }`);

  return <div></div>;
}
