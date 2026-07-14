    /* ── DATA ── */
    const projects = [
      {
        num: '01', cat: 'HEALTHCARE', title: 'CUREBAY',
        desc: 'AI-powered healthcare platform connecting rural patients with specialists via telemedicine. Focuses on bridging the healthcare gap in underserved regions.',
        tags: ['React', 'Node.js', 'MongoDB', 'AI/ML'],
        highlights: ['Telemedicine video consultations', 'AI-assisted initial diagnosis', 'Rural health worker dashboard'],
        acc: [0.1, 0.9, 0.4], dark: [0.05, 0.2, 0.1], link: 'https://github.com/Ansh-gupta-07', live: 'https://ansh-gupta-07.github.io/CureBay/'
      },
      {
        num: '02', cat: 'TOOLS', title: 'DEVSYNC',
        desc: 'Real-time collaborative development environment with live code sharing and team tools. Build seamlessly with your team in the browser.',
        tags: ['React', 'WebSockets', 'TypeScript', 'Collab'],
        highlights: ['Real-time code synchronization', 'Integrated team chat', 'Live preview environments'],
        acc: [0.2, 0.5, 1.0], dark: [0.1, 0.2, 0.3], link: 'https://github.com/Ansh-gupta-07', live: 'https://aditisingh0102.github.io/devsync-connect/#/'
      },
      {
        num: '03', cat: 'DATA & MAPS', title: 'GIS DISASTER',
        desc: 'GIS-powered disaster damage analysis platform for floods, fires and earthquakes mapping. Visually analyze impact zones for emergency response.',
        tags: ['React', 'Leaflet.js', 'Python', 'GIS'],
        highlights: ['Interactive heatmaps and layers', 'Real-time disaster data processing', 'Impact zone area calculations'],
        acc: [1.0, 0.4, 0.1], dark: [0.3, 0.1, 0.05], link: 'https://github.com/Ansh-gupta-07', live: '#'
      },
      {
        num: '04', cat: 'AI / ML', title: 'EDGE AI ASHA',
        desc: 'Offline-first AI triage tool for ASHA workers enabling medical diagnosis in rural areas without consistent internet connection.',
        tags: ['React', 'TensorFlow.js', 'PWA', 'Offline'],
        highlights: ['Offline edge-inference AI', 'PWA for mobile devices', 'Triage & symptom analysis'],
        acc: [0.6, 0.2, 0.9], dark: [0.2, 0.1, 0.3], link: 'https://github.com/Ansh-gupta-07', live: '#'
      },
      {
        num: '05', cat: 'SECURITY', title: 'TRUST EXAM SHIELD',
        desc: 'A robust, secure examination environment designed to prevent cheating during online assessments using advanced monitoring tools.',
        tags: ['Security', 'Proctoring', 'WebRTC', 'React'],
        highlights: ['Tab switch detection & lockdown', 'Webcam and audio monitoring', 'Real-time proctor dashboard'],
        acc: [0.9, 0.8, 0.1], dark: [0.3, 0.2, 0.0], link: 'https://ansh-gupta-07.github.io/PROCTURED1/', live: 'https://aditisingh0102.github.io/trust-exam-shield/'
      },
      {
        num: '06', cat: 'PLATFORM', title: 'YOURCONTEST',
        desc: 'A comprehensive coding contest platform for hosting programming competitions, managing leaderboards, and evaluating submissions.',
        tags: ['Next.js', 'Docker', 'Judge', 'PostgreSQL'],
        highlights: ['Automated code judging system', 'Real-time dynamic leaderboards', 'Secure isolated execution environment'],
        acc: [0.1, 0.8, 0.9], dark: [0.0, 0.2, 0.3], link: 'https://github.com/Ansh-gupta-07', live: '#'
      },
    ];

    /* ── CURSOR ── */
    const cur = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; });
    (function curAnim() { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(curAnim); })();

    /* ── LOADER ── */
    const bar = document.getElementById('loader-bar');
    const pct = document.getElementById('loader-pct');
    const loader = document.getElementById('loader');
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 3 + 1;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => { loader.classList.add('hide'); revealInit(); }, 400); }
      bar.style.width = p + '%'; pct.textContent = Math.round(p) + '%';
    }, 40);

    /* ── MARQUEE ── */
    const items = ['THREE.JS', 'REACT THREE FIBER', 'GLSL SHADERS', 'GSAP', 'CREATIVE CODING', 'WEB ANIMATION', 'JAVASCRIPT', 'WEBGL'];
    const m = document.getElementById('marquee');
    const full = [...items, ...items].map(t => `<span class="marquee-item">${t}</span><span class="marquee-dot">✦</span>`).join('');
    m.innerHTML = full + full;

    /* ── REVEAL ON SCROLL ── */
    function revealInit() {
      const els = document.querySelectorAll('.reveal');
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') });
      }, { threshold: .15 });
      els.forEach(e => obs.observe(e));
    }

    /* ── THREE.JS CAROUSEL ── */
    const wrap = document.getElementById('canvas-wrap');
    const canvas = document.getElementById('three-canvas');
    const W = wrap.offsetWidth, H = wrap.offsetHeight;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setSize(W, H); renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0xf2f0eb, 1);

    const sc = new THREE.Scene();
    const cam2 = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    cam2.position.z = 7;

    const VS = `
varying vec2 vUv;varying vec3 vN;uniform float uTime;
void main(){vUv=uv;vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}
`;
    const FS = `
varying vec2 vUv;varying vec3 vN;
uniform float uTime;uniform vec3 uAcc;uniform vec3 uDark;uniform float uH;uniform float uSel;
float r(vec2 n){return fract(sin(dot(n,vec2(12.9898,4.1414)))*43758.5453);}
float ns(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.-2.*f);
return mix(mix(r(i),r(i+vec2(1,0)),u.x),mix(r(i+vec2(0,1)),r(i+vec2(1,1)),u.x),u.y);}
void main(){
  float t=uTime*.3;
  float n=ns(vUv*3.5+t*.4)*.6+ns(vUv*9.-t*.2)*.4;
  vec3 col=mix(uDark,uAcc*.75,n);
  col=mix(col,min(uAcc+vec3(.25),vec3(1.)),pow(n,3.)*.5);
  float rim=pow(1.-max(dot(vN,vec3(0,0,1)),0.),2.);
  col+=uAcc*rim*(.4+uH*.8);
  float scan=step(.93,mod(vUv.y*55.+uTime*1.5,1.))*.035;col+=scan;
  col-=smoothstep(.3,.5,length(vUv-.5))*.25;
  col+=uSel*uAcc*.4;
  gl_FragColor=vec4(col,.93+uH*.05+rim*.06);
}
`;

    const displayProjects = [...projects];
    const N2 = displayProjects.length, SP = 2.0, TW2 = (N2 - 1) * SP;
    const geo2 = new THREE.PlaneGeometry(1.2, 1.8, 24, 24);
    const meshes2 = [], mats2 = [];

    function makeLabel(p) {
      const cv = document.createElement('canvas'); cv.width = 512; cv.height = 640;
      const c = cv.getContext('2d');
      c.fillStyle = 'rgba(0,0,0,0)'; c.fillRect(0, 0, 512, 640);
      c.fillStyle = 'rgba(255,255,255,0.06)'; c.fillRect(0, 0, 512, 640);
      c.fillStyle = 'rgba(255,100,0,0.9)';
      c.font = '700 13px "Space Mono",monospace'; c.letterSpacing = '3px';
      c.fillText(p.cat, 32, 52);
      c.fillStyle = 'rgba(255,255,255,0.95)';
      c.font = '900 58px "Bebas Neue","Arial Black",Arial';
      const lines = p.title.split(' ');
      let y = 130, lineW = [];
      lines.forEach(l => { lineW.push(c.measureText(l).width) });
      if (lineW[0] > 420) {
        const mid = Math.ceil(lines.length / 2);
        [lines.slice(0, mid).join(' '), lines.slice(mid).join(' ')].forEach((l, i) => { c.fillText(l, 32, 130 + i * 62) });
        y = 130 + 62 * 2 + 20;
      } else {
        let row = [], rows = [];
        lines.forEach(w => {
          const test = [...row, w].join(' ');
          if (c.measureText(test).width > 420 && row.length > 0) { rows.push(row.join(' ')); row = [w]; } else { row.push(w); }
        });
        if (row.length) rows.push(row.join(' '));
        rows.forEach((r, i) => c.fillText(r, 32, 130 + i * 62));
        y = 130 + rows.length * 62 + 20;
      }
      c.fillStyle = 'rgba(255,255,255,0.3)';
      c.font = '400 11px "Space Mono",monospace'; c.letterSpacing = '1px';
      p.tags.slice(0, 3).forEach((t, i) => c.fillText(t, 32, y + i * 22));
      c.strokeStyle = 'rgba(255,100,0,0.4)'; c.lineWidth = 1;
      c.beginPath(); c.moveTo(32, 580); c.lineTo(200, 580); c.stroke();
      c.fillStyle = 'rgba(255,100,0,0.8)';
      c.font = '700 10px "Space Mono",monospace'; c.letterSpacing = '2px';
      c.fillText('CLICK TO OPEN →', 32, 600);
      return new THREE.CanvasTexture(cv);
    }

    displayProjects.forEach((p, i) => {
      const mat = new THREE.ShaderMaterial({
        vertexShader: VS, fragmentShader: FS,
        uniforms: { uTime: { value: 0 }, uAcc: { value: new THREE.Vector3(...p.acc) }, uDark: { value: new THREE.Vector3(...p.dark) }, uH: { value: 0 }, uSel: { value: 0 } },
        transparent: true
      });
      const m = new THREE.Mesh(geo2, mat);
      m.position.set(i * SP - TW2 / 2, 0, 0);
      m.userData = { i, bx: i * SP - TW2 / 2 };
      sc.add(m);
      const labelMat = new THREE.MeshBasicMaterial({ map: makeLabel(p), transparent: true });
      const label = new THREE.Mesh(new THREE.PlaneGeometry(1.18, 1.78), labelMat);
      label.position.z = 0.01; m.add(label);
      const eg = new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.2, 1.8));
      const em = new THREE.LineBasicMaterial({ color: 0x111111, transparent: true, opacity: .1 });
      m.add(new THREE.LineSegments(eg, em));
      meshes2.push(m); mats2.push(mat);
    });

    let sX = 0, tSX = 0, hovI = -1, isDrag2 = false, dsx2 = 0, dss2 = 0, clickOk = true;
    const ray2 = new THREE.Raycaster(); const mv2 = new THREE.Vector2();

    wrap.addEventListener('mousemove', e => {
      const r = wrap.getBoundingClientRect();
      mv2.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height * 2 - 1));
      if (isDrag2) { const dx = (e.clientX - dsx2) * .007; tSX = dss2 - dx; clickOk = false; }
    });
    wrap.addEventListener('wheel', e => { e.preventDefault(); tSX += e.deltaY * .004; }, { passive: false });
    wrap.addEventListener('mousedown', e => { isDrag2 = true; dsx2 = e.clientX; dss2 = tSX; clickOk = true; });
    window.addEventListener('mouseup', () => isDrag2 = false);
    wrap.addEventListener('click', () => { if (clickOk && hovI >= 0) openModal(displayProjects[hovI], hovI); });

    function openModal(p, i) {
      document.getElementById('pm-num').textContent = p.num + ' / 0' + projects.length;
      document.getElementById('pm-cat').textContent = p.cat;
      document.getElementById('pm-title').textContent = p.title;
      document.getElementById('pm-desc').textContent = p.desc;
      document.getElementById('pm-tags').innerHTML = p.tags.map(t => `<span class="pm-tag">${t}</span>`).join('');
      document.getElementById('pm-highlights').innerHTML = p.highlights.map(h => `<div class="pm-highlight">${h}</div>`).join('');
      const lnk = document.getElementById('pm-link');
      lnk.href = p.link;
      const liveLnk = document.getElementById('pm-live-link');
      if (p.live) {
        liveLnk.style.display = 'inline-block';
        liveLnk.href = p.live;
      } else {
        liveLnk.style.display = 'none';
      }
      document.getElementById('proj-modal').classList.add('open');
      mats2.forEach((m, j) => m.uniforms.uSel.value = j === i ? 1 : 0);
    }
    document.getElementById('pm-close').onclick = closeModal;
    document.getElementById('proj-modal').addEventListener('click', e => { if (e.target === document.getElementById('proj-modal')) closeModal(); });
    function closeModal() { document.getElementById('proj-modal').classList.remove('open'); mats2.forEach(m => m.uniforms.uSel.value = 0); }

    const clk = new THREE.Clock();
    (function tick() {
      requestAnimationFrame(tick);
      const t = clk.getElapsedTime();
      let isHoveringCard = hovI !== -1;
      if (!isDrag2 && !isHoveringCard) {
        tSX -= 0.0025; // elegant slow auto-rotation
      } else if (!isDrag2 && isHoveringCard) {
        // Optionally, gently sync tSX to sX if not dragging or scrolling, to prevent tiny drift
        // But a tiny drift of 0.03 units is usually fine. Let's just slightly damp the inertia when hovered:
        tSX += (sX - tSX) * 0.1;
      }
      sX += (tSX - sX) * .08;
      ray2.setFromCamera(mv2, cam2);
      const hits = ray2.intersectObjects(meshes2);
      hovI = hits.length ? hits[0].object.userData.i : -1;
      wrap.style.cursor = 'none';
      const mxN = mv2.x, myN = mv2.y;
      cam2.position.x = mxN * .3; cam2.position.y = myN * .15; cam2.lookAt(0, 0, 0);
      meshes2.forEach((m, i) => {
        const TotalWidth = N2 * SP;
        let bx = m.userData.bx - sX * SP;
        bx = ((bx + TotalWidth / 2) % TotalWidth + TotalWidth) % TotalWidth - TotalWidth / 2;
        
        m.position.x = bx;
        m.position.y = Math.sin(t * .45 + i * 1.1) * .04;
        m.rotation.y = -bx * .04; // slight tilt based on position
        
        mats2[i].uniforms.uTime.value = t;
        const isH = i === hovI;
        mats2[i].uniforms.uH.value += (isH ? 1 : 0 - mats2[i].uniforms.uH.value) * .1;
        
        if (m.userData.hoverZ === undefined) m.userData.hoverZ = 0;
        m.userData.hoverZ += ((isH ? 0.25 : 0) - m.userData.hoverZ) * .12;
        m.position.z = m.userData.hoverZ;
      });
      renderer.render(sc, cam2);
    })();

    window.addEventListener('resize', () => {
      const nw = wrap.offsetWidth;
      cam2.aspect = nw / H; cam2.updateProjectionMatrix();
      renderer.setSize(nw, H);
    });

    // CONTACT MODAL LOGIC
    window.openContactModal = function() {
      document.getElementById('contact-modal').classList.add('open');
    };
    
    function closeContactModal() {
      document.getElementById('contact-modal').classList.remove('open');
    }
    
    document.getElementById('cm-close').onclick = closeContactModal;
    document.getElementById('contact-modal').addEventListener('click', e => {
      if (e.target === document.getElementById('contact-modal')) closeContactModal();
    });

    window.sendEmail = function(e) {
      e.preventDefault();
      
      const submitBtn = document.querySelector('.cm-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'SENDING...';
      
      const formData = new FormData(document.getElementById('contact-form'));
      formData.append('access_key', '5ef3e04c6b3f9b8beca974715b3f82d1');
      
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
      
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
      })
      .then(async (response) => {
        if (response.status == 200) {
          submitBtn.innerHTML = 'SENT SUCCESSFULLY!';
          setTimeout(() => {
            closeContactModal();
            document.getElementById('contact-form').reset();
            submitBtn.innerHTML = originalText;
          }, 2000);
        } else {
          submitBtn.innerHTML = 'ERROR! TRY AGAIN';
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
          }, 3000);
        }
      })
      .catch(error => {
        console.log(error);
        submitBtn.innerHTML = 'ERROR! TRY AGAIN';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
        }, 3000);
      });
    };
