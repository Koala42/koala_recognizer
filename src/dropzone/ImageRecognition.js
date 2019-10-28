import * as mobilenet from "@tensorflow-models/mobilenet";

export default async function imageRecognition() {
  let net;

  // Load the model.
  net = await mobilenet.load();
  const imgEl = document.getElementById("img");
  const result = await net.classify(imgEl);
  let text;
  result[0].className.split(",")[0] === "koala"
    ? (text = " Yes, This is a koala! Aww, so cute 😍")
    : (text = `This is not a koala! Is this a ${result[0].className.split(",")[0]}?`);
  return text;
}
