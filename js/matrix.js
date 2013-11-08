function Character(x, y, fontSize){
	this.x = x? x : Math.random() * canvas.width;
	this.y = y? y : Math.random() * canvas.height;
	this.fontSize = fontSize? fontSize : Math.random() * (30 - 5) + 5;
	this.charStr =  String.fromCharCode(0x30A1 + Math.random() * 89);
}

Character.prototype.isDead = function(){
	return this.y > canvas.height;
}

Character.prototype.nextCharacter = function(){
	this.draw(0);
	
	if(this.isDead()){
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
window.onload = function(){
	canvas.width = window.screen.width;
	canvas.height = window.screen.height;
	cvs = canvas.getContext("2d");
	
	var fadeCanvas = function(){
		cvs.fillStyle = 'rgba(0, 0, 0, 0.25)';
		cvs.fillRect(0, 0, canvas.width, canvas.height);
	};
	
	var streams = [];
	var drawMatrix = function(){
		fadeCanvas();
		if(streams.length < 10){
			var s = new Character;
			s.draw(255);
			streams.push(s);
		}
		
		for(var i=0; i<streams.length; i++){
			streams[i] = streams[i].nextCharacter();
			streams[i].draw(255);
		}
	};
	
	setInterval(drawMatrix, 80);
};
