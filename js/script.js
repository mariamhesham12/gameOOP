import { Game } from "./game.module.js";
import { GameAPI } from "./gameAPI.module.js";
import { UI } from "./ui.module.js";

const API = new GameAPI();
const ui = new UI();

const closeBtn=document.getElementById("closeBtn")
const detailsSection=document.getElementById("detailsSection")
const homeSection=document.getElementById("homePage")

closeBtn.addEventListener('click',()=>{
    detailsSection.classList.add("d-none")
    homeSection.classList.remove("d-none")
})

document.addEventListener("DOMContentLoaded", async () => {
    
  let defaultGenre = "MMORPG";
  ui.showLoading()
  let gameData = await API.testAPI(defaultGenre);

  let games = gameData.map(
    (game) =>
      new Game(
        game.id,
        game.thumbnail,
        game.title,
        game.short_description,
        game.genre,
        game.platform
      )
  );
  ui.displayGames(games);
  ui.hideLoading()
});
