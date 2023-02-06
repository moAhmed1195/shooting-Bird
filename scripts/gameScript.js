window.addEventListener('load', function () {
// variables (game settings)
let score = 0, killedBird = 0, scoreWinLimit = 50;       
                                                        //  units of variables
let time = 60;                                          //  sec
let bird3Score = 5, bird2Score = 10, bird1Score = 10;   //  points
let noOfBirds = 3;                                      //  birds
let birdTimeGenerateRate = 500;                         //  ms
let birdSpeed = 50;                                     //  ms
let birdSpeedMax = 50;                                  //  ms
let birdSpeedMin = 20;                                  //  ms
let bomb1TimeRate = 10000;                              //  ms
let bomb2TimeRate = 5000;                               //  ms
let bomb1Speed = 50;                                    //  ms
let bomb2Speed = 40;                                    //  ms
let rangeOfExplosion = 300;                             //  px
let gameTimeRate = 1000;                                //  ms
    
let bomb1;
let bomb2;
let bird;

// get user name and date
let keysValues = new URLSearchParams(window.location.search);
let playerName = keysValues.get("username");                    
let date= (new Date()).toLocaleString();
let userData = {};
//________________________________________________
    
// game level
    if (keysValues.get("Level") == "two") {
        birdSpeedMax = 40; birdSpeedMin = 10; bomb1Speed = 25; bomb2Speed = 20; birdTimeGenerateRate = 250;
    }
//__________________________________________________________
    
// welcome user name
    let welcomLi = this.document.querySelectorAll("li")[0];
    welcomLi.innerText = `Hi : ${toPascalCase(playerName)}`;
//__________________________________________________________
    
// score  
    let scoreLi = this.document.querySelectorAll("li")[1];
    scoreLi.innerText = `Score : ${score}`;
//__________________________________________________________
    
// time
    let timeLi = this.document.querySelectorAll("li")[2];
//__________________________________________________________
    
// killed Bird
    let killedBirdLi= this.document.querySelectorAll("li")[3];
    killedBirdLi.innerText = `Killed Birds : ${killedBird}`;
//__________________________________________________________
    
// birds Section
    let birdSection = this.document.querySelector(".birdSection");
//________________________________________________________________
    
// background2 Section
    let background = this.document.querySelector(".background2");
//_______________________________________________________________
// body
    let body = this.document.querySelector("body");    
//_________________________________________________________________
//snipperGun
    let snipperGun = this.document.querySelector(".snipperGun");
//_____________________________________________________________

// snipperSign
    let snipperSign = this.document.querySelector(".snipperSign");
//____________________________________________________________
    
//Sounds 
    let bird1Sound = new Audio('./sounds/bird1Sound.wav');
    let bird2Sound = new Audio('./sounds/bird2Sound.mp3');
    let bird3Sound = new Audio('./sounds/bird3Sound.mp3');
    let bombSound  = new Audio('./sounds/explosion.mp3');
    let bomb2Sound = new Audio('./sounds/explosion2.mp3');
    let introSound = new Audio('./sounds/gameintro.wav');
    let winSound   = new Audio('./sounds/winSound.mp3');
    let loseSound  = new Audio('./sounds/loseSound.mp3');
    let shotRelodBulletSound = new Audio('./sounds/shotReloadBullet.mp3');
    let sounds = [bird1Sound, bird2Sound, bird3Sound, bombSound, bomb2Sound,introSound,winSound,loseSound,shotRelodBulletSound];
//__________________________________________________________________________
     
// time of the game 
    swal({
        title: `welcome ${lastLogin(toPascalCase(playerName))}`,               // welcome popup
        text: `we hope you enjoy our game you need to get score 50 to win`,
        html: `<img src="./images/1.png" >`,
        width: '800px',
        confirmButtonText: "Start",
    })
    .then(function () {                                                        
    body.style.cursor = "none";
        selectSound(introSound, sounds);
        let gameTimeId = setInterval(function () {                             // start time of the game
            timeLi.innerText = `Time : ${time} S`;
            time--;
            if (time < 0) {
                clearInterval(gameTimeId);                                    // clear all intervals
                clearInterval(birdTimeShowId);
                clearInterval(bomb1TimeShowId);
                clearInterval(bomb2TimeShowId);
                clearChilds(background);
                body.style.cursor = "default";
                storeUserData(userData, toPascalCase(playerName), score, date);
    
                if (score >= scoreWinLimit)                                    // win condition
                {                                                       
                    selectSound(winSound, sounds);   
                    swal({
                        html: ` <img src="./images/2.png" >`,
                        title: `You Win , your Score ${score}`,
                        width: '800px',
                        confirmButtonText: "Play Again",
                        
                    }).then(function () {
                        location.href = "./index.html";
                    });
                }
                else                                                            //lose condition
                {
                    selectSound(loseSound, sounds,0);
                    swal({
                        html: `<img src="./images/3.png" >`,
                        title: ` You Lose , your Score ${score} `,
                        width: '800px',
                        confirmButtonText: "Play Again",
                       
                    }).then(function () {
                        location.href = "./index.html";
                    });
                    
                }
                
            }
        }, gameTimeRate);
//________________________________________________________________

// generate bird and move it 
let birdNumber;
let birdTimeShowId = setInterval(function () {
            birdSpeed = Math.floor(Math.random() * (birdSpeedMax-birdSpeedMin+1)+birdSpeedMin);
            birdNumber = Math.ceil(Math.random() * noOfBirds);
            bird = generateImage(`bird${birdNumber}`, `gif`);
            birdSection.append(bird);
            moveRight(bird, 0, birdSpeed);
        }, birdTimeGenerateRate);
//__________________________________________________________________
        
// generate bomb1 and move it   (kills all birds)
        let bomb1TimeShowId = setInterval(function () {
            bomb1=generateImage("bomb1","png");
            background.append(bomb1);
            moveDown(bomb1, bomb1Speed);    
        }, bomb1TimeRate);
//__________________________________________________________________

// generate bomb2 and move it    (kills surrounding birds)
        let bomb2TimeShowId = setInterval(function () {
            bomb2 = generateImage("bomb2","png");
            background.append(bomb2);
            moveDown(bomb2,bomb2Speed);
        },bomb2TimeRate);
});
//__________________________________________________________
    
// detect Event    then   calc( score and killed birds )  add(sounds and explosion image)
    document.addEventListener("click", function (e) {
    selectSound(shotRelodBulletSound, sounds);
    if (e.target.className === "bird3")                                 
    {
        score += bird3Score;
        killedBird++;
        selectSound(bird3Sound,sounds,shotRelodBulletSound);               
        makeExplosion(e.target, birdSection,"explosion1","png");            
        e.target.remove();
    }
    else if (e.target.className === "bird2")
    {
        score += bird2Score;
        killedBird++;
        selectSound(bird2Sound,sounds,shotRelodBulletSound);
        makeExplosion(e.target, birdSection,"explosion1","png");
        e.target.remove();
    }
    else if (e.target.className === "bird1")
    {
        score -= bird1Score;
        killedBird++;
        selectSound(bird1Sound,sounds,shotRelodBulletSound);
        makeExplosion(e.target, birdSection,"explosion1","png");
        e.target.remove();
    }
    else if (e.target.className === "bomb1")
    {
        let currentBirdsOnDocument = document.querySelectorAll(".birdSection img");
        selectSound(bombSound,sounds,shotRelodBulletSound);
        makeExplosion(e.target, birdSection,"explosion2","png");
        for (let i = 0; i <  currentBirdsOnDocument.length; i++)
        {
            killedBird++;
            if ( currentBirdsOnDocument[i].className === "bird3") { score += bird3Score; }
            else if ( currentBirdsOnDocument[i].className === "bird2") { score += bird2Score; }
            else if (currentBirdsOnDocument[i].className === "bird1") { score -= bird1Score; }
            makeExplosion(currentBirdsOnDocument[i], birdSection,"explosion1","png");
            currentBirdsOnDocument[i].remove();
        }
        e.target.remove();
    }
    else if (e.target.className === "bomb2")
    {
        let currentBirdsOnDocument2 = document.querySelectorAll(".birdSection img");
        selectSound(bomb2Sound,sounds,shotRelodBulletSound);
        makeExplosion(e.target, birdSection,"explosion2","png");
        for (let i = 0; i <  currentBirdsOnDocument2.length; i++)
        {
            if (birdInRange(bomb2, currentBirdsOnDocument2[i], rangeOfExplosion))
            {
                killedBird++;
                if (currentBirdsOnDocument2[i].className === "bird3") { score += bird3Score; }
                else if ( currentBirdsOnDocument2[i].className === "bird2") { score += bird2Score; }
                else if (currentBirdsOnDocument2[i].className === "bird1") { score -= bird1Score; }
                makeExplosion(currentBirdsOnDocument2[i], birdSection,"explosion1","png");
                currentBirdsOnDocument2[i].remove();
           }              
        }
        e.target.remove();
    }
    scoreLi.innerText = `Score : ${score}`;
    killedBirdLi.innerText = `Killed Birds : ${killedBird}`;
    
    });
//_______________________________________________________________________________
// snipper
   this.document.addEventListener("mousemove", function (e) {
        snipperGun.style.left = e.clientX + 'px';
        snipperSign.style.left = (e.clientX - ((snipperSign.clientWidth) / 2)) + "px";
        snipperSign.style.top = (e.clientY - ((snipperSign.clientHeight) / 2)) + "px";
    
}); 
});
   
