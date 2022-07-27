import createView from "../createView.js"

let data
export default function editMoviesHTML (props) {
    data = props
    return `
<form class="container">
    <h1>Add New Movies</h1>
    <form>
        <input class="form-control" list="datalistOptions" id="newTInput" placeholder="Enter Title">
        <input class="form-control" list="datalistOptions" id="newRInput" placeholder="Enter Rating">
        <button class="form-control" id="insert-btn">Add New Movie</button>
    </form>
</div>
`;
}

export function MovieEditsJS() {
    const addButton = document.querySelector("#insert-btn");
    addButton.addEventListener("click", addNewMovie);

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


        //this is how to arrange data to be sent to database(in an order so that we can pull it again)
        const newM = {
                title: title,
                rating: rating
        };

        console.log("Movie is ready to be inserted");
        const requestOptions = {
            method: "POST",
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(newM)
        }
        fetch('https://rambunctious-cumbersome-silence.glitch.me/movies', requestOptions)
            .then(function (response) {
                if (!response.ok) {
                    console.log("add movie error: " + response.status);
                } else {
                    console.log("add movie ok");
                    //below specifies which page to return to when movie is added
                    createView('/');
                }
            });
    }}




