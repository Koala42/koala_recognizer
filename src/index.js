let net;

async function app() {
  // Load the model.
  document.getElementById("result").innerHTML = "Loading...";
  net = await mobilenet.load();
  const imgEl = document.getElementById("img");
  const result = await net.classify(imgEl);
  console.log(result);
  result[0].className.split(",")[0] === "koala"
    ? (document.getElementById("result").innerHTML = "This is a koala")
    : (document.getElementById("result").innerHTML = "This is not a koala");
}

const getUrl = () => {
  const value = document.getElementById("url-file").value;
  document.getElementById("img").setAttribute("src", value);

  app();
};
document.getElementById("button").addEventListener("click", getUrl);
app();
