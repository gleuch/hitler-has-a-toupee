/*

  Hitler has a touple

  1 hour speed project by Greg Leuch <http://gleu.ch>. 08 Dec 2015.
  Using old code from Olywimpics. https://github.com/gleuch/olwimpics

  -----------------------------------------------------------------------------


*/


jQuery.noConflict();

var HitlerHasAToupee = {

  /* --- Configuration ------------------------------------------------------------------ */

  keywords : {
    /* EN */
    'realDonaldTrump' : 'realAdolfHitler',
    '@realDonaldTrump' : '@realAdolfHitler',
    'donaldjtrump.com' : 'iamanazi.com',
    'youtube.com/donaldtrump' : 'youtube.com/nazilovers',
    'facebook.com/donaldtrump' : 'facebook.com/nazilovers',
    'donaldjtrump.com' : 'iamanazi.com',
    'Donald J. Trump' : 'Adolf Hitler',
    'Donald Trump' : 'Adolf Hilter',
    'Trump' : 'Hitler'
  },

  colors : ['#000000'],

  /* --- Settings (don't change) -------------------------------------------------------- */

  _processing : false,
  _loaded : false,
  _count : 0,
  _regexp : null,
  _class_name : 'hitlerHasAToupee_block',
  _start_tag : 'body',
  _blocked_text : '',
  _replace : function(w,c) {return '<ins title="'+ (w || '').replace(/\'|\"/mg, '') +'" style="text-decoration:none !important;" class="'+ HitlerHasAToupee._class_name +'">'+ w +'</ins>';},
  _page_height : 0,
  _page_scroll_height : 0,
  _page_href : null,
  _recheck_intv : null,
  _recheck_intv_delay : 100,


  /* ---- Starting Block ---------------------------------------------------------------- */

  start : function() {
    /* Ready... */
    for (var i in HitlerHasAToupee.keywords) HitlerHasAToupee.keywords[i] = '('+ HitlerHasAToupee.keywords[i] +')';
    HitlerHasAToupee._regexp = new RegExp('(^|[\\s\\\'\\"\\;\\:\\{\\[\\(\u201C\u2018“‘\\#\\/])('+ Object.keys(HitlerHasAToupee.keywords).join('|') +')($|[\\s\\.\\,\\?\\!\\\'\\"\\;\\:\\}\\]\\)&\u201D\u2019”’\\/])', 'img');


    /* Set... */
    try {
      try {HitlerHasAToupee._page_height = jQuery(tag).height();} catch(e) {}
      try {HitlerHasAToupee._page_scroll_height = jQuery(tag)[0].scrollHeight;} catch(e) {}
      HitlerHasAToupee._page_href = location.href;
    } catch(e) {}

    HitlerHasAToupee._recheck_intv = setTimeout(function() {HitlerHasAToupee.measure( HitlerHasAToupee._start_tag );}, HitlerHasAToupee._recheck_intv_delay);
    jQuery(window).load(function() {HitlerHasAToupee._loaded = true; HitlerHasAToupee._recheck_intv_delay = 1000;});
    setTimeout(function() {HitlerHasAToupee._recheck_intv_delay = 1000;}, 5000); // also slow down after 5 seconds


    /* Go! */
    HitlerHasAToupee.go();
  },


  /* --- Arena -------------------------------------------------------------------------- */

  go : function() {
    HitlerHasAToupee.qualify( HitlerHasAToupee._start_tag );
    HitlerHasAToupee.party( HitlerHasAToupee._start_tag );
  },

  measure : function(tag) {
    var scroll_height = 0, page_height = 0, page_length = 0;
    try {scroll_height = jQuery(tag)[0].scrollHeight;} catch(e) {}
    try {page_height = jQuery(tag).height();} catch(e) {}
    try {if (HitlerHasAToupee._loaded) page_length = parseInt(document.body.innerText.length);} catch(e) {}

    if (location.href != HitlerHasAToupee._page_href || Math.abs(HitlerHasAToupee._page_height - page_height) > 20 || Math.abs(HitlerHasAToupee._page_scroll_height - scroll_height) > 20 || (HitlerHasAToupee._loaded && page_length > 0 && Math.abs(HitlerHasAToupee._page_length - page_length) > 20) || page_height == 0 || scroll_height == 0) {
      try {HitlerHasAToupee._page_height = jQuery(tag).height();} catch(e) {}
      try {HitlerHasAToupee._page_scroll_height = jQuery(tag)[0].scrollHeight;} catch(e) {}
      HitlerHasAToupee._page_href = location.href;
      if (page_length && page_length >= 0) HitlerHasAToupee._page_length = parseInt(page_length);
      HitlerHasAToupee.go(tag);
    }

    // if (HitlerHasAToupee._loaded && page_length > 2000000) return;
    HitlerHasAToupee._recheck_intv = setTimeout(function() {HitlerHasAToupee.measure(tag);}, HitlerHasAToupee._recheck_intv_delay);
  },

  qualify : function(tag) {
    jQuery(tag).each(function() { HitlerHasAToupee.filter.call(this); });
  },

  medal : function() {
    var color = HitlerHasAToupee.colors[ (HitlerHasAToupee._count % HitlerHasAToupee.colors.length) ];
    HitlerHasAToupee._count++;
    return color;
  },

  filter : function() {
    if (this.nodeType == 1) {
      if (typeof(this.className) == 'object') return false; // SVG or something...
      if (this.className.match(RegExp(HitlerHasAToupee._class_name))) return false;
      if (['head', 'img', 'textarea', 'option', 'style', 'script', 'code', 'samp', 'select', 'iframe', 'input'].indexOf(this.tagName.toLowerCase()) > -1) return false;
    }
    HitlerHasAToupee.block.call(this);
  },

  replace : function() {
    var word = 'Hitler';
    for (var k in HitlerHasAToupee.keywords) {
      var x = new RegExp(k, 'i');
      if (arguments[2].match(x)) {
        console.log ('match', k, arguments[2])
        word = HitlerHasAToupee.keywords[k].replace(/^\(|\)\s?$/mg, '');
        break;
      }
    }
    return arguments[1] + HitlerHasAToupee._replace(word, HitlerHasAToupee.medal()) + arguments[arguments.length-3];
  },
  text_replace : function() {
    var s = ''; for (var i=0; i<arguments[2].length; i++) s += '*';
    return arguments[1] + s + arguments[arguments.length-3];
  },

  block : function() {
    var text, rep_text, span;

    /* Text nodes */
    if (this.nodeType == 3) {
      text = this.nodeValue;
      if (jQuery.trim(text) != '') {
        rep_text = text.replace(HitlerHasAToupee._regexp, HitlerHasAToupee.replace);
        if (text != rep_text) {
          /* We replace text node with span tag to mark as having been searched, but also to insert HTML. */
          span = document.createElement("span");
          span.innerHTML = rep_text;
          this.parentNode.replaceChild(span, this);
        }
      }

    /* HTML nodes, traverse children */
    } else if (this.nodeType == 1) {
      if (jQuery(this).children().length > 0) {
        HitlerHasAToupee.qualify( jQuery(this).contents() );
      } else {
        text = jQuery(this).html();
        if (jQuery.trim(text) != '') {
          rep_text = text.replace(HitlerHasAToupee._regexp, HitlerHasAToupee.replace);
          if (text != rep_text) jQuery(this).html(rep_text);
        }
      }
    }
  },

  party : function(tag) {
    jQuery(document).ready(function() {
      document.title = document.title.replace(HitlerHasAToupee._regexp, HitlerHasAToupee.text_replace);

      /* image replacement */
      jQuery(tag).find('img, input[type=image]').not('.'+ HitlerHasAToupee._class_name).each(function() {
        try {
          var r = jQuery(this);
          if ((r.attr('src') +' '+ r.attr('alt') +' '+ r.attr('title')).match(HitlerHasAToupee._regexp)) {
            var w = r.width(), h = r.height(), c = HitlerHasAToupee.medal();
            r.addClass(HitlerHasAToupee._class_name).css({'background' : c}).attr('src', chrome.extension.getURL('images/asshole.png')).attr('title', HitlerHasAToupee._blocked_text).attr('alt', HitlerHasAToupee._blocked_text).width(w).height(h);
          }
        } catch(e) {}
      });
    });
  }
};


/* Opening Ceremony */
try {
  HitlerHasAToupee.start();
} catch(e) {
  console.error("HitlerHasAToupee had a boo-boo. :(\n\n"+ e);
}
