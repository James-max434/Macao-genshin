document.addEventListener('DOMContentLoaded', function() {
    const startQuestBtn = document.querySelector('.start-quest');
    const questModal = document.getElementById('questModal');
    const closeModal = document.querySelector('.close-modal');
    const acceptQuest = document.querySelector('.accept-quest');
    const declineQuest = document.querySelector('.decline-quest');

    startQuestBtn.addEventListener('click', () => {
        questModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        questModal.style.display = 'none';
    });

    acceptQuest.addEventListener('click', () => {
        questModal.style.display = 'none';
        showQuestTracker();
    });

    declineQuest.addEventListener('click', () => {
        questModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === questModal) {
            questModal.style.display = 'none';
        }
    });

    // 任務數據
    const questData = {
        total: 12,
        completed: 0,
        tasks: [
            { name: '葡式蛋撻', current: 0, required: 3 },
            { name: '澳門豬扒包', current: 0, required: 1 },
            { name: '杏仁餅', current: 0, required: 5 },
            { name: '澳門魚蛋', current: 0, required: 8 }
        ]
    };

    function showQuestTracker() {
        const questTracker = document.createElement('div');
        questTracker.className = 'quest-tracker';
        questTracker.innerHTML = `
            <div class="quest-tracker-content">
                <div class="quest-tracker-header">
                    <h4>📋 尋味澳門</h4>
                    <div class="quest-progress">
                        進度：${questData.completed}/${questData.total}
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(questData.completed/questData.total)*100}%"></div>
                        </div>
                    </div>
                </div>
                <div class="quest-tracker-body">
                    ${questData.tasks.map(task => `
                        <div class="quest-item" data-task="${task.name}">
                            <span class="quest-checkbox">${task.current >= task.required ? '✓' : '□'}</span>
                            <span class="quest-name">${task.name}</span>
                            <span class="quest-count">${task.current}/${task.required}</span>
                            <button class="increment-btn">+</button>
                        </div>
                    `).join('')}
                </div>
                <div class="quest-tracker-footer">
                    <button class="minimize-tracker">_</button>
                </div>
            </div>
        `;
        document.body.appendChild(questTracker);

        // 添加點擊事件處理
        const questItems = questTracker.querySelectorAll('.quest-item');
        questItems.forEach(item => {
            const incrementBtn = item.querySelector('.increment-btn');
            incrementBtn.addEventListener('click', () => {
                const taskName = item.dataset.task;
                const task = questData.tasks.find(t => t.name === taskName);
                if (task && task.current < task.required) {
                    task.current++;
                    updateQuestProgress();
                    updateQuestDisplay();
                }
            });
        });

        // 最小化按鈕功能
        const minimizeBtn = questTracker.querySelector('.minimize-tracker');
        minimizeBtn.addEventListener('click', () => {
            questTracker.classList.toggle('minimized');
        });
    }

    function updateQuestProgress() {
        questData.completed = questData.tasks.reduce((total, task) => {
            return total + (task.current >= task.required ? 1 : 0);
        }, 0);
    }

    function updateQuestDisplay() {
        const progressText = document.querySelector('.quest-progress');
        const progressFill = document.querySelector('.progress-fill');
        const questItems = document.querySelectorAll('.quest-item');

        progressText.textContent = `進度：${questData.completed}/${questData.total}`;
        progressFill.style.width = `${(questData.completed/questData.total)*100}%`;

        questItems.forEach(item => {
            const taskName = item.dataset.task;
            const task = questData.tasks.find(t => t.name === taskName);
            const checkbox = item.querySelector('.quest-checkbox');
            const count = item.querySelector('.quest-count');

            checkbox.textContent = task.current >= task.required ? '✓' : '□';
            count.textContent = `${task.current}/${task.required}`;
        });

        // 檢查是否完成所有任務
        if (questData.completed === questData.total) {
            showCompletionMessage();
        }
    }

    function showCompletionMessage() {
        alert('恭喜完成所有任務！\n派蒙：「太棒了！我們成功收集了所有美食！」');
        // 這裡可以添加獎勵動畫或其他完成效果
    }
});

// 導航欄滾動效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 