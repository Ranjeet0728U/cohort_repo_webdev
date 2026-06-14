
let count = 0;
let array = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

document.querySelectorAll('.inner-container').forEach((ele) =>{
    ele.addEventListener('click', () =>{
        const element = addText(ele);
        addToArray(ele.id,element);
    })
})


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
    span.textContent = ele;
    
    index.appendChild(span);
    count++;
    return ele;
}

function addToArray(id,ele){
    const row = Math.floor(id / 3);
    const col = id % 3;
    
    if(array[row][col] == null){
        array[row][col] = ele;
    }
}
