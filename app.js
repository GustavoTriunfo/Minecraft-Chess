
// Obtém a div do tabuleiro
let minecraftSongsPlay = localStorage.getItem("minecraftSongs")
let minecraftSoundEffectsPlay = localStorage.getItem("minecraftSoundEffects")
let boardBiome = localStorage.getItem("minecraftBiome")

const chessboard = document.querySelector('.chessboard');
let playerGo = 'white'
const width = 8
let idEnPassant = 0
let musicaFundo = false
let peaoASerPromovido = 0

const soundPieceMove = "sounds Chess/PieceMoveSound.mp3"
const soundPieceCaptured = "sounds Chess/PieceCapturedSound.mp3"
const soundPieceCastling = "sounds Chess/castlingMove.mp3"

const promotionRowBlack = [0,1,2,3,4,5,6,7,]
const promotionRowWhite = [56, 57, 58, 59, 60, 61, 62, 63]

let whiteKingRoqueAllowed = true
let whiteRightRookRoqueAllowed = true
let whiteLeftRookRoqueAllowed = true

let blackKingRoqueAllowed = true
let blackRightRookRoqueAllowed = true
let blackLeftRookRoqueAllowed = true

 const startPieces = [
    blackRook, blackKnight, blackBishop, blackQueen, blackKing, blackBishop, blackKnight, blackRook,
    blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn,
    whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, whiteBishop, whiteKnight, whiteRook

 ]

 const startPiecesNether = [
    blackRookNether, blackKnightNether, blackBishopNether, blackQueenNether, blackKing, blackBishopNether, blackKnightNether, blackRookNether,
    blackPawnNether, blackPawnNether, blackPawnNether, blackPawnNether, blackPawnNether, blackPawnNether, blackPawnNether, blackPawnNether,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn,
    whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, whiteBishop, whiteKnight, whiteRook

 ]

 function createBoard() {
    if(boardBiome === "plains"){
    startPieces.forEach((startPiece, i) => {
     const square = document.createElement('div')
     square.classList.add('square')
     square.innerHTML = startPiece
     square.firstChild?.setAttribute('draggable', true)
     square.setAttribute('square-id', i)
     const row = Math.floor((63 - i) / 8) + 1
     if (row % 2 === 0){
        square.classList.add(i % 2  === 0 ? "square-light" : "square-dark")
     } else{
        square.classList.add(i % 2  === 0 ? "square-dark" : "square-light")
     }
     if (i <= 15){
        square.firstChild.firstChild.classList.add('black')
     }

     if(i >= 48){
        square.firstChild.firstChild.classList.add('white')
     }
     chessboard.append(square)
    })
}else{
    startPiecesNether.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        square.firstChild?.setAttribute('draggable', true)
        square.setAttribute('square-id', i)
        const row = Math.floor((63 - i) / 8) + 1
        if (row % 2 === 0){
           square.classList.add(i % 2  === 0 ? "square-light-nether" : "square-dark-nether")
        } else{
           square.classList.add(i % 2  === 0 ? "square-dark-nether" : "square-light-nether")
        }
   
        if (i <= 15){
           square.firstChild.firstChild.classList.add('black')
        }
   
        if(i >= 48){
           square.firstChild.firstChild.classList.add('white')
        }
   
        chessboard.append(square)
       })
}
 }

 const caminhoDaMinhaMusica = 'songs/Minecraft - Volume Alpha ( 30 Minute HD Playlist ).mp3'; // Substitua pelo caminho do seu arquivo de música


 createBoard()
 
 function alternatePlayerView() {
    // Obtém todos os quadrados do tabuleiro
    const allSquares = document.querySelectorAll(".square");

    // Cria uma cópia dos quadrados na ordem inversa
    const reversedSquares = Array.from(allSquares).reverse();

    // Limpa o tabuleiro atual
    chessboard.innerHTML = "";

    // Redesenha o tabuleiro com a nova configuração (ordem reversa)
    if(playerGo === "black"){
        reversedSquares.forEach((square, i) => {
            square.setAttribute('square-id', i);
            const row = Math.floor((63 - i) / 8) + 1;
    
            if (row % 2 === 0) {
                square.classList.remove("square-light", "square-dark");
                square.classList.add(i % 2 === 0 ? "square-light" : "square-dark");
            } else {
                square.classList.remove("square-light", "square-dark");
                square.classList.add(i % 2 === 0 ? "square-dark" : "square-light");
            }
    
    
            chessboard.append(square);
        });
    }

    else if(playerGo === "white"){
        reversedSquares.forEach((square, i) => {
            const reversedIndex = reversedSquares.length - 1 - i; // Inverte a ordem dos índices
            square.setAttribute('square-id', reversedIndex);
            const row = Math.floor((63 - i) / 8) + 1;
    
            if (row % 2 === 0) {
                square.classList.remove("square-light", "square-dark");
                square.classList.add(i % 2 === 0 ? "square-light" : "square-dark");
            } else {
                square.classList.remove("square-light", "square-dark");
                square.classList.add(i % 2 === 0 ? "square-dark" : "square-light");
            }
    
    
            chessboard.append(square);
        });
    }
    
}

 const allSquares = document.querySelectorAll(".chessboard .square")

 allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
 })

 let startPositionId 
 let draggedElement

 function dragStart(e){
  startPositionId = e.target.parentNode.getAttribute('square-id')
  draggedElement = e.target
 }

 function dragOver(e){
    e.preventDefault()
 }

 function dragDrop(e){
    e.stopPropagation()
    const correctGo =  draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const valid = checkIfValid(e.target)
    const opponentGo = playerGo === 'white' ? 'black' : 'white'
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

    if (correctGo){
        if (takenByOpponent && valid){
            //const capturedPiece = e.target.firstChild; 
           
             e.target.parentNode.append(draggedElement)
             e.target.remove()
             teste = e.target.parentNode
            somDeath = e.target
            // tocarEfeitoSonoroMinecraft(draggedElement)
             checkForWin()
             tocarEfeitoSonoro(soundPieceCaptured)
             //tocarEfeitoDeath(e.target)
             changePlayer()
             return
        }

        if (taken && !takenByOpponent){
            return
        }

        if (valid){
            e.target.append(draggedElement)
            checkForWin()
            changePlayer()
            
            if(musicaFundo === false  && minecraftSongsPlay === "true"){
            tocarMusicaEmLoop(caminhoDaMinhaMusica);
            musicaFundo = true
            }
            if(minecraftSoundEffectsPlay === "true"){
            tocarEfeitoSonoroMinecraft(draggedElement)
            }else{
            tocarEfeitoSonoro(soundPieceMove)
            }
            return
        }
    }

  

 }

 function changePlayer(){
    if(playerGo === "black"){
      
        alternatePlayerView()
        playerGo = "white"
    }else{
       
        alternatePlayerView()
        playerGo = "black"
    }
 }


 function checkIfValid(target){
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const piece = draggedElement.id

    let selectorIDPiece = `[square-id="${startId}"]`;
    let idPieceToClass = document.querySelector(selectorIDPiece)

    switch(piece){
        case 'pawn': 
            const starterRowBlack = [8,9,10,11,12,13,14,15,]
            const starterRowWhite = [48, 49, 50, 51, 52, 53, 54, 55]
        
            if (starterRowBlack.includes(startId) && startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild || 
            starterRowWhite.includes(startId) && startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild ||
            startId - width === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && playerGo == "white" ||
            startId + width === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && playerGo == "black" ||

            startId - width - 1 === targetId && document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && idPieceToClass.firstChild.firstChild.classList.contains("white") ||
            startId - width + 1 === targetId && document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && idPieceToClass.firstChild.firstChild.classList.contains("white") ||
            startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && idPieceToClass.firstChild.firstChild.classList.contains("black") ||
            startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && idPieceToClass.firstChild.firstChild.classList.contains("black") ||
            startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`) && verificarEnPassant(targetId) === true || 
            startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`) && verificarEnPassant(targetId) === true ||
            startId - width - 1 === targetId && document.querySelector(`[square-id="${startId - width - 1}"]`) && verificarEnPassant(targetId) === true || 
            startId - width + 1 === targetId && document.querySelector(`[square-id="${startId - width + 1}"]`) && verificarEnPassant(targetId) === true ){
             
                if (starterRowBlack.includes(startId) && startId + width * 2 === targetId || 
                starterRowWhite.includes(startId) && startId - width * 2 === targetId){
                    idEnPassant = targetId;
                    console.log(idEnPassant)
                }else{
                    idEnPassant = 0
                }

                verificarPromocao(targetId)

                return true
            }
            break;
            case 'knight':
                if(startId + width * 2 - 1 === targetId ||
                    startId + width * 2 + 1 === targetId ||
                    startId + width -2 === targetId ||
                    startId + width +2 === targetId ||
                    startId - width * 2 - 1 === targetId ||
                    startId - width * 2 + 1 === targetId ||
                    startId - width -2 === targetId ||
                    startId - width +2 === targetId){
                        return true
                }
                break;
            case 'bishop':
                if(startId + width + 1 === targetId ||
                    startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                    startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild ||
                    startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
                    startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
                    startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
                    startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstChild ||
                    //---
                    startId - width - 1 === targetId ||
                    startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
                    startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild ||
                    startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild ||
                    startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild ||
                    startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild ||
                    startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstChild ||
                      //---
                      startId - width + 1 === targetId ||
                      startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
                      startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild ||
                      startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild ||
                      startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild ||
                      startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild ||
                      startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`).firstChild || 
                      //---
                      startId + width - 1 === targetId ||
                      startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                      startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild ||
                      startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild ||
                      startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild ||
                      startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild ||
                      startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`).firstChild 
                      ){
                        return true
                }
                break;
            case 'rook':
                if(startId + width === targetId ||
                    startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                    startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild ||
                    startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild ||
                    startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild ||
                    startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild ||
                    startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild ||
                    //--
                    startId - width === targetId ||
                    startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                    startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild ||
                    startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild ||
                    startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild ||
                    startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild ||
                    startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild ||
                    //--
                    startId + 1 === targetId ||
                    startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                    startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                    startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                    startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                    startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                    startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
                    
                    //--
                    startId - 1 === targetId ||
                    startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                    startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                    startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                    startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                    startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                    startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild 
                    ){

                        if(whiteRightRookRoqueAllowed === true && startId === 63){
                            whiteRightRookRoqueAllowed = false
                        }
                        if(whiteLeftRookRoqueAllowed === true && startId === 56){
                            whiteLeftRookRoqueAllowed = false
                        }

                        if(blackRightRookRoqueAllowed === true && startId === 0){
                            blackRightRookRoqueAllowed = false
                        }
                        if(blackLeftRookRoqueAllowed === true && startId === 7){
                            blackLeftRookRoqueAllowed = false
                        }
                    return true
                }
                break;
                case 'queen':
                    if(startId + width + 1 === targetId ||
                        startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                        startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild ||
                        startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild ||
                        startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild ||
                        startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild ||
                        startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 + 6}"]`).firstChild ||
                        //---
                        startId - width - 1 === targetId ||
                        startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
                        startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild ||
                        startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild ||
                        startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild ||
                        startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild ||
                        startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 - 6}"]`).firstChild ||
                          //---
                          startId - width + 1 === targetId ||
                          startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
                          startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild ||
                          startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild ||
                          startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild ||
                          startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild ||
                          startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6 + 6}"]`).firstChild || 
                          //---
                          startId + width - 1 === targetId ||
                          startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                          startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild ||
                          startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild ||
                          startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild ||
                          startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild ||
                          startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6 - 6}"]`).firstChild ||
                          
                          startId + width === targetId ||
                    startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                    startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild ||
                    startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild ||
                    startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild ||
                    startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild ||
                    startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild ||
                    //--
                    startId - width === targetId ||
                    startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                    startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild ||
                    startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild ||
                    startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild ||
                    startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild ||
                    startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild ||
                    //--
                    startId + 1 === targetId ||
                    startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                    startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                    startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                    startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                    startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                    startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
                    
                    //--
                    startId - 1 === targetId ||
                    startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                    startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                    startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                    startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                    startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                    startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild 
                          ){
                            return true
                          }
                          break;
                case 'king':
                    if(startId + 1 === targetId ||
                       startId - 1 === targetId ||
                       startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && smallRoqueWhite(startId) && startId === 60 ||
                       startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && smallRoqueBlack(startId) && startId === 4 ||
                       startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && bigRoqueWhite(startId) && startId === 60 ||
                       startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && bigRoqueBlack(startId) && startId === 4 ||
                       startId + width === targetId ||
                       startId - width === targetId ||
                       startId + width - 1 === targetId ||
                       startId + width + 1 === targetId ||
                       startId - width - 1 === targetId ||
                       startId - width + 1 === targetId 
                    ){
                        if(whiteKingRoqueAllowed === true && startId === 60){
                            whiteKingRoqueAllowed = false
                        }
                        if(blackKingRoqueAllowed === true && startId === 4){
                            blackKingRoqueAllowed = false
                        }
                        return true
                    }
                    break;
    }
 }

 function verificarEnPassant(targetMove){
    let selector = `[square-id="${idEnPassant}"]`;
    const idEnPassantPiece = document.querySelector(selector)
  if(idEnPassant - width === targetMove && idEnPassantPiece.firstChild.firstChild.classList.contains("black")){
    idEnPassantPiece.firstChild.firstChild.remove()
    tocarEfeitoSonoro(soundPieceCaptured)
    return true
  }
  else if(idEnPassant + width === targetMove && idEnPassantPiece.firstChild.firstChild.classList.contains("white")){
    idEnPassantPiece.firstChild.firstChild.remove()
    tocarEfeitoSonoro(soundPieceCaptured)
    return true
  }
    return false;
 }

 function tocarEfeitoSonoroMinecraft(movedPiece) {
    const audioElement = movedPiece.querySelector('audio'); // Substitua 'audio' pela seleção correta
    if (audioElement) {
      audioElement.play();
    }
  }

  function tocarEfeitoDeath(deathPiece) {
    const audioDeath = deathPiece.querySelector('.audio-death'); // Substitua 'audio' pela seleção correta
    alert(audioDeath)
    if (audioDeath) {
    alert("entrou")
        audioDeath.play();
    }
  }

  function tocarEfeitoSonoro(caminhoDaMusica) {
    const audio = new Audio(caminhoDaMusica);
    audio.play();
}

  function tocarMusicaEmLoop(caminhoDaMusica) {
    const audio = new Audio(caminhoDaMusica);
    audio.loop = true;
    audio.volume = 0.2;
    audio.play();
}

