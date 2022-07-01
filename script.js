const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement= document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector("[data-menssagem]");
const restartbutton = document.querySelector("[data-restart-button]");
const menssageTurn =  document.querySelector("[data-menssagemTurn]");

 

let turnoPlayer2= false;

const  winningCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const startGame =()=>{
    turnoPlayer2 = false;

    for( const cell of cellElements){
        cell.classList.remove("player1");
        cell.classList.remove("player2");
        board.classList.remove("blur");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick,{once: true});
    }
// mudar simbolo

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
};

//MENSAGEM DRAW
const endGame = (isDraw) =>{
    if(isDraw){
         winningMessageTextElement.innerText = 'Empate!'
    }else{
        winningMessageTextElement.innerText =  turnoPlayer2
        ? 'O Venceu!' 
        : 'X Venceu!';
    };
    
    //MENSAGEM VITÓRIA
    winningMessage.classList.add("show-winning-message");
    board.classList.add("blur");
    v.play(); 
    
    
};


const chekforWin=(currentPlayer)=>{
    return  winningCombinations.some((combination)=>{
        return combination.every((index)=>{
            return cellElements[index].classList.contains(currentPlayer);
            });
        });
    } ;

    const checkForDraw = () =>{
        return[...cellElements].every(cell=>{
            return cell.classList.contains('player1')  || cell.classList.contains('player2');
        });
    };
    
const placeMark= (cell, classToAdd) =>{
    cell.classList.add(classToAdd);
};


const setBoardHoverClass = () =>{
    board.classList.remove("player2");
    board.classList.remove("player1");

    if(turnoPlayer2){
        board.classList.add("player2");
        menssageTurn.innerText = "Vez do 'O'";
        
    }else{
        board.classList.add("player1");
        
        menssageTurn.innerText = "Vez do 'X'";
    } ;
};
const swapTurns =() =>{
    turnoPlayer2 = !turnoPlayer2;
    setBoardHoverClass();
   
};

const handleClick =(e)=> {  
    //colocar a marca player1 ou player2
    const cell = e.target;
    const classToAdd = turnoPlayer2? "player2": "player1";

    placeMark(cell,classToAdd);

    // verificar se há vitória
    const isWin = chekforWin(classToAdd);

    const isDraw = checkForDraw ();

    if(isWin){
            endGame(false);
    }else if(isDraw){
        endGame(true)
    }else{
        //mudar símbolo
        swapTurns();
    }
  
};

startGame();

restartbutton.addEventListener('click',startGame);
