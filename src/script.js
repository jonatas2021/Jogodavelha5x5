
	const celula = document.querySelectorAll(".cell")
	const container = document.querySelector(".container");
	const mensagemdeVitoriaTextElement = document.querySelector(
  "[divMensagemdeVitoriatexto]"
);
const mensagemdeVitoria = document.querySelector("[divMensagemdeVitoria]");
const restartButton = document.querySelector("[botaodeRestart]");

let turnoDo_O;

	const condicaodevitoria = [
		[0, 1, 2, 3],
		[4, 5, 6, 7],
		[8, 9, 10, 11],
		[12, 13, 14, 15],
		[0, 4, 8, 12],
		[1, 5, 9, 13],
		[2, 6, 10, 14],
		[3, 7, 11, 15],
		[0, 5, 10, 15],
		[3, 6, 9, 12]
	]

/* 	const jogadorX = "X"
	const jogadorO = "O" */

	/* Adicionando um evento de click */
/* 	document.addEventListener("click", (event) => {
		console.log(event.target.id);
	} ) */

	const comecarJogo = () => {
  turnodoO = false;

  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", clique);
    cell.addEventListener("click", clique, { once: true });
  }

  BoardHoverClass();
  mensagemdeVitoria.classList.remove("mostrar-mensagemdeVitoria");
};

const filmdeJogo = (isDraw) => {
  if (isDraw) {
    mensagemdeVitoriaTextElement.innerText = "Empate!";
  } else {
    mensagemdeVitoriaTextElement.innerText = turnodoO ? "O Venceu!" : "X Venceu!";
  }
  mensagemdeVitoria.classList.add("mostrar-mensagemdeVitoria");
};

const checarVitoria = (currentPlayer) => {
  return condicaoDeVitoria.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checarEmpate = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const BoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (turnodoO) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const trocarTurno = () => {
  turnodoO = !turnodoO;

  BoardHoverClass();
};


const clique = (e) => {
  // Colocar a marca (X ou Círculo)
  const cell = e.target;
  const classToAdd = turnodoO ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Verificar por vitória
  const ganhou = checarVitoria(classToAdd);

  // Verificar por empate
  const isDraw = checarEmpate();

  if (ganhou) {
    filmdeJogo(false);
  } else if (isDraw) {
    filmdeJogo(true);
  } else {
    trocarTurno();
  }
};

comecarJogo();

restartButton.addEventListener("click", comecarJogo);
