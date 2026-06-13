const btn = document.getElementById("toggleBtn");
btn.addEventListener('click', () =>{
     const check = document.body.classList.toggle('dark');
     if(check){
        btn.innerText = "Toggle Light mode"
     }else{
        btn.innerHTML = "Toggle dark Mode"
     }
})