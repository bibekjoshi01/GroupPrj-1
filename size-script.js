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

let file,canvas;

//initial selection
uploadBox.addEventListener("click",()=>{
pictureInput.click();
})

// if user already selected an image but want to change it to another one
imageBox.addEventListener("click",(e)=>{
    pictureInput.click();
})

//getting the image
pictureInput.addEventListener('change',(e)=>{

    file = e.target.files[0];
    addedImg.setAttribute("src",URL.createObjectURL(file));    
})

//image is loaded, now
addedImg.addEventListener('load',(e)=>{
    changeBox.style.display= "flex";
    uploadBox.style.display="none";
    imageBox.style.display="flex";

    imgWidth.value = addedImg.naturalWidth;
    imgHeight.value = addedImg.naturalHeight;

})