import {
  collection, addDoc, getDocs, deleteDoc, updateDoc,
  doc, query, where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './firebase-config.js';

const gameForm = document.getElementById('gameForm');
const listaJuegos = document.getElementById('listaJuegos');
const buscarInput = document.getElementById('buscarInput');
const JuegosRef = collection(db, 'games');

gameForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = gameForm.titulo.value;
  const autor = gameForm.autor.value;
  const anio = parseInt(gameForm.anio.value);
  const genero = gameForm.genero.value;

  await addDoc(JuegosRef, { titulo, autor, anio, genero });
  gameForm.reset();
  mostrarGames();
});

async function mostrarGames() {
  listaJuegos.innerHTML = '';
  const querySnapshot = await getDocs(JuegosRef);
  querySnapshot.forEach(docSnap => {
    const Game = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${Game.titulo}</strong> - ${Game.autor} (${Game.anio}) - ${Game.genero}
      <button onclick="editarGame('${docSnap.id}', '${Game.titulo}', '${Game.autor}', ${Game.anio}, '${Game.genero}')">Editar</button>
      <button onclick="eliminarGame('${docSnap.id}')">Eliminar</button>
    `;
    listaJuegos.appendChild(div);
  });
}

async function eliminarGame(id) {
  await deleteDoc(doc(db, 'games', id));
  mostrarGames();
}

window.eliminarGame = eliminarGame;

window.editarGame = (id, titulo, autor, anio, genero) => {
  gameForm.titulo.value = titulo;
  gameForm.autor.value = autor;
  gameForm.anio.value = anio;
  gameForm.genero.value = genero;

  gameForm.onsubmit = async (e) => {
    e.preventDefault();
    const nuevoTitulo = gameForm.titulo.value;
    const nuevoAutor = gameForm.autor.value;
    const nuevoAnio = parseInt(gameForm.anio.value);
    const nuevoGenero = gameForm.genero.value;

    await updateDoc(doc(db, 'games', id), {
      titulo: nuevoTitulo,
      autor: nuevoAutor,
      anio: nuevoAnio,
      genero: nuevoGenero
    });

    gameForm.reset();
    gameForm.onsubmit = guardarGame;
    mostrarGames();
  };
};

function guardarGame(e) {
  e.preventDefault();
  // Se reemplaza dinámicamente con función anterior al editar
}

async function buscarJuego() {
  const texto = buscarInput.value.trim();
  if (!texto) return mostrarGames();

  listaJuegos.innerHTML = '';
  const q = query(JuegosRef, where('titulo', '==', texto));
  const resultado = await getDocs(q);

  resultado.forEach(docSnap => {
    const Game = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML = `<strong>${Game.titulo}</strong> - ${Game.autor} (${Game.anio}) - ${Game.genero}`;
    listaJuegos.appendChild(div);
  });
}

mostrarGames();
