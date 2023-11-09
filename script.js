
let questions = [];

function startQuiz() {
    // Reset quiz variables
    currentQuestionIndex = 0;
    score = 0;
    totalQuestions = 0;
    startTime = new Date().getTime();

    // Hide starting page
    $('#startingPage').hide();
    $('#quizPage').show();

    //fetch quiz questions from fake server
    $.get('https://my-json-server.typicode.com/Alexander1//Web-proj3', function (data) {
    
        const questions = data.questions;
        totalQuestions = questions.length;
        renderQuestions(questions);
    });
}

// Function to render questions
function renderQuestions(questions) {
    // Compile the Handlebars template
    const source = $('#questions-template').html();
    const template = Handlebars.compile(source);
    const context = { questions: questions };
    const html = template(context);
    $('#questionsContainer').html(html);
}

// handles submission of the quiz
function submitQuiz() {
    const selectedAnswer = $('input[name="answer"]:checked').val();
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score++;
        $('#feedbackMessage').html('<p>Brilliant!</p>').show();
        setTimeout(function () {
            $('#feedbackMessage').hide();
            currentQuestionIndex++;
            if (currentQuestionIndex < totalQuestions) {
                renderQuestions(questions[currentQuestionIndex]);
            } else {
                showFinalResult();
            }
        }, 1000);
    } else {
        displayFeedbackView();
}


function handleFeedback() {
    function handleFeedback() {
        $('#feedbackView').hide();
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            renderQuestions(questions[currentQuestionIndex]);
        } else {
            showFinalResult();
        }
    }
    
}
function displayFeedbackView() {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    $('#feedbackView').html(`<p>Incorrect! The correct answer is: ${correctAnswer}</p>
    <button id="gotItButton" class="btn btn-primary mt-3">Got it</button>`).show();
    //shows feedback
}
function showFinalResult() {
    const endTime = new Date().getTime();
    const totalTime = endTime - startTime;
    $('#quizPage').hide();
    $('#finalResult').html(`<h3>Quiz Complete!</h3>
    <p>Your score is: ${score} out of ${totalQuestions}</p>
    <p>Total time taken: ${totalTime} milliseconds</p>`).show();
}
}