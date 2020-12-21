import {Task} from "./task";
import actionsBar from "./actions-bar";

class TasksViewer {
    #tasks;
    #ul;
    #lastId = -1;

    static #FILTER_ALL = 0;
    static #FILTER_ACTIVITY = 1;
    static #FILTER_COMPLETED = 2;

    #mode = TasksViewer.#FILTER_ALL;

    constructor() {
        this.#tasks = [];
        this.#ul = document.querySelector('.js-todo-app__task-list');
    }

    addTask(text) {
        const task = new Task(++this.#lastId, text);
        this.#tasks.push(task);
        actionsBar.counterIncrement();
        this.#renderTask(task);
    }

    selectAll() {
        let i = 0;
        actionsBar.counterClear();
        while (i < this.#tasks.length) {
            this.#tasks[i].setCompleted = true;
            this.#tasks[i].makeCompleted();
            i++;
        }
        this.renderTasks();
    }

    clearCompleted() {
        let i = 0;
        while (i < this.#tasks.length) {
            if (this.#tasks[i].isRemoved) {
                this.#tasks.splice(i, 1);
            } else {
                if (this.#tasks[i].isCompleted) {
                    this.#tasks.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
        this.renderTasks();
    }

    #renderTask(task) {
        if (this.#mode === TasksViewer.#FILTER_ALL
            || (this.#mode === TasksViewer.#FILTER_COMPLETED && task.isCompleted)
            || (this.#mode === TasksViewer.#FILTER_ACTIVITY && !task.isCompleted)
        ) {
            this.#ul.append(task.item);
        }
    }

    renderTasks() {
        this.#ul.innerHTML = "";
        switch (this.#mode) {
            case 0:
                this.renderAll();
                break;
            case 1:
                this.renderActivity();
                break;
            case 2:
                this.renderCompleted();
                break;
            default:
                console.log("ERROR MODE NUMBER");
        }
    }

    renderAll() {
        this.#mode = TasksViewer.#FILTER_ALL;
        let i = 0;
        while (i < this.#tasks.length) {
            if (this.#tasks[i].isRemoved) {
                this.#tasks.splice(i, 1);
            } else {
                this.#renderTask(this.#tasks[i])
                i++;
            }
        }
    }

    renderActivity() {
        this.renderAll();
        this.#mode = TasksViewer.#FILTER_ACTIVITY;
        let i = 0;
        let list = this.#ul.querySelectorAll('.js-task-item');
        while (i < this.#tasks.length) {
            if (this.#tasks[i].isRemoved) {
                this.#tasks.splice(i, 1);
            } else {
                if (this.#tasks[i].isCompleted) {
                    list[i].outerHTML = "";
                }
                i++;
            }
        }
    }

    renderCompleted() {
        this.renderAll();
        this.#mode = TasksViewer.#FILTER_COMPLETED;
        let i = 0;
        let list = this.#ul.querySelectorAll('.js-task-item');
        while (i < this.#tasks.length) {
            if (!this.#tasks[i].isCompleted) {
                list[i].outerHTML = "";
            }
            i++;
        }
    }
}

const tasksViewer = new TasksViewer();

export default tasksViewer;