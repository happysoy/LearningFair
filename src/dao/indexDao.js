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

async function getClass(selectClass){
    const connection = await pool.getConnection(async (conn)=> conn);
    const Query=`SELECT  class_id, GROUP_CONCAT(DISTINCT project_id) AS 'eachClass' FROM member WHERE class_id=? GROUP BY class_id;`;
    const Params=[selectClass];
    const [rows] = await connection.query(Query, Params);
    connection.release();
    return [rows];
}
async function getTeam(idx){
    const connection = await pool.getConnection(async (conn)=> conn);
    const Query=`SELECT project_id, GROUP_CONCAT(student_name) AS 'eachTeam' FROM member WHERE project_id=? GROUP BY project_id;`;
    const Params=[idx];
    const [rows] = await connection.query(Query, Params);
    connection.release();
    return [rows];
}
async function getTeamTitle(idx){
    const connection = await pool.getConnection(async (conn)=> conn);
    const Query=`select team_name, project_name, good FROM team WHERE project_id=?;`;
    const Params=[idx];
    const [rows] = await connection.query(Query, Params);
    connection.release();
    return [rows];
}
async function getHashtags(project_id){
    const connection = await pool.getConnection(async (conn)=> conn);
    const Query=`select GROUP_CONCAT(hashtag_name SEPARATOR ',') AS hashtags from hashtag INNER join hashtag_team on hashtag.hashtag_id=hashtag_team.hashtag_id where project_id=?;`
    const Params =[project_id];
    const [rows] = await connection.query(Query, Params);
    connection.release();
    return [rows];
}

async function groupTeam(project_id){
 
    const connection = await pool.getConnection(async (conn)=> conn);
    
    const Query=`SELECT project_id, GROUP_CONCAT(student_name) AS 'eachMember' FROM member GROUP BY project_id;`;
    const Params=[project_id];
    const [rows] = await connection.query(Query, Params);
    connection.release();
    return [rows];
        
}

async function hashtagProject(selectHashtag){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        try{
            const Query = `SELECT t.project_id, t.team_name, t.project_name, t.class_name, h.hashtag_name from team t inner join hashtag_team ht on ht.project_id=t.project_id inner join hashtag h on h.hashtag_id=ht.hashtag_id where h.hashtag_name=?;`;
            const [rows] = await connection.query(Query,[selectHashtag]);
            connection.release();
            console.log(rows);
            return [rows];
        }catch(err){
            console.log('Query Error',err);
            connection.release();
            return false;
        }
       
    }
    catch(err){
        console.log('DB Error');
		return false;
    }
}
async function getDatas(idx){
    const connection = await pool.getConnection(async (conn)=> conn);
    const Query=`SELECT video_url, pdf_url,thumbnail_url FROM file WHERE project_id=? ;`
    const Params =[idx];
    const [rows] = await connection.query(Query, Params);
    connection.release();
    return [rows];
}

module.exports = {
    checkVisitor,
    getClass,
    getTeam,
    getTeamTitle,
    getHashtags,
    groupTeam,
    hashtagProject,
    getDatas
}