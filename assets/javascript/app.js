$(document).ready(function(){
  
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    questions: {
      q1: 'Where was Michael Jackson born?',
      q2: 'What was the name of the first group Michael Jackson performed with?',
      q3: 'How many siblings did Michael Jackson have?',
      q4: 'How old was Michael Jackson when he joined The Jackson 5?',
      q5: "When did Michael Jackson first perform on television?",
      q6: "What was the name of Michael Jackson's famous estate?",
      q7: "Which Michael Jackson solo album sold the most copies?"
    },
    options: {
      q1: ['Los Angeles, California', 'Gary, Indiana', 'Detroit, Michigan', 'Houston, Texas'],
      q2: ['The Commodores', 'Sly and the Family Stone', 'The Jackson 5', 'The Beach Boys'],
      q3: ['9', '6', '8', '5'],
      q4: ['5', '12', '10', '7'],
      q5: ['1971','1962','1967','1969'],
      q6: ['Jackson Ranch','Neverland Ranch','Skywalker Ranch','Wonderland Ranch'],
      q7: ['Thriller', 'Off the Wall', 'Bad','Dangerous']
    },
    answers: {
      q1: 'Gary, Indiana',
      q2: 'The Jackson 5',
      q3: '8',
      q4: '5',
      q5: '1969',
      q6: 'Neverland Ranch',
      q7: 'Thriller'
    },
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
      
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      trivia.nextQuestion();
      
    },

    nextQuestion : function(){
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },

    timerRunning : function(){

      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }

      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }

      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        

        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        $('#game').hide();
        
        $('#start').show();
      }
      
    },
    guessChecker : function() {
      
      var resultId;
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){

        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }

      else{

        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },

    guessResult : function(){
      

      trivia.currentSet++;
      
 
      $('.option').remove();
      $('#results h3').remove();
      

      trivia.nextQuestion();
       
    }
  
  }