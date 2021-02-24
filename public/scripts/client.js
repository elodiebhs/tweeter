/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//define a function createTweetElement that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.

//A page can't be manipulated safely until the document is "ready."
$( document ).ready(function() {
  

// Fake data taken from initial-tweets.json
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const createTweetElement = (tweet) => {
  
  let $tweet = $(`<article class="tweet-feed">
  

  <header class="tweet-header">
    <div class= "user">
      <img src=${tweet.user.avatars}> 
      <span class="user-name"> ${tweet.user.name}</span>
    </div>
      <span class="user-ID"> ${tweet.user.handle}</span>
  </header>
    <p>${tweet.content.text}</p>
  <footer class="tweet-footer">
    <p> ${tweet.created_at}</p> 
      <div class="emoji">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
  </footer>
  </article>`);
       

  return $tweet
}

const renderTweets = function(tweets) {
  // loops through tweets
  for (let element of tweetData ){
    // calls createTweetElement for each tweet
    const result = createTweetElement(element);
    $('#tweet-container').append(result)
  }
  
}
  // takes return value and appends it to the tweets container
  renderTweets()

  /*

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
//$('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
*/

});