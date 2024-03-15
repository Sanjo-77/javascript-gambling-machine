// 1. Deposit some money
// 2. To determine the number of lines to bet
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. check if the user win
// 6. give the user their winnings
// 7. play again

// importing and initialising the package
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

// object 
const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8,
}

const SYMBOL_VALUES ={
    A : 5,
    B : 4,
    C : 3,
    D : 2,
}





const deposit= () =>{
    while(true){

    const depositAmount = prompt("Enter a deposit amount : ")
    // convert the amount to integer 
    const numberDepositAmount = parseFloat(depositAmount)
    // input validation 
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid deposit amount, try again !!!")
    } else { 
        return numberDepositAmount //breaks the loop
        }
    }
}

const getNumberOfLines = () =>{
    while(true){

    const lines = prompt("Enter the number of lines to bet on (1-3) : ")
    // convert the amount to integer 
    const numberOfLines = parseFloat(lines)
    // input validation 
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
        console.log("Invalid input !!!")
    } else { 
        return numberOfLines //breaks the loop
        }
    }
}

const getBet =(balance,lines) =>{
    while(true){

    const bet = prompt("Enter the bet per line: ")
    // convert the amount to integer 
    const numberBet = parseFloat(bet)
    // input validation 
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines){
        console.log("Invalid bet. Try again !!!")
    } else { 
        return numberBet //breaks the loop
        }
    }
}

const spin =() =>{
    const symbols = []
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        // push the symbols in to the array 
        for(let i=0; i < count ; i++){
            symbols.push(symbol)
        }
    }

    const reels = [] 

    for (let i=0; i<COLS; i++ ){
        reels.push([]) //for every reel
        const reelSymbols = [...symbols] //copy of symbols are created for each reel
        for(let j=0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1); //removing the selectedSymbol from array
        }
    }
    return reels
}


const tranpose =(reels) =>{
    const rows =[];

    for (let i=0; i<ROWS; i++){
        rows.push([])
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}


const printRows=(rows)=>{
    for(const row of rows){
        let rowString= "";
        for(const [i,symbol] of row.entries()){
            rowString+=symbol
            if(i!= row.length -1){
                rowString+= " | "
            }
        }
        console.log(rowString)
    }
    
}

const getWinnings= (rows,bet,lines)=>{
    let winnings =0;

    for(let row=0; row < lines; row++){
        const symbols = rows[row]
        let allSame = true;

        for(const symbol of symbols){
            if(symbol !=symbols[0]){
                allSame=false;
                break;
            }
        }

        if(allSame){
            winnings+= bet * SYMBOLS_COUNT[symbol[0]]
        }
    }

    return winnings

}



let balance = deposit()  //this makes to update the balance whenver we need
const lines =getNumberOfLines()
const bet = getBet(balance,lines);
const reels = spin();
const rows =tranpose(reels);
printRows(rows);
const winnings=getWinnings(rows,bet,lines);
console.log("You won, $" + winnings.toString())


 