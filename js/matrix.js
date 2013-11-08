// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
/////////

function Character(x, y, fontSize){
	this.x = x;
	this.y = y;
	this.fontSize = fontSize;
	this.charStr =  String.fromCharCode(0x30A1 + Math.random() * 89);	
}

Character.prototype.draw = function(brightness){
	var shade = 255 - ((255 - brightness) * 2);
	
	cvs.fillStyle = 'rgb(' + shade + ',' + brightness + ',' + shade + ')';
	cvs.font = this.fontSize + "px Arial";
	cvs.fillText(this.charStr, this.x, this.y);
};


function Stream(){	
	this.x = Math.random() * canvas.width;
	this.y = Math.random() * canvas.height;
	this.fontSize = Math.random() * (48 - 5) + 5;
	
	this.stream = [];
}

Stream.prototype.nextChar = function(){
	this.y += this.fontSize;
	return new Character(this.x, this.y + this.fontSize, this.fontSize);
};

Stream.prototype.isDead = function(){
	return this.stream.length === 0;
}

Stream.prototype.draw = function(){
	if(this.y < canvas.height){
		var c = this.nextChar();
		this.stream.unshift(c);
	}
	
	var brightness = 255;
	for(var i=0; i<this.stream.length; i++){
		this.stream[i].draw(brightness);
		if(brightness <= 0 || this.stream[i].y >= canvas.height)
			this.stream.pop();
		
		brightness -= 30;
	}
};


var cvs;
window.onload = function(){
	canvas.width = window.screen.width;
	canvas.height = window.screen.height;
	cvs = canvas.getContext("2d");
	
	var clearArtifacts = function(){
		cvs.clearRect(0, 0, canvas.width, canvas.height);
	};
	
	var streams = [];
	
	var drawMatrix = function(){
		if(streams.length < 50){
			var s = new Stream;
			s.draw();
			streams.push(s);
		}
		
		clearArtifacts();
		for(var i=0; i<streams.length; i++){
			if(streams[i].isDead()){
				streams.remove(i);
			}else{
				streams[i].draw();
			}
		}
	};
	
	setInterval(drawMatrix, 80);
};
