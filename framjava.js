// 페이지 이동 함수
function navigateTo(page) {
    if (page === 'temperature') {
        window.location.href = 'temperature.html'; // 온도 설정 페이지
    } else if (page === 'water') {
        window.location.href = 'water.html'; // 물 설정 페이지
    } else if (page === 'light') {
        window.location.href = 'light.html'; // 조명 설정 페이지
    } else if (page === 'other') {
        window.location.href = 'other.html'; // 기타 설정 페이지
    }
}

// 로그인 함수
async function login() {
    const userID = document.getElementById('userID').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userID, password })
        });
        const result = await response.json();

        if (result.success) {
            alert(result.message);
            window.location.href = 'index.html'; // 로그인 성공 시 메인 페이지로 이동
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('로그인 중 오류가 발생했습니다.');
    }
}
