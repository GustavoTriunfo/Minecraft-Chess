// Obtenha todas as divs com a classe .modal-item
const modalItems = document.querySelectorAll('.modal-item');
const buttonSound = "sounds Minecraft/ButtonSound.mp3"
let biome = localStorage.getItem("minecraftBiome")

// Adicione um ouvinte de eventos de clique a cada div
modalItems.forEach((modalItem, index) => {
    modalItem.addEventListener('click', () => {
        // Execute diferentes métodos com base no índice (começando em 0)
        switch (index) {
            case 0:
                // Precisei fazer a ordem do playerGo ao contrário nesse caso, porque a tela já teria sido atualizada, e essa variavel playerGo iria colocar um comportamento errado na peça
                
                tocarEfeitoSonoro(buttonSound)
                if(playerGo === "white"){
                    if(biome === "nether"){
                        evolvePawn(blackRookNether,peaoASerPromovido);
                    }else{
                    evolvePawn(blackRook,peaoASerPromovido);
                    }
                }else{
                    evolvePawn(whiteRook,peaoASerPromovido);
                }
                break;
            case 1:
                // Chame o método com o segundo parâmetro
                tocarEfeitoSonoro(buttonSound)
                if(playerGo === "white"){
                    if(biome === "nether"){
                        evolvePawn(blackKnightNether,peaoASerPromovido);
                    }else{
                    evolvePawn(blackKnight,peaoASerPromovido);
                    }
                }else{
                        evolvePawn(whiteKnight, peaoASerPromovido);
                    }
               
                break;
            case 2:
                // Chame o método com o terceiro parâmetro
                tocarEfeitoSonoro(buttonSound)
                if(playerGo === "white"){
                    if(biome === "nether"){
                        evolvePawn(blackBishopNether,peaoASerPromovido);
                    }else{
                    evolvePawn(blackBishop,peaoASerPromovido);
                    }
                }else{
                       
                        evolvePawn(whiteBishop, peaoASerPromovido);
                    }
               
               
                break;
            case 3:
                // Chame o método com o quarto parâmetro
                tocarEfeitoSonoro(buttonSound)
                if(playerGo === "white"){
                    if(biome === "nether"){
                        evolvePawn(blackQueenNether,peaoASerPromovido);
                    }else{
                    evolvePawn(blackQueen,peaoASerPromovido);
                    }
                }else{
                        evolvePawn(whiteQueen, peaoASerPromovido);
                     
                    }
               
             
                break;
            default:
                // Lida com outros casos, se necessário
        }
    });
});

// Métodos que você deseja chamar com parâmetros diferentes
function evolvePawn(tipoEvolucao, peaoASerPromovido) {
    let selector = `[square-id="${peaoASerPromovido}"]`;
    const square = document.querySelector(selector)
    if (square) {
        // Atualize o conteúdo da div com o tipo de evolução
        square.innerHTML = tipoEvolucao;
        square.firstChild?.setAttribute('draggable', true)
        square.setAttribute('square-id', peaoASerPromovido)
        if(playerGo === "white"){
            square.firstChild.firstChild.classList.add('black')
       
        }else{
            square.firstChild.firstChild.classList.add('white')
        }
        trocarJogador = true
        hideInventory()
      } else {
        console.error(`Div não encontrada para square-id ${peaoASerPromovido}`);
      }
    
}

// Função para mostrar a estrutura HTML
function showInventory() {
    const overlay = document.querySelector('.overlay');
    const modalContainer = document.querySelector('.modal-container');
    overlay.classList.remove('hidden');
    modalContainer.classList.remove('hidden');
}

// Função para ocultar a estrutura HTML
function hideInventory() {
    const overlay = document.querySelector('.overlay');
    const modalContainer = document.querySelector('.modal-container');
    overlay.classList.add('hidden');
    modalContainer.classList.add('hidden');
}
hideInventory()


function alterarIconesInventario(){
// Itera sobre os elementos e adiciona classes específicas com base na cor do jogador
if (playerGo === "white") {

modalItems.forEach((item, index) => {
    
        //item.classList.add('item-white');
        if(index === 0)
        item.style.backgroundImage = "url('images/pieces/sheepTower.png')";
        else if(index === 1)
        item.style.backgroundImage = "url('images/pieces/cowKnight.png')";
        else if(index === 2)
        item.style.backgroundImage = "url('images/pieces/wolfBishop.png')";
        else if(index === 3)
        item.style.backgroundImage = "url('images/pieces/alexQueen.jpg')";
    
});
}else {
    if(biome === "nether"){
    modalItems.forEach((item, index) => {
    if(index === 0)
    item.style.backgroundImage = `url('images/pieces/ghastRook.png')`;
    else if(index === 1)
    item.style.backgroundImage = `url('images/pieces/blazeKnight.png')`;
    else if(index === 2)
    item.style.backgroundImage = `url('images/pieces/witherSkeletonBishop.png')`;
    else if(index === 3)
    item.style.backgroundImage = `url('images/pieces/witherQueen.png')`;
});
    }else{
        modalItems.forEach((item, index) => {
            if(index === 0)
            item.style.backgroundImage = `url('images/pieces/endermanTower.jpg')`;
            else if(index === 1)
            item.style.backgroundImage = `url('images/pieces/creeperKnight.jpg')`;
            else if(index === 2)
            item.style.backgroundImage = `url('images/pieces/skeletonBishop.png')`;
            else if(index === 3)
            item.style.backgroundImage = `url('images/pieces/dragonQueen.png')`;
});
    }
}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

