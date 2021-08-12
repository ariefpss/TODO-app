'use strict'

class AuthUserController {
    async viewLog({view}){
        return view.render('auth.login');
    };

    async login({request, auth, response, }){
        
        let {email, password} = request.all();

        await auth.attempt(email, password);

        return response.route('todoView');
    };

    async logout({auth, response}){

        await auth.logout();
        
        return response.route('/user/login');
    }

    async viewTodo({view}){
        return view.render('todotask')
    }
    
}

module.exports = AuthUserController
