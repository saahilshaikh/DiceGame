/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore,activePlayer,activeClass,inactiveClass,scoreOne,scoreTwo;

roundScore=0;
activePlayer=0;
inactivePlayer=1;
document.querySelector('.dice').style.display='none';
document.getElementById('score-0').textContent='0';
document.getElementById('score-1').textContent='0';
document.querySelector('#current-0').textContent='0';
document.querySelector('#current-1').textContent='0';

function turnOver()
{
    document.querySelector('#current-'+inactivePlayer).textContent='0';
    activeClass=document.querySelector('.player-'+activePlayer+'-panel');
    inactiveClass=document.querySelector('.player-'+inactivePlayer+'-panel');
    activeClass.classList.add('active');
    inactiveClass.classList.remove('active');
}

document.querySelector('.btn-new').addEventListener('click',function(){
    document.querySelector('.dice').style.display='none';
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.querySelector('#current-0').textContent='0';
    document.querySelector('#current-1').textContent='0';
});
document.querySelector('.btn-roll').addEventListener('click',roll);
document.querySelector("#dice-2").addEventListener('touchstart',roll);

function roll(){
    scoreOne=document.querySelector("#score-0").textContent;
    scoreTwo=document.querySelector("#score-1").textContent;
    if(scoreOne<100 && scoreTwo<100)
{
    var dice=Math.floor(Math.random()*6)+1;
    var diceDom=document.querySelector('.dice');
    var diceDom2=document.querySelector('#dice-2');
    diceDom.style.display='block';
    diceDom.src='dice-'+dice+'.png';
    diceDom2.src='dice-'+dice+'.png';
    if(dice!=1)
    {
        var currentScore=document.querySelector('#current-'+activePlayer).textContent;
        var currentScoreInt=parseInt(currentScore);
        roundScore=currentScoreInt+dice;
        document.querySelector('#current-'+activePlayer).textContent=roundScore;

    }
    if(dice==1)
    {
        if(activePlayer===0)
        {
            
            activePlayer=1;
            inactivePlayer=0;
            turnOver();
        }
        else
        {
            activePlayer=0;
            inactivePlayer=1;
            turnOver();
        }
    }
}
else{
    alert("Start new Game");
}
}

document.querySelector('.btn-hold').addEventListener('click',hold);
document.getElementById("hold").addEventListener('touchstart',hold);
function hold(){
    scoreOne=document.querySelector("#score-0").textContent;
    scoreTwo=document.querySelector("#score-1").textContent;
    currentOne=document.querySelector("#current-0").textContent;
    currentTwo=document.querySelector("#current-1").textContent;
    if(scoreOne<100 && scoreTwo<100 && (currentOne>0|| currentTwo>0))
{
    var score=document.querySelector('#score-'+activePlayer).textContent;
    var scoreInt=parseInt(score);
    var finalscore=scoreInt+roundScore;
    document.querySelector('#score-'+activePlayer).textContent=finalscore;
    document.querySelector('#current-'+activePlayer).textContent='0';
    if(finalscore>=100)
    {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            
    }
    else{
        if(activePlayer===0)
        {
            activePlayer=1;
            inactivePlayer=0;
            turnOver();
        }
        else
        {
            activePlayer=0;
            inactivePlayer=1;
            turnOver();
        }
    }
}
}