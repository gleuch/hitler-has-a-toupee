/*

  Hitler has a touple

  1 hour speed project by Greg Leuch <http://gleu.ch>. 08 Dec 2015.
  Using old code from Olywimpics. https://github.com/gleuch/olwimpics

  -----------------------------------------------------------------------------


*/


jQuery.noConflict();

var HitlerHasAToupe = {

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
  _class_name : 'hitlerHasAToupe_block',
  _start_tag : 'body',
  _blocked_text : '',
  _replace : function(w,c) {return '<ins title="'+ (w || '').replace(/\'|\"/mg, '') +'" class="'+ HitlerHasAToupe._class_name +'">'+ w +'</ins>';},
  _page_height : 0,
  _page_scroll_height : 0,
  _page_href : null,
  _recheck_intv : null,
  _recheck_intv_delay : 100,


  /* ---- Starting Block ---------------------------------------------------------------- */

  start : function() {
    /* Ready... */
    for (var i in HitlerHasAToupe.keywords) HitlerHasAToupe.keywords[i] = '('+ HitlerHasAToupe.keywords[i] +')';
    HitlerHasAToupe._regexp = new RegExp('(^|[\\s\\\'\\"\\;\\:\\{\\[\\(\u201C\u2018“‘\\#\\/])('+ Object.keys(HitlerHasAToupe.keywords).join('|') +')($|[\\s\\.\\,\\?\\!\\\'\\"\\;\\:\\}\\]\\)&\u201D\u2019”’\\/])', 'img');


    /* Set... */
    try {
      try {HitlerHasAToupe._page_height = jQuery(tag).height();} catch(e) {}
      try {HitlerHasAToupe._page_scroll_height = jQuery(tag)[0].scrollHeight;} catch(e) {}
      HitlerHasAToupe._page_href = location.href;
    } catch(e) {}

    HitlerHasAToupe._recheck_intv = setTimeout(function() {HitlerHasAToupe.measure( HitlerHasAToupe._start_tag );}, HitlerHasAToupe._recheck_intv_delay);
    jQuery(window).load(function() {HitlerHasAToupe._loaded = true; HitlerHasAToupe._recheck_intv_delay = 1000;});
    setTimeout(function() {HitlerHasAToupe._recheck_intv_delay = 1000;}, 5000); // also slow down after 5 seconds


    /* Go! */
    HitlerHasAToupe.go();
  },


  /* --- Arena -------------------------------------------------------------------------- */

  go : function() {
    HitlerHasAToupe.qualify( HitlerHasAToupe._start_tag );
    HitlerHasAToupe.party( HitlerHasAToupe._start_tag );
  },

  measure : function(tag) {
    var scroll_height = 0, page_height = 0, page_length = 0;
    try {scroll_height = jQuery(tag)[0].scrollHeight;} catch(e) {}
    try {page_height = jQuery(tag).height();} catch(e) {}
    try {if (HitlerHasAToupe._loaded) page_length = parseInt(document.body.innerText.length);} catch(e) {}

    if (location.href != HitlerHasAToupe._page_href || Math.abs(HitlerHasAToupe._page_height - page_height) > 20 || Math.abs(HitlerHasAToupe._page_scroll_height - scroll_height) > 20 || (HitlerHasAToupe._loaded && page_length > 0 && Math.abs(HitlerHasAToupe._page_length - page_length) > 20) || page_height == 0 || scroll_height == 0) {
      try {HitlerHasAToupe._page_height = jQuery(tag).height();} catch(e) {}
      try {HitlerHasAToupe._page_scroll_height = jQuery(tag)[0].scrollHeight;} catch(e) {}
      HitlerHasAToupe._page_href = location.href;
      if (page_length && page_length >= 0) HitlerHasAToupe._page_length = parseInt(page_length);
      HitlerHasAToupe.go(tag);
    }

    // if (HitlerHasAToupe._loaded && page_length > 2000000) return;
    HitlerHasAToupe._recheck_intv = setTimeout(function() {HitlerHasAToupe.measure(tag);}, HitlerHasAToupe._recheck_intv_delay);
  },

  qualify : function(tag) {
    jQuery(tag).each(function() { HitlerHasAToupe.filter.call(this); });
  },

  medal : function() {
    var color = HitlerHasAToupe.colors[ (HitlerHasAToupe._count % HitlerHasAToupe.colors.length) ];
    HitlerHasAToupe._count++;
    return color;
  },

  filter : function() {
    if (this.nodeType == 1) {
      if (typeof(this.className) == 'object') return false; // SVG or something...
      if (this.className.match(RegExp(HitlerHasAToupe._class_name))) return false;
      if (['head', 'img', 'textarea', 'option', 'style', 'script', 'code', 'samp', 'select', 'iframe', 'input'].indexOf(this.tagName.toLowerCase()) > -1) return false;
    }
    HitlerHasAToupe.block.call(this);
  },

  replace : function() {
    var word = 'Hitler';
    for (var k in HitlerHasAToupe.keywords) {
      var x = new RegExp(k, 'i');
      if (arguments[2].match(x)) {
        console.log ('match', k, arguments[2])
        word = HitlerHasAToupe.keywords[k].replace(/^\(|\)\s?$/mg, '');
        break;
      }
    }
    return arguments[1] + HitlerHasAToupe._replace(word, HitlerHasAToupe.medal()) + arguments[arguments.length-3];
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
        rep_text = text.replace(HitlerHasAToupe._regexp, HitlerHasAToupe.replace);
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
        HitlerHasAToupe.qualify( jQuery(this).contents() );
      } else {
        text = jQuery(this).html();
        if (jQuery.trim(text) != '') {
          rep_text = text.replace(HitlerHasAToupe._regexp, HitlerHasAToupe.replace);
          if (text != rep_text) jQuery(this).html(rep_text);
        }
      }
    }
  },

  party : function(tag) {
    jQuery(document).ready(function() {
      document.title = document.title.replace(HitlerHasAToupe._regexp, HitlerHasAToupe.text_replace);

      /* image replacement */
      jQuery(tag).find('img, input[type=image]').not('.'+ HitlerHasAToupe._class_name).each(function() {
        try {
          var r = jQuery(this);
          if ((r.attr('src') +' '+ r.attr('alt') +' '+ r.attr('title')).match(HitlerHasAToupe._regexp)) {
            var w = r.width(), h = r.height(), c = HitlerHasAToupe.medal();
            r.addClass(HitlerHasAToupe._class_name).css({'background' : c}).attr('src', chrome.extension.getURL('images/asshole.png')).attr('title', HitlerHasAToupe._blocked_text).attr('alt', HitlerHasAToupe._blocked_text).width(w).height(h);
          }
        } catch(e) {}
      });
    });
  }
};


/* Opening Ceremony */
try {
  HitlerHasAToupe.start();
} catch(e) {
  console.error("HitlerHasAToupe had a boo-boo. :(\n\n"+ e);
}
