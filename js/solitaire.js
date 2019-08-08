/**
 * @param {string} title -	JavaScript Solitaire Demo
 * @param {string} author - David Loughran
 * @param {string} date -	8/8/2019
 * 
 */
 
 //Drag and Drop 
function allowDrop(event) {							//allows drop at target div
	event.preventDefault();
}
var parentID = [];
function drag(event) {									//allows data from draggable div to be moved
	
	/*
	
	
	DEVLIN SAID MAKE AN ARRAY AND JUST GRAB THE FIRST ONE ARRAY[0]
	
	
	MAYBE ALSO USE A STACK IDFK
	
	
	
	*/
	//debugger;
	//var parentID = event.currentTarget.closest("#dragCard");
	//console.log(parentID);
	//document.getElementById(parentID).setAttribute("hasCard", false);

	event.dataTransfer.setData("text", event.target.id);
	parentID.push(event.currentTarget.parentElement.id);
	//break;
}
function drop(event) {																	//this function accepts the draggable items into the drop location
	event.preventDefault();
	var dropID = event.target.id;
	var data = event.dataTransfer.getData("text");
	var parentColor = document.getElementById(dropID).getAttribute("holder");
	var childColor = document.getElementById(data).getAttribute("holder");	

	//check if both cards are same color before allowing the drop
	if (parentColor != childColor) {
		//check if drag card can be placed onto drop card based on number
		if (data[0] == "A" && dropID[0] == 2) {
			cardPlacer(dropID, parentID, data);
		} else if (data[0] == 2 && dropID[0] == 3) {
			cardPlacer(dropID, parentID, data);
		} else if (data[0] == 3 && dropID[0] == 4) {
			cardPlacer(dropID, parentID, data);
		} else if (data[0] == 4 && dropID[0] == 5) {
			cardPlacer(dropID, parentID, data);
		} else if (data[0] == 5 && dropID[0] == 6) {
			cardPlacer(dropID, parentID, data);
		} else if (data[0] == 6 && dropID[0] == 7) {
			cardPlacer(dropID, parentID, data);
		} else if (data[0] == 7 && dropID[0] == 8) {
			cardPlacer(dropID, parentID, data);
		} else if (data[0] == 8 && dropID[0] == 9) {
			cardPlacer(dropID, parentID, data);
		} else if (data[0] == 9 && dropID[0] == "T") {
			cardPlacer(dropID, parentID, data);
		} else if (data[0] == "T" && dropID[0] == "J") {
			cardPlacer(dropID, parentID, data);
		} else if (data[0] == "J" && dropID[0] == "Q") {
			cardPlacer(dropID, parentID, data);
		} else if (data[0] == "Q" && dropID[0] == "K") {
			cardPlacer(dropID, parentID, data);
		}  else if (data[0] == "K" && dropID[0] == "c") {
			cardPlacer(dropID, parentID, data);
		}
		emptyStack(parentID);
	} else {
		//allow the Ace to be placed onto the end fields
		if (data == "A&#9829" && dropID[0] == "e" && dropID[7] == "H") {
			document.getElementById(dropID).innerHTML = "";
			cardPlacer(dropID, parentID, data);
		} else if (data == "A&#9830" && dropID[0] == "e" && dropID[7] == "D") {
			document.getElementById(dropID).innerHTML = "";
			cardPlacer(dropID, parentID, data);
		} else if (data == "A&#9827" && dropID[0] == "e" && dropID[7] == "C") {
			document.getElementById(dropID).innerHTML = "";
			cardPlacer(dropID, parentID, data);
		} else if (data == "A&#9824" && dropID[0] == "e" && dropID[7] == "S") {
			document.getElementById(dropID).innerHTML = "";
			/*
			CONSIDER MESSING WITH FONT SIZE HERE
			
			
			*/
			cardPlacer(dropID, parentID, data);
		}
		emptyStack(parentID);
	}
}

//empty the stack
function emptyStack(parentID) {
	if (parentID.length > 0) {
		for (var a=0; a<parentID.length; a++) {
		parentID.pop();
		}
	}
}

//place the target card in the target location
function cardPlacer(dropID, parentID, data) {
	var check = document.getElementById(dropID).getAttribute("hasCard");
	if (check === "false"){
		if (parentID.length > 0) {
			event.target.appendChild(document.getElementById(data)); 			//add the div currently being moved to the target div
			document.getElementById(dropID).setAttribute("hasCard", true);
			setter(parentID[0]);
			parentID.length = 0;
		}
	}
}

//make the next card in the tree "face up"
function setter(passedID) {	
	if (passedID[0] != "c") {
		document.getElementById(passedID).style.backgroundColor = "white";
		var grabber = document.getElementById(passedID).getAttribute("holder");
		document.getElementById(passedID).style.color = grabber;
		document.getElementById(passedID).setAttribute("draggable", true);
		document.getElementById(passedID).addEventListener("dragstart", drag, false);
		
		flipCard(passedID);
	}
		document.getElementById(passedID).setAttribute("hasCard", false);
}

