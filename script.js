let FileBtn =document.getElementById('InputBGfile')
let UploadBtn =document.getElementById('UploadBtn')
let imagePreview = document.getElementById('imgPreview');

UploadBtn.addEventListener("click",()=>{
    FileBtn.click();
    
})

FileBtn.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file.');
        imagePreview.src = ''; 
    }
});