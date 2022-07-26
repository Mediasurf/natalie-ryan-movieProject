import {showNotification} from "../messaging.js";
import {getUser} from "../auth.js";

const BASE_URI = `${BACKEND_HOST}/api/s3/download`;

export default function Home(props) {
    return `
        <header>
            <h1>Home Page</h1>
        </header>
        <main>
            <div>
                <p>
                    This is the home page text.
                    <a href="https://rambunctious-cumbersome-silence.glitch.me/movies" target="_blank" >Open in new tab to view movies</a>
                </p>    
            </div>
        </main>
    `;
}

export function HomeEvents() {
    // TODO: use an enum for message type
    // const authority = getUserRole();
    const user = getUser();
    if(!user) {
        showNotification("Welcome visitor", "secondary");
    } else {
        showNotification("Welcome " + user.userName, "info");
    }
}