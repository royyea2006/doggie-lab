const questions = [
    { scene: "📍 出門", text: "今天是個大晴天，主人拿起牽繩準備帶你出門！你的反應是？", axis: "y", options: ["興奮到原地打轉，尾巴搖成螺旋槳！", "優雅地走到門口，心裡默默期待。", "先觀察一下外面的天氣和路人再決定。"] },
    { scene: "📍 路邊的球", text: "路邊滾出一顆色彩鮮艷的網球，你會？", axis: "y", options: ["立刻飛撲過去咬住它！", "歪頭思考這能不能吃？", "直接無視，專心跟著主人。"] },
    { scene: "📍 地瓜店", text: "路過一家烤地瓜店，香味撲鼻而來！你的反應？", axis: "y", options: ["使出可憐巴巴的眼神攻勢，盯著主人不放！", "小聲嚶嚶叫，提醒主人你聞到了。", "雖然很香，但繼續走就好了。"] },
    { scene: "📍 遇到小狗", text: "公園裡遇到一隻陌生小狗朝你走來，你會？", axis: "x", options: ["衝上去聞聞，交個新朋友！", "先觀察對方的尾巴和耳朵姿勢再靠近。", "保持距離，讓對方先表態。"] },
    { scene: "📍 主人迷路", text: "主人好像在公園裡迷路了，一直轉圈圈，你會怎麼做？", axis: "y", options: ["著急得在主人腳邊來回走，用叫聲提醒他。", "冷靜地帶頭往記得的方向走。", "坐在原地等他發現你才是導航犬。"] },
    { scene: "📍 下雨天", text: "外面突然下起大雨，主人還沒帶傘，你的反應？", axis: "x", options: ["鑽到主人腿下躲雨，緊緊靠著他。", "找個能遮雨的地方，叫主人一起來。", "雨不是很大，繼續散步也沒關係吧？"] },
    { scene: "📍 新路線", text: "主人今天帶你走了一條完全沒去過的路，你的感覺？", axis: "x", options: ["好奇！每個轉角都想探險看看！", "有點緊張，但相信主人會帶我回家。", "一直聞路上的氣味，標記自己的領地。"] },
    { scene: "📍 回家", text: "玩了一整天要回家了，你現在的心情是？", axis: "x", options: ["超級滿足！回家可以跟主人窩在一起了！", "今天很開心，但明天還想再出來玩！", "終於可以回家休息整理情緒了。"] }
];

const dogResults = {
    "EY_EX": { name: "薩摩耶", sub: "天使般的微笑製造機", tags: ["開明", "黏人", "樂天派", "社交達人"], desc: "你的內心住著一隻薩摩耶！無論走到哪裡，你總是帶著陽光般的笑容。你非常重視情感連結，也喜歡分享生活中的點滴快樂。", img: "🐩" },
    "RY_EX": { name: "拉不拉多", sub: "溫暖穩定的守護者", tags: ["穩定", "友善", "配合度高"], desc: "你就像拉不拉多一樣，是大家最信賴的夥伴。你擁有極佳的觀察力與理性判斷，總能在關鍵時刻穩定軍心。", img: "🐕" },
    "EY_AX": { name: "吉娃娃", sub: "忠誠且獨特的靈魂", tags: ["敏感", "警戒", "界線感強"], desc: "你對世界有著敏銳的觀察。雖然不容易對陌生人敞開心扉，但對認定的人卻有著極高的忠誠度與守護感。", img: "🐕‍🦺" },
    "RY_AX": { name: "台灣土狗", sub: "靈敏獨立的觀察家", tags: ["警覺", "獨立", "觀察力強"], desc: "你具備強大的生存直覺。比起盲目從眾，你更喜歡冷靜地觀察環境再採取行動，擁有極高的自主性。", img: "🦊" }
};

const router = {
    step: 0, sx: 0, sy: 0,
    go(pageId) {
        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        const target = ['home', 'intro', 'quiz', 'loading', 'result'][pageId - 1];
        document.getElementById(`page-${target}`).classList.remove('hidden');
        if(pageId === 3) this.initQuiz();
        if(pageId === 4) setTimeout(() => this.go(5), 3000);
        if(pageId === 5) this.showResult();
    },
    initQuiz() {
        this.renderQuestion();
    },
    renderQuestion() {
        const q = questions[this.step];
        document.getElementById('q-scene').innerText = q.scene;
        document.getElementById('q-text').innerText = q.text;
        document.getElementById('step-count').innerText = `${this.step + 1} / 8`;
        
        const optionsDiv = document.getElementById('q-options');
        optionsDiv.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('div');
            btn.className = 'opt-btn';
            btn.innerHTML = `<span class="tag">${String.fromCharCode(65+i)}</span> ${opt}`;
            btn.onclick = () => this.handleAnswer(i);
            optionsDiv.appendChild(btn);
        });
    },
    handleAnswer(idx) {
        const val = idx === 0 ? 1 : (idx === 1 ? 0 : -1);
        if(questions[this.step].axis === 'x') this.sx += val; else this.sy += val;
        
        this.step++;
        if(this.step < 8) this.renderQuestion();
        else this.go(4);
    },
    showResult() {
        const yKey = this.sy >= 0 ? "EY" : "RY";
        const xKey = this.sx >= 0 ? "EX" : "AX";
        const res = dogResults[`${yKey}_${xKey}`];
        
        document.getElementById('res-name').innerText = res.name;
        document.getElementById('res-sub').innerText = res.sub;
        document.getElementById('res-desc').innerText = res.desc;
        document.getElementById('res-img').innerText = res.img;
        document.getElementById('res-tags').innerHTML = res.tags.map(t => `<span class="tag" style="background:${this.sy >= 0 ? '#A8C69F' : '#EF9A53'}">${t}</span>`).join('');
        
        const pt = document.getElementById('res-point');
        pt.style.left = (50 + (this.sx * 10)) + '%';
        pt.style.top = (50 - (this.sy * 10)) + '%';
    }
};