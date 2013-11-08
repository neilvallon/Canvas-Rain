var cvs;

function Character(x, y, fontSize){
	this.charStr =  String.fromCharCode(0x30A1 + Math.random() * 89);
	this.fontSize = fontSize? fontSize : Math.random() * (30 - 5) + 5;
	
	this.x = x? x : Math.random() * canvas.width;
	this.y = y? y : Math.random() * canvas.height;
	this.brightness = 255;
	
	if(this.y < canvas.height){
		setTimeout(function(){ this.makeChild(); }.bind(this), 80);
	}
}

Character.prototype.makeChild = function(){
	if(Math.random() < 0.01) return; //die

	var c = new Character(this.x, this.y + this.fontSize, this.fontSize);
	c.draw();
};

Character.prototype.draw = function(){
	var shade = 255 - ((255 - this.brightness) * 2);
	
	cvs.fillStyle = 'rgb(' + shade + ',' + this.brightness + ',' + shade + ')';
	cvs.font = this.fontSize + "px Arial";
	cvs.fillText(this.charStr, this.x, this.y);
	
	this.brightness -= 5;
	if(this.brightness > 0)
		setTimeout(function(){ this.draw(); }.bind(this), 15);
};


window.onload = function(){
	canvas.width = window.screen.width;
	canvas.height = window.screen.height;

	cvs = canvas.getContext("2d");

	var createStream = function(){
		var c = new Character;
		c.draw();
	};
	var clearArtifacts = function(){
		cvs.clearRect(0, 0, canvas.width, canvas.height);
	};

	setInterval(createStream, 45);
	setInterval(clearArtifacts, 1000);
};
