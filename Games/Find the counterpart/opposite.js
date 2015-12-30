var score = 0;
var viewed_question_index = [];     			// list of viewed questions
var question;  									// the question
var len = Object.keys(hindi).length;			// number of words in reference
var submit_clicked = false;						// submit clicked status
var comment = document.getElementById('comments');
setQuestion();

//=======================  show next question  =====================

function next()
{
	setSubmitPropertyAsUnsubmitted();
	submit_clicked = false;
	console.log("num_of_choices: "+num_of_choices);
	document.getElementById('question').innerHTML = "";
	document.getElementById('choices').innerHTML = "";
	setQuestion();
}
//==================================================================


function setQuestion(){
//====================generating distinct random index==============
	
	comment.innerHTML = "Please choose an option or pass the question by clicking on next";

	while(true)
	{
		var random_question_index = Math.floor(Math.random()*len);
		console.log(isNew(random_question_index));

		if (isNew(random_question_index))
		{
			viewed_question_index.push(random_question_index);
			console.log("viewed: " + viewed_question_index);
			question = Object.keys(hindi)[random_question_index];
			break;
		}
	}

console.log(question);

//put the question==================================================
var ques = document.getElementById('question');
ques.innerHTML = question;

put_choices();
//document.getElementById('question').innerHTML = "";
//document.getElementById('choices_box').innerHTML = "";
}

//==================================================================

//putting choices===================================================
function put_choices()
{
	var choices = [];
	choices[0] = hindi[question][0];
	var i = 1;
	while (i < num_of_choices)
	{
		var choice = Object.keys(hindi)[Math.floor(Math.random()*len)];
		if(choice != question)
		{
			choices[i++] = hindi[choice][0];
		}
	}

	console.log("original : "+choices);
	choices = shuffleArray(choices);
	console.log("shuffled : "+choices);

	addChoicesToUI(choices);
}



//=====================checking if the question is not repeated==============

function isNew(index)
{
	if (viewed_question_index.indexOf(index) != -1)
	{
		return false;
	}
	else
		return true;
}
//===========================================================================

//===================== shuffle the array ===================================
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
//===========================================================================



//=======================adding the choices to the UI==================================

function addChoicesToUI(choices_array)
{
	var choice_set = document.getElementById('choices');
	console.log("choice_set : "+choice_set);

	for (i = 0; i < choices_array.length; i++)
	{
		var opt = document.createElement('input');
		opt.type = "radio";
		opt.id = "choice";
		opt.name = "antonym";
		opt.value = choices_array[i];
			//opt.innerHTML += choices[i];
		choice_set.appendChild(opt);
		choice_set.innerHTML += "&nbsp;&nbsp;&nbsp;"+choices_array[i];
		choice_set.innerHTML += "<br><br>";
	}
}

//==============================================================

// change submit button background on click========================================
function setSubmitPropertyAsSubmitted()
{
	var submit = document.getElementById('submit');
	submit.setAttribute("style","background-color:rgb(100,100,100);");
}
//=================================================================================

// revert changes to submit button background color================================
function setSubmitPropertyAsUnsubmitted()
{
	var submit = document.getElementById('submit');
	submit.setAttribute("style","background-color:rgb(221,221,221);");
}
//=================================================================================

//=============================  check if any option is selected or not  ================
function empty_shot()
{
	var antonyms = document.getElementsByName("antonym");
	var allunchecked = true;

	for (var k = 0; k < antonyms.length; k++)
	{
		if (antonyms[k].checked)
		{
			allunchecked = false;
			break;
		}
	}

	return allunchecked;
}


//=====================evaluation=================================

function evaluate()
{

	if (!submit_clicked)
	{
		console.log('great');
		submit_clicked = true;
		//==============================fetching options=====================================
		var antonyms = document.getElementsByName("antonym");
		var correct = false;

		if (empty_shot())
		{
			//alert("Please select one option first");
			comment.innerHTML = "Please select an option first";
			submit_clicked = false;
			//console.log("submit_clicked: " + submit_clicked);
			return;
		}
		
		setSubmitPropertyAsSubmitted();

		for(var i = 0 ; i<antonyms.length;i++)
		{
			if (antonyms[i].checked && antonyms[i].value == hindi[question][0])
			{
				comment.innerHTML = "Bravo! keep it up";
				correct = true;
				score += 4;
				break;
			}
		}

		if (!correct)
		{
			score -= 2;
			comment.innerHTML = "Tough luck pal! I'll have to deduct 2 marks. Move to the next question now";
		}
		
		showScore();
		//console.log("this is the array : " + antonyms[0].value);
	}
}

function showScore()
{
	var score_tag = document.getElementById('score');
	score_tag.innerHTML = score;
	console.log(score);
}