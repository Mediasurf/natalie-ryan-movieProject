import createView from "../createView.js"


let data
export default function editMoviesHTML (props) {
    data = props.movies
    ///this is the form to input new movies
    return `
<form class="container">
    <h1 id="h1E">Add New Movies</h1>
    <a href="https://rambunctious-cumbersome-silence.glitch.me/movies" target="_blank" >Open in new tab to view movie database</a>

    <form>
        <input class="form-control" list="datalistOptions" id="newTInput" placeholder="Enter Title">
        <input class="form-control" list="datalistOptions" id="newRInput" placeholder="Enter Rating">
        <input class="form-control" list="datalistOptions" id="newGInput" placeholder="Enter Genre">
        <button class="form-control" id="insert-btn">Add New Movie</button>
    </form>
</div>
    <main>
        <div id="moviesHere" class="scrolling-wrapper"></div>
    </main>
      
    `;
    }
//function here top add existing movies
function addExistingMoviesEditPage(){
    console.log(data)
    let placeMoviesHere = document.querySelector("#moviesHere");
    for(let i =0;i < data.length;i++){
        let T = data[i].title;
        let D = data[i].director;
        let R = data[i].rating
        let G = data[i].genre
        let P = data[i].plot
        placeMoviesHere.innerHTML +=
            `
                <div class="card movieCard">
                    Title: ${T} <hr>
                    Director: ${D} <hr>
                    Rating: ${R} <hr>
                    Genre: ${G} <hr>
                    Plot: ${P} <hr>
                    <buttton class="btn bg-secondary">Edit</buttton>
                    <buttton class="btn bg-secondary">Delete</buttton>
                </div>
                
            `
    }
}





//this is the JS portion
export function MovieEditsJS() {

    //begin add movies here
    const addButton = document.querySelector("#insert-btn");
    addButton.addEventListener("click", addNewMovie);
    addExistingMoviesEditPage();

    function addNewMovie() {
        // make sure user entered something non-blank for the dog fact
        const titleEnter = document.querySelector("#newTInput");
        //this is where we get the value of the title input to post to database, minus whitespace
        const title = titleEnter.value.trim();
        if (title.length < 1) {
            alert("Please enter title!");
            return;
        }
        const ratingEnter = document.querySelector("#newRInput");
        //this is where we get the value of the rating input to post to database, minus whitespace
        const rating = ratingEnter.value.trim();
        if (rating.length < 1) {
            alert("Please enter rating!");
            return;
        }
        const genreEnter = document.querySelector("#newGInput");
        //this is where we get the value of the rating input to post to database, minus whitespace
        const genre = genreEnter.value.trim();
        if (genre.length < 1) {
            alert("Please enter genre!");
            return;
        }


        //this is how to arrange data to be sent to database(in an order so that we can pull it again)
        const newME = {
                title: title,
                rating: rating,
                genre: genre
        };

        console.log("Movie is ready to be inserted");
        const requestOptions = {
            method: "POST",
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(newME)
        }
        fetch('https://rambunctious-cumbersome-silence.glitch.me/movies', requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    console.log("add movie error: " + response.status);
                } else {
                    console.log("add movie ok");
                    //below specifies which page to return to when movie is added
                    createView('/editMovies');
                }
            });
        //end add movies here
        //begin edit movie data here


    }}




