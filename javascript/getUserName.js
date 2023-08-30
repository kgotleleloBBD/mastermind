const username = document.getElementById('username');
const playButton = document.getElementById('playBtn');
const errorLbl = document.getElementById('errorLbl')

playButton.addEventListener('click', (e)=>{
    e.preventDefault();

    if (username.innerText === null){
        errorLbl.style.visibility = 'visible'
        errorLbl.style.color = '#F31559'
        errorLbl.innerText = 'enter a username before you continue playing';
    }
})