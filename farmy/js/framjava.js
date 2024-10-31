// 각 아이콘 클릭 시 호출되는 함수
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
