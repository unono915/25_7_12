document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.content-section');
    const selectEl = document.getElementById('aistudio-select');

    // Tab navigation logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => item.classList.remove('active'));
            tab.classList.add('active');

            const targetId = tab.dataset.tab;
            contents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.add('active', 'fade-in');
                } else {
                    content.classList.remove('active', 'fade-in');
                }
            });
        });
    });
    
    // Initial prompt update for AI Studio
    updateAIStudioPrompt();
    selectEl.addEventListener('change', updateAIStudioPrompt);
});

function typeText(element, text) {
    element.innerHTML = '';
    element.classList.add('typewriter');
    element.textContent = text;
    setTimeout(() => {
        element.classList.remove('typewriter');
    }, 1000);
}

// --- Simulation Data ---
const notebookLMSimData = {
    summarize: "문서의 핵심 내용은 다음과 같습니다:\n1. 전교생 대상 안전교육 강화\n2. 학교 내 CCTV 사각지대 해소\n3. 등하굣길 교통안전 지도 강화\n4. 외부인 출입 통제 시스템 개선\n5. 비상 대피 훈련 정기적 실시",
    find: "네, '학교 안전 강화 계획.pdf' 7페이지에 '고화질 CCTV 5대 추가 설치 및 노후 장비 교체' 항목이 명시되어 있습니다.",
    compare: "분석 결과, 안전 강화 계획의 '안전 요원 배치' 항목은 체험활동 예산안에 200만원 반영되었으나, 'CCTV 추가 설치' 관련 예산은 누락된 것으로 보입니다."
};

const aiStudioPrompts = {
    newsletter: `너는 대한민국 고등학교 행정실장이야. '가을빛 축제'라는 이름의 학교 축제 안내 가정통신문 초안을 작성해 줘. 학부모님들이 꼭 아셔야 할 내용으로 날짜(10월 25일), 시간(오후 2시~5시), 장소(본교 운동장), 주요 프로그램(학생 공연, 학부모 참여 퀴즈, 먹거리 장터)을 포함해 줘. 문체는 정중하고 따뜻하게.`,
    popup: `위 내용을 바탕으로, 학교 홈페이지에 올릴 팝업 공지 문구를 만들어 줘. 제목은 눈에 띄게, 내용은 핵심만 간결하게 요약해서.`,
    sms: `이번엔 학부모님들께 보낼 문자 메시지(SMS)용으로 90자 이내로 줄여줘. [학교명] 문구를 꼭 포함해서.`
};

const aiStudioResults = {
    newsletter: `[가정통신문]\n\n제목: 가을빛으로 물드는 [학교명] 축제에 초대합니다.\n\n학부모님 가정에 늘 행복이 가득하시기를 기원합니다.\n결실의 계절 가을을 맞아, 우리 학생들이 갈고닦은 재능과 열정을 선보이는 '가을빛 축제'를 개최합니다. 바쁘신 와중에도 부디 참석하시어 자녀들을 격려해주시고, 교육 공동체가 하나 되는 뜻깊은 시간을 함께 만들어 주시길 바랍니다.\n\n- 일시: 2025년 10월 25일(토) 오후 2시 ~ 5시\n- 장소: 본교 운동장\n- 주요 프로그램: 학생 공연, 학부모 참여 퀴즈, 먹거리 장터 등`,
    popup: `[홈페이지 팝업 공지]\n\n🎉 [학교명] 가을빛 축제 안내 🎉\n\n- 일시: 10/25(토) 14:00~17:00\n- 장소: 본교 운동장\n- 내용: 학생 공연, 학부모 퀴즈, 먹거리 장터\n\n학생, 학부모, 교직원 모두가 함께하는 축제의 장에 여러분을 초대합니다!`,
    sms: `[학교명] 10/25(토) 오후 2시, 가을빛 축제에 초대합니다. 학생 공연, 먹거리 장터 등 다채로운 행사가 준비되어 있으니 많은 참여 바랍니다.`
};


// --- Simulation Functions (called from HTML) ---
function runNotebookLMSim(type) {
    const resultEl = document.getElementById('notebooklm-result');
    const text = notebookLMSimData[type];
    typeText(resultEl, text);
}

function runAppScriptSim() {
    const resultEl = document.getElementById('appscript-result');
    const code = `function highlightStudents() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    const grade = data[i][1]; // 성적 (C열)
    const hours = data[i][2]; // 봉사시간 (D열)
    
    if (grade === 'A' && hours >= 20) {
      sheet.getRange(i + 1, 1, 1, 4).setBackground('#dcfce7');
    }
  }
}`;
    resultEl.textContent = code;

    // Simulate table row highlighting
    document.getElementById('row-1').style.backgroundColor = '#dcfce7'; // green-100
    document.getElementById('row-4').style.backgroundColor = '#dcfce7'; // green-100
    document.getElementById('row-2').style.backgroundColor = '';
    document.getElementById('row-3').style.backgroundColor = '';
}

function updateAIStudioPrompt() {
    const promptEl = document.getElementById('aistudio-prompt');
    const selectEl = document.getElementById('aistudio-select');
    const selected = selectEl.value;
    promptEl.textContent = aiStudioPrompts[selected];
}

function runAIStudioSim() {
    const resultEl = document.getElementById('aistudio-result');
    const selectEl = document.getElementById('aistudio-select');
    const selected = selectEl.value;
    typeText(resultEl, aiStudioResults[selected]);
}