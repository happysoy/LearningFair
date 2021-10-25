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

async function getProjects(selectClass){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        try{
            const Query = `SELECT project_id, team_name, project_name FROM team WHERE class_name=?;`;
            const Params = [selectClass];
            const [rows] = await connection.query(Query, Params);
            connection.release();
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
async function getHashtags(project_id){
    const connection = await pool.getConnection(async (conn)=> conn);
    const Query=`select hashtag_name from hashtag INNER join hashtag_team on hashtag.hashtag_id=hashtag_team.hashtag_id where project_id=?;`;
    const Params =[project_id];
    const [rows] = await connection.query(Query, Params);
    connection.release();
    return [rows];
}

async function classTeam(project_id){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        try{
            const Query=`SELECT student_name FROM member WHERE project_id=?;`;
            const Params=[project_id];
            const [rows] = await connection.query(Query, Params);
            connection.release();
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
async function addTeam(name){
    console.log(name);
    
}
module.exports = {
    checkVisitor,
    getProjects,
    getHashtags,
    classTeam,
    addTeam
}