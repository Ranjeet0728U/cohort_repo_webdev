const clrbtn = document.getElementById("colorType");
const Tnbtn = document.getElementById("Tone");
const genrtBtn = document.getElementById("generator");
const box = document.getElementById('color-box');

function rgbGenerator(tone) {
    let min = 0;
    let max = 255;

    if(tone == "Dark"){
        min = 0;
        max = 120;
    }else if( tone === "Light"){
        min = 150;
        max = 255;
    }
    const r = Math.floor(Math.random() * (max - min) + min);
    const g = Math.floor(Math.random() * (max - min) + min);
    const b = Math.floor(Math.random() * (max - min) + min);
    return Array(r,g,b);
}


function hexGenerator(clr){
    const r = clr[0].toString(16).padStart(2, '0');
    const g = clr[1].toString(16).padStart(2, '0');
    const b = clr[2].toString(16).padStart(2, '0');
    return '#' + r + g + b;
}


genrtBtn.addEventListener('click',() =>{
    const clr = rgbGenerator(Tnbtn.value);
    if(clrbtn.value === 'hex'){
        box.style.backgroundColor  = hexGenerator(clr);
    }else{
        box.style.backgroundColor = `rgb(${clr[0]}, ${clr[1]}, ${clr[2]})`;
    }

    box.style.display = "flex";
    box.style.justifyContent = "center";
    box.style.alignItems = "center";
    box.in
})


