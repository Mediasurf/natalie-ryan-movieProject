import {showNotification} from "../messaging.js";
import {getUser} from "../auth.js";

const BASE_URI = `${BACKEND_HOST}/api/s3/download`;

let data
export default function Movies(props) {
    data = props.movies
    return `
        <header>
            <h1 id="movieH1">Media Surf</h1>
        </header>
        <main>
            <div id="moviesHere" class="scrolling-wrapper"></div>
            <div id="moviesHere2" class="scrolling-wrapper"></div>
        </main>
    `;
}

function addExistingMovies(){
    console.log(data)
    //to access local array, replace data with quotesL
    let placeMoviesHere = document.querySelector("#moviesHere");
    let placeMoviesHere2 = document.querySelector("#moviesHere2")

    // quotesL = data
    for(let i =0;i < data.length;i++){
        let T = data[i].title;
        let D = data[i].director;
        let R = data[i].rating
        let G = data[i].genre
        placeMoviesHere.innerHTML +=
            `
            
            <div class="card movieCard">
// <!--                <article>${T}</article> -->
<!--                <hr style="height: 5px;-->
<!--                          border: 1px;-->
<!--                          box-shadow: inset 0 9px 9px -3px rgba(11, 99, 184, 0.8);">-->
                Title: ${T} <hr>          
                Director: ${D} <hr>
                Rating: ${R} <hr>
                Genre: ${G} <hr>
            </div>
            `
        placeMoviesHere2.innerHTML +=
            `
             <div class="card movieCard">
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
        showNotification("Welcome Friends", "secondary");
    } else {
        showNotification("Welcome " + user.userName, "info");
    }

    addExistingMovies()

}