
//test that it is being loaded into the index.html file correctly.
$(document).ready(function() {
  console.log ("this is working correctly")
//exemple with button
  $("#btn").on('click', function() {
    console.log(this); //The this keyword is a reference to the button
  });
  
  $("#tweet-text").on('keypress', function() {
   //console.log($(this)); 
   //Calculating the num of Character length minus the max allowed
    let numOfCharacters=$(this).val().length;
    let remainCharacters = 140 - numOfCharacters;
    //console.log(remainCharacters);
    //Traverse up the DOM tree until counter
    let characterOfCounter = $(this).parent().next().find(".counter");
    console.log(characterOfCounter);
    characterOfCounter.html(remainCharacters);
    //Counter turning red if max characters 
    if(remainCharacters < 0){
      characterOfCounter.addClass("counterRed")
    } else {
      characterOfCounter.removeClass("counterRed")
    }

  })

});

