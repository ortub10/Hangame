const figlet = require('figlet');
const prompt = require('prompt-sync')();
let arr = ['javascript', 'course','computer', 'game','math','function' ];

const welcomeMessage=(word)=>{
    console.log(figlet.textSync(word, {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }));
}

const showHiddenWord=(secretWord,oldLettersGuessed)=>{
    /* This function show the word, the letters
     who guessed and the letters who stil hidden(as *)*/ 
let str = '';
for(let ch of secretWord){
    if(oldLettersGuessed.includes(ch))
    str+=ch+'';
    else
    str+='*';
   }
   return str;
}

const CheckLetterGuessed=(letterGuessed,oldLettersGuessed)=>{
    /*this function check if the letter meets the conditions
    and teturn true if is gggg */ 
    if(oldLettersGuessed.includes(letterGuessed) ) {
        console.log('you already enterd this letter');
        return false; 
    } else if(letterGuessed.length !== 1){
        console.log('plz enter a single letter')
        return false;
    }  else if (!letterGuessed.match(/[a-z]/i)){
        console.log('plz enter a valid letter')
        return false;
    }
    return true;
}

const statGame =(arr)=>{
    const secretWord = arr [Math.floor(Math.random()*arr.length)]; 
    let triesLeft = 10;
    let triesDone = 0;
    let oldLettersGuessed  = '';
    let won = false;
    welcomeMessage('HANG MAN');
    let cuurentWord = showHiddenWord(secretWord,oldLettersGuessed);
    let letter;
    while(triesDone <10 && !won ){
        console.log('-------------------------------');
        triesLeft = 10 - triesDone;
        console.log(`You have ${triesLeft} guesses`);
        console.log('The word is: ');
        console.log(cuurentWord);
        letter = prompt('enter your guess: ').toLocaleLowerCase();
       // letter = letter.toLocaleLowerCase();
        if(letter === secretWord){
            /*The user can try to guess the entire word
            and if he is right so the game over with 
            his victory */
            console.log('YON WON!!!');
            won = true;
            break;
        }
        if (CheckLetterGuessed(letter,oldLettersGuessed)){
            oldLettersGuessed+=letter;
            if(secretWord.includes(letter)){
                cuurentWord = showHiddenWord(secretWord,oldLettersGuessed);
                console.log('Good Guess');
                if(secretWord===cuurentWord){
                    console.log(cuurentWord);
                    console.log('YON WON!!!');
                    won = true;
                }
                
            }else{
                console.log('Bad guess');
                triesDone++;
            }
        }
        else{
            console.log('Try again');
        }        
    }
    if (!won){
    console.log('-------------------------------');    
    console.log('YOU LOSE');
    console.log('The word is:'+ secretWord);
    }
}
statGame(arr);