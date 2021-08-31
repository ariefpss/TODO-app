'use strict'

const Task = use('App/Models/Task');
const {validate} = use('Validator')

class TodoTaskController {
    async viewTodo({view}){
        const task = await Task.all();

        return view.render('todotask', {tasks: task.rows});
    };

    async viewAddTask({view}){
        return view.render('addtask');
    };

    async addTask({request, session, response}){
        const rules = {
            task: 'required'
        }

        const message = {
            'task.required' : 'Task tidak boleh kosong...!!!'
        }

        let validation = await validate(request.all(), rules, message);

        if (validation.fails()){
            session.withErrors(validation.messages()).flashExcept(['task']);
            return response.redirect('back');
        }

        const addtask = await Task.create({
            task: request.input('task')
        });

        session.flash({notification: 'Berhasil menambahkan task...!!'});
        return response.redirect('back');

    };
}

module.exports = TodoTaskController;
