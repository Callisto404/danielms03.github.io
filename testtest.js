//Store info about the canvas in variable 
context = document.getElementById('canvas').getContext("2d");
//Variables
//Basic drawing
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
//Colours
var selectedColour = "black";
var clickColour = new Array();
var activeColourButton = 'black';
activeColour = document.getElementById(activeColourButton);
activeColour.style.backgroundColor = "#9e9e9e";
//Hex picker
var redValue = 0;
var greenValue = 0;
var blueValue = 0;
//Sizes
var small = 3;
var medium = 5;
var large = 10;
var omegalarge = 60;
var size = medium;

var clickSize = new Array();
var activeSizeButton = "medium";
activeSize = document.getElementById(activeSizeButton);
activeSize.style.backgroundColor = "#9e9e9e";

//Functions
//Colour select
function selectColour(event) {
	activeColour.style.backgroundColor = "#dedfe0" //Deactivate previous colour
	activeColourButton = event.target.id; //Get selected button
	activeColour = document.getElementById(activeColourButton); //Get element
	activeColour.style.backgroundColor = "#9e9e9e"; //Activate button
	selectedColour = activeColourButton; //Selecting colour for actual drawing
	console.log(redValue + " " + greenValue + " " + blueValue)
}
//Hex picker
/*
function selectHex(event) {
	var redValue = document.getElementById("red").value;
	var greenValue = document.getElementById("green").value;
	var blueValue = document.getElementById("blue").value;
	console.log(redValue);
}
*/
//Size Select
function selectSize(event) {
	activeSize.style.backgroundColor = "#dedfe0" //Deactivate previous colour
	activeSizeButton = event.target.id; //Get selected button
	activeSize = document.getElementById(activeSizeButton); //Get element
	activeSize.style.backgroundColor = "#9e9e9e";
	if (activeSizeButton == 'small') {
		size = small; //Selecting size for actual drawing
	} else if (activeSizeButton == 'medium') {
		size = medium //Selecting size for actual drawing
	} else if (activeSizeButton == 'large') {
		size = large; //Selecting size for actual drawing
	} else if (activeSizeButton == 'omegalarge') {
		size = omegalarge; //Selecting size for actual drawing
	}
}

//Mouse down event 
function down(event) {
	//Get mouse coords
	var mouseX = event.clientX - canvas.offsetLeft; 
	var mouseY = event.clientY - canvas.offsetTop;
	paint = true; // Start painting
	addClick(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop); //Add coords to array
	redraw(); //Draw
}

//Mouse move event
function move(event) {
	if (paint) {
		addClick(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop, true); //Add clicks while dragging
		redraw(); //Draw
	}
}

//Mouse up event
function up(event) {
	paint = false; //Stop drawing
}

//Mouse leave event
function leave(event) {
	paint = false; //Stop drawing
}

//Adding clicks to arrays
function addClick(x, y, dragging) {
	//Add details to arrays - xcoords, ycoords, dragging?, colour, size
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
	clickColour.push(selectedColour);
	clickSize.push(size);
}

//Actually drawing
function redraw() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
	context.lineJoin = "round";
	for (var i=0; i < clickX.length; i++) {
	context.beginPath(); //Place marker down
	if (clickDrag[i] && i) {
		context.moveTo(clickX[i-1], clickY[i-1]); //Move marker to next position
	} else {
		context.moveTo(clickX[i]-1, clickY[i]);
	}
	context.lineTo(clickX[i], clickY[i]); //Actually draws line
	context.closePath();
	context.strokeStyle = clickColour[i]; //Changes colour
	context.lineWidth = clickSize[i]; //Changes size
	context.stroke();
	}
}