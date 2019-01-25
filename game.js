window.onload = initAll;
var canvas;
var ctx;
//mouse position
var mouseX;
var mouseY;
//Player postion and speed
var PlayerX=350;
var PlayerY=250;
//move the palyer
var rightPressed =false;
var leftPressed =false;
var upPressed = false;
var downPressed = false;
//killer
var killers=[];
var killercounter=7;
for(var c = 0; c<killercounter;c++)
{
    killers[c]={x:Math.floor(Math.random()*700),y:Math.floor(Math.random()*500),alive:0};
}
killers[0].alive=1;
//bullet
var bulletX=PlayerX+10;
var bulletY=PlayerY+10;
var shoot = false;
var follow = true;
//speed of the bullet
var xSpeed = 0;
var ySpeed = 0;
//Game Features
var score = 0;
var lifes = 5;
//power ups
var powerUpX=Math.floor(Math.random()*700);
var powerUpY=Math.floor(Math.random()*500);
var powerUpXspeed=1;
var powerUpYspeed=-1;
var power=false;

//question
var coefficient = Math.floor(Math.random()*100);
var poweer = Math.floor(Math.random()*9+2);
var secondco = Math.floor(Math.random()*100);
var rightanswer=0;
answer=[];
answerpool=[];
answerpool[0] = coefficient+"x^" +(poweer+1)+"+"+ secondco+"x";
answerpool[1] = (coefficient*poweer)+"x^" +(poweer-1)+"+"+ secondco;
answerpool[2] = coefficient+"x^" +(poweer-1)+"+"+ secondco;
answerpool[3] = (coefficient*poweer)+"x^" +(poweer+1)+"+"+ secondco;
var count = 0;
while(count<4)
{
    var ranquestion= Math.floor(Math.random()*4);
    if(answerpool[ranquestion]!="")
    {
        if(ranquestion==1)
        {
            rightanswer=count;
        }
        answer[count]=answerpool[ranquestion];
        answerpool[ranquestion]="";
        count++;
    }
}

var chances = 1;
var aPressed = false;
var bPressed = false;
var cPressed = false;
var dPressed = false;


var interval;
intervel = setInterval(menuScreen,1);

function menuScreen()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "White";
    ctx.font = "30px Arial";
    ctx.fillText("Welcome to the game", 50,50);
    ctx.font = "20px Arial";
    ctx.fillText("Use W A S D to move the player, aim with mouse, press space to shoot", 50,100);
    ctx.fillText("Player can go outside the black box but bullet can not go beyond the box", 50,150);
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Press space now to start the game", 50,200);
    ctx.closePath();
    if(shoot==true)
    {
        clearInterval(intervel);
        intervel = setInterval(play,10);
    }
}

