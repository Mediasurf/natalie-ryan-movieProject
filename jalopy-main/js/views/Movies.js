import {showNotification} from "../messaging.js";
import {getUser} from "../auth.js";

const BASE_URI = `${BACKEND_HOST}/api/s3/download`;

let data
export default function Movies(props) {
    data = props.movies
    return `
        <header>
            <h1>Movies</h1>
        </header>
        <main>
            <div>
                <p>
                    <a href="https://rambunctious-cumbersome-silence.glitch.me/movies" target="_blank" >Open in new tab to view movie database</a>
                </p>
            </div>
            <div id="moviesHere" class="scrolling-wrapper"></div>

        </main>
    `;
}


function addExistingMovies(){
    console.log(data)
    //to access local array, replace data with quotesL
    let placeMoviesHere = document.querySelector("#moviesHere");
    // quotesL = data
    for(let i =0;i < data.length;i++){
        let T = data[i].title;
        let D = data[i].director;
        let R = data[i].rating
        let G = data[i].genre


        placeMoviesHere.innerHTML +=
            `
                <div id="movieCard" class="card">
                    Title: ${T} <hr>
                    Director: ${D} <hr>
                    Rating: ${R} <hr>
                    Genre: ${G} <hr>
                </div>
            `
    }
}



export function MovieEvents() {
    // TODO: use an enum for message type
    // const authority = getUserRole();
    const user = getUser();
    if(!user) {
        showNotification("Welcome visitor", "secondary");
    } else {
        showNotification("Welcome " + user.userName, "info");
    }

    addExistingMovies()

}