// création des variables
let onload ="document.write('chargement...')"
let background = document.querySelector(".background")
let stopDetection = ""
let minX = 0
let maxX = 1350
let press = false

// création des collisions
let obstacles =  [
  {ymin:0,ymax:200,xmin:0,sxmax:200}
]

// variables des personnages
let perso
let posY = 300
let posX = 600
let dir = 1
let mechant = ['images/julien.png','images/mauvais.gif','images/mauvais2.gif','images/mauvais3.gif']                   // mettre les url des images ......................................
let goods = ['images/bon.gif','images/francesca.png']
let fond = document.getElementById('fond')
let creatureG = document.createElement('div')
let creatureM = document.createElement('div')
creatureG.setAttribute('id','bon','class','images')
creatureM.setAttribute('id','mauvais','class','images')
creatureG.style.display = 'none'
creatureM.style.display = 'none'
document.querySelector(".jeuxX").appendChild(creatureG, creatureM)

let jouer = document.querySelector('.Jeu')
let opacite = jouer.style.opacity

// création du tableau des scores
let tableau = document.querySelector('table')
let timePassed = 0
let seconde = 0, minutes = 0
let score = 0
let utilisateur = window.prompt('choisissez votre pseudo')
let userName = document.createElement('td')
let tabScore = document.createElement('td')
let tempsScore = document.createElement('td')
tableau.style.display = 'none'
tabScore.setAttribute('id','info3')
userName.textContent= utilisateur
// fonction de défaite
let rouge = document.createElement('div')
let texte = document.createElement('h2')
rouge.appendChild(texte)
document.querySelector('.jeuxX').appendChild(rouge)
texte.textContent = 'Game over'
rouge.style.opacity = '0.6'
rouge.style.position = 'absolute'
rouge.style.left = '50%'
rouge.style.top = '50%'
rouge.style.background = 'red'
texte.style.fontFamily = 'Changa'
texte.style.textAlign = 'center'
rouge.style.display = 'none'
//fonction de victoire
let vert = document.createElement('div')
let texte2 = document.createElement('h2')
vert.appendChild(texte2)
document.querySelector('.jeuxX').appendChild(vert)
texte2.textContent = 'You win'
vert.style.opacity = '0.6'
vert.style.position = 'absolute'
vert.style.left = '50%'
vert.style.top = '50%'
vert.style.background = 'green'
texte2.style.fontFamily = 'Changa'
texte2.style.textAlign = 'center'
vert.style.display = 'none'
// création du personnage
function generatePerso(){
perso = document.getElementById("perso")
}
generatePerso()

countDown() //démarrage du conteur de temps
tableau.appendChild(userName)

// choix de l'image à éviter
function julien(){
  let mechantRandom = Math.floor(Math.random()*1000)
  if (mechantRandom <1) {
    creatureM.style.background = mechant[0]
  }
  let numRandom = Math.floor(Math.random()*(mechant.length - 1))
  creatureM.style.background = mechant[numRandom+1]
}

// choix de l'image à ramasser
function francesca(){
  let randomGoods = Math.floor(Math.random()*1000)
  if (randomGoods < 1) {
    creatureG.style.background = goods[1]
  }
  else {
    creatureG.style.background = goods[0]
  }
}

// création de l'effet fondu de disparition au clic du bouton "play"
jouer.addEventListener('click', function(){
  document.querySelector('.Jeu').style.display =  'none' // changement d'état
  document.querySelector(".jeuxX").style.display = "block"
  tableau.style.display = 'inline-block'
},false )

let deplacement = ()=> {

  window.addEventListener(
    "keypress",
    function(e){
      let stopDetection = 0;


      console.log(collaps())
      if (e.keyCode==100){
        if(collaps(posX+1, posY)){
          posX += 10
          perso.style.left = posX + "px"
          dir=1
          press = true
        }
      }
      else if (e.keyCode==97){
        console.log(dir)
        if(collaps(posX-1, posY)){
          posX -=10
          perso.style.left = posX + "px"
          dir=3
          press = true
        }
       }
       else if (e.keyCode == 119){
         if(collaps(posX, posY-1)){
           posY -=10
           perso.style.top = posY + "px"
           dir=0
           press = true
         }
       }
       else if (e.keyCode==115){
         if(collaps(posX, posY+1)){
           posY +=10
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

function afficheElements()                  //affichage des images à récupérer ou à éviter
{
  let elemX = Math.floor(Math.random()*fond.style.left - 150); // position de l'image
  let elemY = Math.floor(Math.random()*fond.style.top - 150);
  let elemType = Math.floor(Math.random()*2);                 // choix de quel type d'image afficher
  if (elemType == 0)
  {
    francesca()                           // appel de la fonction
    creatureG.style.left=elemX+"px"                 //positionnement de l'image
    creatureG.style.top=elemY+"px"
    creatureG.style.display = "block"
  }
  else
  {
    julien()
    creatureM.style.left=elemX+"px"
    creatureM.style.top=elemY+"px"
    creatureM.style.display = "block"
    creatureG.style.display = "none"          // suppreime l'image alliée, nécessite de la rapidité
  }
}

function collisions()                          // collision entre les personnages
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
    let francesca = 1
    $('#info1').text(nbBon);
    score = parseInt($('#info3').text())+5;
    $('#info3').text(score);
    $('#bon').css('display', 'none');
    youWin()
    }
    else
    {
    var nbMauvais = parseInt($('#info2').text())+1;
    let julien = 1
    $('#info2').text(nbMauvais);
    score = parseInt($('#info3').text())-5;
    $('#info3').text(score);
    $('#mauvais').css('display', 'none');
    gameOver()
    }
    tabScore.textContent = score
    tableau.appendChild(tabScore)
  }
}
setInterval(afficheElements, 2000); // temps entre deux images à afficher
setInterval(collisions, 500);       // interval de ragerd de collision

 // compteur de temps
function countDown() {
  setInterval(function()
  {
    timePassed++;
		if(timePassed == 0){
			seconde = 0
			minutes = 0
		}
    tempsScore.textContent = minutes+':'+seconde
    tableau.appendChild(tempsScore)

		seconde++;
		if(seconde == 60){
			seconde = 0
			minutes ++
		}
  },1000);
}


function gameOver(){
  if (nbMauvais == 3 || julien == 1 ) {
    setTimeOut(
      function  lose(){
        rouge.style.display = "inline-block"
        tableau.style.display = 'inline-block'
      },8000
    )
    rouge.style.display = 'none'
    document.querySelector('.Jeu').style.display =  'none' // changement d'état
    document.querySelector(".jeuxX").style.display = "block"
  }

}

function youWin(){
  if (tabScore == 25 || francesca == 1 || userName == 'OnEstDansLaMerde' ) {
    setTimeOut(
      function  win(){
        vert.style.display = "inline-block"
        tableau.style.display = 'inline-block'
      },8000
    )
    vert.style.display = 'none'
    document.querySelector('.Jeu').style.display =  'none' // changement d'état
    document.querySelector(".jeuxX").style.display = "block"
  }

}

