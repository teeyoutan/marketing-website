$(function() {
  var $pressCont = $('#press-mentions'),
    $showBtn = $('.show-more'),
    $hideBtn   = $('.hide-more'),
    $pressItems = $('.press-feed-item'), //jquery array
    $hiddenItems = $pressItems.slice(20, $pressItems.length - 20),
    lastSpliced,
    lastShown,
    currentIndex = 20,
    increment = 10; //array

  var pressItems = Array.prototype.slice.call( document.getElementsByClassName('press-feed-item') );
  var hiddenItems = pressItems.slice(20, pressItems.length - 20);
  debugger;
  $showBtn.on('click', function(e) {
    // if($hiddenItems.length >= 10) {
    //   lastSpliced = $hiddenItems.splice(0, 10);
    //   lastSpliced.forEach(function(elm) {
    //     $(elm).css({display: 'block'});
    //   });
    // } else if ( $hiddenItems.length < 10 && $hiddenItems.length > 0 ) {
    //   $hiddenItems.each(function(index, elm) {
    //     $(elm).css({display: 'block'});
    //     $showBtn.css({display: 'none'});
    //     $hideBtn.css({display: 'block'});
    //   });
    // }

    if( pressItems.length - 20 < 10 ) {
      increment = pressItems.length - 20 - currentIndex;
      $showBtn.css({display: 'none'});
      $hideBtn.css({display: 'block'});
    }

    for (var i = currentIndex; i <= currentIndex + increment; i++) {
      pressItems[i].style.display = 'block';
    }

    currentIndex += 10;

  });



  // $hideBtn.on('click', function(e) {
  //   if($hiddenItems.length < $pressItems.length - 20) {

  //   }
  //   lastShown = lastSpliced.splice()
  // });

});