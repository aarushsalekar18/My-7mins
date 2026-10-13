(function(){
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function(s,r){return (r||document).querySelector(s)};
  var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* ---- Photos: img1.jpg … img21.jpg (same folder as index.html) ---- */
  /* ============================================================
     YOUR INTRO VIDEO - file name must match your file EXACTLY and
     sit in the same folder as index.html. Use "" to skip the video.
     ============================================================ */
  var INTRO_VIDEO = "intro.mp4";

  /* ============================================================
     YOUR 21 PHOTOS - one file name per line, in the order shown.
     Each name must match your file EXACTLY (spelling, capital
     letters, and extension). If one photo is .jpeg or .png,
     just edit that one line, e.g. "img7.png"
     ============================================================ */
  var photos = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg",
    "img6.jpg",
    "img7.jpg",
    "img8.jpg",
    "img9.jpg",
    "img10.jpg",
    "img11.jpg",
    "img12.jpg",
    "img13.jpg",
    "img14.jpg",
    "img15.jpg",
    "img16.jpg",
    "img17.jpg",
    "img18.jpg",
    "img19.jpg",
    "img20.jpg",
    "img21.jpg"
  ];

  /* General affectionate captions only (no invented memories). Edit freely. */
  var captions = [
    "You, in your own little world.","A smile worth keeping.","Some people just make a picture brighter.",
    "Soft light, softer you.","One of my favourite views.","Simply you, simply lovely.",
    "A tiny reminder of how special you are.","Look at that glow.","Warm, kind and wonderful.",
    "This one made me smile.","Just a little sparkle.","The kind of person who lights up a room.",
    "Gentle and bright, all at once.","A moment worth holding onto.","You, being wonderfully you.",
    "Still my favourite human.","Sweet as ever.","A little more sunshine.",
    "Proof that you shine.","Another reason to smile.","You make this universe lovely."
  ];
  var frames = ["polaroid","portal","cloud","scrap","glow"];

  /* ---- Sky decorations ---- */
  function buildSky(host, clouds, stars){
    var k,c,s;
    for(k=0;k<clouds;k++){
      c=document.createElement("div"); c.className="cloud";
      c.style.setProperty("--w",(90+Math.random()*150)+"px");
      c.style.setProperty("--y",(Math.random()*85)+"%");
      c.style.setProperty("--t",(55+Math.random()*60)+"s");
      c.style.setProperty("--d",(-Math.random()*90)+"s");
      c.style.setProperty("--x",(Math.random()*80)+"%");
      host.appendChild(c);
    }
    for(k=0;k<stars;k++){
      s=document.createElement("span"); s.className="twinkle";
      s.style.left=(Math.random()*100)+"%"; s.style.top=(Math.random()*60)+"%";
      s.style.animationDelay=(Math.random()*4)+"s";
      host.appendChild(s);
    }
  }
  buildSky($("#sky"),8,24);
  buildSky($("#introSky"),5,18);
  buildSky($("#vSky"),6,30);

  var ns=$("#nightStars"), ni, st;
  for(ni=0;ni<26;ni++){
    st=document.createElement("span"); st.className="star"; st.textContent=Math.random()>.7?"✦":"•";
    st.style.left=(Math.random()*96)+"%"; st.style.top=(Math.random()*95)+"%";
    st.style.fontSize=(8+Math.random()*10)+"px"; st.style.animationDelay=(Math.random()*4)+"s";
    ns.appendChild(st);
  }

  /* ---- Build the photo journey ---- */
  var journey = $("#journey");
  photos.forEach(function(src,idx){
    var n = idx+1, nn=(n<10?"0":"")+n;
    var fig = document.createElement("figure");
    fig.className = "mem f-"+frames[idx%frames.length];
    var frame = document.createElement("div"); frame.className="frame";
    var img = new Image();
    img.src = src; img.alt = "Photo "+n+" of 21"; img.loading = idx<2?"eager":"lazy"; img.decoding="async";
    var ph = document.createElement("div"); ph.className="ph"; ph.textContent="Add "+src+" next to index.html";
    img.addEventListener("error",function(){ fig.classList.add("missing"); });
    frame.appendChild(img); frame.appendChild(ph);
    var cap = document.createElement("figcaption");
    cap.innerHTML = '<span class="num">MEMORY '+nn+' / 21</span>';
    cap.appendChild(document.createTextNode(captions[idx]));
    fig.appendChild(frame); fig.appendChild(cap);
    journey.appendChild(fig);
  });

  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} });
    },{threshold:.15,rootMargin:"0px 0px -6% 0px"});
    $$(".mem").forEach(function(m){io.observe(m)});
  } else { $$(".mem").forEach(function(m){m.classList.add("in")}); }

  /* ---- Time machine timeline ---- */
  var tl = $("#timeline");
  photos.forEach(function(src,idx){
    var li=document.createElement("li");
    var box=document.createElement("div"); box.className="t-img";
    var img=new Image(); img.src=src; img.alt="Photo "+(idx+1)+" of 21"; img.loading="lazy"; img.decoding="async";
    var ph=document.createElement("div"); ph.className="ph"; ph.textContent="Add "+src;
    img.addEventListener("error",function(){ box.classList.add("missing"); });
    box.appendChild(img); box.appendChild(ph);
    var n=document.createElement("div"); n.className="t-n"; n.textContent="MEMORY "+(idx+1<10?"0":"")+(idx+1);
    var c=document.createElement("div"); c.className="t-cap"; c.textContent=captions[idx];
    li.appendChild(n); li.appendChild(box); li.appendChild(c); tl.appendChild(li);
  });

  /* ---- Floating particles ---- */
  function burst(chars,count){
    var k;
    if(reduce) count=Math.min(count,6);
    for(k=0;k<count;k++){
      (function(k){
        setTimeout(function(){
          var el=document.createElement("span"); el.className="fx"; el.setAttribute("aria-hidden","true");
          el.textContent=chars[Math.floor(Math.random()*chars.length)];
          el.style.left=(5+Math.random()*88)+"vw"; el.style.bottom="-30px";
          el.style.setProperty("--dx",((Math.random()-.5)*120)+"px");
          el.style.setProperty("--rot",((Math.random()-.5)*60)+"deg");
          el.style.setProperty("--dur",(3+Math.random()*2)+"s");
          el.style.fontSize=(20+Math.random()*22)+"px";
          document.body.appendChild(el);
          setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); },5400);
        }, reduce?0:k*70);
      })(k);
    }
  }

  /* ---- Modals ---- */
  var lastFocus=null, openModal=null;
  function showModal(id){
    var m=$("#"+id); if(!m) return;
    lastFocus=document.activeElement; openModal=m; m.hidden=false;
    document.body.classList.add("locked");
    var x=$("[data-close]",m); if(x) x.focus();
  }
  function closeModal(){
    if(!openModal) return;
    openModal.hidden=true; openModal=null;
    document.body.classList.remove("locked");
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $$(".modal").forEach(function(m){
    m.addEventListener("click",function(e){ if(e.target===m) closeModal(); });
    $("[data-close]",m).addEventListener("click",closeModal);
  });
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape") closeModal();
    if(e.key==="Tab" && openModal){
      var f=$$("button,[href],[tabindex]:not([tabindex='-1'])",openModal);
      if(!f.length) return;
      var first=f[0], last=f[f.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    }
  });

  $$("[data-gadget]").forEach(function(b){
    b.addEventListener("click",function(){
      showModal(b.getAttribute("data-gadget")==="door"?"modalDoor":"modalTime");
    });
  });

  $("#copterBtn").addEventListener("click",function(){
    burst(["💙","💗","💜","🩵","✨"],26);
    var o=$("#copterOut"); o.hidden=false;
    o.textContent="May your day get a little lighter and your smile return whenever it feels right.";
  });

  $("#hiddenStar").addEventListener("click",function(){ burst(["⭐","✨"],10); showModal("modalStar"); });

  /* ---- Intro ---- */
  var introDone=false, main=$("#main");
  function enter(){
    if(introDone) return; introDone=true;
    $("#door").classList.add("open");
    var intro=$("#intro");
    setTimeout(function(){
      intro.classList.add("leaving");
      setTimeout(function(){
        intro.hidden=true; main.removeAttribute("aria-hidden");
        document.body.classList.remove("locked");
        window.scrollTo(0,0);
        var h=$("#heroTitle"); if(h){ h.setAttribute("tabindex","-1"); h.focus({preventScroll:true}); }
      }, reduce?10:900);
    }, reduce?10:900);
  }
  $("#openBtn").addEventListener("click",enter);

  /* ---- Typewriter secret message ---- */
  var message =
