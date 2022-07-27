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
<!--        <input class="form-control" list="datalistOptions" id="newGInput" placeholder="Enter ID">-->
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
        let Title = data[i].title;
        let Director = data[i].director;
        let Rating = data[i].rating
        let Genre = data[i].genre
        let Plot = data[i].plot
        // let ID = data[i].id
        placeMoviesHere.innerHTML +=
            `
                <div class="card movieCard">
                    Title:
                   <input id="titleInput" class="text-input" value = "${Title}">
                     <hr>
                    Director:  
                   <input id="directorInput" class="text-input" value = "${Director}">
                     <hr>
                    Rating:  
                   <input id="ratingInput" class="text-input" value = "${Rating}">
                     <hr>
                    Genre:  
                   <input id="genreInput" class="text-input" value = "${Genre}">
                     <hr>
                    Plot:  
                   <input id="plotInput" class="text-input" value = "${Plot}">
                    <hr>
                    <button id="saveBtn" class="saveBtn btn bg-secondary">Save</button>
                    <button id="deleteBtn" class="dltBtn btn bg-secondary" data-id="${data[i].id}">Delete</button>
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

    // this is for the edit cards button
    const movieCardSaveBtns = document.querySelectorAll(".saveBtn")
    for(let i=0;i<movieCardSaveBtns.length;i++){
        movieCardSaveBtns[i].addEventListener("click", function(){
            alert("edited")
            // code here: when save btn is clicked, post the new data to the ID
            // get value of inputs into a var
            // need to reference specific card id here...
            const title = titleInput[i].value;
            console.log(title);
            const editedM = {
                            title: titleEdit,
                            director: directorEdit,
                            rating: ratingEdit,
                            genre: genreEdit,
                            plot: plotEdit
                    };
        })
    }


    ///delete here
    const movieCardDltBtns = document.querySelectorAll(".dltBtn")
    for(let i=0;i<movieCardDltBtns.length;i++){
        movieCardDltBtns[i].addEventListener("click", function(){
            alert("deleted")
            //code here to delete by id

            const requestOptions = {
                method: "DELETE"
            }
            const dataID = movieCardDltBtns[i].getAttribute('data-id');
            fetch(`https://rambunctious-cumbersome-silence.glitch.me/movies/${dataID}`, requestOptions)
                .then(function (response) {
                    if (!response.ok) {
                        console.log("delete movie error: " + response.status);
                    } else {
                        console.log("delete movie ok");
                        //below specifies which page to return to when movie is added
                        createView('/editMovies');
                    }
                });
//end delete here
        })
    }


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
                genre: genre,
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

    }
}




