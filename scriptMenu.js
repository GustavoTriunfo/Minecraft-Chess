let minecraftSongs = false;
let minecraftSoundEffects = false;
let minecraftBiome = "plains"

// Obtenha todos os elementos com a classe 'mc-button'
const buttons = document.querySelectorAll('.mc-button');
const buttonSoundEffect = "sounds Minecraft/ButtonSound.mp3"
const imageContainer = document.getElementById("image-container");
const optionsButton = document.getElementById("options-button");
const optionsMenu = document.getElementById("options-menu");
const songsButton = document.getElementById('minecraftSongs');
const soundEffectsButton = document.getElementById('minecraftSoundEffects');
const biomeButton = document.getElementById('minecraftBiome');
// Variáveis booleanas iniciais


// Função para atualizar o estado das variáveis e aplicar a lógica desejada
function toggleBoolean(variable) {
  return !variable;
}


// Adicione um ouvinte de eventos a cada botão
buttons.forEach((button) => {
    button.addEventListener('click', function () {
      // Obtenha o texto do título do botão clicado
      const title = button.querySelector('.title').textContent;
  
      // Redirecione o usuário com base no texto do título
      if (title === 'Singleplayer') {
       
          window.location.href = 'gameForTwoLocalPlayers.html';
      } else if (title === 'Multiplayer') {
        
        window.location.href = 'gameForTwoLocalPlayers.html';
      } else if (title === 'Minecraft Realms') {
          
        
      } else if (title === 'Options') {
         
       
      } else if (title === 'Quit Game') {
         
       
      }
      
    });
  });



function tocarEfeitoBotao(caminhoDaMusica) {
    const audio = new Audio(caminhoDaMusica);
    audio.play();
}



// Adicione um evento de clique ao botão "Options"
optionsButton.addEventListener("click", function() {
  // Alterne a visibilidade do menu lateral
  if (optionsMenu.style.display === "none" || optionsMenu.style.display === "") {
    tocarEfeitoBotao(buttonSoundEffect)
    optionsMenu.style.display = "block";
  } else {
    tocarEfeitoBotao(buttonSoundEffect)
    optionsMenu.style.display = "none";
  }
});

// Selecione os botões "Minecraft songs" e "Minecraft sound effects"


// Adicione eventos de clique aos botões
songsButton.addEventListener("click", function() {
    minecraftSongs = toggleBoolean(minecraftSongs);
    localStorage.setItem("minecraftSongs", minecraftSongs);

    tocarEfeitoBotao(buttonSoundEffect)
    let musicImage = document.getElementById("music-image");
    if (minecraftSongs) {
        // Mostrar a div da imagem
        musicImage.src = "images/songTrue.png"
        imageContainer.style.display = "block";
        
       
        setTimeout(function() {
          imageContainer.style.display = "none";
        }, 3000); // Altere esse valor para o tempo desejado
      }else{
        musicImage.src = "images/songFalse.png"
        imageContainer.style.display = "block";

        setTimeout(function() {
            imageContainer.style.display = "none";
          }, 3000); // Altere esse valor para o tempo desejado
      }
  // Adicione aqui qualquer lógica adicional que você deseja, com base no estado da variável
});

soundEffectsButton.addEventListener("click", function() {
  minecraftSoundEffects = toggleBoolean(minecraftSoundEffects);
  localStorage.setItem("minecraftSoundEffects", minecraftSoundEffects);
  tocarEfeitoBotao(buttonSoundEffect)

  let musicImage = document.getElementById("music-image");
    if (minecraftSoundEffects) {
        // Mostrar a div da imagem
        musicImage.src = "images/minecraftsoundeffecticon.webp"
        imageContainer.style.display = "block";
        
       
        setTimeout(function() {
          imageContainer.style.display = "none";
        }, 3000); // Altere esse valor para o tempo desejado
      }else{
        musicImage.src = "images/soundEffectChess.png"
        imageContainer.style.display = "block";

        setTimeout(function() {
            imageContainer.style.display = "none";
          }, 3000); // Altere esse valor para o tempo desejado
      }
  // Adicione aqui qualquer lógica adicional que você deseja, com base no estado da variável
});

biomeButton.addEventListener("click", function() {

  tocarEfeitoBotao(buttonSoundEffect)

  let musicImage = document.getElementById("music-image");
    if (minecraftBiome === "plains") {
        minecraftBiome = "nether"
        musicImage.src = "images/nether.png"
        imageContainer.style.display = "block";
        
       
        setTimeout(function() {
          imageContainer.style.display = "none";
        }, 3000); // Altere esse valor para o tempo desejado
      }else{
        musicImage.src = "images/plains.gif"
        imageContainer.style.display = "block";
        minecraftBiome = "plains"
        setTimeout(function() {
            imageContainer.style.display = "none";
          }, 3000); // Altere esse valor para o tempo desejado
      }
      localStorage.setItem("minecraftBiome", minecraftBiome);

});