function smallRoqueWhite(startIdPiece){
    if(whiteKingRoqueAllowed && whiteRightRookRoqueAllowed && startIdPiece === 60){
        const origemTorre = getSquare("63");
        const destinoTorre = getSquare("61");
        tocarEfeitoSonoro(soundPieceCastling)
        movePiece(origemTorre, destinoTorre);
        return true
    }else{
        return false
    }
    
}

function smallRoqueBlack(startIdPiece){
    if(blackKingRoqueAllowed && blackRightRookRoqueAllowed && startIdPiece === 4){
        const origemTorre = getSquare("7");
        const destinoTorre = getSquare("5");
        tocarEfeitoSonoro(soundPieceCastling)
        movePiece(origemTorre, destinoTorre);
        return true
    }else{
        return false
    }
    
}

function bigRoqueWhite(startIdPiece){
    if(whiteKingRoqueAllowed && whiteLeftRookRoqueAllowed && startIdPiece === 60){
        const origemTorre = getSquare("56");
        const destinoTorre = getSquare("59");
        tocarEfeitoSonoro(soundPieceCastling)
        movePiece(origemTorre, destinoTorre);
        return true
    }else{
        return false
    }
}

function bigRoqueBlack(startIdPiece){
    if(blackKingRoqueAllowed && blackLeftRookRoqueAllowed && startIdPiece === 4){
        const origemTorre = getSquare("0");
        const destinoTorre = getSquare("3");
        tocarEfeitoSonoro(soundPieceCastling)
        movePiece(origemTorre, destinoTorre);
        return true
    }else{
        return false
    }
}