function flipCard(passedID) {
			if (passedID[0] == "T") {
			if (passedID == "T&#9829") { var symbol = "&#9829";}
			else if (passedID == "T&#9830") { var symbol = "&#9830";} 
			else if (passedID == "T&#9827") { var symbol = "&#9827";} 
			else if (passedID == "T&#9824") { var symbol = "&#9824";}	
			document.getElementById(passedID).innerHTML = 10 + symbol;
		} else {
			document.getElementById(passedID).innerHTML = passedID;
		}
}

function begin(){											//start basic game functions
	var deck = [];
	generateDeck(deck);
	shuffle(deck);
	var a = 7;
	var temp = 7;
	var cID = "none";
	for (var i=6; i>(-1); i--){								//recursively call a function to place cards in target divs
		for (a; a>0; a--){
			var card = deck.pop();
			var tempID = card.id;
			//debugger;
			deal(i, card, cID, a);							//pass the ID of the previously passed card
			cID = tempID;
		}
	//	debugger;
		cID="none";		//reset the ID tracker
		a = temp -1;
		temp--;
	//	debugger;
	}
	finishDeal(deck);
}

function dealToStack(card, cID) {
	if (cID == "none") {
		deckDown.appendChild(card);
	} else {
		document.getElementById(cID).appendChild(card);
	}
}

//deal out the remaining cards to the target area
function finishDeal(deck) {
	var cID = "none";
	for (var a=0; a<deck.length; a++) {
		var card = deck.pop();
		var tempID = card.id;
		
		dealToStack(card, cID);
		cID = tempID;
	}
}

//check available cards from side deck
function checkCard() {
	
}

function deal(i, card, cID, a){									//place cards in target divs
	var columnID = "column" + (i+1);

		if (a == 1){
			card.style.backgroundColor = "white";
			var grabber = card.getAttribute("holder");
			card.style.color = grabber;	
			card.setAttribute("draggable", true);
			card.addEventListener("dragstart", drag, false);				//when drag is initiated on card, enables dragging
			addText(card);
		} 
		if (cID == "none"){
			document.getElementById(columnID).appendChild(card);
			document.getElementById(columnID).setAttribute("hasCard", true);
			if (a != 1) {
				card.innerHTML = "-";
			}
			//card.setAttribute("draggable", false);
		} else {
			document.getElementById(cID).appendChild(card);
			document.getElementById(cID).setAttribute("hasCard", true);
			if (a != 1) {
				card.innerHTML = "-";
			}
			//if (a > 1) { card.setAttribute("draggable", false); }
		}		
}

//set the displayed information on each card div to the desired value
function addText(card) {
	var cardID = card.id;
	if (cardID[0] == "T") {
		if (cardID == "T&#9829") { var symbol = "&#9829";}
		else if (cardID == "T&#9830") { var symbol = "&#9830";} 
		else if (cardID == "T&#9827") { var symbol = "&#9827";} 
		else if (cardID == "T&#9824") { var symbol = "&#9824";}	
		card.innerHTML = 10 + symbol;
	} else {
		card.innerHTML = cardID;
	}
}

//generate standard 52 card deck
function generateDeck(deck){
	var suit = 'H';
	var symbol = '&#9829';
	var placer = 1;
	for (var i=0; i<52; i++){									
		if (i > 12 && i < 26){					//move to next suit
			suit = 'D';
			symbol = '&#9830';
			placer = -12;
		} else if (i > 25 && i < 38){			//move to next suit
			suit = 'C';
			symbol = '&#9827';
			placer = -25;
		} else if (i > 38 && i < 52){			//move to next suit
			suit = 'S';
			symbol = '&#9824';
			placer = -38;
		}
			var card = document.createElement("div");					//make card div
			//create a unique id for each card div
			cardNumber = i + placer;
			if (cardNumber > 9) {
				switch (cardNumber) {
					case 10: var cardID = "T" + symbol;
					break;
					
					case 11: var cardID = "J" + symbol;
					break;
					
					case 12: var cardID = "Q" + symbol;
					break;
					
					case 13: var cardID = "K" + symbol;
					break;
					
				}
			} else if (cardNumber == 1) {
				var cardID = "A" + symbol;
			}  else {
				var cardID = (cardNumber) + symbol;
			}
			card.id = cardID;														//give card div unique id
			card.className = "dragCards";									//place card div into class
			//card.innerHTML = "-";
			if (suit == 'H' || suit == 'D') {
				card.setAttribute("holder", "red");
			} else if (suit == 'C' || suit == 'S') {
				card.setAttribute("holder", "black");
			}
			//card.setAttribute("draggable", false);								//make card draggable
			//debugger;
			card.setAttribute("hasCard", false)
			card.style.backgroundColor = "lightblue";
			card.style.color = "lightblue";
			//debugger;
			card.addEventListener("drop", drop, false);					//when drop is initiated on card, enables dropping


			deck[i] = card;															//sort cards into deck
	}
}

function shuffle(array){
	array.sort(() => Math.random() - 0.5);
}