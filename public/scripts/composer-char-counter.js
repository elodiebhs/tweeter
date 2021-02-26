
//test that it is being loaded into the index.html file correctly.
$(document).ready(function() {
  
  $("#tweet-text").on('keydown', function() {
    //Calculating the num of Character length minus the max allowed
    const numOfCharacters = $(this).val().length;
    const remainCharacters = 140 - numOfCharacters;
    //Traverse up the DOM tree until counter
    const characterOfCounter = $(this).parent().next().find(".counter");
    characterOfCounter.html(remainCharacters);
    //Counter turning red if max characters
    if (remainCharacters < 0) {
      characterOfCounter.addClass("counterRed");
    } else {
      characterOfCounter.removeClass("counterRed");
    }
  });
});

