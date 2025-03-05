class MacaoAdventure {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameContainer = document.getElementById('game-container');
        this.gameContainer.appendChild(this.canvas);
        
        this.init();
    }

    init() {
        // 設置畫布尺寸
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        // 初始化遊戲狀態
        this.player = {
            x: 400,
            y: 300,
            speed: 5,
            character: '荧', // 可選擇的原神角色
        };
        
        // 初始化遊戲場景
        this.landmarks = [
            {
                name: '大三巴牌坊',
                x: 100,
                y: 100,
                collected: false
            },
            // 其他景點
        ];
        
        this.startGameLoop();
    }

    startGameLoop() {
        const gameLoop = () => {
            this.update();
            this.render();
            requestAnimationFrame(gameLoop);
        };
        
        gameLoop();
    }

    update() {
        // 更新遊戲邏輯
        this.handleInput();
        this.checkCollisions();
    }

    render() {
        // 渲染遊戲畫面
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPlayer();
        this.drawLandmarks();
    }
}

function addGameImages() {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    
    // 使用 Unsplash 的澳門相關圖片
    const images = [
        'https://images.unsplash.com/photo-1555952238-7d76782b45f7?w=800', // 大三巴牌坊
        'https://images.unsplash.com/photo-1553874373-dc7f21934908?w=800', // 威尼斯人
        'https://images.unsplash.com/photo-1550542442-d5a8296b2b8d?w=800', // 澳門塔
        'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800'  // 澳門街景
    ];
    
    images.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.className = 'game-image';
        img.alt = '澳門景點圖片';
        
        // 添加加載錯誤處理
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/800x600?text=圖片加載失敗';
        };
        
        // 添加加載中的效果
        img.classList.add('image-loader');
        img.onload = function() {
            this.classList.remove('image-loader');
        };
        
        imageContainer.appendChild(img);
    });
    
    document.querySelector('#game-container').appendChild(imageContainer);
}

// 添加圖片錯誤處理函數
function handleImageError(img) {
    img.onerror = function() {
        this.src = 'https://via.placeholder.com/400x300?text=圖片載入失敗';
    }
}

// 為所有圖片添加錯誤處理
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(handleImageError);
});

