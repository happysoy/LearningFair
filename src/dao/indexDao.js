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

async function plusGood(userData){
    const connection = await pool.getConnection(async (conn)=> conn);
    console.log(userData);
    const Query=`INSERT INTO team (good) VALUES +1 where project_id=?`;
    const Params =[userData];
    const [rows] = await connection.query(Query, Params);
    connection.release();
    console.log(rows);
    return [rows];
}

async function getTop50Projects(){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        try{
            const Query = `SELECT good, project_id, team_name, project_name,class_name from team order by good desc LIMIT 50;`;
            const [rows] = await connection.query(Query);
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

async function getAllProjects(){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        try{
            const Query = `SELECT project_id, team_name, project_name,class_name from team;`;
            const [rows] = await connection.query(Query);
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

async function getProject(selectTeam){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        try{
            const Query = `SELECT group_concat(distinct t.project_id),group_concat(distinct m.student_name separator ' '),  group_concat(distinct t.team_name), group_concat(distinct t.project_name), group_concat(distinct t.class_name),t.good, group_concat(distinct h.hashtag_name separator ' #'), group_concat(distinct h.hashtag_name separator ' #'), f.video_url,f.pdf_url from team t inner join hashtag_team ht on ht.project_id=t.project_id inner join member m on m.project_id=t.project_id inner join hashtag h on h.hashtag_id=ht.hashtag_id inner join file f on f.project_id=t.project_id where t.project_id=? group by t.project_id;`;
            const [rows] = await connection.query(Query,[selectTeam]);
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




module.exports = {
    checkVisitor,
    getProjects,
    getHashtags,
    classTeam,
    addTeam,
    getTop50Projects,
    getAllProjects,
    hashtagProject,
    getProject,
    plusGood
}