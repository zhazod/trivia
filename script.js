var questions = [];
var currentQuestionIndex = 0;
var score = 0;

function getQuestions() {
  $.ajax({
    url: 'get_questions.php',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      questions = response;
      displayQuestion();
    },
    error: function() {
      alert('no se imprimen las preguntas');
    }
  });
}

function displayQuestion() {
  var questionContainer = document.getElementById('questionContainer');
  questionContainer.innerHTML = '';

  if (currentQuestionIndex < questions.length) {
    var question = questions[currentQuestionIndex];

    var questionElement = document.createElement('div');
    questionElement.innerHTML = '<p>' + question.question + '</p>';

    var optionsElement = document.createElement('div');
    var options = [];

    // Almacenar las opciones de respuesta en orden aleatorio
    for (var i = 1; i <= 4; i++) {
      var option = question['option_' + i];
      options.push(option);
    }

    // Ordenar las opciones de respuesta en orden aleatorio
    options.sort(function() {
      return 0.5 - Math.random();
    });

    // Crear los elementos de opción de respuesta en el orden aleatorio
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      var inputElement = document.createElement('input');
      inputElement.type = 'radio';
      inputElement.name = 'answer';
      inputElement.value = option;

      optionsElement.appendChild(inputElement);
      optionsElement.innerHTML += option + '<br>';
    }

    questionContainer.appendChild(questionElement);
    questionContainer.appendChild(optionsElement);
  }
}


function submitTrivia() {
  var selectedAnswer = $('input[name="answer"]:checked').val();
  if (selectedAnswer) {
    var question = questions[currentQuestionIndex];
    if (selectedAnswer === question.correct_answer) {
      score++;
    }

    currentQuestionIndex++;
    displayQuestion();

    if (currentQuestionIndex === questions.length) {
      saveScore();
    }
  }
}

function saveScore() {
  // Crea una ventana modal con un formulario para ingresar el nombre
  $('#nameModal').modal('show');
}

function submitScore() {
  // Obtiene el nombre ingresado en el formulario
  var username = $('#nameInput').val();

  if (username) {
    $.ajax({
      url: 'save_score.php',
      type: 'POST',
      data: { username: username, score: score },
      success: function(response) {
        // Actualiza el contenido de la ventana modal
        $('#modal-message').text(response);
        // Muestra la ventana modal
        $('#modal').modal('show');
        getLeaderboard();
      },
      error: function() {
        // En caso de error, muestra un mensaje en la ventana modal
        $('#modal-message').text('Error al guardar el puntaje.');
        $('#modal').modal('show');
      }
    });
  }
}

$(document).ready(function() {
  $('#modalContainer').load('modal.html');
});


function getLeaderboard() {
  $.ajax({
    url: 'get_leaderboard.php',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      displayLeaderboard(response);
    },
    error: function() {
      alert('Error occurred while retrieving the leaderboard.');
    }
  });
}

function displayLeaderboard(data) {
  var leaderboardTable = document.getElementById('leaderboard');
  leaderboardTable.innerHTML = '<tr><th>Rango</th><th>Nombre</th><th>Puntaje</th></tr>';

  var limit = Math.min(data.length, 10); // Limitar a los primeros 10 registros o menos si hay menos de 10

  for (var i = 0; i < limit; i++) {
    var row = leaderboardTable.insertRow(-1);
    var rankCell = row.insertCell(0);
    var usernameCell = row.insertCell(1);
    var scoreCell = row.insertCell(2);

    rankCell.innerHTML = i + 1;
    usernameCell.innerHTML = data[i].username;
    scoreCell.innerHTML = data[i].score;
  }
}

function redirectToTrivia() {
  window.location.href = 'trivia.html'; // Reemplaza 'trivia.html' con la URL o nombre del archivo de la página de la trivia
}


getQuestions();
getLeaderboard();