// Code goes here
var MainCanvas = (function() {

  var inst = {
    width: 644,
    height: 344,
    containerID: "id-canvasID",
    stage: null,
    rect: null,
    lineLayer: new Konva.Layer({
      name: 'canvasLayer'
    }),
    imageLayer: new Konva.Layer({
      name: 'backEndImage'
    }),
	objectLayer: null,

    image: null,
    context: null,
    line: null,
    pos: null,
    setPointer: false,
    setLine: true,
    lineDraggable: false,

  };

  var constructStage = function() {
    inst.stage = new Konva.Stage({
      width: inst.width,
      height: inst.height,
      container: inst.containerID,


    });
    /* inst.backRectangle = new Konva.Rect({
      x: 0,
      y: 0,
      width: inst.stage.getWidth(),
      height: inst.stage.getHeight(),
    }); */

    loadStage();
	
    inst.stage.add(inst.lineLayer);
    setStageClip();

  };

  
  var setStageClip = function(){
	  
	/* var PX = 'px';
    var radius_PX1 = '0px';
    var radius_PX = 50; // calulated as per acr radius wanted
    
    
    // according to image selected set corner radius.
    
    var top_left_radius = radius_PX + PX;
    var top_right_radius = radius_PX + PX;
    var bottom_left_radius = radius_PX + PX;
    var bottom_right_radius = radius_PX + PX;
  
    $('.konvajs-content').css({
      
      border: '2px solid #aaa',
      // borderRadius: '50px',
    
      borderTopLeftRadius: top_left_radius, //'50px',
	  borderTopRightRadius: top_right_radius, // '50px',
      borderBottomRightRadius: bottom_left_radius, //'50px',
      borderBottomLeftRadius: bottom_right_radius, // '50px'

    });
    
    $('canvas').css({
          
        border: '0px solid #aaa !important',
        // borderRadius: '50px',
      
      	borderTopLeftRadius: top_left_radius, // '50px',
      	borderTopRightRadius: top_right_radius, // '50px',
        borderBottomRightRadius: bottom_left_radius, // '50px',
        borderBottomLeftRadius: bottom_right_radius, // '50px'
		
    });
     */
	  
	inst.lineLayer.clipFunc(function(ctx){
		//ctx.save();
		//ctx.beginPath();
		// ctx.rect(0, 0, inst.width, inst.height);
		ctx.rect(0, inst.width, 0, inst.height, Math.PI * 2, false);
		//ctx.arc(150, 120, 60, 0, Math.PI * 2, false);
		//ctx.clip();
		//ctx.restore();
	});
	  
	  /* inst.lineLayer.clipX(10);
	  inst.lineLayer.clipY(10);
	  inst.lineLayer.clipWidth(inst.width);
	  inst.lineLayer.clipHeight(inst.height);
	  
		 
    
	  inst.lineLayer.clip({
		  x: 10,
		  y: 10,
		  width: inst.width,
		  height: inst.height,
		  
	  }); */
	  
  };
  
  
  var getStage = function() {
    return inst.stage;
  };

  var loadStage = function() {

    inst.stage.add(inst.imageLayer);

    var imageObj = new Image(); 
    inst.image = new Konva.Image({
      x: 0,
      y: 0,
      image: imageObj,
      width: inst.width,
      height: inst.height,
      name: "backEndImage",
      //stroke: 'green',
      //shadowBlur: 5,


    });

    inst.imageLayer.add(inst.image);
    inst.imageLayer.draw();



  };

  var startLine = function() {
    inst.selectedLine = new GraphicLine();
    inst.selectedLine.startLine(inst.stage, 0, inst.lineLayer);
  };


  var drawCanvas = function() {
    inst.lineLayer.drawScene();
    inst.lineLayer.drawHit();

  };

  var addEventToStage = function() {

    $('#id-select-tool').on("click", function(evnt) {
      inst.setPointer = true;
      inst.setLine = false;
      document.body.style.cursor = "pointer";
    });


    $('#id-draw-tool').on("click", function(evnt) {
      inst.setPointer = false;
      inst.setLine = true;
      document.body.style.cursor = "crosshair";
    });

    inst.stage.on("mousedown touchstart", function(evnt) {

      var mp = inst.stage.getPointerPosition();
      inst.pos = mp;
      console.log("e.type = " + evnt.type + " ... pos = " + JSON.stringify(inst.pos));
      if (inst.setPointer === true) {
        //select tools activated
      } else if (inst.setLine === true) {
        startLine();
      }


    });
    inst.stage.on("mouseup touchend", function(evnt) {
       console.log("script e.type = "+ evnt.type);
    });
    inst.stage.on("mouseleave", function(evnt) {
       console.log("script e.type = "+ evnt.type);
    });
    inst.stage.on("mousemove touchmove", function(evnt) {
      console.log("script e.type = "+ evnt.type);
    });

    inst.stage.on("click touchstart", function(e){
      console.log("script e.type = "+ e.type);
      if(inst.setPointer){
        return;
      }
    });
    /*inst.stage.on();*/


  };



  return {

    init: function() {
      // console.log("init");
      constructStage();
      addEventToStage();
    },
    getStage: function() {
      // console.log("getStage");
      return getStage();
    },
    startLine: function() {
      startLine();
    },
    drawCanvas: function() {
      drawCanvas();
    },
    inst: inst,

  }



}($));

$(document).ready(function() {
  // console.log("doc ready");
  MainCanvas.init();
});