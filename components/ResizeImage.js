const { useState } = React;
const { useRef } = React;
const { useEffect } = React;

const ResizeImage = () => {
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [imgWidth, setImgWidth] = useState(100);
  const [imgHeight, setImgHeight] = useState(100);
  const [isAspectRatio, setIsAspectRatio] = useState(false);
  const [naturalRatio, setNaturalRatio] = useState(1);
  const [showResizeControls, setShowResizeControls] = useState(false);

  const pictureInputRef = useRef(null);
  const addedImgRef = useRef(null);

  const handleUploadClick = () => {
    pictureInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImgSrc(URL.createObjectURL(selectedFile));
    }
  };

  const handleImageLoad = () => {
    const img = addedImgRef.current;
    if (img) {
      setImgWidth(img.naturalWidth);
      setImgHeight(img.naturalHeight);
      setNaturalRatio(img.naturalWidth / img.naturalHeight);
      setShowResizeControls(true);  // Show controls when the image is loaded
    }
  };

  const handleAspectRatioChange = (e) => {
    setIsAspectRatio(e.target.checked);
  };

  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    setImgHeight(newHeight);
    if (isAspectRatio) {
      setImgWidth(Math.round(naturalRatio * newHeight));
    }
  };

  const handleWidthChange = (e) => {
    const newWidth = e.target.value;
    setImgWidth(newWidth);
    if (isAspectRatio) {
      setImgHeight(Math.round(newWidth / naturalRatio));
    }
  };

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    context.drawImage(addedImgRef.current, 0, 0, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg");
    link.download = "downloaded-image.jpg";
    link.click();
  };

  return (
    <div className="szContainer">
      <h1>Change Img Size</h1>
      <div className="uploadBox" onClick={handleUploadClick}>
        <input
          type="file"
          id="pictureInput"
          accept="image/*"
          hidden
          ref={pictureInputRef}
          onChange={handleFileChange}
        />
        <i className="fa-solid fa-upload"></i>
        <p>Browse file to Upload</p>
      </div>

      {imgSrc && (
        <div className="imageBox" onClick={handleUploadClick}>
          <img
            src={imgSrc}
            id="addedImg"
            ref={addedImgRef}
            onLoad={handleImageLoad}
            alt="Uploaded Preview"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </div>
      )}

      {showResizeControls && (
        <div className="changeBox">
          <div className="width">
            <label htmlFor="width">Width</label>
            <input
              type="number"
              id="width"
              min="100"
              value={imgWidth}
              onChange={handleWidthChange}
            />
          </div>

          <div className="height">
            <label htmlFor="height">Height</label>
            <input
              type="number"
              id="height"
              min="100"
              value={imgHeight}
              onChange={handleHeightChange}
            />
          </div>

          <div className="ratio">
            <input
              type="checkbox"
              id="ratio"
              checked={isAspectRatio}
              onChange={handleAspectRatioChange}
            />
            <label htmlFor="ratio">Maintain Aspect Ratio</label>
          </div>
          <div className="download" onClick={handleDownload}>
            Download
            <i className="fa-solid fa-download"></i>
          </div>
        </div>
      )}
    </div>
  );
};
