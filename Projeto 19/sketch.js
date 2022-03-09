var peixeImg, peixe;
var pedraImg, grupoDePedra, pedra;
var planoDoMarImg, planoDoMar;
var pontuacao = 0;
var estadoJogo = "JOGAR"
var minhoca, minhocaImg, grupoDeMinhoca;
var alimentos = 0;


function preload(){
  planoDoMarImg = loadImage("Images/planodomar.png");
  peixeImg = loadImage("Images/fish.png");
  pedraImg = loadImage("Images/rock.png");
  minhocaImg = loadImage("Images/minhoca.png");
}

function setup() {
  createCanvas(600,400);
  
  planoDoMar = createSprite(200,200);
  planoDoMar.addImage(planoDoMarImg);
  planoDoMar.velocityX = 3;
  planoDoMar.scale = 0.4;
  
  peixe = createSprite(150,200,40,40);
  peixe.addImage(peixeImg);
  peixe.scale = 0.1;
  
  peixe.setCollider("circle",0,0);
  peixe.debug = true;
  
  grupoDePedra = new Group();
  grupoDeMinhoca = new Group();
}

function draw() {
  background(0);
  stroke("red");
  fill("red");
  textSize(20);
  text("Pontuação: "+ pontuacao, 400,20);
  text("Alimentos: "+ alimentos, 400,40);

  if(estadoJogo === "JOGAR") {
  
  pontuacao = pontuacao + Math.round(frameRate()/190);

  if(keyDown("up_arrow")){
    peixe.y = peixe.y -3;
  }

  if(keyDown("down_arrow")){
    peixe.y = peixe.y +3;
  }
  
   if(keyDown("left_arrow")){
    peixe.x = peixe.x -3;
  }
  
  if(keyDown("right_arrow")){
    peixe.x = peixe.x +3;
  }
  
  if(planoDoMar.x > 600){
     planoDoMar.x = 200
  }
  
  edges = createEdgeSprites();
  peixe.collide(edges);
     
  gerarPedras();  
  gerarMinhocas();

  if(grupoDeMinhoca.isTouching(minhoca)){
    alimentos = alimentos +1;
    alimentos.destroy();
  }
  
  if(grupoDePedra.isTouching(peixe)||peixe.x > 600){
    peixe.destroy();
    grupoDePedra.destroyEach();
    estadoJogo = "ENCERRAR";
  }

   drawSprites();  
     
  }
  
  
  if(estadoJogo === "ENCERRAR"){
    stroke("red");
    fill("red");
    textSize(30);
    text("Game Over" ,200,200);
 }
  
 }

function gerarPedras() {
  if(frameCount % 40 === 0){
  
    pedra = createSprite(600,200,30,30);
    
    pedra.y = Math.round(random(50,380));
    
    pedra.addImage(pedraImg);
    
    pedra.velocityX = -6;
    pedra.scale = 0.08;
    
    peixe.depth = pedra.depth;
    peixe.depth = peixe.depth+1;
    
    pedra.lifetime = 700;
    grupoDePedra.add(pedra);
}
}

function gerarMinhocas() {
  if(frameCount % 150 === 0){

      minhoca = createSprite(300,0,30,30);

      minhoca.x = Math.round(random(10,350));

      minhoca.addImage(minhocaImg);

      minhoca.velocityY = 2;
      minhoca.scale = 0.07;

      minhoca.depth = minhoca.depth;
      minhoca.depth = minhoca.depth+1;

      minhoca.lifetime = 500;
      grupoDeMinhoca.add(minhoca);
  }
}