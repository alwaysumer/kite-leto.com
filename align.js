/* Article pages, desktop: line up the side column with the lead text, the contents box and the Phan Rang video box. */
(function(){
  function fit(){
    var box=document.querySelector('.media-box, .note-box'), aside=document.querySelector('aside');
    if(!box||!aside) return;
    box.style.minHeight='';
    var o=aside.children[1]; if(o) o.style.minHeight='';
    if(window.innerWidth>=1024){
      var ah=(window._asideNatural||aside.offsetHeight);
      box.style.minHeight=ah+'px';
      // text too long to fit: stretch "other spots" instead, so both bottoms still line up
      var extra=box.offsetHeight-ah;
      if(extra>0&&o) o.style.minHeight=(o.offsetHeight+extra)+'px';
    }
  }
  // Desktop: "at a glance" runs from the top of the lead text to the bottom of the contents box (exactly),
  // the first heading after the contents box sits level with "other spots",
  function align(){
    var toc=document.querySelector('.toc'), aside=document.querySelector('aside'), lead=document.querySelector('.lead');
    if(!toc||!aside||!lead||aside.children.length<2) return;
    var g=aside.children[0], o=aside.children[1], h=toc.nextElementSibling;
    aside.style.marginTop=''; aside.style.position=''; aside.style.top=''; toc.style.height=''; toc.classList.remove('toc-tight'); g.style.minHeight=''; o.style.minHeight='';
    g.classList.remove('glance-stretch'); o.classList.remove('others-stretch');
    if(h&&h.tagName==='H2') h.style.marginTop='';
    window._asideNatural=0;
    if(window.innerWidth<1024) return;
    if(h&&h.tagName==='H2') h.style.marginTop='1.25rem';
    var grid=aside.parentElement.getBoundingClientRect().top, top=lead.getBoundingClientRect().top;
    if(top>grid) aside.style.marginTop=(top-grid)+'px';
    g.classList.add('glance-stretch');
    g.style.minHeight=(toc.getBoundingClientRect().bottom-top)+'px';
    window._asideNatural=aside.offsetHeight;
    // the column must fit in the window below the top bar (80px) with a 16px margin at the bottom:
    // if it doesn't, give up some of the "at a glance" stretch first
    var over=aside.offsetHeight+80+16-window.innerHeight;
    if(over>0){
      var gh=g.offsetHeight; g.style.minHeight=''; var nat=g.offsetHeight;
      g.style.minHeight=Math.max(nat,gh-over)+'px';
      window._asideNatural=aside.offsetHeight;
      // and pull the bottom of the contents box up to the same line (tighter list spacing)
      var target=top+g.offsetHeight-toc.getBoundingClientRect().top;
      toc.classList.add('toc-tight');
      toc.style.height=Math.max(target,0)+'px';
    }
    // shorter than the window: grow "at a glance" (and the contents box with it) so the column,
    // and the boxes matched to it, fill the window from the top bar down to a 16px margin
    var short=window.innerHeight-80-16-aside.offsetHeight;
    if(short>0){
      g.style.minHeight=(g.offsetHeight+short)+'px';
      toc.style.height=Math.max(top+g.offsetHeight-toc.getBoundingClientRect().top,0)+'px';
      window._asideNatural=aside.offsetHeight;
    }
    // still too tall (very small window): follow the page, pinned by the bottom edge
    if(aside.offsetHeight+80+16>window.innerHeight) aside.style.top=(window.innerHeight-aside.offsetHeight-16)+'px';
  }
  var _fit=fit; fit=function(){ align(); _fit(); };
  window.addEventListener('load',fit); window.addEventListener('resize',fit); fit();
})();
