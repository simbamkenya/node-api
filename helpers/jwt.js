const { expressjwt: jwt } = require("express-jwt");

function authJwt(){
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return jwt({ 
        secret, 
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({ path: [
        {url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
        {url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
        `${api}/users/login`,
        `${api}/users/register`  
    ]});
}

// async function isRevoked(req, payload, done){
//     if(!payload.isAdmin) {
//         done(null, true)
//     }
//     done();
// }
// async function isRevoked(req, payload) {
//     console.log(payload);
//     if (payload.isAdmin == false) {
//       console.log('Not Admin');
//       return true;
//     }
//     console.log('Admin');
//     return false;
//   }
async function isRevoked(req, token) {
    if (token.payload.isAdmin == false) {
        console.log('Not admin')
      return true;
    }
    console.log('Huyu ni bazu')
    return false;
  }


module.exports = authJwt;