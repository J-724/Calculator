// Basic Claculator that handles only one operation at a time
let firstTerm = '';
let secondTerm = '';
let operation = '';
let result='';
let operationString= '';

const numberButtons = document.querySelectorAll('[data-buttonType="number"]'); 
const operationButtons = document.querySelectorAll('[data-buttonType="operation"]');
const equalButton = document.getElementById('calc-buttonEqual');
const clearButton = document.getElementById('calc-buttonClear');
const deleteButton = document.getElementById('calc-buttonDel');
const pointButton = document.getElementById('calc-buttonDot');
const changeButton = document.getElementById('calc-buttonChange')

window.addEventListener('keydown',getKeybordImput);
numberButtons.forEach(numbers => numbers.addEventListener('click', (e) => addNumber(e.target.textContent)));
operationButtons.forEach(operations => operations.addEventListener('click', () => setOperation(operations.textContent)));
equalButton.addEventListener('click', () => setOperation(operation));
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', del);
pointButton.addEventListener('click', addPoint);
changeButton.addEventListener('click', change);

function getKeybordImput(e){
    if (e.key >= 0 && e.key <= 9) addNumber(e.key);
    if (e.key === '.') addPoint();
    if (e.key === '=' || e.key === 'Enter') setOperation(operation);
    if (e.key === 'Backspace') del();
    if (e.key === 'Escape') clear();
    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '%') setOperation(e.key);
    if (e.key === '*') setOperation('x');
    if (e.key === '^') setOperation('Pow');
}

function updateDisplay(){
    operationString= `${firstTerm}${operation}${secondTerm}`;
    const displayOP = document.getElementById('display-operation');
    const displayResult = document.getElementById('display-result');
    if (result){
        if (result.toString().length>=15) result = 'Out of Space';
        displayOP.textContent= `Answer ${operation} ${secondTerm}`;
        displayResult.textContent=`${result}`;
    } else {
        displayOP.textContent= `${firstTerm} ${operation} ${secondTerm}`;
        displayResult.textContent='0';
    }  
}

function addNumber(number){
    if (operationString.length >= 27) return;
    if ((!firstTerm) || (!operation)){
        firstTerm += number;
        console.log(firstTerm);
    } else {
        secondTerm += number;
        console.log(secondTerm);
    }updateDisplay();    
}

function setOperation(op){
    if (result=='Out of Space') clear();
    if (!firstTerm && op=='-'){
        firstTerm='-';
        updateDisplay();
        return
    } else if (firstTerm){
        if (firstTerm && secondTerm){
            result = makeOperation(operation,parseFloat(firstTerm),parseFloat(secondTerm));
            console.log(result);
        }else if((op=='Sqrt')
                ||(op=='1/x')
                ||(op=='log')){
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
        case 'Sqrt':
            return sqRoot(a,b);        
        case 'Pow':
            return pow(a,b);
        case '1/x':
            return inverse(a,b);
        case 'log':
            return logaritm(a,b);                
    }secondTerm='';             
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

function change() {
    console.log('perru perrington');
    if (operation=='-'){
        operation='+';
    }else if (operation == '+'){
        operation='-';
    }updateDisplay();           
}

function del(){
    if (!secondTerm && !operation ){
        firstTerm = firstTerm.slice(0,-1);
    } else if (!secondTerm){
        operation='';
    } else {
        secondTerm = secondTerm.slice(0,-1);
    }
    updateDisplay();
}