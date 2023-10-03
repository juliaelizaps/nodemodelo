const jwt = require('jsonwebtoken');
const databaseConfig = require('../config/database');
const mysql = require ('mysql2/promise');
const { password } = require('../config/database');

async function AuthController (req, res){
    const {name, password} = req.body;

    try{
        const connection = await mysql.createConnection(databaseConfig);
        const select= 'SELECT * FROM user WHERE name = ? and password = ?'
        const [rows] = await connection.query(select, [name, password]);
        await connection.end();
        if (rows.length ===0)throw new Error ('User or password invalid!')

        const id = rows[0].id;

        const token = jwt.sign({ id, name}, 'SECRET', {
            expiresIn: 300,
        });

        res.status(200).send({auth: true, token: token});
    }catch (error){
        res.status(500).send(
            {
                message: "Error auth user!",
                body: error.massage,
            }
        )
    }
}

function VerifyJWT (req, res, next) {
    const token = req.headers ['x-access-token'];

    if (!token) req.status(500).send({
        auth:false,
        body: 'no token provided!',
    })

    jwt.verify (token, 'SECRET', (err, decoded)=>{
        if(err){
            return res.status(500).send({
                auth:false,
                body: 'failed authenticate token.'
            })
        };

        req.userId = decoded.id;
     next();
});
}

module.exports = {
    AuthController,
    VerifyJWT,
}