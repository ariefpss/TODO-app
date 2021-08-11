'use strict'

class AuthUserController {
    async viewLog({view}){
        return view.render('auth.login');
    };

    async login({request, auth, response, }){
        
        let {email, password} = request.all();

        await auth.attempt(email, password);

        return response.route('todotask');
    };
}

module.exports = AuthUserController
