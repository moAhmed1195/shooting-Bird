
window.addEventListener('load', function () {
  let userName = document.querySelector("[name='username']");
  
  let formSound = new Audio('./sounds/formSound.mp3');
  
  swal(`Enjoy`).then(function () {
    formSound.play();
    formSound.loop = true;
    document.forms[0].onsubmit = function (e) {
      if (!isNaN(userName.value) || (userName.value.length > 15)) {
        e.preventDefault();
        swal(`Enter Valid Name , Please`,
          `like : Mohamed Ahmed<br>
      Max characters: 15 <br> 
      Numbers at start are invalid<br>
      Empty Name is invalid`);
      }
     
    }
  
  });
});