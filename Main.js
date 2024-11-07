const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise'); // MySQL을 사용하기 위한 모듈

const app = express();
const PORT = 3306;

app.use(cors());
app.use(bodyParser.json());

// MySQL 데이터베이스 연결 설정
const dbConfig = {
    host: 'localhost',        // MySQL 서버 주소
    user: 'root',    // MySQL 사용자 이름
    password: 'qwer1234', // MySQL 사용자 비밀번호
    database: 'Farmy' // 사용할 데이터베이스 이름
};

// 로그인 API
app.post('/login', async (req, res) => {
    const { userID, password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.query(`SELECT * FROM User WHERE UserID = ? AND Password = ?`, [userID, password]);
        await connection.end();

        if (result.length > 0) {
            console.log("로그인 성공:", userID); // 로그인 성공 메시지
            res.status(200).json({ success: true, message: '로그인 성공' });
        } else {
            res.status(401).json({ success: false, message: 'ID 또는 비밀번호가 잘못되었습니다.' });
        }
    } catch (error) {
        console.log('로그인 오류:', error); // 오류 메시지 출력
        res.status(500).json({ success: false, message: '서버 오류 발생', error });
    }
});

// 회원가입 API
app.post('/register', async (req, res) => {
    const { userID, password } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // 이미 존재하는 사용자 확인
        const [existingUser] = await connection.query(`SELECT * FROM User WHERE UserID = ?`, [userID]);
        if (existingUser.length > 0) {
            res.status(400).json({ success: false, message: '이미 존재하는 사용자입니다.' });
            return;
        }

        // 새로운 사용자 추가
        await connection.query(`INSERT INTO User (UserID, Password) VALUES (?, ?)`, [userID, password]);
        await connection.end();

        console.log("회원가입 성공:", userID); // 회원가입 성공 메시지
        res.status(201).json({ success: true, message: '회원가입 성공!' });
    } catch (error) {
        console.log('회원가입 오류:', error); // 오류 메시지 출력
        res.status(500).json({ success: false, message: '서버 오류 발생', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});