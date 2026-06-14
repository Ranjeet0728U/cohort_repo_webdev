const first = document.getElementById('01');
const second = document.getElementById('02');
const third = document.getElementById('03');
const fourth = document.getElementById('04');
const fifth = document.getElementById('05');
const sixth = document.getElementById('06');
const seventh = document.getElementById('07');
const eighth = document.getElementById('08');
const nineth = document.getElementById('09');

first.addEventListener('click',() =>{
    addText(first)
})


second.addEventListener('click',() =>{
    addText(second);
})


third.addEventListener('click',() =>{
    addText(third);

})


fourth.addEventListener('click',() =>{
    addText(fourth);
})


fifth.addEventListener('click',() =>{
    addText(fifth);
})


sixth.addEventListener('click',() =>{
    addText(sixth);
})


seventh.addEventListener('click',() =>{
    addText(seventh);
})


eighth.addEventListener('click',() =>{
    addText(eighth);
})


nineth.addEventListener('click',() =>{
    addText(nineth);
})

let count = 0;

function addText(index){
    if(index.textContent !== ''){
        alert("already filled");
        return;
    }
    let ele = null;
    if(count  % 2 == 0){
        ele = 'X'
    }else{
        ele = 'O'
    }

    const span = document.createElement('span');
    span
    span.textContent = ele;
    
    index.appendChild(span);
    count++;
}
