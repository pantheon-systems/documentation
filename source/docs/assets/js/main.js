//Executes your code when the DOM is ready.  Acts the same as $(document).ready().
$(function() {
    //Calls the tocify method on your HTML div.
    $("#toc").tocify();
});

//Allow html within tooltips and keep toggle open on hover
$('.pop').popover({
    html: true,
    trigger: 'manual',
    container: $(this).attr('id'),
    placement: 'right'
}).on("mouseenter", function () {
    var _this = this;
    $(this).popover("show");
    $(this).siblings(".popover").on("mouseleave", function () {
        $(_this).popover('hide');
    });
}).on("mouseleave", function () {
    var _this = this;
    setTimeout(function () {
        if (!$(".popover:hover").length) {
            $(_this).popover("hide")
        }
    }, 300);
});

// Tooltip

$('button').tooltip({
  trigger: 'click',
  placement: 'top'
});

function setTooltip(btn, message) {
  $(btn).tooltip('hide')
    .attr('data-original-title', message)
    .tooltip('show');
}

function hideTooltip(btn) {
  setTimeout(function() {
    $(btn).tooltip('hide');
  }, 3000);
}

// Clipboard

var clipboard = new Clipboard('button');

clipboard.on('success', function(e) {
  setTooltip(e.trigger, 'Copied!');
  hideTooltip(e.trigger);
});

clipboard.on('error', function(e) {
  setTooltip(e.trigger, 'Failed! Press Ctrl+C to copy');
  hideTooltip(e.trigger);
});

$(function() {

// Attach external link icons
$('.related li a').filter(function() {
  return this.hostname && this.hostname !== location.hostname;
}).addClass('external-link');


// Was this helpful buttons
var $helpfulButton = $('.helpful__button');
var $helpfulButtonYes = $('.helpful__button--yes');
var $helpfulButtonNo = $('.helpful__button--no');
var currentPath = window.location.pathname;


$helpfulButton.each(function(){
  $helpfulButtonYes.click(function(e){
    e.preventDefault();
    $helpfulButton.removeClass('already-rated');
    $(this).addClass('already-rated');
    localStorage.setItem('wasThisHelpful ' + currentPath,'yes');
  })
  $helpfulButtonNo.click(function(e){
    e.preventDefault();
    $helpfulButton.removeClass('already-rated');
    $(this).addClass('already-rated');
    localStorage.setItem('wasThisHelpful ' + currentPath,'no');
  })

  if ( localStorage.getItem('wasThisHelpful ' + currentPath).length > 0 && localStorage.getItem('wasThisHelpful ' + currentPath) == 'yes') {
    $helpfulButton.removeClass('already-rated');
    $helpfulButtonYes.addClass('already-rated');
  }

  if ( localStorage.getItem('wasThisHelpful ' + currentPath).length > 0 && localStorage.getItem('wasThisHelpful ' + currentPath) == 'no') {
    $helpfulButton.removeClass('already-rated');
    $helpfulButtonNo.addClass('already-rated');
  }
})


});
