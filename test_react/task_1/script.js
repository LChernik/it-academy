const alphabet = ['a', 'b', 'c', 'd', 'e', 'f'];

function printAlphabet(array, delegate, delay) {
    let i = 0;
    
    let interval = setInterval(function() {
        delegate(array[i]);
        if (i++ >= array.length - 1)
            clearInterval(interval);
    }, delay);
    
}
  
function print(){
    return printAlphabet(alphabet, function(obj) {console.log(obj)},1000);
}; 