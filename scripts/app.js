// création des variables
let onload ="document.write('chargement...')"
let background = document.querySelector(".background")
let stopDetection = ""
let minX = 0
let maxX = 1350
let press = false
let j = 0

// création des collisions
let obstacles =  [
  {ymin:120, ymax: 190, xmin: 60, xmax:190},
  {ymin:170, ymax: 350, xmin: 550, xmax:670},
  {ymin:450, ymax: 550, xmin: 170, xmax:290},
  {ymin:70, ymax: 170, xmin: 910, xmax:1030},
  {ymin:10, ymax: 190, xmin: 1220, xmax:1360},
  {ymin:460, ymax: 600, xmin: 930, xmax:990},
  {ymin:450, ymax: 510, xmin: 990, xmax:1140},
  {ymin:510, ymax: 600, xmin: 1080, xmax:1150},
  {ymin:-70, ymax: 670, xmin: -60, xmax:40},
  {ymin:660, ymax: 670, xmin: 40, xmax:1450},
  {ymin:-120, ymax: -40, xmin: 30, xmax:1450},
  {ymin:-120, ymax: -40, xmin: -70, xmax:40},
  {ymin:-70, ymax: 661, xmin: 1380, xmax:1450}
]

// variables des personnages

let fond = document.querySelectorAll('.fond')
let perso
let posY = 300
let posX = 600
let dir = 1
let mechant = ['images/julien.png','images/mauvais.gif','images/mauvais2.gif','images/mauvais3.gif']                   // mettre les url des images ......................................
let goods = ['images/bon.gif','images/francesca.png']
let creatureG = document.createElement('div')
let creatureM = document.createElement('div')
creatureG.setAttribute('id','bon','class','images')
creatureM.setAttribute('id','mauvais','class','images')
creatureG.style.display = 'none'
creatureM.style.display = 'none'
document.querySelector(".jeuxX").appendChild(creatureG, creatureM)

let jouer = document.querySelector('.Jeu')

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

function choixCarte(){
  let map = fond[j]
}
//MAP 2
function map(){
  choixCarte()
  generatePerso()
  youWin()
  countDown()//démarrage du conteur de temps
  deplacement()
  afficheElements()
  setInterval(afficheElements,3000)
  setInterval(collisions,500)           // interval de regard de collision
}
map()

function map2(){
  choixCarte()
  generatePerso()
  youWin()
  countDown()
  deplacement()
  afficheElements()
  setInterval(afficheElements,3000)
  setInterval(collisions,500)
}

function map3(){
  choixCarte()
  generatePerso()
  youWin()
  countDown()
  deplacement()
  afficheElements()
  setInterval(afficheElements,3000)
  setInterval(collisions,500)
}




// création du personnage
function generatePerso(){
perso = document.getElementById("perso")
}

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

function deplacement(){

  window.addEventListener(
    "keypress",
    function(e){
      let stopDetection = 0;

      if (e.keyCode==100){
        if(collaps(posX+30, posY)){
          posX += 10
          perso.style.left = posX + "px"
          dir=1
          press = true
        }
      }
      else if (e.keyCode==97){
        if(collaps(posX-30, posY)){
          posX -=10
          perso.style.left = posX + "px"
          dir=3
          press = true
        }
       }
       else if (e.keyCode == 119){
         if(collaps(posX, posY-30)){
           posY -10
           perso.style.top = posY + "px"
           dir=0
           press = true
         }
       }
       else if (e.keyCode==115){
         if(collaps(posX, posY+30)){
           posY +=10
           perso.style.top = posY + "px"
           dir = 2
           press = true
         }
       }
  })
}

// collision avec les objets
function collaps(posX, posY) {
  for (let i = 0; i < obstacles.length; i++) {
    if ((posX > obstacles[j][i].xmin && posX < obstacles[j][i].xmax)  && (posY > obstacles[j][i].ymin && posY < obstacle[j][i].ymax)){
      return 0;
    }
  }
  return 1;
}

function afficheElements()                  //affichage des images à récupérer ou à éviter
{
  let elemX = Math.floor(Math.random()* 850); // position de l'image
  let elemY = Math.floor(Math.random()* 450);
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
      // interval de ragerd de collision

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
  if (tabScore == 25 || francesca == 1 || utilisateur == 'OnEstDansLaMerde') {
    setTimeOut(
      function  win(){
        vert.style.display = "inline-block"
        tableau.style.display = 'inline-block'
      },8000
    )
    vert.style.display = 'none'
    document.querySelector('.Jeu').style.display =  'none' // changement d'état
    document.querySelector(".jeuxX").style.display = "block"
    j++
    if (j == 1) {
      map2()
    }
    else if (j == 2 ) {
      map3()
    }
  }
}
