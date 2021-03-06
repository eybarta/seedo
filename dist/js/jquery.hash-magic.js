/*!
 * Hash Magic jQuery Plugin (c) 2015, OCHIISHI Koichiro
 * MIT license
 * https://github.com/rakuishi/jquery-hash-magic
 */
;(function($, undefined) {

  // --------------------------------------------------
  // Variables
  // --------------------------------------------------

  var
  linkList   = [],
  anchorList = [],
  eventFlag  = false;

  $('a[href^="#"]').each(function() {
    linkList.push(this);
    var anchor = $('*[data-anchor="' + $(this).attr('href').replace('#', '') + '"]');
    if (anchor.length > 0) {
      anchorList.push(anchor);
    }
  });
    
    

  // --------------------------------------------------
  // Functions
  // --------------------------------------------------

  function blockEvent() {
    eventFlag = true;
  }

  function unblockEvent() {
    setTimeout(function() {
      eventFlag = false;
    }, 250);
  }

  function isBlockedEvent() {
    return eventFlag == true;
  }

  function updateLinkClass(hash) {
    $.each(linkList, function() {
      if (hash == $(this).attr('href')) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

  function updateWindowPosition(hash) {
    blockEvent();
    $.each(anchorList, function() {
      if (hash == '#' + this.data('anchor')) {
        $('html,body').animate({ scrollTop: this.offset().top }, '250');
        return false;
      }
    });
    unblockEvent();
  }

  function init() {
    var hash = window.location.hash;
    if (hash.length) {
      updateLinkClass(hash);
      updateWindowPosition(hash);
    }
  }

  // --------------------------------------------------
  // Events
  // --------------------------------------------------

  $('a[href^="#"]').click(function() {
    var hash = $(this).attr('href');
    window.location.replace(hash);
    updateLinkClass(hash);
    updateWindowPosition(hash);
  });

  $(document).scroll(function() {
    if (isBlockedEvent()) {
      return false;
    }

    var windowY = window.pageYOffset;
    $.each(anchorList, function() {
      if (windowY <= 0) {
        window.location.replace('#top');
        updateLinkClass('#top');
        return false;
      }

      var thisTop = this.offset().top;
      if (windowY - 20 < thisTop && thisTop < windowY + 20 && window.location.hash != '#' + this.data('anchor')) {
        var hash = '#' + this.data('anchor');
        window.location.replace(hash);
        updateLinkClass(hash);
        return false;
      }
    });
  });

  // --------------------------------------------------
  // Init
  // --------------------------------------------------

  init();

})(jQuery);