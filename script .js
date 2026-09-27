let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
let count = 0;
const audio = document.getElementById('boxClickSound');
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enablesBoxes();
    msgContainer.classList.add("hide");
}


boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(box.innerText != "") {
            return;
        }
        audio.currentTime = 0;// this is releted to audio
        audio.play();
       if(turnO){
       box.innerText = "O";
       box.classList.add("o-marker");
        turnO = false;
       } else {
        box.innerText ="X";
        box.classList.add("x-marker");
        turnO = true;
       }
       box.disabled = true;
       count++;
       checkWinner();
       if(count === 9 && msgContainer.classList.contains("hide")) {
        showDraw();
       }
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}
const enablesBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulation , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "Game Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val !="" && pos2val !="" && pos3val !=""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
            } 
        }
    }
    
};


newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