// 初始化遊戲
document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    
    // 遊戲數據
    const locations = [
        {
            macau: {
                name: '大三巴牌坊',
                image: 'https://www.culturalheritage.mo/image/0/1920/?id=%2Fimg%2Fculturalheritage%2Fpica-l%2F66972f09-f35a-4c2c-af52-5cfa859a7738.jpg',
                description: '澳門最著名的歷史建築',
                history: '建於1627年，是天主教在中國傳教的重要象徵',
                features: ['歐式巴洛克建築風格', '東西方文化交融', '聯合國世界文化遺產'],
                tips: ['建議參觀時間：1-2小時', '最佳拍照時間：黃昏', '周邊有許多美食小店']
            },
            genshin: {
                name: '蒙德城大教堂',
                image: 'https://i.pinimg.com/736x/81/56/4b/81564b164600063adf9d5d54d288ae25.jpg',
                description: '西風騎士團總部',
                history: '風神巴巴托斯的象徵，蒙德城最重要的建築',
                features: ['哥德式建築風格', '西風騎士團總部', '風神崇拜中心'],
                quests: ['溫迪的故事任務', '西風騎士團日常委託']
            },
            similarities: [
                '都體現了西方宗教建築特色',
                '都是所在地區的標誌性建築',
                '都見證了重要的歷史時刻'
            ],
            activities: [
                {
                    name: '建築探索',
                    description: '尋找建築上的特殊細節',
                    type: 'spot-the-difference',
                    reward: '原石 × 20',
                    details: {
                        title: '尋找建築特色',
                        instruction: '在兩張圖片中找出5處不同之處',
                        image1: 'https://www.culturalheritage.mo/image/0/1920/?id=%2Fimg%2Fculturalheritage%2Fpica-l%2F66972f09-f35a-4c2c-af52-5cfa859a7738.jpg',
                        image2: 'https://genshin.global/wp-content/uploads/2022/01/mondstadt_city_location_genshin_impact.jpg',
                        differences: [
                            { x: 120, y: 150, description: '窗戶樣式' },
                            { x: 250, y: 200, description: '屋頂裝飾' }
                        ]
                    }
                },
                {
                    name: '歷史考察',
                    description: '了解建築的歷史故事',
                    type: 'quiz',
                    reward: '摩拉 × 10,000',
                    details: {
                        questions: [
                            {
                                question: '大三巴牌坊建於哪一年？',
                                options: ['1527年', '1627年', '1727年', '1827年'],
                                correct: 1,
                                explanation: '大三巴牌坊建於1627年，是澳門最古老的天主教堂之一。'
                            },
                            {
                                question: '蒙德城大教堂供奉的是誰？',
                                options: ['風神巴巴托斯', '岩神摩拉克斯', '雷神巴爾', '水神'],
                                correct: 0,
                                explanation: '蒙德城大教堂供奉的是風神巴巴托斯，也就是溫迪。'
                            }
                            // ... 更多問題
                        ]
                    }
                },
                {
                    name: '文化交流',
                    description: '比較東西方建築特色',
                    type: 'matching',
                    reward: '經驗書 × 2',
                    details: {
                        pairs: [
                            {
                                macau: { 
                                    name: '巴洛克式立面', 
                                    image: 'https://www.culturalheritage.mo/uploads/culturalheritage/pica/20230419/20230419115449_38.jpg'  // 大三巴細節
                                },
                                genshin: { 
                                    name: '蒙德建築風格', 
                                    image: 'https://genshin.global/wp-content/uploads/2022/05/favonius-cathedral-mondstadt-genshin-impact.jpg' // 蒙德大教堂
                                }
                            },
                            {
                                macau: { 
                                    name: '葡式磚瓦', 
                                    image: 'https://content.macaotourism.gov.mo/uploads/mgto_sightseeing/1e697b936d35e6f2d977b46b32e18d4c61f3e42e.jpg' // 議事亭前地
                                },
                                genshin: { 
                                    name: '璃月屋頂', 
                                    image: 'https://genshin.global/wp-content/uploads/2022/01/liyue-harbor-port-genshin-impact.jpg' // 璃月港
                                }
                            }
                            // ... 更多配對
                        ]
                    }
                }
            ],
            characters: [
                {
                    name: '溫迪',
                    image: 'https://i2.wp.com/images.genshin-builds.com/genshin/characters/venti/image.png?strip=all&quality=75&w=256',
                    dialog: '「這座教堂的建築風格，讓我想起了蒙德城呢～要不要我為你吟唱一首詩歌？」'
                },
                {
                    name: '琴',
                    image: 'https://img.clinicmed.net/uploadimg/image/20200921/16006588715f681db7dd7257.74036057.png',
                    dialog: '「作為西風騎士團的代理團長，看到這座建築讓我感受到了信仰的力量。」'
                }
            ]
        },
        {
            macau: {
                name: '澳門旅遊塔',
                image: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Macau_Tower_CE_Centre.jpg',
                description: '澳門地標性建築',
                history: '2001年落成，高度338米',
                features: ['觀光旅遊', '極限運動', '旋轉餐廳'],
                tips: ['建議黃昏時分參觀', '可以體驗笨豬跳', '適合拍攝全景照片']
            },
            genshin: {
                name: '璃月群玉閣',
                image: 'https://static.wikia.nocookie.net/gensin-impact/images/8/88/Jade_Chamber.png',
                description: '璃月最高建築',
                history: '凝光修建的空中宮殿',
                features: ['漂浮建築', '璃月地標', '商業中心'],
                quests: ['天權崛起', '群玉閣重建'],
                characters: [
                    {
                        name: '凝光',
                        image: 'https://i2.wp.com/images.genshin-builds.com/genshin/characters/ningguang/image.png?strip=all&quality=75&w=256',
                        dialog: '「從高處俯瞰城市的感覺，確實讓人心曠神怡。這裡的視野，不亞於我的群玉閣呢。」'
                    },
                    {
                        name: '可莉',
                        image: 'hhttps://i2.wp.com/images.genshin-builds.com/genshin/characters/klee/image.png?strip=all&quality=75&w=256',
                        dialog: '「哇！好高啊！可莉可以在這裡看到整個城市！咦，不能放煙花嗎？」'
                    }
                ]
            }
        },
        {
            macau: {
                name: '議事亭前地',
                image: 'https://content.macaotourism.gov.mo/uploads/mgto_sightseeing/1e697b936d35e6f2d977b46b32e18d4c61f3e42e.jpg',
                description: '澳門歷史城區中心',
                history: '葡萄牙時期的政治中心',
                features: ['葡式建築群', '露天廣場', '文化活動場地'],
                tips: ['適合漫步遊覽', '周邊有特色餐廳', '建議夜間參觀'],
                characters: [
                    {
                        name: '鍾離',
                        image: 'https://i2.wp.com/images.genshin-builds.com/genshin/characters/zhongli/image.png?strip=all&quality=75&w=256',
                        dialog: '「這廣場的石板路，訴說著歷史的痕跡。文化的交融，總是能創造出獨特的風景。」'
                    },
                    {
                        name: '胡桃',
                        image: 'https://thumbor.4gamers.com.tw/BZJVm_cfkq0F3ERFz5F4ZXVU9IM=/adaptive-fit-in/1200x1200/filters:no_upscale():extract_cover():format(jpeg):quality(85)/https%3A%2F%2Fugc-media.4gamers.com.tw%2Fpuku-prod-zh%2Fanonymous-story%2F99858dc3-c6b8-4359-809f-8adf298164f9.jpg',
                        dialog: '「這裡好熱鬧啊！要不要來場即興表演？咦，往生堂的優惠券在這裡好像不適用呢...」'
                    }
                ]
            },
            genshin: {
                name: '璃月港',
                image: 'https://static.wikia.nocookie.net/gensin-impact/images/0/0c/Liyue_Harbor.png/revision/latest?cb=20240428132749',
                description: '提瓦特大陸最繁榮的港口',
                history: '七國商貿中心',
                features: ['港口貿易', '商業區', '璃月特色建築'],
                quests: ['海燈節活動', '千帆節慶典']
            }
        },
        {
            macau: {
                name: '媽閣廟',
                image: 'https://www.culturalheritage.mo/image/0/1920/?id=%2Fimg%2Fculturalheritage%2Fpica-l%2Fcd7a1375-7125-4aaa-9a0e-86ec3d78c634.jpg',
                description: '澳門最古老的廟宇',
                history: '始建於明朝，供奉媽祖',
                features: ['中式建築', '海上守護神', '歷史文物'],
                tips: ['可以求籤', '觀賞海景', '了解媽祖文化'],
                characters: [
                    {
                        name: '雷電將軍',
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ9coir64W9UMekeAmN_X6Q0qU9v867TGp6A&s',
                        dialog: '「這座廟宇...與稻妻的氛圍很相似。永恆的信仰，跨越了時空的界限。」'
                    },
                    {
                        name: '八重神子',
                        image: 'https://i2.wp.com/images.genshin-builds.com/genshin/characters/yae_miko/image.png?strip=all&quality=75&w=256',
                        dialog: '「呵呵，這裡的香火真是鼎盛呢。看來人們對神明的信仰是共通的。」'
                    }
                ]
            },
            genshin: {
                name: '鳴神大社',
                image: 'https://static.wikia.nocookie.net/gensin-impact/images/8/84/Grand_Narukami_Shrine.png/revision/latest?cb=20220612162508',
                description: '稻妻神社總社',
                history: '供奉雷電將軍',
                features: ['日式建築', '神道教建築', '櫻花林'],
                quests: ['神櫻清淨', '雷神傳說']
            }
        }
    ];

    function initGame() {
        gameContainer.innerHTML = `
            <div class="game-header">
                <h2>澳門 × 原神 景點探索</h2>
                <p>派蒙：「旅行者，讓我們來探索這些相似的景點吧！」</p>
            </div>
            <div class="location-cards">
                ${locations.map((loc, index) => `
                    <div class="location-card">
                        <div class="location-pair">
                            <div class="location-item macau">
                                <img src="${loc.macau.image}" alt="${loc.macau.name}">
                                <h3>${loc.macau.name}</h3>
                                <p>${loc.macau.description}</p>
                            </div>
                            <div class="location-item genshin">
                                <img src="${loc.genshin.image}" alt="${loc.genshin.name}">
                                <h3>${loc.genshin.name}</h3>
                                <p>${loc.genshin.description}</p>
                            </div>
                        </div>
                        <div class="location-info">
                            <button class="explore-btn" data-index="${index}">探索此處</button>
                            <span class="reward-info">獎勵：${loc.reward}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // 添加點擊事件
        const exploreButtons = document.querySelectorAll('.explore-btn');
        exploreButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.dataset.index;
                exploreLocation(index);
            });
        });
    }

    function exploreLocation(index) {
        const location = locations[index];
        const dialog = document.createElement('div');
        dialog.className = 'exploration-dialog';
        
        dialog.innerHTML = `
            <div class="exploration-content">
                <div class="dialog-header">
                    <h2>${location.macau.name} × ${location.genshin.name}</h2>
                    <span class="close-dialog">&times;</span>
                </div>
                
                <div class="location-comparison">
                    <div class="location-details macau">
                        <img src="${location.macau.image}" alt="${location.macau.name}">
                        <h3>${location.macau.name}</h3>
                        <div class="info-section">
                            <h4>歷史背景</h4>
                            <p>${location.macau.history}</p>
                            <h4>建築特色</h4>
                            <ul>
                                ${location.macau.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                            <h4>遊覽貼士</h4>
                            <ul>
                                ${location.macau.tips.map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="location-details genshin">
                        <img src="${location.genshin.image}" alt="${location.genshin.name}">
                        <h3>${location.genshin.name}</h3>
                        <div class="info-section">
                            <h4>背景故事</h4>
                            <p>${location.genshin.history}</p>
                            <h4>特色</h4>
                            <ul>
                                ${location.genshin.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                            <h4>相關任務</h4>
                            <ul>
                                ${location.genshin.quests.map(quest => `<li>${quest}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="similarities-section">
                    <h3>相似之處</h3>
                    <ul>
                        ${location.similarities.map(similarity => `<li>${similarity}</li>`).join('')}
                    </ul>
                </div>

                <div class="activities-section">
                    <h3>探索活動</h3>
                    <div class="activity-cards">
                        ${location.activities.map(activity => `
                            <div class="activity-card">
                                <h4>${activity.name}</h4>
                                <p>${activity.description}</p>
                                <button class="start-activity" data-reward="${activity.reward}">
                                    開始活動
                                </button>
                                <span class="activity-reward">獎勵：${activity.reward}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="character-interactions">
                    <h3>原神角色對話</h3>
                    <div class="character-list">
                        ${location.characters.map(char => `
                            <div class="character-dialog-box">
                                <div class="character-avatar">
                                    <img src="${char.image}" alt="${char.name}">
                                    <h4>${char.name}</h4>
                                </div>
                                <div class="character-speech">
                                    <p>${char.dialog}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        // 添加關閉功能
        const closeBtn = dialog.querySelector('.close-dialog');
        closeBtn.onclick = () => dialog.remove();

        // 添加活動按鈕功能
        const activityButtons = dialog.querySelectorAll('.start-activity');
        activityButtons.forEach(button => {
            button.onclick = function() {
                const reward = this.dataset.reward;
                this.disabled = true;
                this.textContent = '已完成';
                this.classList.add('completed');
                alert(`派蒙：「太棒了！我們完成了這個活動！」\n獲得獎勵：${reward}`);
            };
        });
    }

    // 啟動遊戲
    initGame();
});

