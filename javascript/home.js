const username = document.getElementById('username');
const playButton = document.getElementById('playBtn');
const instructionsButton = document.getElementById('instructionsBtn');
const  howToPopup = document.getElementById("how-to-play");

function closePopup (){
    howToPopup.style.display = "none";
}

playButton.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = 'game.html';
});

instructionsButton.addEventListener('click', (e)=>{
    e.preventDefault();
    howToPopup.style.display = "block";
});