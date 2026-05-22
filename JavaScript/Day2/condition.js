var fileSize = 1026;
var currentSize = 0;
var min = 50;
var max = 60;

while(fileSize >= currentSize){
    var chunk = Math.floor(Math.random() *(max - min + 1))+ min;
    currentSize += chunk;
    console.log("chunk arrive is: ",chunk, "current size:- ",currentSize);
    console.log();
}