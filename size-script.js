const log = console.log;
const doc = document;

const uploadBox = doc.querySelector(".uploadBox");
const changeBox = doc.querySelector(".changeBox");
const imageBox = doc.querySelector(".imageBox");
const download = doc.querySelector(".szContainer .download");
const pictureInput = doc.querySelector("#pictureInput");
const addedImg = doc.querySelector("#addedImg");
const imgWidth = doc.querySelector("#width");
const imgHeight = doc.querySelector("#height");

let file,
  canvas,
  isAspectRatio = false;

// Initial selection
uploadBox.addEventListener("click", () => {
  pictureInput.click();
});

// If user already selected an image but want to change it to another one
imageBox.addEventListener("click", (e) => {
  pictureInput.click();
});

// Getting the image
pictureInput.addEventListener("change", (e) => {
  file = e.target.files[0];
  addedImg.setAttribute("src", URL.createObjectURL(file));
});

// Image is loaded, now
addedImg.addEventListener("load", (e) => {
  changeBox.style.display = "flex";
  uploadBox.style.display = "none";
  imageBox.style.display = "flex";

  imgWidth.value = addedImg.naturalWidth;
  imgHeight.value = addedImg.naturalHeight;
});

const getAspectRatio = (e) => {
  log(e.target);
  isAspectRatio = e.target.checked;
  log(isAspectRatio);
  ratio = imgWidth.value / imgHeight.value;

  if (isAspectRatio) {
    imgHeight.addEventListener("change", heightChangeHandler);
    imgWidth.addEventListener("change", widthChangeHandler);
  }

  if (!isAspectRatio) {
    imgHeight.removeEventListener("change", heightChangeHandler);
    imgWidth.removeEventListener("change", widthChangeHandler);
  }
};

heightChangeHandler = (e) => {
  imgWidth.value = Math.round(ratio * e.target.value);
  log(imgWidth.value, " ", imgHeight.value);
};

widthChangeHandler = (e) => {
  imgHeight.value = Math.round(e.target.value / ratio);
  log(imgWidth.value, " ", imgHeight.value);
};

// Download Button
download.addEventListener("click", () => {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");

  canvas.height = imgHeight.value;
  canvas.width = imgWidth.value;

  context.drawImage(addedImg, 0, 0, canvas.width, canvas.height);

  let a = document.createElement("a");
  a.href = canvas.toDataURL("image/jpeg");
  // Converts the canvas image into a encoded data url of the specified image format(here jpeg)
  a.download = "downloaded-image";
  a.click();
});