// 修改活動啟動函數
function startActivity(activity) {
    const activityDialog = document.createElement('div');
    activityDialog.className = 'activity-dialog';

    let content = '';
    switch (activity.type) {
        case 'spot-the-difference':
            content = createSpotDifferenceGame(activity.details);
            break;
        case 'quiz':
            content = createQuizGame(activity.details);
            break;
        case 'matching':
            content = createMatchingGame(activity.details);
            break;
    }

    activityDialog.innerHTML = `
        <div class="activity-content">
            <div class="activity-header">
                <h3>${activity.name}</h3>
                <span class="close-activity">&times;</span>
            </div>
            <div class="activity-instructions">
                <p>${activity.description}</p>
            </div>
            ${content}
        </div>
    `;

    document.body.appendChild(activityDialog);
    initializeActivity(activity.type, activityDialog);
}

// 創建找不同遊戲
function createSpotDifferenceGame(details) {
    return `
        <div class="spot-difference-game">
            <p class="game-instruction">${details.instruction}</p>
            <div class="image-comparison">
                <div class="image-container">
                    <img src="${details.image1}" alt="澳門建築">
                    ${details.differences.map(diff => 
                        `<div class="difference-spot" style="left: ${diff.x}px; top: ${diff.y}px;" 
                              data-description="${diff.description}"></div>`
                    ).join('')}
                </div>
                <div class="image-container">
                    <img src="${details.image2}" alt="原神建築">
                </div>
            </div>
            <div class="difference-counter">已找到：<span>0</span>/5</div>
        </div>
    `;
}

