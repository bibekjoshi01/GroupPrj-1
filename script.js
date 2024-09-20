let FileBtn = document.getElementById("InputBGfile");
let UploadBtn = document.getElementById("UploadBtn");
let imagePreview = document.getElementById("imgPreview");
let downloadBtn = document.getElementById("downloadBtn");

imagePreview.addEventListener("click", () => {
  FileBtn.click();
});

FileBtn.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please select a valid image file.");
    imagePreview.src = "";
  }
});

UploadBtn.addEventListener("click", () => {
  const file = FileBtn.files[0];

  if (!file || !file.type.startsWith("image/")) {
    alert("Please select a valid image file before uploading.");
    return;
  }

  const apiKey = "aJo11o3CvLhVbBRnFmc9iSGV";

  const formdata = new FormData();
  formdata.append("image_file", file);
  formdata.append("size", "auto");

  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": apiKey },
    body: formdata,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      UploadBtn.style.display = "none";
      downloadBtn.style.display = "block";
      const url = URL.createObjectURL(blob);
      imagePreview.src = url;
      downloadBtn.addEventListener("click", () => {
        downloadBtn.href = url;
        setTimeout(() => {
          imagePreview.src = "/imgs/image.png";
          UploadBtn.style.display = "block";
          downloadBtn.style.display = "none";
        }, 2000);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("An error occurred while processing the image.");
    });
});