"Hey you... 💙\n\n"+
"I don't know exactly what's on your mind right now, and I don't want to assume anything.\n\n"+
"I just wanted to make something small and special for you.\n\n"+
"These photos are a little reminder of how special you are as a person, and how much I value the moments and connection we share.\n\n"+
"If something is bothering you, or if I've done something that hurt you without realizing it, I'd genuinely like to understand.\n\n"+
"You don't have to pretend to be okay, and you don't have to reply before you're ready.\n\n"+
"I don't want this little website to make you feel pressured. I just hope it gives you one small reason to smile today.\n\n"+
"Whenever you feel comfortable, I'd love to listen to you.\n\n"+
"Take your time, okay? 💙\n\n"+
"— Made with care, just for you. ✨";
  var chars = Array.from(message), typedEl=$("#typed"), timer=null, typing=false;
  $("#typedFull").textContent = message;
  function finishTyping(){
    clearTimeout(timer); typing=false; typedEl.textContent=message; $("#skipBtn").hidden=true;
  }
  function typeStep(i){
    if(i>chars.length){ finishTyping(); return; }
    typedEl.textContent = chars.slice(0,i).join("");
    var c=chars[i-1], d=(c==="\n")?220:(c==="."||c==="?"?160:34);
    timer=setTimeout(function(){ typeStep(i+1); }, d);
  }
  $("#revealBtn").addEventListener("click",function(){
    if(typing) return;
    this.hidden=true; $("#secretBox").hidden=false;
    if(reduce){ typedEl.textContent=message; return; }
    typing=true; $("#skipBtn").hidden=false; typeStep(1);
  });
  $("#skipBtn").addEventListener("click",finishTyping);

  /* ---- Final interaction (local only; nothing is sent anywhere) ---- */
  var answer=$("#answer");
  var replies={
    talk:"Of course. I'm here to listen. Take your time and tell me whenever you're comfortable. 💙",
    cute:"Sending you a pocket-sized smile! 💙✨",
    time:"That's completely okay. Take all the time you need. No pressure. 💙"
  };
  $$("[data-choice]").forEach(function(b){
    b.addEventListener("click",function(){
      var k=b.getAttribute("data-choice");
      answer.textContent=replies[k];
      if(k==="cute") burst(["🧸","💙","✨","🐾","🫧"],24);
      if(k==="time") burst(["🌙","⭐"],6);
    });
  });

  /* ---- Music: gentle synthesized lullaby (no audio files, never autoplays) ---- */
  var mBtn=$("#musicBtn"), ctx=null, master=null, mTimer=null, playing=false, step=0;
  var scale=[261.63,293.66,329.63,392.00,440.00,523.25,392.00,329.63];
  function note(freq,t,dur){
    var o=ctx.createOscillator(), g=ctx.createGain();
    o.type="sine"; o.frequency.value=freq;
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.5,t+.08); g.gain.exponentialRampToValueAtTime(.001,t+dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t+dur+.05);
  }
  function tick(){
    if(!ctx) return;
    var t=ctx.currentTime+.05, f=scale[step%scale.length];
    note(f,t,1.6);
    if(step%4===0) note(f/2,t,2.6);
    step++;
  }
  function setMusic(on){
    playing=on; mBtn.setAttribute("aria-pressed",on?"true":"false");
    mBtn.textContent=on?"🎵 Music: on":"🎵 Music: off";
    mBtn.setAttribute("aria-label",on?"Turn soft music off":"Turn soft music on");
    if(on){
      var AC=window.AudioContext||window.webkitAudioContext;
      if(!AC){ mBtn.textContent="🎵 Not supported"; playing=false; mBtn.setAttribute("aria-pressed","false"); return; }
      if(!ctx){ ctx=new AC(); master=ctx.createGain(); master.gain.value=.12; master.connect(ctx.destination); }
      if(ctx.state==="suspended") ctx.resume();
      tick(); mTimer=setInterval(tick,900);
    } else { clearInterval(mTimer); if(ctx) ctx.suspend(); }
  }
  mBtn.addEventListener("click",function(){ setMusic(!playing); });

  /* ---- 0. Custom intro video: plays first, then the magical opening ---- */
  (function(){
    if(!INTRO_VIDEO) return;
    var scene=$("#vScene"), vid=$("#introVideo"), introEl=$("#intro");
    var playBtn=$("#vPlay"), soundBtn=$("#vSound"), skipBtn=$("#vSkip");
    var done=false, watchdog=null;

    scene.hidden=false;
    introEl.classList.add("pending");
    introEl.setAttribute("aria-hidden","true");
    introEl.setAttribute("inert","");
    document.body.classList.add("in-video");

    function finish(){
      if(done) return; done=true;               /* prevents duplicate transitions */
      clearTimeout(watchdog);
      try{ vid.pause(); }catch(e){}
      scene.classList.add("leaving");
      setTimeout(function(){
        scene.hidden=true;
        vid.removeAttribute("src"); try{ vid.load(); }catch(e){}
        document.body.classList.remove("in-video");
        introEl.classList.remove("pending");
        introEl.removeAttribute("aria-hidden");
        introEl.removeAttribute("inert");
        var b=$("#openBtn"); if(b) b.focus({preventScroll:true});
      }, reduce?10:1000);
    }
    function tryPlay(){
      var p; try{ p=vid.play(); }catch(e){ playBtn.hidden=false; return; }
      if(p && p.catch) p.catch(function(){ playBtn.hidden=false; });   /* autoplay blocked */
    }

    vid.addEventListener("ended",finish);
    vid.addEventListener("error",finish);        /* missing/unsupported file: go straight to the opening */
    vid.addEventListener("playing",function(){ playBtn.hidden=true; });
    vid.addEventListener("loadedmetadata",function(){ clearTimeout(watchdog); });
    skipBtn.addEventListener("click",finish);
    playBtn.addEventListener("click",function(){ playBtn.hidden=true; tryPlay(); });
    soundBtn.addEventListener("click",function(){
      vid.muted=!vid.muted;
      soundBtn.setAttribute("aria-pressed",vid.muted?"false":"true");
      soundBtn.setAttribute("aria-label",vid.muted?"Turn intro sound on":"Turn intro sound off");
      soundBtn.textContent=vid.muted?"🔇 Sound off":"🔊 Sound on";
      if(vid.paused && !done){ playBtn.hidden=true; tryPlay(); }
    });

    watchdog=setTimeout(finish,10000);           /* never stay stuck if the file never loads */
    vid.src=INTRO_VIDEO;
    skipBtn.focus({preventScroll:true});
    if(reduce){ playBtn.hidden=false; } else { tryPlay(); }   /* muted autoplay, or button if reduced motion */
  })();
})();
