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

let file,canvas, isAspectRatio = false, imageWidth,imageHeight;

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

    log (imgHeight.value," ",imgWidth.value);
})


    // getting aspect ratio
    log(isAspectRatio);
    const getAspectRatio=(e)=>{
        log(e.target);
        isAspectRatio = e.target.checked;
        log(isAspectRatio);
        ratio = imgWidth.value/imgHeight.value
    
        if(isAspectRatio)//if true
        {
            imgHeight.addEventListener('change',heightChangeHandler);
            imgWidth.addEventListener('change',widthChangeHandler);
            
        }
    
        if(!isAspectRatio){
            imgHeight.removeEventListener('change',heightChangeHandler);
            imgWidth.removeEventListener('change',widthChangeHandler);
        }
    }
    
    heightChangeHandler = (e) =>{
    imgWidth.value= Math.round(ratio * e.target.value); 
    log(imgWidth.value," ",imgHeight.value);
    //ratio = w/h => ratio *h = w
    }
    
    widthChangeHandler = (e) =>{
        imgHeight.value= Math.round(e.target.value/ratio); 
        log(imgWidth.value," ",imgHeight.value);
        //ratio = w/h => h = w/ratio
        }
    

//getting height and width
// function getWidth(){
//     imageWidth = imgWidth.value;
// }

// function getHeight() {
//     imageHeight = imgHeight.value;
// }