function initAll()
{
    
    canvas = document.getElementById("Game");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", KeyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler,false);
    document.addEventListener("mousemove", mouseMoveHandler, false);
    
    PlayerX+=canvas.offsetLeft;
    PlayerY+=canvas.offsetTop;
    for(var i =0;i<killercounter;i++)
    {
        killers[i].x+=canvas.offsetLeft;
        killers[i].y+=canvas.offsetTop;
    }

    imgObj = document.getElementById('myImage');
    imgObj.style.position = 'absolute';
    imgObj.style.left = PlayerX+'px';
    imgObj.style.top = PlayerY+'px';
    imgObj.style.visibility = 'visible';

    killer1 = document.getElementById('killer');
    killer1.style.position = 'absolute';
    killer1.style.left = killers[0].x+'px';
    killer1.style.top = killers[0].y+'px';
    killer1.style.visibility = 'visible';
    killer2 = document.getElementById('killer2');
    killer2.style.position = 'absolute';
    killer2.style.left = 0+'px';
    killer2.style.top = 0+'px';
    killer2.style.visibility = 'visible';
    killer3 = document.getElementById('killer3');
    killer3.style.position = 'absolute';
    killer3.style.left = 0+'px';
    killer3.style.top = 0+'px';
    killer3.style.visibility = 'visible';
    killer4 = document.getElementById('killer4');
    killer4.style.position = 'absolute';
    killer4.style.left = 0+'px';
    killer4.style.top = 0+'px';
    killer4.style.visibility = 'visible';
    killer5 = document.getElementById('killer5');
    killer5.style.position = 'absolute';
    killer5.style.left = 0+'px';
    killer5.style.top = 0+'px';
    killer5.style.visibility = 'visible';
    killer6 = document.getElementById('killer6');
    killer6.style.position = 'absolute';
    killer6.style.left = 0+'px';
    killer6.style.top = 0+'px';
    killer6.style.visibility = 'visible';
    killer7 = document.getElementById('killer7');
    killer7.style.position = 'absolute';
    killer7.style.left = 0+'px';
    killer7.style.top = 0+'px';
    killer7.style.visibility = 'visible';

  
}
function play()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawPlayer();
    killPlayer();
    shot();
    checkhit();
    printScore();
   
    //life
    if(lifes<=0)
    {
        if(chances>0)
        {
            clearInterval(intervel);
            intervel = setInterval(question,1);
        }
        else
        {
            window.alert("game over");
            clearInterval(interval);

        }
        
    }

    

    //init bullet
    if(follow===true)
    {
    bulletX=PlayerX+10-canvas.offsetLeft;
    bulletY=PlayerY+10-canvas.offsetTop;
    }
    else if(shoot===true)
    {
    if(bulletX>mouseX)
    {
        xSpeed=-2;
    }
    else if(bulletX<mouseX)
    {
        xSpeed=2;
    }

    //shot
    if(bulletY>mouseY)
    {
        if(bulletX>mouseX)
        {
            var rate = (bulletY-mouseY)/(bulletX-mouseX);
        }
        else if(bulletX<mouseX)
        {
            var rate = (bulletY-mouseY)/(mouseX-bulletX);
        }
        ySpeed = -2*rate;
    }
    else if(bulletY<mouseY)
    {
        if(bulletX>mouseX)
        {
            var rate = (mouseY-bulletY)/(bulletX-mouseX);
        }
        else if(bulletX<mouseX)
        {
            var rate = (mouseY-bulletY)/(mouseX-bulletX);
        }
        ySpeed = 2*rate;
    }
    shoot=false;
    }
    bulletX=bulletX+xSpeed;
    bulletY=bulletY+ySpeed;
    if(bulletX>700)
    {
        shoot=false;
        follow=true;
        bulletX=PlayerX;
        xSpeed=0;ySpeed=0;
    }
    else if(bulletX<0)
    {
        shoot=false;
        follow=true;
        bulletX=PlayerX;
        xSpeed=0;ySpeed=0;
    }
    else if(bulletY>500)
    {
        shoot=false;
        follow=true;
        bulletY=PlayerY;
        xSpeed=0;ySpeed=0;
    }
    else if(bulletY<0)
    {
        shoot=false;
        follow=true;
        bulletY=PlayerY;
        xSpeed=0;ySpeed=0;
    }

    //move player
    if(power==false)
    {
        if(upPressed==true)
        {
            PlayerY+=-2;
        }
        if(downPressed==true)
        {
            PlayerY+=2;
        }
        if(leftPressed==true)
        {
            PlayerX+=-2;
        }
        if(rightPressed==true)
        {
            PlayerX+=2;
        }
    }
    else if (power==true)
    {
        if(upPressed==true)
        {
            PlayerY+=-3;
        }
        if(downPressed==true)
        {
            PlayerY+=3;
        }
        if(leftPressed==true)
        {
            PlayerX+=-3;
        }
        if(rightPressed==true)
        {
                PlayerX+=3;
        }
    }
    

    //killer
    for(var c = 0; c<killercounter;c++)
    {
        if(killers[c].alive==1)
        {
            if(killers[c].x-canvas.offsetLeft>=PlayerX+10-canvas.offsetLeft)
                killers[c].x-=1;
            if(killers[c].x-canvas.offsetLeft<=PlayerX+5-canvas.offsetLeft)
                killers[c].x+=1;
            if(killers[c].y-canvas.offsetTop>=PlayerY+10-canvas.offsetTop)
                killers[c].y-=1;
            if(killers[c].y-canvas.offsetTop<=PlayerY+5-canvas.offsetTop)
                killers[c].y+=1;
        }
    }

    //powerup
    if(score==3)
    {
        powerUp();
        powerUpX+=powerUpXspeed;
        powerUpY+=powerUpYspeed;
        if(powerUpX+10>=700)
        powerUpXspeed=-1;
        if(powerUpX<=0)
        powerUpXspeed=1;
        if(powerUpY+10>=500)
        powerUpYspeed=-1;
        if(powerUpY<=0)
        powerUpYspeed=1;
    }
    
}
function drawPlayer()
{
    imgObj.style.left = PlayerX+'px';
    imgObj.style.top = PlayerY+'px';
}
function KeyDownHandler(e)
{
    if(e.keyCode==87)
        upPressed=true;
    else if(e.keyCode==83)
        downPressed=true;
    else if(e.keyCode==65)
        leftPressed=true;
    else if(e.keyCode==68)
        rightPressed=true;
    else if(e.keyCode==32)
    {
        shoot = true;
        follow = false;
    }
    else if (e.keyCode==49)
    {
        aPressed=true;
    }
    else if (e.keyCode==50)
    {
        bPressed=true;
    }
    else if (e.keyCode==51)
    {
        cPressed=true;
    }
    else if (e.keyCode==52)
    {
        dPressed=true;
    }
        
}
function keyUpHandler(e)
{
    if(e.keyCode==87)
        upPressed=false;
    else if(e.keyCode==83)
        downPressed=false;
    else if(e.keyCode==65)
        leftPressed=false;
    else if(e.keyCode==68)
        rightPressed=false;
    else if (e.keyCode==49)
    {
        aPressed=false;
    }
    else if (e.keyCode==50)
    {
        bPressed=false;
    }
    else if (e.keyCode==51)
    {
        cPressed=false;
    }
    else if (e.keyCode==52)
    {
        dPressed=false;
    }
}
function killPlayer()
{
    if(killers[0].alive==1)
    {
        killer1.style.left = killers[0].x+'px';
        killer1.style.top = killers[0].y+'px';
    }
    if(killers[1].alive==1)
    {
        killer2.style.left = killers[1].x+'px';
        killer2.style.top = killers[1].y+'px';
    }
    if(killers[2].alive==1)
    {
        killer3.style.left = killers[2].x+'px';
        killer3.style.top = killers[2].y+'px';
    }
    if(killers[3].alive==1)
    {
        killer4.style.left = killers[3].x+'px';
        killer4.style.top = killers[3].y+'px';
    }
    if(killers[4].alive==1)
    {
        killer5.style.left = killers[4].x+'px';
        killer5.style.top =  killers[4].y+'px';
    }
    if(killers[5].alive==1)
    {
        killer6.style.left = killers[5].x+'px';
        killer6.style.top =  killers[5].y+'px';
    }
    if(killers[6].alive==1)
    {
        killer7.style.left = killers[6].x+'px';
        killer7.style.top =  killers[6].y+'px';
    }
    
    
   
    
}
function shot()
{
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.arc(bulletX,bulletY,5,0,Math.PI*2);
    ctx.fillStyle= "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function mouseMoveHandler(e)
{
    if(shoot==false)
    {
        mouseX = e.clientX-canvas.offsetLeft-10;
        mouseY = e.clientY-10;
    }
}
function checkhit()
{
    for(var c = 0; c<killercounter;c++)
    {
        if(killers[c].alive==1)
        {
            if(follow==false)
            {
            if(bulletX>killers[c].x-10-canvas.offsetLeft && bulletX<killers[c].x+30-canvas.offsetLeft&& 
                bulletY>killers[c].y-20-canvas.offsetTop&& bulletY<killers[c].y-canvas.offsetTop+30&&
                bulletX!=PlayerX&&bulletY!=PlayerY)
            {
                bulletX=PlayerX;
                bulletY=PlayerY;
                follow=true;
                shoot=false;
                killers[c].x = Math.floor(Math.random()*700)+canvas.offsetLeft;
                killers[c].y = Math.floor(Math.random()*500)+canvas.offsetTop;
                score++;
                if(score>=3)
                {
                    killers[1].alive=1;
                    powerUpprensent=true;
                }
                if(score>=6)
                {
                    killers[2].alive=1;
                }
                if(score>=10)
                {
                    killers[3].alive=1;
                }
                if(score>=14)
                {
                    killers[4].alive=1;
                }
                if(score>=18)
                {
                    killers[5].alive=1;
                }
                if(score>=20)
                {
                    killers[6].alive=1;
                }
            }
            }   
        
        if(killers[c].x-canvas.offsetLeft>=PlayerX-canvas.offsetLeft&&killers[c].x-canvas.offsetLeft<=PlayerX+20-canvas.offsetLeft&&killers[c].y-canvas.offsetTop>=PlayerY-canvas.offsetTop&&killers[c].y-canvas.offsetTop<=PlayerY+20-canvas.offsetTop)
        {
            lifes-=1;
            killers[c].x = Math.floor(Math.random()*700)+canvas.offsetLeft;
            killers[c].y = Math.floor(Math.random()*500)+canvas.offsetTop;
            power=false;
        }
    }
    }
    if(score>=3)
    {
        if(powerUpX>=PlayerX-canvas.offsetLeft&&powerUpX<=PlayerX+20-canvas.offsetLeft&&powerUpY>=PlayerY-canvas.offsetTop&&powerUpY<=PlayerY+20-canvas.offsetTop)
        {
            power=true;
            powerUpX=-100;
            powerUpY=-1000;
            powerUpXspeed=0;
            powerUpYspeed=0;
        }
        
    }
    
    
}
function printScore()
{
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    ctx.fillText("Score: "+score, 100,60);
    ctx.fillText("Lifes: "+lifes, 200,60);
    ctx.closePath();
}
function powerUp()
{
    ctx.beginPath();
    ctx.rect(powerUpX,powerUpY,10,10);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
function question()
{
    PlayerX=0;
    PlayerY=0;
    imgObj.style.left = PlayerX+'px';
    imgObj.style.top = PlayerY+'px';
    killers[0].x=0;
    killers[0].y=0;
    killer1.style.left = killers[0].x+'px';
    killer1.style.top = killers[0].y+'px';
    killer2.style.left = killers[0].x+'px';
    killer2.style.top = killers[0].y+'px';
    killer3.style.left = killers[0].x+'px';
    killer3.style.top = killers[0].y+'px';
    killer4.style.left = killers[0].x+'px';
    killer4.style.top = killers[0].y+'px';
    killer5.style.left = killers[0].x+'px';
    killer5.style.top = killers[0].y+'px';
    killer6.style.left = killers[0].x+'px';
    killer6.style.top = killers[0].y+'px';
    killer7.style.left = killers[0].x+'px';
    killer7.style.top = killers[0].y+'px';

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.font = "20px Arial";
    ctx.fillText("Answer the question to earn lifes to continue", 50,50);

    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Arial";
    ctx.fillText("Question: "+ coefficient+"x^" +poweer+"+"+ secondco+"x", 50,150);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px Arial";
    ctx.fillText("1]"+answer[0],50,200);
    ctx.fillText("2]"+answer[1],50,250);
    ctx.fillText("3]"+answer[2],50,300);
    ctx.fillText("4]"+answer[3],50,350);
    ctx.closePath();

    if(rightanswer==0)
    {
        if(aPressed==true)
        {
            lifes=5;
            score-=10;
            clearInterval(intervel);
            PlayerX=350;
            PlayerY=250;
            chances=0;
            intervel = setInterval(play,10);
           
        }
    }
    else if(rightanswer==1)
    {
        if(bPressed==true)
        {
            lifes=5;
            score-=10;
            clearInterval(intervel);
            PlayerX=350;
            PlayerY=250;
            chances=0;
            intervel = setInterval(play,10);
            
        }
    }
    else if(rightanswer==2)
    {
        if(cPressed==true)
        {
            lifes=5;
            score-=10;
            clearInterval(intervel);
            PlayerX=350;
            PlayerY=250;
            chances=0;
            intervel = setInterval(play,10);
           
        }
    }
    else if(rightanswer==3)
    {
        if(dPressed==true)
        {
            lifes=5;
            score-=10;
            clearInterval(intervel);
            PlayerX=350;
            PlayerY=250;
            chances=0;
            intervel = setInterval(play,10);
        }
    }
}