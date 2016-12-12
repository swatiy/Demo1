var AddAnchor = function(x, y, line, selectedAnchor) {

  this.stdLine = line;
  this.anchor = null;
  this.draw(x, y);
  this.addEvent();
  this.selectedAnchor = selectedAnchor;

  // alert("addAnchor file");
};

AddAnchor.prototype.draw = function(x, y) {

  this.anchor = new Konva.Circle({
    x: x,
    y: y,
    radius: 10,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    draggable: true
  });
};


AddAnchor.prototype.getAnchor = function() {
  return this.anchor;
};


AddAnchor.prototype.addEvent = function() {

  var _this = this;
  this.anchor.on("mouseover touchstart", function(e) {
    console.log("anchor e.type = "+ e.type);
    _this.anchor.setDraggable(true);
    document.body.style.cursor = "pointer";
  });

  this.anchor.on("mouseout touchend", function(e) {
    console.log("anchor e.type = "+ e.type);
    _this.anchor.setDraggable(false);
    document.body.style.cursor = "pointer";
  });

  this.anchor.on("dragmove", function(e) {
    
    console.log("anchor e.type = "+ e.type);

    if (_this.stdLine !== null) {
      var new_pos = MainCanvas.inst.stage.getPointerPosition();
      _this.stdLine.moveAnchorPoint(new_pos, _this.selectedAnchor);
    }

  });
  this.anchor.on("dragend touchend", function(e) {
    
    console.log("anchor e.type = "+ e.type);
    
    _this.stdLine.select();
  });

};