'use strict'

const User = use('App/Models/User'); 
const {validate} = use('Validator');

class UserRegisterController {
    async viewReg({view}){
        return view.render('auth.register');
    };

    async register({request, session, response}){
        const rules = {
            username: 'required',
            email: 'required|unique:users,email',
            password: 'required'
        };

        const message = {
            'username.required': 'Username tidak boleh kosong!!',
            'email.required': 'Email tidak boleh kosong!!',
            'email.unique': 'Email telah terdaftar!!',
            'password.required': 'Password tidak boleh kosong!!'
        };

        let validation = await validate(request.all(), rules, message);

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashExcept(['password']);
            return response.redirect('back');
        };

        const user = await User.create({
            username: request.input('username'),
            email: request.input('email'),
            password: request.input('password')
        });

        session.flash({ notification: 'Register Berhasil!' });
        return response.redirect('back');
    };
}

module.exports = UserRegisterController
