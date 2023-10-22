//Materialize
$(document).ready(function () {
  // accordion collapsible for FAQ page
  var elem = document.querySelector('.collapsible.expandable');
  var instance = M.Collapsible.init(elem, {
    accordion: false
  });
  $('.sidenav').sidenav();   // Triggers sidenav bar pop-out on smaller screen sizes  
  $('.parallax').parallax();  // parallax containers for headers
  $('.carousel').carousel();  // image carousel on index.html page
  $('.dropdown-trigger').dropdown();  // triggers menu dropdown button when trigger is pressed
  $('.modal').modal();      // triggers instructions modal appearance when modal trigger is pressed
});