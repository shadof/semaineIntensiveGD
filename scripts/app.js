let onload ="document.write('chargement...')"
let background = document.querySelector(".background")
let stopDetection = ""
let minX = 0
let maxX = 1350
let obstacles =  [
  {ymin:0, ymax: 200, xmin: 0, xmax: 200}, //chaises grise en haut
]


let posY = 300
let posX =1100
let dir=0
let press = false
let mauvais =document.querySelector("#mauvais")
let bon =document.querySelector("#bon")
function generatePerso(){
perso = document.getElementById("perso")

}
generatePerso()
if (dir == 0) {
perso.style.imageOrientation="flip"
}

let jouer = document.querySelector('h2')
jouer.addEventListener('click', function(){
  document.querySelector('.Jeu').style.display =  'none'
  document.querySelector(".jeuxX").style.display = "block"
},false )



let deplacement = ()=> {

  window.addEventListener(
    "keypress",
    function(e){
      let stopDetection = 0;
      console.log(e.keyCode)

      console.log(collaps())
      if (e.keyCode==100){
        console.log(dir)
        if(collaps(posX+30, posY)){
          posX += 30
          perso.style.left = posX + "px"
          dir=1
          press = true
        }
      }
      else if (e.keyCode==97){
        console.log(dir)
        if(collaps(posX-30, posY)){
          posX -=30
          perso.style.left = posX + "px"
          dir=3
          press = true
        }
       }
       else if (e.keyCode == 119){
         if(collaps(posX, posY-30)){
           posY -=30
           perso.style.top = posY + "px"
           dir=0
           press = true
         }
       }
       else if (e.keyCode==115){
         if(collaps(posX, posY+30)){
           posY +=30
           perso.style.top = posY + "px"
           dir = 2
           press = true
         }
       }
  })

}
deplacement();
function collaps(posX, posY) {
  for (let i = 0; i < obstacles.length; i++) {
    if ((posX > obstacles[i].xmin && posX < obstacles[i].xmax)  && (posY > obstacles[i].ymin && posY < obstacles[i].ymax)){
      return 0;
    }
  }
  return 1;
}





function afficheElements()
{
stopDetection = 0;
let elemX = Math.floor(Math.random()*1350 );
let elemY = Math.floor(Math.random()*650);
let elemType = Math.floor(Math.random()*2);
if (elemType == 0)
{

  bon.style.left=elemX+"px"
  bon.style.top=elemY+"px"
  bon.style.display = "block"

  console.log(elemX,elemY)
}
else
 {

  mauvais.style.left=elemX+"px"
  mauvais.style.top=elemY+"px"
  mauvais.style.display = "block"
  bon.style.display = "none"
    console.log(elemX,elemY)
}
}

function collisions()
 {
   posX = parseInt($('#perso').css('left'));
   posY = parseInt($('#perso').css('top'));
   if ($('#bon').css('display') == 'none')
   {
     elemType = 'mauvais';
     elemX = parseInt($('#mauvais').css('left'));
     elemY = parseInt($('#mauvais').css('top'));
   }
   else
   {
     elemType = 'bon';
     elemX = parseInt($('#bon').css('left'));
     elemY = parseInt($('#bon').css('top'));
   }
   if ((elemX>posX-20) && (elemX<(posX+125-50+20)) && (elemY>posY-20) && (elemY<(posY+177-116+20)) && (stopDetection == 0))
   {
     stopDetection = 1;
     if (elemType=='bon')
     {
       var nbBon = parseInt($('#info1').text())+1;
       $('#info1').text(nbBon);
       var score = parseInt($('#info3').text())+5;
       $('#info3').text(score);
       $('#bon').css('display', 'none');
     }
     else
     {
       let nbMauvais = parseInt($('#info2').text())+1;
       $('#info2').text(nbMauvais);
       let score = parseInt($('#info3').text())-5;
       $('#info3').text(score);
       $('#mauvais').css('display', 'none');
     }
   }
 }


 setInterval(afficheElements, 5000);
 setInterval(collisions, 500);
