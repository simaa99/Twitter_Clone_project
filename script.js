'use strict';
const tweetButton = document.querySelector('.tweetBox__tweetButton');
const postParent = document.querySelector('.post_parent');
const textInput = document.getElementById('text_input');
const postParagraph = document.querySelector('.post-paragraph');
const resetBtn = document.querySelector('.reset-btn');
let idNameCounter = 2;

// for static HTML Posts
const retweetBtns = document.querySelectorAll('.repeat-icon');
const loveIcon = document.querySelectorAll('.love-icon');
const shareIcon = document.querySelectorAll('.share-icon');
const repeatIcon = document.querySelectorAll('.repeat-icon');

// array for file storage
let tweets = [];

const mainTweetFunction = function (tweet, authorName) {
  const newPost = document.createElement('div');
  newPost.classList.add('post');
  newPost.style.backgroundColor = '#e6ecf0';
  newPost.innerHTML = `
          <div class="post__avatar_and_body">
            <div class="post__header">
            <div class="user__info">
              <div class="post__avatar">
                <a href="#"><img src="./img/photo.jpeg" alt="avatar-img"></a>
              </div>
              <div class="post__body">
                <div class="upper__part">
                    <a href="#"><h3 class="my_account">${authorName}</h3></a>                
                    <span class="material-icons post__badge">verified</span>
                    <span class="hash__name">
                      @simaa99
                    </span>
                </div>
                  <p class="post-paragraph">${tweet}</p>
              </div>
            </div>
            </div>
          </div>
          <div class="post__footer">
                <span class="material-icons repeat-icon" data-id-name="${idNameCounter++}">repeat</span>
                <span class="material-icons love-icon">favorite_border</span>
                <span class="material-icons share-icon">publish</span>
          </div>
  `;
  postParent.prepend(newPost);
  textInput.value = '';
  textInput.blur();
  newPost.style.backgroundColor = 'white';
  newPost.style.transition = '2s';

  // footer-DOM
  const loveIcon = document.querySelector('.love-icon');
  const shareIcon = document.querySelector('.share-icon');
  const repeatIcon = document.querySelector('.repeat-icon');
  footerToggle(loveIcon);
  footerToggle(shareIcon);
  footerToggle(repeatIcon);

  const retweetBtn = document.querySelector('.repeat-icon');
  retweetBtn.addEventListener('click', e => {
    const closestParent = retweetBtn.closest('.post');
    const tweetParagraph = closestParent.querySelector('.post-paragraph');
    const tweetAuthor = closestParent.querySelector('.my_account');
    createTweet(tweetParagraph.textContent, tweetAuthor.textContent);
  });
};

// createTweet
const createTweet = function (tweet, authorName) {
  mainTweetFunction(tweet, authorName);
  let tweetObject = {
    tweetText: tweet,
    tweetAuthor: authorName,
  };
  tweets.push(tweetObject);
  setLocalStorage();
};

// createTweetLocalStorage
const createTweetLocalStorage = function (tweet, authorName) {
  mainTweetFunction(tweet, authorName);
};

tweetButton.addEventListener('click', function (e) {
  e.preventDefault();
  createTweet(textInput.value, 'Simaa Abumousa');
});

const footerToggle = function (iconName) {
  iconName.addEventListener('click', e => {
    iconName.classList.toggle('active');
  });
};

// local storage
const setLocalStorage = function () {
  localStorage.setItem('tweets', JSON.stringify(tweets));
};

const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem('tweets'));
  tweets = data ? data : [];
  tweets.forEach(oldTweet => {
    createTweetLocalStorage(oldTweet.tweetText, oldTweet.tweetAuthor);
  });
};
getLocalStorage();

// to clear local storage
const reset = function () {
  localStorage.removeItem('tweets');
  location.reload();
};
resetBtn.addEventListener('click', reset);

// for static HTML Posts
retweetBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    // using Event Delegation "closest"
    const closestParent = btn.closest('.post');
    const tweetParagraph = closestParent.querySelector('.post-paragraph');
    const tweetAuthor = closestParent.querySelector('.my_account');
    createTweet(tweetParagraph.textContent, tweetAuthor.textContent);
  });
});

// footer toggle function - for static HTML post
const footerToggleStatic = function (nameIcon) {
  nameIcon.forEach(icon => {
    icon.addEventListener('click', function () {
      icon.classList.toggle('active');
    });
  });
};
footerToggleStatic(loveIcon);
footerToggleStatic(shareIcon);
footerToggleStatic(repeatIcon);
