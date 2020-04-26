const _db = require('../../config/database')


exports.authorizeUser = async (req,res ,next) => {

    const token = req.body.token || ''
    if(token.length === 0){
        res.json({Status : false, Message : 'Token Not found'})
        return
    }

    const q1 = `SELECT
    *
    FROM
    user_session a
    INNER JOIN public.user u ON  a.user_id = u.id WHERE refresh_token = (:token)`

    let res_d = await _db.query(q1,{ replacements : { token } })

    if(res_d[0].length === 0){
        res.json({Status : false, Message : 'Token Expired'})
        return
    }

    const _q = res_d[0][0]
    req.user = _q
    next()
}