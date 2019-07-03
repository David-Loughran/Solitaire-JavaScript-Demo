/**
 * @param {string} title -	JavaScript Solitaire Demo
 * @param {string} author - David Loughran
 * @param {string} date -	7/2/2019
 * 
 */
 
 //Drag and Drop 
function allowDrop(event) {							//allows drop at target div
	event.preventDefault();
}
function drag(event) {									//allows data from draggable div to be moved
	event.dataTransfer.setData("text", event.target.id);
	console.log(event.target.id);
}
function drop(event) {																	//this function accepts the draggable items into the drop location
	event.preventDefault();
	var dropID = event.target.id;
	var data = event.dataTransfer.getData("text");
	
	console.log(data);
		event.target.appendChild(document.getElementById(data)); 			//add the div currently being moved to the target div
		debugger;
		//for (var i=0; i<7; i++){
			//if (dropID == "column" + (i+1)){
				//mess with this
			//dropID.setAttribute(hasCard, true);								//disabling drag feature on target div
		//}
		//}
}

function begin(){											//start basic game functions
	var deck = [];
	generateDeck(deck);
	shuffle(deck);
	var a = 7;
	var temp = 7;
	for (var i=0; i<7; i++){								//recursively call a function to place cards in target divs
		for (a; a>0; a--){
			var card = deck.pop();
			deal(i, card);
		}
		a = temp -1;
		temp--;
	}
}

function deal(i, card){									//place cards in target divs
	var columnID = "column" + (i+1);
	//debugger;
	var check = document.getElementById(columnID).getAttribute("hasCard");
//	debugger;
		if (check == "False"){ //mess with this
			document.getElementById(columnID).appendChild(card);
			document.getElementById(columnID).setAttribute("hasCard", true);
		}
		else {
			
		}
		//debugger;
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
			card.id = "dragCard" + (i + placer) + suit;						//give card div unique id
			card.className = "dragCards";									//place card div into class
			card.innerHTML = (i+ placer) + symbol;
			if (suit == 'H' || suit == 'D'){
				card.style.color = "red";
			} else if (suit == 'C' || suit == 'S'){
				card.style.color = "black";
			}
			card.setAttribute("draggable", true);								//make card draggable
			card.setAttribute("hasCard", "False")
			card.addEventListener("drop", drop, false);					//when drop is initiated on card, enables dropping
			card.addEventListener("dragstart", drag, false);				//when drag is initiated on card, enables dragging
			deck[i] = card;															//sort cards into deck
	}
}

function shuffle(array){
	array.sort(() => Math.random() - 0.5);
}