// 創建問答遊戲
function createQuizGame(details) {
    return `
        <div class="quiz-game">
            ${details.questions.map((q, index) => `
                <div class="quiz-question" data-question="${index}">
                    <h4>${q.question}</h4>
                    <div class="options">
                        ${q.options.map((opt, i) => `
                            <button class="option-btn" data-option="${i}">${opt}</button>
                        `).join('')}
                    </div>
                    <div class="explanation hidden">${q.explanation}</div>
                </div>
            `).join('')}
            <div class="quiz-progress">問題 1/${details.questions.length}</div>
        </div>
    `;
}

// 創建配對遊戲
function createMatchingGame(details) {
    return `
        <div class="matching-game">
            <div class="matching-pairs">
                ${details.pairs.map(pair => `
                    <div class="matching-pair">
                        <div class="match-item" data-pair="${pair.macau.name}">
                            <img src="${pair.macau.image}" alt="${pair.macau.name}">
                            <span>${pair.macau.name}</span>
                        </div>
                        <div class="match-item" data-pair="${pair.genshin.name}">
                            <img src="${pair.genshin.image}" alt="${pair.genshin.name}">
                            <span>${pair.genshin.name}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 景點資料
const locationData = {
    'ruins-of-st-pauls': {
        macau: {
            name: '大三巴牌坊',
            description: '澳門最著名的地標之一，建於1602年的天主教聖保祿教堂。',
            history: '這座教堂見證了澳門早期天主教傳播的歷史，現在只剩下宏偉的前壁。'
        },
        genshin: {
            name: '西風騎士團總部',
            description: '蒙德城最重要的建築，也是西風騎士團的指揮中心。',
            connection: '兩者都展現了西方宗教建築的特色，象徵著信仰與權威的中心。'
        },
        tasks: [
            {
                name: '建築探索',
                description: '找出大三巴牌坊上的5個特殊雕刻圖案',
                reward: '原石×30'
            },
            {
                name: '歷史考察',
                description: '了解大三巴牌坊的建築歷史',
                reward: '摩拉×10000'
            },
            {
                name: '拍照任務',
                description: '在指定角度拍攝大三巴牌坊',
                reward: '經驗書×3'
            }
        ],
        characters: [
            {
                name: '溫迪',
                image: 'https://genshin.global/wp-content/uploads/2022/05/venti-profile-genshin-impact.jpg',
                dialog: '「這座教堂的建築風格，讓我想起了蒙德城呢～要不要我為你吟唱一首詩歌？」'
            },
            {
                name: '琴',
                image: 'https://genshin.global/wp-content/uploads/2022/05/jean-profile-genshin-impact.jpg',
                dialog: '「作為西風騎士團的代理團長，看到這座建築讓我感受到了信仰的力量。」'
            }
        ]
    },
    'macau-tower': {
        macau: {
            name: '澳門旅遊塔',
            description: '高338米的現代建築，是澳門的地標性建築。',
            history: '2001年落成，是澳門重要的觀光和娛樂設施。'
        },
        genshin: {
            name: '群玉閣',
            description: '璃月港上空的漂浮宮殿，凝光的居所。',
            connection: '兩者都象徵著城市的繁榮與進步，都是觀賞城市全景的絕佳位置。'
        },
        tasks: [
            {
                name: '高空挑戰',
                description: '完成旅遊塔觀景台的環繞一周',
                reward: '原石×40'
            },
            {
                name: '城市掠影',
                description: '從不同高度拍攝澳門景色',
                reward: '摩拉×15000'
            }
        ],
        characters: [
            {
                name: '凝光',
                image: 'https://genshin.global/wp-content/uploads/2022/05/ningguang-profile-genshin-impact.jpg',
                dialog: '「從高處俯瞰城市的感覺，確實讓人心曠神怡。這裡的視野，不亞於我的群玉閣呢。」'
            },
            {
                name: '可莉',
                image: 'https://genshin.global/wp-content/uploads/2022/05/klee-profile-genshin-impact.jpg',
                dialog: '「哇！好高啊！可莉可以在這裡看到整個城市！咦，不能放煙花嗎？」'
            }
        ]
    },
    'a-ma-temple': {
        macau: {
            name: '媽閣廟',
            description: '澳門最古老的廟宇，始建於明朝，是澳門得名的由來。',
            history: '媽閣廟供奉海上守護神媽祖，是澳門最重要的歷史建築之一。'
        },
        genshin: {
            name: '鳴神大社',
            description: '稻妻的神社總社，供奉雷電將軍的神聖場所。',
            connection: '兩座建築都是東方傳統建築的代表，都是重要的信仰中心。'
        },
        tasks: [
            {
                name: '祈福之旅',
                description: '參拜媽閣廟並求取籤詩',
                reward: '原石×25'
            },
            {
                name: '建築研究',
                description: '找出媽閣廟中的5處明代建築特色',
                reward: '摩拉×8000'
            },
            {
                name: '文化傳承',
                description: '了解媽祖文化的發展歷史',
                reward: '經驗書×2'
            }
        ],
        characters: [
            {
                name: '雷電將軍',
                image: 'https://genshin.global/wp-content/uploads/2022/05/raiden-shogun-profile-genshin-impact.jpg',
                dialog: '「這座廟宇...與稻妻的氛圍很相似。永恆的信仰，跨越了時空的界限。」'
            },
            {
                name: '八重神子',
                image: 'https://genshin.global/wp-content/uploads/2022/05/yae-miko-profile-genshin-impact.jpg',
                dialog: '「呵呵，這裡的香火真是鼎盛呢。看來人們對神明的信仰是共通的。」'
            }
        ]
    },
    'senado-square': {
        macau: {
            name: '議事亭前地',
            description: '澳門的城市心臟，充滿葡萄牙風情的歷史廣場。',
            history: '曾是澳門政治中心，現在是重要的旅遊景點和文化地標。'
        },
        genshin: {
            name: '璃月港',
            description: '提瓦特大陸最繁榮的商業港口，璃月七星的管理中心。',
            connection: '兩處都是城市的核心區域，展現了獨特的文化融合特色。'
        },
        tasks: [
            {
                name: '建築巡禮',
                description: '尋找並記錄廣場周圍的葡式建築特色',
                reward: '原石×35'
            },
            {
                name: '美食探索',
                description: '品嚐廣場周邊的3種特色小吃',
                reward: '摩拉×12000'
            },
            {
                name: '文化交匯',
                description: '拍攝展現中西文化融合的場景',
                reward: '摩拉×5000'
            }
        ],
        characters: [
            {
                name: '鍾離',
                image: 'https://genshin.global/wp-content/uploads/2022/05/zhongli-profile-genshin-impact.jpg',
                dialog: '「這廣場的石板路，訴說著歷史的痕跡。文化的交融，總是能創造出獨特的風景。」'
            },
            {
                name: '胡桃',
                image: 'https://genshin.global/wp-content/uploads/2022/05/hu-tao-profile-genshin-impact.jpg',
                dialog: '「這裡好熱鬧啊！要不要來場即興表演？咦，往生堂的優惠券在這裡好像不適用呢...」'
            }
        ]
    }
};

// 修改 exploreLocation 函數，添加角色對話部分
function exploreLocation(locationId) {
    // 根據不同位置顯示不同的探索內容
    const locationInfo = {
        'ruins-of-st-pauls': {
            title: '大三巴牌坊探索',
            description: '發現隱藏在大三巴牌坊中的西風騎士團蹤跡...'
        },
        'macau-tower': {
            title: '澳門塔冒險',
            description: '登上澳門塔，一覽群玉閣般的璀璨景色...'
        },
        'a-ma-temple': {
            title: '媽閣廟探秘',
            description: '探索媽閣廟與鳴神大社的共同之處...'
        },
        'senado-square': {
            title: '議事亭前地漫步',
            description: '在璃月港風格的街道上漫步...'
        }
    };

    const info = locationInfo[locationId];
    alert(`${info.title}\n${info.description}`);
}

// 開始任務
function startTask(locationId, taskName) {
    // 這裡可以添加任務相關的邏輯
    alert(`開始任務：${taskName}`);
    // 可以添加任務進度追蹤、獎勵發放等功能
} 