// Função auxiliar para obter o elemento de quadrado com base no square-id
function getSquare(squareId) {
    return document.querySelector(`[square-id="${squareId}"]`);
}

function movePiece(origem, destino) {
    destino.innerHTML = origem.innerHTML;
    origem.innerHTML = "";
    // Você também deve atualizar o estado do tabuleiro e verificar se há captura de peças, etc.
}

function verificarPromocao(targetPositionID){
   
    if(playerGo === "white"){
    promotionRowBlack.forEach((item, i) => {
        if (item === targetPositionID) {
            alterarIconesInventario()
            showInventory()
            peaoASerPromovido = targetPositionID
          }
        });
}else{
    promotionRowWhite.forEach((item, i) => {
        if (item === targetPositionID) {
            alterarIconesInventario()
            showInventory()
            peaoASerPromovido = targetPositionID
          }
        });
}

}

 function checkForWin(){
    const kings = Array.from(document.querySelectorAll('#king'))
    if(!kings.some(king => king.firstChild.classList.contains('white'))){
        const allSquaresForEnd = document.querySelectorAll('.square')
        allSquaresForEnd.forEach(square.firstChild?.setAttribute('draggable', false))
    }
    if(!kings.some(king => king.firstChild.classList.contains('black'))){
        const allSquaresForEnd = document.querySelectorAll('.square')
        allSquaresForEnd.forEach(square.firstChild?.setAttribute('draggable', false))
    }
 }