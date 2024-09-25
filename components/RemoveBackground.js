const { useState } = React;

const RemoveBackground = () => {
  const [imagePreview, setImagePreview] = useState("./imgs/image.png");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
      setImagePreview("./imgs/image.png");
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("InputBGfile");
    const file = fileInput.files[0];

    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file before uploading.");
      return;
    }

    setUploading(true);
    const apiKey = "aJo11o3CvLhVbBRnFmc9iSGV";
    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setImagePreview(url);
        setDownloadUrl(url);
        setUploading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("An error occurred while processing the image.");
        setUploading(false);
      });
  };

  const handleDownloadClick = () => {
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "image.png";
      link.click();

      setTimeout(() => {
        setImagePreview("./imgs/image.png");
        setDownloadUrl(null);
      }, 2000);
    }
  };

  return (
    <div className="bgContainer">
      <h1>Remove Background</h1>

      <input
        type="file"
        accept="image/*"
        id="InputBGfile"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <img
        className="img-Preview"
        src={imagePreview}
        id="imgPreview"
        alt="Image Preview"
        onClick={() => document.getElementById("InputBGfile").click()}
      />
      <button
        className="bgUploadBtn"
        type="button"
        id="UploadBtn"
        onClick={handleUploadClick}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "UPLOAD FILE"}
      </button>
      {downloadUrl && (
        <a
          className="download"
          id="downloadBtn"
          onClick={handleDownloadClick}
          download="image.png"
        >
          Download Image
        </a>
      )}
    </div>
  );
};

