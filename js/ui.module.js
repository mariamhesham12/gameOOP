import { Game } from "./game.module.js";
import { GameAPI } from "./gameAPI.module.js";

export class UI{
    constructor(){
        this.gamesContainer=document.getElementById('gameContainer')
        this.gameApi=new GameAPI()
        this.bindNavbarLinks()
        this.loading=document.getElementById("loading")
        this.showDetails=document.getElementById("showDetails")
        this.detailsSection=document.getElementById("detailsSection")
    }
    bindNavbarLinks() {
        const genreLinks = document.querySelectorAll(".nav-link");
    
        genreLinks.forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
    
                genreLinks.forEach(link => link.classList.remove("active"));
                e.target.classList.add("active");
    
            
                const dataGenre = e.target.getAttribute('data-genre').toLowerCase();
    
                
                this.showLoading();
    
                try {
                    let gameData = await this.gameApi.testAPI(dataGenre);
    
                    let games = gameData.map(game => new Game(
                        game.id,
                        game.thumbnail,
                        game.title,
                        game.short_description,
                        game.genre,
                        game.platform
                    ));

                    this.displayGames(games);
                } catch (error) {
                    console.error("Error fetching game data:", error);
                } finally {
                    this.hideLoading();
                }
            });
        });
    }
    
    
    
     displayGames(games) {
      
        let container = ``;
        games.forEach(game => {
            container += `
                <div class="col-md-3">
                    <div class="card game-card" data-id="${game.id}">
                        <img src="${game.thumbnail}" class="card-img-top movie-img" alt="${game.title}" />
                        <div class="card-body">
                            <div class="upper-card d-flex justify-content-between">
                                <p class="movie-title">${game.title}</p>
                                <button class="freeBtn">free</button>
                            </div>
                            <div class="middle-card">
                                <p class="text-center movie-description">${game.short_description}</p>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <span class="badge  movie-genre">${game.genre}</span>
                            <span class="badge  movie-platform">${game.platform}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        this.gamesContainer.innerHTML = container; 

        const gameCards=document.querySelectorAll(".game-card")
        gameCards.forEach(card=>{
            card.addEventListener('click',()=>{
                const gameId=card.getAttribute("data-id")
                this.displayGameDetails(gameId)

            })
        })
    }

    async displayGameDetails(gameId){
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'f4fcc93cb0msh92c6177fb1ad081p16055djsneefc6d7cfe05',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        this.showLoading()
        const gameRes=await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,options)
        const gameDetails=await gameRes.json()
        console.log(gameDetails);
        this.showDetailsData(gameDetails)
        this.hideLoading()
    }

    showDetailsData(gameDetail){

        
        let gameDetailsContainer=``

            gameDetailsContainer =`
              <div class="col-md-5">
                <div class="left-details">
                  <img src="${gameDetail.thumbnail}" alt="${gameDetail.title}">
                </div>
              </div>
              <div class="col-md-7">
                <div class="right-details">
                  <h3>Title: ${gameDetail.title}</h3>
                  <p class="right-details-info">Category: <span class="badge">${gameDetail.genre}</span></p>
                  <p class="right-details-info">Platform: <span class="badge">${gameDetail.platform}</span></p>
                  <p class="right-details-info">Status: <span class="badge">${gameDetail.status}</span></p>
                  <p class="right-details-desc">${gameDetail.description}</p>
                  <button class="btn btn-outline-warning text-light"><a href="${gameDetail.freetogame_profile_url}" target="_blank">Show Game</a></button>
                </div>
          </div>`
            
        
        this.showDetails.innerHTML=gameDetailsContainer
        let homeSection=document.getElementById("homePage")
        homeSection.classList.add("d-none")
        this.detailsSection.classList.remove("d-none")
    }

  
    showLoading(){
        this.loading.classList.remove("d-none")
        
    }

    hideLoading(){
        this.loading.classList.add("d-none")
        
    }
    
}