/************** Bird and Bomb (Image in general) handling functions */
// delete Childs
function clearChilds(parentElement) {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
}
//___________________________________________

// generate image
let generateImage = function (imageName,imageExtension) {
    let imag = document.createElement("img");
    imag.src = `./images/${imageName}.${imageExtension}`;
    imag.classList = `${imageName}`;
    return imag;
}
//____________________________________________

// move image right
const moveRight = function (imageObject, left, intervalTime)
{
    let top = (window.innerHeight-100) * Math.random();
    imageObject.style.top = top + "px";
    let id = setInterval(function () {
        
    left+=10;
    if(left<(innerWidth-imageObject.width-20))
    {
      imageObject.style.left=left+"px";
    }
    else
    {
        clearInterval(id);
        imageObject.remove();
    }
  },intervalTime);
}
//______________________________________________

// move image down
function moveDown(bomb,speed) 
{   
    let top = 0;
    let bombLeftPosition = (window.innerWidth - bomb.width - 20) * Math.random();
    bomb.style.left = bombLeftPosition + "px";
    let id = setInterval(function () {
        top += 10;
        if (top < window.innerHeight - bomb.height)
        {
            bomb.style.top = top + "px";
        }
           else
        {
            clearInterval(id);
            bomb.remove();
        
        }
    }, speed);
}
//_______________________________________________

//bird in explosion range or not
function birdInRange(bombObj, birdObj,range)
{
    let inRange = false;
    let leftBomb = parseInt(bombObj.style.left);
    let topBomb = parseInt(bombObj.style.top);
    let leftBird = parseInt(birdObj.style.left);
    let topBird = parseInt(birdObj.style.top);

    if (topBird > (topBomb - range) &&
        topBird < (topBomb + bombObj.height + range) &&
        leftBird > (leftBomb - range) &&
        leftBird < (leftBomb + bombObj.width + range))
    {
        inRange = true;
    }
    return inRange;
}

//make explosion
function makeExplosion(targetImg, parentSection,explosionImageName,explosionimageExtension) {
    let explosionImg=generateImage(explosionImageName, explosionimageExtension);
    explosionImg.style.left = targetImg.style.left;
    explosionImg.style.top = targetImg.style.top;
    parentSection.append(explosionImg);
    setTimeout(function () {
        explosionImg.remove();
    },300);
}
//__________________________________________________

//******************************************************************************/

/*********Sound Handling Function ***********/
// manage sounds
function selectSound(sound,sounds,sound2) {
    for (let i = 0; i < sounds.length; i++){
        sounds[i].currentTime = 0.0;
        sounds[i].pause();
    }
    if (sound2) {
        sound2.play();
    }
    setTimeout(function () {
        
        sound.play();
    },200)
    
}
//__________________________________

/*******************************************************************************/


//**********     User Handling Functions    *********** */
// to pascal
function toPascalCase(sentence){
    let result = "";
    result += sentence[0].toUpperCase();
    for(let i=1;i<sentence.length;i++)
    {    
        if(sentence[i]== " ")
        {
            result += sentence[i];
            result += sentence[i + 1].toUpperCase();
            i++;
        }else
        {
            result += sentence[i].toLowerCase();
        }
    }
    return result;
}
//________________________________________________

// get last login
function lastLogin(key) {
    let dataFromLocal = window.localStorage.getItem(key);
    if ( dataFromLocal== undefined) {
        return `${key} <br> it is your(First time) <br> enjoy`;
    }
    else {
       let obj= JSON.parse(dataFromLocal);
        return `${key}<br> your last Score is ${obj.userScore} <br> at time ${obj.userDate} <br>`
    }
}
//____________________________________________________

// store Data in local
function storeUserData(userObj,name,score, date) {
    userObj.userScore = score;
    userObj.userDate = date;
    window.localStorage.setItem(`${name}`, JSON.stringify(userObj));
}
//__________________________________________________

/********************************************************************************/
