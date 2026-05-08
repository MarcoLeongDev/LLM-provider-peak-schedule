(function() {
    const providerData = {"providers":[
        {"name":"Baidu Qianfan","timezone":"Asia/Shanghai","displayTimezone":"China Standard Time (UTC+8)","weekdaysOnly":false,"peakHours":[{"start":"10:30","end":"12:00"},{"start":"14:00","end":"18:00"}],"hasPeakPenalty":true,"reference":"https://cloud.baidu.com/doc/qianfan/s/imlg0beiu","iconLink":"https://cloud.baidu.com/product/codingplan.html"},
        {"name":"Anthropic","timezone":"America/Los_Angeles","displayTimezone":"Pacific Time (PT)","weekdaysOnly":true,"peakHours":[{"start":"05:00","end":"11:00"}],"hasPeakPenalty":true,"reference":"https://x.com/trq212/status/2037254607001559305","iconLink":"https://platform.claude.com/docs/en/about-claude/pricing"},
        {"name":"OpenAI","timezone":"America/New_York","displayTimezone":"Eastern Time (ET)","weekdaysOnly":false,"peakHours":[],"hasPeakPenalty":false,"reference":"https://help.openai.com","iconLink":"https://chatgpt.com/pricing/"},
        {"name":"Xunfei Spark","timezone":"Asia/Shanghai","displayTimezone":"China Standard Time (UTC+8)","weekdaysOnly":false,"peakHours":[],"hasPeakPenalty":false,"reference":"https://www.xfyun.cn/doc/spark/CodingPlan.html","iconLink":"https://maas.xfyun.cn/packageSubscription"},
        {"name":"Zhipu GLM","timezone":"Asia/Shanghai","displayTimezone":"China Standard Time (UTC+8)","weekdaysOnly":false,"peakHours":[{"start":"14:00","end":"18:00"}],"hasPeakPenalty":true,"reference":"https://docs.bigmodel.cn/cn/coding-plan/overview","iconLink":"https://z.ai/subscribe"},
        {"name":"MiniMax","timezone":"Asia/Shanghai","displayTimezone":"China Standard Time (UTC+8)","weekdaysOnly":false,"peakHours":[],"hasPeakPenalty":false,"reference":"https://platform.minimax.io/docs/token-plan/faq","iconLink":"https://platform.minimax.io/subscribe/token-plan"},
        {"name":"Alibaba Cloud","timezone":"Asia/Shanghai","displayTimezone":"China Standard Time (UTC+8)","weekdaysOnly":false,"peakHours":[],"hasPeakPenalty":false,"reference":"https://www.alibabacloud.com/help/en/model-studio/coding-plan"},
        {"name":"Tencent Hunyuan","timezone":"Asia/Shanghai","displayTimezone":"China Standard Time (UTC+8)","weekdaysOnly":false,"peakHours":[],"hasPeakPenalty":false,"reference":"https://cloud.tencent.com/document/product/1823/130092","iconLink":"https://console.cloud.tencent.com/tokenhub/codingplan"},
        {"name":"ByteDance Volcano","timezone":"Asia/Shanghai","displayTimezone":"China Standard Time (UTC+8)","weekdaysOnly":false,"peakHours":[],"hasPeakPenalty":false,"reference":"https://www.volcengine.com/docs/82379/1925114?lang=zh","iconLink":"https://www.volcengine.com/activity/codingplan"},
        {"name":"Kimi","timezone":"Asia/Shanghai","displayTimezone":"China Standard Time (UTC+8)","weekdaysOnly":false,"peakHours":[],"hasPeakPenalty":false,"reference":"https://platform.kimi.ai/docs/pricing/limits","iconLink":"https://www.kimi.com/membership/pricing?track_id=8a0a5b0a-9fd4-488e-929f-bf38a764a496"},
        {"name":"DeepSeek","timezone":"Asia/Shanghai","displayTimezone":"China Standard Time (UTC+8)","weekdaysOnly":false,"peakHours":[],"hasPeakPenalty":false,"reference":"https://api-docs.deepseek.com/news/news250821","iconLink":"https://api-docs.deepseek.com/quick_start/pricing"}
    ]};

    const providerIconMap = {
        'Baidu Qianfan': 'img/baiducloud-color.svg',
        'Anthropic': 'img/claude-color.svg',
        'OpenAI': 'img/openai.svg',
        'Xunfei Spark': 'img/iflytekcloud-color.svg',
        'Zhipu GLM': 'img/zai.svg',
        'MiniMax': 'img/minimax-color.svg',
        'Alibaba Cloud': 'img/alibabacloud-color.svg',
        'Tencent Hunyuan': 'img/tencentcloud-color.svg',
        'Kimi': 'img/kimi-color.svg',
        'DeepSeek': 'img/deepseek-color.svg',
        'ByteDance Volcano': 'img/volcengine-color.svg'
    };

    const tzLabelMap = {
        'Asia/Shanghai': 'CST (UTC+8)',
        'America/Los_Angeles': 'PT (UTC-8)',
        'America/New_York': 'ET (UTC-5)'
    };
    function getTzLabel(timezone) { return tzLabelMap[timezone] || ''; }

    let glowCounter = 0;
    function nextGlowId() { return 'glow-' + (++glowCounter); }

    function getStarred() { try { const d = localStorage.getItem('llm-starred'); return d ? JSON.parse(d) : []; } catch(e) { return []; } }
    function saveStarred(arr) { try { localStorage.setItem('llm-starred', JSON.stringify(arr)); } catch(e) {} }

    const cardGrid = document.getElementById('cardGrid');
    const utcEl = document.getElementById('utcTime');
    const localEl = document.getElementById('localTime');
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const themeToggle = document.getElementById('themeToggle');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsOverlay = document.getElementById('settingsOverlay');
    const htmlEl = document.documentElement;

    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/></svg>`;

    function getTheme() { try { return localStorage.getItem('llm-theme'); } catch(e) { return null; } }
    function setTheme(t) { try { localStorage.setItem('llm-theme', t); } catch(e) {} }
    function applyTheme(t) {
        htmlEl.setAttribute('data-theme', t);
        themeToggle.innerHTML = t === 'dark' ? sunIcon : moonIcon;
        setTheme(t);
    }
    const saved = getTheme();
    applyTheme(saved || (window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'));
    themeToggle.onclick = () => { applyTheme(htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); renderAllCards(); };

    settingsBtn.onclick = () => settingsOverlay.classList.add('visible');
    settingsOverlay.onclick = (e) => {
        if (e.target === settingsOverlay) settingsOverlay.classList.remove('visible');
    };

    function utcNow() { return Date.now(); }
    function tzTime(ts, tz) {
        const fmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        const parts = fmt.formatToParts(new Date(ts));
        const h = +parts.find(p => p.type === 'hour').value;
        const m = +parts.find(p => p.type === 'minute').value;
        const s = +parts.find(p => p.type === 'second').value;
        return { hours: h, minutes: m, seconds: s, decimal: h + m / 60 + s / 3600 };
    }
    function isWeekday(ts, tz) {
        const day = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short' }).format(new Date(ts));
        return !['Sat', 'Sun'].includes(day);
    }
    const pad2 = n => String(n).padStart(2, '0');
    function fmtHMS(h, m, s) { return `${pad2(h)}:${pad2(m)}:${pad2(s)}`; }
    function fmtHM(h, m) { return `${pad2(h)}:${pad2(m)}`; }
    function parseTime(t) { const [h, m] = t.split(':').map(Number); return { hours: h, minutes: m, decimal: h + m / 60 }; }

    function getStatus(decimal, peaks, weekday) {
        if (!peaks.length) return { inPeak: false, nextLabel: 'none' };
        for (let p of peaks) {
            if (decimal >= p.startDecimal && decimal < p.endDecimal)
                return { inPeak: true, nextLabel: 'nonpeak', countdown: countdownTo(decimal, p.endDecimal) };
        }
        let nextStart = null;
        for (let p of peaks) if (p.startDecimal > decimal && (nextStart === null || p.startDecimal < nextStart)) nextStart = p.startDecimal;
        if (nextStart !== null) return { inPeak: false, nextLabel: 'peak', countdown: countdownTo(decimal, nextStart) };
        return { inPeak: false, nextLabel: 'peak', countdown: countdownTo(decimal, peaks[0].startDecimal + 24) };
    }

    function countdownTo(current, target) {
        let diff = target - current; if (diff < 0) diff += 24;
        const mins = Math.round(diff * 60);
        return { hours: Math.floor(mins / 60), minutes: mins % 60 };
    }

    function drawClock(peaks, currentDecimal, isDark, currentTimeStr, glowId, tzLabel) {
        const ns = 'http://www.w3.org/2000/svg', cx = 100, cy = 100, outerR = 82, bandOut = 76, bandIn = 56;
        const svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', '0 0 200 200'); svg.setAttribute('width', '180'); svg.setAttribute('height', '180');

        const defs = document.createElementNS(ns, 'defs');
        const filter = document.createElementNS(ns, 'filter'); filter.setAttribute('id', glowId);
        filter.innerHTML = '<feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>';
        defs.appendChild(filter);
        svg.appendChild(defs);

        const face = document.createElementNS(ns, 'circle');
        face.setAttribute('cx', cx); face.setAttribute('cy', cy); face.setAttribute('r', outerR);
        face.setAttribute('class', 'clock-face');
        svg.appendChild(face);

        const startAngleRad = Math.PI;
        const endAngleRad = 0;
        const sx = cx + outerR * Math.cos(startAngleRad), sy = cy + outerR * Math.sin(startAngleRad);
        const ex = cx + outerR * Math.cos(endAngleRad),   ey = cy + outerR * Math.sin(endAngleRad);
        const semi = document.createElementNS(ns, 'path');
        semi.setAttribute('d', `M ${sx.toFixed(3)} ${sy.toFixed(3)} A ${outerR} ${outerR} 0 0 1 ${ex.toFixed(3)} ${ey.toFixed(3)} Z`);
        semi.setAttribute('fill', 'var(--top-semicircle)');
        svg.appendChild(semi);

        peaks.forEach(p => {
            const sA = p.startDecimal * 15 - 90, eA = p.endDecimal * 15 - 90, span = (p.endDecimal - p.startDecimal) * 15, large = span > 180 ? 1 : 0;
            const r1 = sA * Math.PI / 180, r2 = eA * Math.PI / 180;
            const ox1 = cx + bandOut * Math.cos(r1), oy1 = cy + bandOut * Math.sin(r1);
            const ox2 = cx + bandOut * Math.cos(r2), oy2 = cy + bandOut * Math.sin(r2);
            const ix1 = cx + bandIn * Math.cos(r1), iy1 = cy + bandIn * Math.sin(r1);
            const ix2 = cx + bandIn * Math.cos(r2), iy2 = cy + bandIn * Math.sin(r2);
            const path = document.createElementNS(ns, 'path');
            path.setAttribute('d', `M ${ox1.toFixed(3)} ${oy1.toFixed(3)} A ${bandOut} ${bandOut} 0 ${large} 1 ${ox2.toFixed(3)} ${oy2.toFixed(3)} L ${ix2.toFixed(3)} ${iy2.toFixed(3)} A ${bandIn} ${bandIn} 0 ${large} 0 ${ix1.toFixed(3)} ${iy1.toFixed(3)} Z`);
            path.setAttribute('fill', 'var(--peak-fill)');
            path.setAttribute('stroke', 'var(--peak-stroke)');
            path.setAttribute('stroke-width', '0.8');
            path.setAttribute('class', 'peak-arc');
            svg.appendChild(path);
        });

        for (let h = 0; h < 24; h++) {
            const ang = h * 15 - 90, rad = ang * Math.PI / 180, major = h % 6 === 0, rIn = major ? 72 : 76;
            const x1 = cx + rIn * Math.cos(rad), y1 = cy + rIn * Math.sin(rad), x2 = cx + 82 * Math.cos(rad), y2 = cy + 82 * Math.sin(rad);
            const line = document.createElementNS(ns, 'line');
            line.setAttribute('x1', x1.toFixed(2)); line.setAttribute('y1', y1.toFixed(2)); line.setAttribute('x2', x2.toFixed(2)); line.setAttribute('y2', y2.toFixed(2));
            line.setAttribute('stroke', major ? 'var(--clock-tick-major)' : 'var(--clock-tick)');
            line.setAttribute('stroke-width', major ? '1.8' : '0.8');
            line.setAttribute('stroke-linecap', 'round');
            svg.appendChild(line);
        }

        const nAng = currentDecimal * 15 - 90, nRad = nAng * Math.PI / 180, nLen = 80;
        const nX = cx + nLen * Math.cos(nRad), nY = cy + nLen * Math.sin(nRad), cX = cx - 12 * Math.cos(nRad), cY = cy - 12 * Math.sin(nRad);
        const needle = document.createElementNS(ns, 'line');
        needle.setAttribute('x1', cX.toFixed(2)); needle.setAttribute('y1', cY.toFixed(2)); needle.setAttribute('x2', nX.toFixed(2)); needle.setAttribute('y2', nY.toFixed(2));
        needle.setAttribute('class', 'clock-hand');
        needle.setAttribute('filter', `url(#${glowId})`);
        svg.appendChild(needle);

        const centerDot = document.createElementNS(ns, 'circle');
        centerDot.setAttribute('cx', cx); centerDot.setAttribute('cy', cy); centerDot.setAttribute('r', '4');
        centerDot.setAttribute('class', 'center-dot');
        svg.appendChild(centerDot);

        const timeText = document.createElementNS(ns, 'text');
        timeText.setAttribute('x', cx); timeText.setAttribute('y', 54);
        timeText.setAttribute('text-anchor', 'middle');
        timeText.setAttribute('fill', 'var(--clock-digital)');
        timeText.setAttribute('font-size', '14');
        timeText.setAttribute('font-family', "'SF Mono', monospace");
        timeText.setAttribute('font-weight', 'bold');
        timeText.setAttribute('class', 'digital-time');
        timeText.textContent = currentTimeStr;
        svg.appendChild(timeText);

        const tzText = document.createElementNS(ns, 'text');
        tzText.setAttribute('x', cx); tzText.setAttribute('y', 70);
        tzText.setAttribute('text-anchor', 'middle');
        tzText.setAttribute('fill', 'var(--text-muted)');
        tzText.setAttribute('font-size', '10');
        tzText.setAttribute('font-family', "'SF Mono', monospace");
        tzText.textContent = tzLabel || '';
        svg.appendChild(tzText);

        [{ h: 0, l: '0' }, { h: 6, l: '6' }, { h: 12, l: '12' }, { h: 18, l: '18' }].forEach(n => {
            const a = n.h * 15 - 90, rad2 = a * Math.PI / 180, tx = cx + (outerR + 10) * Math.cos(rad2), ty = cy + (outerR + 10) * Math.sin(rad2);
            const t = document.createElementNS(ns, 'text');
            t.setAttribute('x', tx.toFixed(1)); t.setAttribute('y', ty.toFixed(1));
            t.setAttribute('text-anchor', 'middle');
            t.setAttribute('dominant-baseline', 'central');
            t.setAttribute('class', 'clock-number');
            t.textContent = n.l;
            svg.appendChild(t);
        });

        return { svg, needle, centerDot, timeText, tzText };
    }

    function toggleStar(providerName) {
        const starred = getStarred();
        const idx = starred.indexOf(providerName);
        if (idx > -1) starred.splice(idx, 1); else starred.push(providerName);
        saveStarred(starred);
        renderAllCards(searchInput.value.trim());
    }

    function renderAllCards(filter = '') {
        const now = utcNow(), isDark = htmlEl.getAttribute('data-theme') === 'dark';
        const starred = getStarred();
        cardGrid.innerHTML = '';

        const sorted = [...providerData.providers].sort((a, b) => {
            const aS = starred.includes(a.name) ? 0 : 1, bS = starred.includes(b.name) ? 0 : 1;
            if (aS !== bS) return aS - bS;
            return a.name.localeCompare(b.name);
        });

        sorted.forEach(prov => {
            if (filter && !prov.name.toLowerCase().includes(filter.toLowerCase())) return;

            const peaks = prov.peakHours.map(p => { const s = parseTime(p.start), e = parseTime(p.end); return { ...p, startDecimal: s.decimal, endDecimal: e.decimal }; }).sort((a, b) => a.startDecimal - b.startDecimal);
            const { hours, minutes, seconds, decimal } = tzTime(now, prov.timezone);
            const weekday = prov.weekdaysOnly ? isWeekday(now, prov.timezone) : true;
            const status = getStatus(decimal, peaks, weekday);
            const effectivePenalty = prov.hasPeakPenalty && status.inPeak && weekday;

            const card = document.createElement('div'); card.className = 'card';
            if (effectivePenalty) card.classList.add('peak-penalty');
            card.dataset.name = prov.name;

            const headerDiv = document.createElement('div');
            headerDiv.className = 'card-header';

            const iconLink = document.createElement('a');
            iconLink.href = prov.iconLink || prov.reference;
            iconLink.target = '_blank';
            iconLink.rel = 'noopener noreferrer';
            iconLink.className = 'provider-icon-link';

            const iconImg = document.createElement('img');
            iconImg.className = 'provider-icon-img';
            const iconPath = providerIconMap[prov.name];
            if (iconPath) {
                iconImg.src = iconPath;
                iconImg.alt = prov.name;
            } else {
                // Fallback to first letter
                iconImg.alt = prov.name.charAt(0).toUpperCase();
                iconImg.style.display = 'flex';
                iconImg.style.alignItems = 'center';
                iconImg.style.justifyContent = 'center';
                iconImg.style.fontWeight = '700';
                iconImg.textContent = prov.name.charAt(0).toUpperCase();
            }
            iconLink.appendChild(iconImg);
            headerDiv.appendChild(iconLink);

            const nameEl = document.createElement('div');
            nameEl.className = 'card-name';
            nameEl.textContent = prov.name;
            headerDiv.appendChild(nameEl);
            card.appendChild(headerDiv);

            const starBtn = document.createElement('button');
            starBtn.className = 'star-btn' + (starred.includes(prov.name) ? ' starred' : '');
            starBtn.innerHTML = starred.includes(prov.name)
                ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/></svg>';
            starBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleStar(prov.name); });
            card.appendChild(starBtn);

            const clockWrap = document.createElement('div'); clockWrap.className = 'card-clock-wrap';
            const glowId = nextGlowId();
            const tzLabel = getTzLabel(prov.timezone);
            const { svg, needle, centerDot, timeText, tzText } = drawClock(peaks, decimal, isDark, fmtHMS(hours, minutes, seconds), glowId, tzLabel);
            clockWrap.appendChild(svg);
            card.appendChild(clockWrap);

            const divider = document.createElement('hr'); divider.className = 'card-divider'; card.appendChild(divider);

            const cdEl = document.createElement('div'); cdEl.className = 'card-countdown';
            if (status.inPeak) {
                cdEl.classList.add('to-nonpeak');
                cdEl.textContent = `Peak ends in ${fmtHM(status.countdown.hours, status.countdown.minutes)}`;
            } else if (status.nextLabel === 'peak') {
                cdEl.classList.add('to-peak');
                cdEl.textContent = `Peak starts in ${fmtHM(status.countdown.hours, status.countdown.minutes)}`;
            } else {
                cdEl.classList.add('no-peak');
                cdEl.textContent = '--';
            }
            card.appendChild(cdEl);

            const schedLink = document.createElement('a'); schedLink.className = 'card-schedule';
            schedLink.href = prov.reference; schedLink.target = '_blank'; schedLink.rel = 'noopener noreferrer';
            const scheduleText = peaks.length ? peaks.map(p => `${p.start}-${p.end}`).join(', ') : 'No peak hours';
            const freqText = prov.weekdaysOnly ? '· Weekdays' : '· Daily';
            schedLink.innerHTML = `${peaks.length ? `${scheduleText} ${freqText}` : scheduleText} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/></svg>`;
            card.appendChild(schedLink);

            card._data = { prov, peaks, decimal, status, effectivePenalty, needle, centerDot, timeText, cdEl };
            cardGrid.appendChild(card);
        });
    }

    function updateCards() {
        const now = utcNow(), isDark = htmlEl.getAttribute('data-theme') === 'dark';
        document.querySelectorAll('.card').forEach(card => {
            const d = card._data; if (!d) return;
            const { prov, peaks, needle, centerDot, timeText, cdEl } = d;

            const { hours, minutes, seconds, decimal } = tzTime(now, prov.timezone);
            const weekday = prov.weekdaysOnly ? isWeekday(now, prov.timezone) : true;
            const status = getStatus(decimal, peaks, weekday);
            const effectivePenalty = prov.hasPeakPenalty && status.inPeak && weekday;

            card.classList.remove('peak-penalty');
            if (effectivePenalty) card.classList.add('peak-penalty');

            cdEl.className = 'card-countdown';
            if (status.inPeak) {
                cdEl.classList.add('to-nonpeak');
                cdEl.textContent = `Peak ends in ${fmtHM(status.countdown.hours, status.countdown.minutes)}`;
            } else if (status.nextLabel === 'peak') {
                cdEl.classList.add('to-peak');
                cdEl.textContent = `Peak starts in ${fmtHM(status.countdown.hours, status.countdown.minutes)}`;
            } else {
                cdEl.classList.add('no-peak');
                cdEl.textContent = '--';
            }

            if (timeText) timeText.textContent = fmtHMS(hours, minutes, seconds);
            if (needle && centerDot) {
                const cx = 100, cy = 100, nLen = 80;
                const nAng = decimal * 15 - 90, nRad = nAng * Math.PI / 180;
                const nX = cx + nLen * Math.cos(nRad), nY = cy + nLen * Math.sin(nRad);
                const cX = cx - 12 * Math.cos(nRad), cY = cy - 12 * Math.sin(nRad);
                needle.setAttribute('x1', cX.toFixed(2)); needle.setAttribute('y1', cY.toFixed(2));
                needle.setAttribute('x2', nX.toFixed(2)); needle.setAttribute('y2', nY.toFixed(2));
            }
        });

        const u = utcNow();
        const utcD = new Date(u), localD = new Date();
        utcEl.textContent = fmtHMS(utcD.getUTCHours(), utcD.getUTCMinutes(), utcD.getUTCSeconds());
        localEl.textContent = fmtHMS(localD.getHours(), localD.getMinutes(), localD.getSeconds());
    }

    function updateClearButton() {
        if (searchInput.value.length > 0) searchClear.classList.add('visible');
        else searchClear.classList.remove('visible');
    }

    searchInput.addEventListener('input', () => {
        updateClearButton();
        renderAllCards(searchInput.value.trim());
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        updateClearButton();
        searchInput.focus();
        renderAllCards('');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            if (settingsOverlay.classList.contains('visible')) {
                settingsOverlay.classList.remove('visible');
            } else if (document.activeElement === searchInput) {
                searchInput.value = '';
                updateClearButton();
                renderAllCards('');
            }
        }
    });

    renderAllCards();
    setInterval(updateCards, 1000);
})();