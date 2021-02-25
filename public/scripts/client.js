/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//define a function createTweetElement that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.

//A page can't be manipulated safely until the document is "ready."
$( document ).ready(function() {
  
//Create the HTML for a tweet
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

//Lopp through the tweets and appends the container with tweets
const renderTweets = function(tweets) {
  $('#tweet-container').empty()
  // loops through tweets
  for (let element of tweets) {
    // calls createTweetElement for each tweet
    const result = createTweetElement(element);
    $('#tweet-container').prepend(result)
  }
}

//loads tweets from the server using AJAX - use AJAX to fetch (GET) data from the server.
const loadtweets = function() {
  //$.get(URL,callback);
 $.get('/tweets', function(tweets) {
   renderTweets(tweets);
 })
}
loadtweets()

  //Write a function actually submit the data.
  $('#submittweet').on('click',function(event) {
    event.preventDefault();
    let tweetText = $("#tweet-text").val();
    let tweetData = {
      text: tweetText, 
    };
      //if text is too long show a message error
      if (tweetText.length > 140) {
        alert("Your tweet is too long");
      //if text is too long show a message error
      } else if (!tweetText.length || !tweetText) {
        alert("Please submit a tweet");

      } else {

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: tweetData,
      success:function(result) {
        //console.log("The post was successful");
        loadtweets();
      },
      error: function(err) {
        console.log("There was an error in the ajax call",err);
      }
    });
    }
  });

});


