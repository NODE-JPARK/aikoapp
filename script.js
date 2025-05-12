// 로그인 기능
function checkLogin() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  if(user === 'user' && pass === '1234') {
    location.href = 'main.html';
  } else {
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
  }
}

// 기록 저장 및 그래프 표시
function addRecord() {
  const date = document.getElementById('date').value;
  const usageCount = document.getElementById('usageCount').value;
  const usageTime = document.getElementById('usageTime').value;

  if(!date || !usageCount || !usageTime) {
    alert('모든 정보를 입력해주세요.');
    return;
  }

  const newRecord = { date, usageCount: Number(usageCount), usageTime: Number(usageTime) };

  const records = JSON.parse(localStorage.getItem('records')) || [];
  records.push(newRecord);
  localStorage.setItem('records', JSON.stringify(records));

  renderChart();
}

// 차트 표시 함수
function renderChart() {
  const records = JSON.parse(localStorage.getItem('records')) || [];

  const labels = records.map(record => record.date);
  const counts = records.map(record => record.usageCount);
  const times = records.map(record => record.usageTime);

  const ctx = document.getElementById('usageChart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        { label: '사용 횟수', data: counts, backgroundColor: 'skyblue' },
        { label: '사용 시간(분)', data: times, backgroundColor: 'lightgreen' }
      ]
    }
  });
}

// 페이지 로딩 시 차트 초기화
window.onload = renderChart;
