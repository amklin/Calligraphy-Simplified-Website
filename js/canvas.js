
//trigger for button
const trigger = document.querySelector("menu > .trigger");
trigger.addEventListener('click', (e) => {
  e.currentTarget.parentElement.classList.toggle("open");
});

//onoff button turns canvas on and off
//resets everything, so previous work disappears
$("#reset").click(function () {
  //initiates canvas variables
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext('2d');
  //Resizing
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  //when mouse is clicked
  canvas.addEventListener('mousedown', function (e) {
    this.down = true;
    this.X = e.clientX;   //NOT e.pageX
    this.Y = e.clientY;
  }, 0);

  //when the mouse is lifted
  canvas.addEventListener('mouseup', function () {
    this.down = false;
  }, 0);


  //when the mouse is moving
  canvas.addEventListener('mousemove', function (e) {
    this.style.cursor = 'pointer';
    if (this.down) { //when this.down is true (when mousedown)
      if (canvas.width < 992) { // if screen size is less than 992px, no offset due to navbar
        ctx.beginPath();
        ctx.moveTo(this.X, this.Y);

        ctx.lineCap = 'round';

        //colorpicker changes color of the line
        //NOTE: changing page size resets the color to black
        ctx.strokeStyle = $("#customColorPickInput").val();

        //thickness changer based on rangeinput
        ctx.lineWidth = $("#customThicknessInput").val();

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        this.X = e.clientX;
        this.Y = e.clientY;

      } else {
        ctx.beginPath();
        ctx.moveTo(this.X - 300, this.Y); //300px is offset of the mouse input due to the nav bar 

        ctx.lineCap = 'round';

        //colorpicker changes color of the line
        //NOTE: changing page size resets the color to black
        ctx.strokeStyle = $("#customColorPickInput").val();

        //thickness changer based on rangeinput
        ctx.lineWidth = $("#customThicknessInput").val();


        ctx.lineTo(e.clientX - 300, e.clientY); //300px is offset of the mouse input due to the nav bar 
        ctx.stroke();

        this.X = e.clientX;
        this.Y = e.clientY;
      }
    }
  }
    , 0);

  //pressing spacebar or backspace button will clear canvas
  document.body.onkeyup = function (e) {
    if (e.keyCode === 27) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    }
  };
});

//on-off button toggles the visibility of canvas
$("#onoff").click(function () {
  $("#canvas").toggle();
});


//settings button toggle the thickess and color inputs after a delay of 300 ms
$("#settings").click(function () {

  setTimeout(function () {
    $("#customThicknessInput").toggle();
    $("#customColorPickInput").toggle();
  }, 300);

});