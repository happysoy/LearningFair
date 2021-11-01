const { pool } = require("../../config/database");

async function checkVisitor(userMajor, userNum, userName){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        try{
            const Query = `INSERT INTO user (user_major, user_num, user_name) VALUES (?,?,?);`;
            const Params = [userMajor, userNum, userName];
            const [rows] = await connection.query(Query, Params);
            connection.release();
            return rows;
        }catch(err){
            console.log('Query Error');
            connection.release();
            return false;
        }
       
    }
    catch(err){
        console.log('DB Error');
		return false;
    }
}
async function classList(selectClass){
    const connection = await pool.getConnection(async (conn)=> conn);
    const Query=`SELECT GROUP_CONCAT(DISTINCT project_id) AS 'eachClass' FROM member WHERE class_name=?`;
    const Params=[selectClass];
    const [rows] = await connection.query(Query, Params);
    connection.release();
    return [rows];

}
async function refineData(selectTeam){ //분반 상세페이지
    const connection = await pool.getConnection(async (conn)=> conn);
    const Query=`SELECT t.project_id, group_concat(distinct concat(m.student_name, '(', m.class_name, ')') separator ', ') AS 'eachMembers',
    t.team_name,t.project_name, f.thumbnail_url,
    group_concat(distinct h.hashtag_name separator ' #') AS 'hashtag_name'
    from team t inner join hashtag_team ht on ht.project_id=t.project_id
        inner join member m on m.project_id=t.project_id
        inner join hashtag h on h.hashtag_id=ht.hashtag_id
        inner join file f on f.project_id=t.project_id where t.project_id=? group by t.project_id;`;
    const Params=[selectTeam];
    const [rows] = await connection.query(Query, Params);
    connection.release();
    return [rows];
}
async function refineDataDetail(selectTeam){ //팀별 상세페이지
    const connection = await pool.getConnection(async (conn)=> conn);
    const Query= `SELECT group_concat(distinct concat(m.student_name, '(', m.class_name, ')') separator ', ') AS 'eachMembers',
    t.team_name,
    t.project_name,
    t.good,
    group_concat(distinct h.hashtag_name separator ' #') AS 'hashtag_name',
    f.video_url,f.pdf_url from team t inner join hashtag_team ht on ht.project_id=t.project_id
        inner join member m on m.project_id=t.project_id
        inner join hashtag h on h.hashtag_id=ht.hashtag_id
        inner join file f on f.project_id=t.project_id where t.project_id=? group by t.project_id;`;
    const Params=[selectTeam];
    const [rows] = await connection.query(Query, Params);
    connection.release();
    return [rows];
}

async function plusGood(userData){
    const connection = await pool.getConnection(async (conn)=> conn);
    const project_id=userData.project_id*1;
    const Query=`Update team Set good = good + 1 Where project_id=?`;
    const Params=[project_id];
    
    const rows=await connection.query(Query, Params);
    connection.release();
    return [rows];

}

async function minusGood(userData){
    const connection = await pool.getConnection(async (conn)=> conn);
    const project_id=userData.project_id*1;
    const Query=`Update team Set good = good - 1 Where project_id=?`;
    const Params=[project_id];
    
    const rows=await connection.query(Query, Params);
    connection.release();
    return [rows];

}

module.exports = {
    checkVisitor,
    classList,
    refineData,

    refineDataDetail,

    plusGood,
    minusGood

}