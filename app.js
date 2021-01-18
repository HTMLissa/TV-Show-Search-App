const form = document.querySelector("#searchForm");
const button = document.querySelector("#submitBtn");
const bodyDiv = document.querySelector(".bodyDiv");

// Listen for submit event
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    // Make sure bodyDiv is empty
    bodyDiv.innerHTML = "";
    // Access user input
    const userInput = form.elements.query.value;
    // Make API call with user input
    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${userInput}`);
    // call displayIMG() to add <img> & info to body
    displayIMG(res.data);
    // Empty input field
    form.elements.query.value = "";
})

// Function to create new <img> & append it to body to display the API img
const displayIMG = (results) => {
    // loop over all results 
    for (let result of results) {
        // check whether result has an img property & display it if it does
        if (result.show.image) {
            let img = document.createElement('img');
            img.src = result.show.image.medium;
            bodyDiv.append(img);
            // call displayInfo() to add <h2> with infos about the show
            displayInfo(result);
        }
    }
}

// Function to create new <h2> with movie name/year/genre
const displayInfo = (result) => {
    let h2 = document.createElement('h2');
    h2.innerText = `${result.show.name} (${result.show.premiered}), ${result.show.genres}`;
    bodyDiv.append(h2);
}
