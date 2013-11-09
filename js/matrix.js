function Character(x, y, fontSize){
	this.x = x? x : Math.random() * canvas.width;
	this.y = y? y : Math.random() * canvas.height;
	this.fontSize = fontSize? fontSize : Math.random() * (30 - 5) + 5;
	this.charStr =  String.fromCharCode(0x30A1 + Math.random() * 89);
	
	this.draw(255);
}

Character.prototype.isDead = function(){
	return this.y > canvas.height;
};

Character.prototype.nextCharacter = function(){
	this.draw(0);
	
	if(this.isDead() || Math.random() < 0.01){
		return new Character;
	}else{
		return new Character(this.x, this.y + this.fontSize, this.fontSize);
	}
};

Character.prototype.draw = function(brightness){	
	cvs.fillStyle = 'rgb(' + brightness + ',' + 255 + ',' + brightness + ')';
	cvs.font = this.fontSize + "px Arial";
	cvs.fillText(this.charStr, this.x, this.y);
};


var cvs;
var enterMatrix = function(){
	var elem = document.getElementById("canvas");
	if (elem.requestFullscreen) {
	  elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) {
	  elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
	  elem.webkitRequestFullscreen();
	}
	
	canvas.width = window.screen.width;
	canvas.height = window.screen.height;
	cvs = canvas.getContext("2d");
	
	var fadeCanvas = function(){
		cvs.fillStyle = 'rgba(0, 0, 0, 0.25)';
		cvs.fillRect(0, 0, canvas.width, canvas.height);
	};
	
	var maxStreams = 50;
	var streams = [];
	for(var i=0; i<maxStreams; i++)
		streams.push(new Character);
	
	var drawMatrix = function(){
		fadeCanvas();
		streams = streams.map(function(s){ return s.nextCharacter(); });
	};
	
	setInterval(drawMatrix, 80);
};
