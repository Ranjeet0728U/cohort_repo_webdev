
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

        if(checckWinner()){
            setTimeout(() =>{
                WinnerAlert("WON");
                location.reload();
                
            },500);
            return;
            
        }

        if(isSpaceLeft()){
            let idx = undefined;
            while(true){
                idx = Math.floor(Math.random() * 9);
                const ceil = document.getElementById(idx.toString());
                if(ceil.textContent === ""){
                    break;
                }
            }
            const ceil = document.getElementById(idx.toString());
            const compEle = addText(ceil);
            addToArray(idx, compEle);
            if(checckWinner()){
                setTimeout(() =>{
                    WinnerAlert("Loss");
                    location.reload();
                },500);
                
            }
        }

        if(!isSpaceLeft()){
            alert("No one is winner");
            location.reload();
        }
    })
})


function addText(index){
    if(index.textContent !== '' && count % 2 == 0){
        alert("already filled");
        return;
    }else if(index.textContent !== ''){
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
function checckWinner(){
    const check1 = array[0][0] === array[1][0] 
            && array[1][0]=== array[2][0];

    const check2 = array[0][1] === array[1][1]
            && array[1][1]=== array[2][1];

    const check3 = array[0][2] === array[1][2] 
            && array[1][2]=== array[2][2];

    const check4 = array[0][0] === array[0][1] 
            && array[0][1]=== array[0][2];

    const check5 = array[1][0] === array[1][1] 
            && array[1][1]=== array[1][2];

    const check6 = array[2][0] === array[2][1] 
            && array[2][1]=== array[2][2];


    const check7 = array[0][0] === array[1][1] 
            && array[1][1]=== array[2][2];

    const check8 = array[0][2] === array[1][1] 
            && array[1][1]=== array[2][0];

    if(check1 && array[0][0] != null) return true;
    if(check2 && array[0][1] != null) return true;
    if(check3 && array[0][2] != null) return true;
    if(check4 && array[0][0] != null) return true;
    if(check5 && array[1][0] != null) return true;
    if(check6 && array[2][0] != null) return true;
    if(check7 && array[0][0] != null) return true;
    if(check8 && array[1][1] != null) return true;
    return false;
}

function isSpaceLeft(){
    for(let  i = 0; i < array.length; i++){
        for(let j = 0; j < array[0].length; j++){
            if(array[i][j] == null) return true;
        }
    }

    return false;
}

function WinnerAlert(position){
    alert(`You ${position} the game🎉`);
    location.reload();
}