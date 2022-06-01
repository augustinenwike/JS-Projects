const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-URL');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// show modal, focus on input
function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

// Modal Event Listener
modalShow.addEventListener('click',showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click',(e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

// Validate form
function validate(nameValue,urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!nameValue || !urlValue) {
        alert('Please submit values for both fields.');
        return false;
    }
    if (!urlValue.match(regex)) {
        alert('Please provide a valid address');
        return false;
    }
    // valid
    return true;
}

// Build Bookmarks Dom
function buildBookmarks() {
    // Remove all bookmark elements
    bookmarksContainer.textContent = '';
    // build items
    bookmarks.forEach((bookmark) => {
        const {name,url} = bookmark;
        // item
        const item = document.createElement('div');
        item.classList.add('item');
        // close Icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas','fa-times');
        closeIcon.setAttribute('title', 'Delete Bookmark');
        closeIcon.setAttribute('onclick',`deleteBookmark('${url}')`);
        // favicon / link container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        // favicon
        const favicon = document.createElement('img');
        favicon.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute('alt','favicon');
        // link 
        const link = document.createElement('a');
        link.setAttribute('href',`${url}`);
        link.setAttribute('target','_blank');
        link.textContent = name;
        // Append to Bookmarks container
        linkInfo.append(favicon,link);
        item.append(closeIcon,linkInfo);
        bookmarksContainer.appendChild(item);
        
    });
}

// Fetch Bookmark
function FetchBookmark() {
    // Get bookmarks form storage if available
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else {
        // Create a bookmark array in localStorage
        bookmarks = [
            {
                name: 'jacinto Design',
                url: 'https://jacinto.design',
            },
        ];
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    };
    buildBookmarks();
}

// delete Bookmark
function deleteBookmark(url) {
    bookmarks.forEach((bookmark,i) => {
        if (bookmark.url === url) {
            bookmarks.splice(i,1);
        }
    });
    // Update bookmarks array in localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    FetchBookmark();
}

// Handle data from Form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('http://','https://')) {
        urlValue = `https://${urlValue}`;
    }
    if (!validate(nameValue, urlValue)) {
        return false;
    }
    const bookmark = {
        name:nameValue,
        url: urlValue
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    FetchBookmark();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// Event Listener
bookmarkForm.addEventListener('submit',storeBookmark);

// On load, Fetch Bookmarks
FetchBookmark();