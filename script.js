/**
 * Base URL for the backend application.
 */
const baseUrl = "https://us-central1-mbtcandidate.cloudfunctions.net/posts/"
/**
 * Username for the currently logged in user.
 */
const username = "hhuril";
/**
 * Map to hold all the blog posts for a user.
 * The key is the blog post id.
 * The value is an object containing the title, text and timestamp.
 * 
 * To be used for update and delete.
 */
const blogPosts = {};
/**
 * Retrieve all blog posts for a particular user based on the provided user name.
 * The posts are ordered from most recent to least recent.
 * 
 * This will also populate the list of blogPosts.
 * 
 * @param username The user name.
 * @return A list of blog posts for a particular user ordered from most recent to least recent.
 */
async function retrieveAllBlogPost(username) {
    const response = await fetch(baseUrl + username);
    const blogPost = await response.json();
    return blogPost;
}
/**
 * Display all blog posts for a particular user on the screen.
 * 
 * @param username The user name.
 */
function displayBlogPosts(username) {
    let blogPostsContainer = document.querySelector("div.blog-posts");
    retrieveAllBlogPost(username).then(blogPosts => {
        if (blogPosts && blogPosts.response) {
            for (let i = 0; i < blogPosts.response.length; i++) {
                const id = blogPosts.response[i].id;
                const title = blogPosts.response[i].title;
                const text = blogPosts.response[i].text;
                const timestamp = blogPosts.response[i].timestamp;

                const blogPostElem = document.createElement("div");
                blogPostElem.classList.add("blog-post");

                // Blog Header
                const blogHeader = document.createElement("div");
                blogHeader.classList.add("blog-header");

                const blogTitle = document.createElement("div");
                blogTitle.classList.add("blog-title");
                blogTitle.innerText = title;

                const blogTimestamp = document.createElement("div");
                blogTimestamp.classList.add("blog-timestamp");
                blogTimestamp.innerText = timestamp;

                // Delete and Update button
                const buttons = document.createElement("div");
                buttons.classList.add("buttons");

                const editButton = document.createElement("button");
                editButton.classList.add("button-edit");
                editButton.innerText = "Edit";

                const deleteButton = document.createElement("button");
                deleteButton.classList.add('button-delete');
                deleteButton.innerText = "Delete";

                buttons.appendChild(deleteButton);
                buttons.appendChild(editButton);
                blogHeader.appendChild(blogTitle);
                blogHeader.appendChild(blogTimestamp);
                blogHeader.appendChild(buttons);
                blogPostElem.appendChild(blogHeader);

                // Blog Content (Text)
                const blogText = document.createElement("div");
                blogText.classList.add("blog-text");
                blogText.innerHTML = text;
                blogPostElem.appendChild(blogText);
                blogPostsContainer.appendChild(blogPostElem);
            }
        }
    });
}
window.onload = function () {
    // Display all the blog posts for the currently logged in user when the page loads
    displayBlogPosts(username);
}