const clrbtn = document.getElementById("colorType");
const Tnbtn = document.getElementById("Tone");
const genrtBtn = document.getElementById("generator");
const box = document.querySelectorAll('.color-box');

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
    return [r,g,b];
}


function hexGenerator(clr){
    const r = clr[0].toString(16).padStart(2, '0');
    const g = clr[1].toString(16).padStart(2, '0');
    const b = clr[2].toString(16).padStart(2, '0');
    return '#' + r + g + b;
}


genrtBtn.addEventListener('click',() =>{
    box.forEach(boxes =>{
        const clr = rgbGenerator(Tnbtn.value);
        if(clrbtn.value === 'hex'){
            const clring= hexGenerator(clr);
            boxes.style.backgroundColor = clring;
            boxes.textContent = clring;
        }else{
            const rgb = `rgb(${clr[0]}, ${clr[1]}, ${clr[2]})`;
            boxes.style.backgroundColor = rgb;
            boxes.textContent = rgb;
        }

        boxes.style.display = "flex";
        boxes.style.justifyContent = "center";
        boxes.style.height = '100px'
        boxes.style.width = '100px'
        boxes.style.alignItems = "center";
        });
});


