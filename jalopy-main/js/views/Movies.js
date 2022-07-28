import {showNotification} from "../messaging.js";
import {getUser} from "../auth.js";

const BASE_URI = `${BACKEND_HOST}/api/s3/download`;

let data
export default function Movies(props) {
    data = props.movies
    return `
        <body>
            <header>
                <h1 id="movieH1">Media Surf</h1>
            </header>
            <main>
                <div id="moviesHere" class="scrolling-wrapper"></div>
                <div id="moviesHere2" class="scrolling-wrapper"></div>
            </main>
        </body>
    `;
}

function addExistingMovies(){
    console.log(data)
    //to access local array, replace data with quotesL
    let placeMoviesHere = document.querySelector("#moviesHere");
    let placeMoviesHere2 = document.querySelector("#moviesHere2")
    // quotesL = data
    for(let i =0;i < data.length;i++){
        let Title = data[i].title;
        let Director = data[i].director;
        let Rating = data[i].rating
        let Genre = data[i].genre
        placeMoviesHere.innerHTML +=
            `
            <div class="card movieCard">
                Title: ${Title} <hr>          
                Director: ${Director} <hr>
                Rating: ${Rating} <hr>
                Genre: ${Genre} <hr>
            </div>
            `
        placeMoviesHere2.innerHTML +=
            `
             <div class="card movieCard">
                Title: ${Title} <hr>
                Director: ${Director} <hr>
                Rating: ${Rating} <hr>
                Genre: ${Genre} <hr>
             </div>
            `
    }
}
export function MovieEvents() {
    // // TODO: use an enum for message type
    // // const authority = getUserRole();
    // const user = getUser();
    // if(!user) {
    //     showNotification("Welcome Friends", "secondary");
    // } else {
    //     showNotification("Welcome " + user.userName, "info");
    // }

    addExistingMovies()

}