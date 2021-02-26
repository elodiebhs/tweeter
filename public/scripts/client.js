/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



//A page can't be manipulated safely until the document is "ready."
$(document).ready(function() {
  
  //Create the HTML for a tweet
  const createTweetElement = (tweet) => {
  
    //Preventing XSS with Escaping
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let $tweet = $(`<article class="tweet-feed">
  
  <header class="tweet-header">
    <div class= "user">
      <img src=${tweet.user.avatars}> 
      <span class="user-name"> ${tweet.user.name}</span>
    </div>
      <span class="user-ID"> ${tweet.user.handle}</span>
  </header>
    <p>${escape(tweet.content.text)}</p>
  <footer class="tweet-footer">
    <p> ${moment(tweet.created_at).fromNow()}</p> 
      <div class="emoji">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
  </footer>
  </article>`);
       
    return $tweet;
  };

  //Lopp through the tweets and appends the container with tweets
  const renderTweets = function(tweets) {
    $('#tweet-container').empty();
    // loops through tweets
    for (let element of tweets) {
      // calls createTweetElement for each tweet
      const result = createTweetElement(element);
      $('#tweet-container').prepend(result);
    }
  };

  //loads tweets from the server using AJAX - use AJAX to fetch (GET) data from the server.
  const loadtweets = function() {
  //$.get(URL,callback);
    $.get('/tweets', function(tweets) {
      renderTweets(tweets);
    });
  };
  loadtweets();

  //Write a function actually submit the data.
  $('#submittweet').on('click',function(event) {
    event.preventDefault();
    
    //this is deleting the error message if there is one
    $('.error-message').empty();

    let tweetText = $("#tweet-text").val();
    let tweetData = {
      text: tweetText,
    };
      //if text is too long show a message error
    if (tweetText.length > 140) {
      $('.error-message').append("Your tweet is too long");
      $('.error-message').slideDown("slow");
    //if text is too long show a message error
    } else if (!tweetText.length || !tweetText) {
      $('.error-message').append("Please enter a tweet");
      $('.error-message').slideDown("slow");

    } else {

      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: tweetData,
        success:function(result) {
          //clearing textarea after tweet
          $('#tweet-text').val("");
          //reset counter after tweet
          $('.counter').text('140');
          //remove alert
          $('.error-message').slideUp();

          //console.log("The post was successful");
          loadtweets();
        },
        error: function(err) {
          console.log("There was an error in the ajax call",err);
        }
      });
    }
  });

  $('#new-button-tweet').on('click',function(event) {
    event.preventDefault();
    $('#tweet-text').focus();

  });
});


