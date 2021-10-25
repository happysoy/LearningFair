const { pool } = require("../../config/database");

// if(userData.userName.length<2 || userData.studentId.length<2 || userData.department.length<1){
//     var data={status:400};//대충 지정함
//     return res.send(data);
// }
// const query= 'INSERT INTO user (user_id, user_major, user_num, user_name, login_time) VALUES (?,?,?,?,?)';
// db.query(query,[1,userData.department,userData.studentId, userData.userName,1111],(err,result)=>{
//     if (err) throw err;
//     var data={status:200};
//     return res.send(data);
// });

//user_id, user_major, user_num, user_name
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

module.exports = {
    checkVisitor

}