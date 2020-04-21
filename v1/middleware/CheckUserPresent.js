const _db = require('../../config/database')


exports.authorizeUser = async (req,res ,next) => {

    const token = req.body.token

    const q1 = `SELECT
    *
    FROM
    "UserSessions" a
    INNER JOIN "Users" u ON  a."userId" = u."id" WHERE "token" = '${token}';`


    
    const res_d = await _db.query(q1)

    if(res_d[0].length > 0){
        const _q = res_d[0][0]
        req.user = _q
        next()
    }else {
        
        res.json({Status : false, Message : 'Token Expired'})
    }
    
}