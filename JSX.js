	var stepNum = 1;
    var answer;
    var word = new String("");
    var guessed = new String("");
    var guessedCorrect = [];
    var correctChars = 0;
    
    function setAnswer() {
    	var i = Math.floor(Math.random() * 22);
    	var wordBank = [];
    	wordBank[0] = "pulled pork";
		wordBank[1] = "sheep";
		wordBank[2] = "elephant";
		wordBank[3] = "mandarin orange";
		wordBank[4] = "banana";
		wordBank[5] = "sour cream";
		wordBank[6] = "hermit crab";
		wordBank[7] = "mantis shrimp";
		wordBank[8] = "american buffalo";
		wordBank[9] = "flying squirrel";
		wordBank[10] = "mountain chicken";
	    wordBank[11] = "mountain goat";
	    wordBank[12] = "baked ziti";
	    wordBank[13] = "penne carbonara";
	    wordBank[14] = "wild mushroom ravioli";
	    wordBank[15] = "white chocolate cheese cake";
	    wordBank[16] = "french onion soup";
	    wordBank[17] = "macaroons";
	    wordBank[18] = "beef stroganoff";
	    wordBank[19] = "steak tartare";
	    wordBank[20] = "shrimp fried rice";
	    wordBank[21] = "leafy seadragon";
	    answer = wordBank[i];
    }
    
   
    function updateImage(){
    	var image = document.getElementById('currStep');
    	image.src = "step" + stepNum + ".png";
    	stepNum++;
    	if (stepNum == 9) {
    		alert('You Lost :(');
    	}
    }
    function initializeWord(){
    	var i;
    	for (i=0; i < answer.length; i++){
    		if (answer.charAt(i) === ' '){
    			word = word.concat("<br/>");
    		} else {
    			word = word.concat('_ ');
    		}
    		
    	}
    
    }
    function updateWord(){
    	document.querySelector('.left').innerHTML = word;
    }
    
    function updateGuessed() {
    	document.querySelector('.right').innerHTML = guessed;
    }
    
    function findIndicies(chr){
    	var i = 0;
    	var found = [];
    	while (answer.indexOf(chr,i) != -1) {
    		i = answer.indexOf(chr,i);
    		found.push(i);
    		i++;
    	}
    	findIndiciesToReplace(found);
    	return found;
    }
    function findIndiciesToReplace(arr){
    	var i = 0;
    	var j = 0;
    	var found = [];
    	for (i = 0; i < answer.length; i++){
    		if (arr.indexOf(i) != -1) {
    			found.push(j);
    		}
    		if (answer.charAt(i) == ' ') {
    			j = j + 5;
    		} else {
    			j = j + 2;
    		}
    	}
    	return found;
    }
   
    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
    }
    
    function replaceIndicies(arr,chr){
    	var i;
    	for (i = 0; i < arr.length; i++){
    		word = setCharAt(word,arr[i],chr);
    		correctChars++;
    	}
    }
    
    function checkIfGuessed(guess){
    	if (guessedCorrect.indexOf(guess) == -1) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    function tryGuess() {
    	var guess = document.getElementById('textBox').value;
    	var charLocat = answer.indexOf(String(guess));
    	var answerInds = findIndicies(guess);
    	var wordInds = findIndiciesToReplace(answerInds);
    	document.getElementById('textBox').value = "";
    	
    	if (guess != null){
    		if (guess.length == 1) {
    			if (charLocat != -1) {
    				if (checkIfGuessed(guess)) {
    					replaceIndicies(wordInds,guess);
    					updateWord();
    					guessedCorrect.push(guess);
    				
    					if (correctChars == answer.replace(/\s/g, '').length){
    						alert('Correct!');
    					}	
    				} else {
    					alert('Already Guessed');
    				}
    			} else {
    				if (guessed.indexOf(String(guess)) == -1) {
    					if (guessed.length == 0) {
    						updateImage();
    						guessed = guessed.concat(String(guess));
    						updateGuessed();
    					} else {
    						guessed = guessed.concat( ', ',String(guess));
    						updateGuessed();
    						updateImage();
    					}
    				} else {
    					alert('Already Guessed');
    				}
    			}
    		} else if (guess.length == answer.length) {
    			if (answer === guess) {
    				alert('Correct! You win!');
    			}
    		} else {
    			alert('Invalid Guess Format');
    		}
    	}
    }
    
    function clickEvent() {
    	if (document.getElementById('textBox').value.length != 0){
    		tryGuess();
    	} else {
    		alert('Please enter a guess');
    	}
    }