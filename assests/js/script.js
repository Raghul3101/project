let picInd = 1;
showPics(picInd);

function nextPic(n){
    showPics(picInd += n)
}

function showPics(n){
    let i;
    let pic = document.getElementsByClassName("imag");
    console.log(pic.length)
    if (n > pic.length){
        picInd = 1;
    }
    else if (n < 1){
        picInd = pic.length;
    }
    for (i=0; i<pic.length; i++){
        pic[i].style.display = "none";
    }
    pic[picInd-1].style.display = "block";
}