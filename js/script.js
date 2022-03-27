// Basic Claculator that handles only one operation at a time
let firstTerm = '';
let secondTerm = '';
let operation = '';
let result='';

const numberButtons = document.querySelectorAll('[data-buttonType="number"]'); 
const operationButtons = document.querySelectorAll('[data-buttonType="operation"]');
const equalButton = document.getElementById('calc-buttonEqual');
const clearButton = document.getElementById('calc-buttonClear');
const deleteButton = document.getElementById('calc-buttonDel');
const pointButton = document.getElementById('calc-buttonDot');

numberButtons.forEach(numbers => numbers.addEventListener('click', addNumber));
operationButtons.forEach(operations => operations.addEventListener('click', () => setOperation(operations.textContent)));
equalButton.addEventListener('click', () => setOperation(operation));
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', del);
pointButton.addEventListener('click', addPoint);

function del(){
    if (!secondTerm){
        firstTerm = firstTerm.slice(0,-1);
    } else{
        secondTerm = secondTerm.slice(0,-1);
    }
    updateDisplay();
}

function updateDisplay(){
    const displayOP = document.getElementById('display-operation').textContent= `${firstTerm}${operation}${secondTerm}`;
    const displayResult = document.getElementById('display-result')
    if (result){
        displayResult.textContent=`${result}`;
    } else {
        displayResult.textContent='0';
    }        
}

function addNumber(e){
    if ((!firstTerm) || (!operation)){
        firstTerm += e.target.textContent;
        console.log(firstTerm);
    } else {
        secondTerm += e.target.textContent;
        console.log(secondTerm)
    }
    updateDisplay();    
}

function setOperation(op){
    if (firstTerm){
        if (firstTerm && secondTerm){
            result = makeOperation(operation,parseFloat(firstTerm),parseFloat(secondTerm));
            console.log(result);
        }else if((op=='Sqr')
                ||(op=='1/x')
                ||(op=='log')
                ||(op=='+/-')){
            result = makeOperation(op,parseFloat(firstTerm),parseFloat(secondTerm));
            console.log(result);     
        }
    }
    if(result){
        firstTerm = result;
        secondTerm ='';
    }
    operation = op;
    console.log(`first: ${firstTerm} \n${operation} \nsecond: ${secondTerm}`);
    updateDisplay();
}

function makeOperation(operation,a,b){
    console.log(`First: ${a}   Second:${b}`);
    if (operation!='+/-'){
        switch (operation){
            case '+':
                return sum(a,b);
            case '-':
                return rest(a,b);
            case 'x':
                return multiply(a,b);
            case '/':
                return divide(a,b);
            case '%':
                return porcentage(a,b);
            case 'Sqr':
                return sqRoot(a,b);        
            case 'Pow':
                return pow(a,b);
            case '1/x':
                return inverse(a,b);
            case 'log':
                return logaritm(a,b);                
        }
        secondTerm='';
    } else {
// sdfasd need a temp operation to store previous one
        console.log('perru perrington');
        if (operation=='-'){
            return operation='+';
        }else if (operation == '+'){
            return operation='-';
        };          
    } 
}

function sum(a,b) {
    return a + b;
}

function rest(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return (b==0) ? 'Math Error':a/b; 
}

function porcentage(a,b) {
    return (b==0)? 0:(a/b)*100;
}

function sqRoot(a,b){
    return (!b) ? Math.sqrt(a):Math.sqrt(b);
}

function pow(a,b) {
    return Math.pow(a,b);
}

function inverse(a,b){
    return (!b) ? 1/a:a/b;
}

function logaritm(a,b){
    if (a<= 0 || b<=0) return 'Math Error';
    return (!b) ? Math.log10(a) : Math.log10(b);
}

function addPoint(){
    if (!secondTerm) {
        if (firstTerm.includes('.')) return;
        firstTerm += '.';
    } else {
        if (secondTerm.includes('.')) return;
        secondTerm += '.';
    }updateDisplay();
}

function clear(){
    firstTerm = secondTerm = operation = result= '';
    updateDisplay();
}



