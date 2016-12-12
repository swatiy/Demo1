var GraphicLine = function(){
	
	this.strtLine = null;
	this.group = null;
	
	this.point1 = 0;
	this.point2 = 0;
	this.point3 = 0;
	this.point4 = 0;
	this.anchorSet = false;
	
};

GraphicLine.prototype.startLine = function(stage, lineType, lineLayer){
	
	
	this.strtLine = new Konva.Line({
		points: [10, 10, 110, 10],
		stroke: 'green',
		strokeWidth: 5,
		draggable: false
		
	});
	
	this.group = new Konva.Group({
		draggable: false
	});
	
	this.group.add(this.strtLine);
	this.addEvent();
	MainCanvas.inst.lineLayer.add(this.group);
  MainCanvas.drawCanvas();
	
	
};

GraphicLine.prototype.getPoints = function(){
	return this.strtPoint.getPoints();
};

GraphicLine.prototype.addEvent = function(){
	
	var _this = this;
	
	this.group.on("click touchstart", function(e){
	  
	  if(MainCanvas.inst.setPointer){
	    _this.select();
	  }
		
	
	});
	
	this.group.on("mouseover", function(e){
		_this.group.setDraggable(true);        
		document.body.style.cursor = "pointer";
	});
	
	this.group.on("mouseout touchend", function(e){
		_this.group.setDraggable(false);        
		document.body.style.cursor = "pointer";
	});
	
	this.group.on("dragstart", function(e){
	  //drag the line
		var mp = MainCanvas.inst.stage.getPointerPosition();
		MainCanvas.inst.lineDraggable = true;
		
	}); 
	
	this.group.on("dragend touchend", function(e){
		//do something
		//after stop drag line -- update line points to draaged coords
		if(MainCanvas.inst.lineDraggable === true){
		  var mp = MainCanvas.inst.stage.getPointerPosition();
		  _this.updateLineCoords(mp);
		  MainCanvas.inst.lineDraggable = false;
		}
	});
	
};

GraphicLine.prototype.select = function(){
	var _this = this;
	if(this.anchorSet){
		/*this.anchor1.anchor.remove();
		this.anchor2.anchor.remove();*/
		
		this.anchor1.anchor.destroy();
		this.anchor2.anchor.destroy();
		
		
		this.anchor1 = null;
		this.anchor2 = null;
		this.anchorSet = false;
		MainCanvas.drawCanvas();
	}
	this.anchor1 = new AddAnchor(this.strtLine.getPoints()[0], this.strtLine.getPoints()[1], this, false );
	this.anchor2 = new AddAnchor(this.strtLine.getPoints()[2], this.strtLine.getPoints()[3], this, true );
	
	this.group.add(this.anchor1.getAnchor());
	this.group.add(this.anchor2.getAnchor());
	this.anchorSet = true;
	MainCanvas.drawCanvas();
	
};

GraphicLine.prototype.moveAnchorPoint = function(mp, selectedAnchor){
	
	if(!selectedAnchor){
		this.strtLine.getPoints()[0] = mp.x;
		this.strtLine.getPoints()[1] = mp.y;
	}else if(selectedAnchor){
		this.strtLine.getPoints()[2] = mp.x;
		this.strtLine.getPoints()[3] = mp.y;
	}
	MainCanvas.drawCanvas();
};

GraphicLine.prototype.updateLineCoords = function(coords){
  //update line coords to new dragged position.
};

