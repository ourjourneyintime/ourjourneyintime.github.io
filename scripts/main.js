const articleContainer = document.getElementById("article-container");

// Fetch the JSON data from the data folder
fetch("data/data.json")
    .then((response) => response.json())
    .then((data) => {
    // Generate articles from JSON data
    data.forEach((articleData, index) => {
        const article = document.createElement("article");
        article.setAttribute("data-index", index);
        article.setAttribute("data-status", index === 0 ? "active" : "inactive");

        // Create and append the image section
        const imageSection = document.createElement("div");
        imageSection.classList.add("article-image-section", "article-section");
        imageSection.style.backgroundImage = `url(${articleData.image})`;
        article.appendChild(imageSection);

        // Create and append the description section
        const descriptionSection = document.createElement("div");
        descriptionSection.classList.add("article-description-section", "article-section");
        const descriptionText = articleData.description.replace("/\n/g", "<br>");
        descriptionSection.innerHTML = `<p>${descriptionText}</p>`;
        article.appendChild(descriptionSection);

        // Create and append the title section
        const titleSection = document.createElement("div");
        titleSection.classList.add("article-title-section", "article-section");
        titleSection.innerHTML = `
        <h2>${articleData.title}</h2>
        <i class="${articleData.icon}"></i>
        `;
        article.appendChild(titleSection);

        // Create and append the navigation section
        const navSection = document.createElement("div");
        navSection.classList.add("article-nav-section", "article-section");
        navSection.innerHTML = `
        <button class="article-nav-button" type="button" onclick="handleLeftClick()">
            <i class="fa-solid fa-arrow-left-long"></i>
        </button>
        <button class="article-nav-button" type="button" onclick="handleRightClick()">
            <i class="fa-solid fa-arrow-right-long"></i>
        </button>
        `;
        article.appendChild(navSection);

        // Append the article to the container
        articleContainer.appendChild(article);
    });
    })
    .catch((error) => console.error("Error fetching JSON:", error));   

let currentIndex = 0; // Track the currently active article
let totalArticles = 41; // Track the number of articles

leftButton.addEventListener("click", () => handleLeftClick(data.length));
rightButton.addEventListener("click", () => handleRightClick(data.length));

// Function to handle left click (previous article)
function handleLeftClick() {
    console.log("calling left click")
    if (currentIndex > 0) {
        console.log("current index > 0")
        console.log(currentIndex)
        changeArticle(currentIndex - 1, "before");
    } else {
        console.log("tried to go left on 0")
    }
}

// Function to handle right click (next article)
function handleRightClick() {
    console.log("calling right click with: " + totalArticles)
    if (currentIndex < totalArticles - 1) {
        console.log("current index < totalArticles - 1")
        console.log(currentIndex)
        changeArticle(currentIndex + 1, "after");
    } else {
        console.log("tried to go right greater than bounds: " + totalArticles)
    }
}

// Function to change the active article
function changeArticle(newIndex, direction) {
    console.log("changing article in direction " + direction)
    const articles = document.querySelectorAll("article");

    // Update the status of the current article
    articles[currentIndex].setAttribute("data-status", direction === "after" ? "before" : "after");

    // Update the status of the new article
    articles[newIndex].setAttribute("data-status", direction === "after" ? "becoming-active-from-after" : "becoming-active-from-before");

    // Wait for the transition to complete
    setTimeout(() => {
        articles[currentIndex].setAttribute("data-status", "inactive");
        articles[newIndex].setAttribute("data-status", "active");
        currentIndex = newIndex;
    }, 400); // Match this duration to your CSS transition duration
}