export class GameAPI{

    async testAPI(genre){
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'f4fcc93cb0msh92c6177fb1ad081p16055djsneefc6d7cfe05',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }}
        let res=await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${genre}`,options)
    
        let result=await res.json()
        console.log(result);

        return result;
        
    }
    }