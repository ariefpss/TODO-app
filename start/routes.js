'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', async({view}) =>{
    return view.render('home');
});

Route.group(()=>{
    //TODO:User Register
    Route.get('register', 'UserRegisterController.viewReg').as('regView');
    Route.post('register', 'UserRegisterController.register').as('userRegister');

    //TODO:User Login
    Route.get('login', 'Auth/AuthUserController.viewLog').as('logView');
    Route.post('login', 'Auth/AuthUserController.login').as('userLogin');
    Route.get('logout', 'Auth/AuthUserController.logout').as('userLogout').middleware(['auth']);

    //TODO:TODO Task App
    Route.get('todotask', 'Auth/AuthUserController.viewTodo').as('todoView').middleware(['auth']);

}).prefix('user');
