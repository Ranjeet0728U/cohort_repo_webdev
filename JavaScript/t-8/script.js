const body = document.body;
const parent = document.getElementById('parent');
const child = document.getElementById('child');
const grandparent = document.getElementById('grandparent')

body.addEventListener('click',() =>{
    console.log('body clicked')
},true)

grandparent.addEventListener('click',() =>{
    console.log('grandparent clicked')
},true)

parent.addEventListener('click',() =>{
    console.log('parent clicked')
},true)

child.addEventListener('click',() =>{
    console.log('child clicked')
},true)
body.addEventListener('click',() =>{
    console.log('body clicked 2')
},false)