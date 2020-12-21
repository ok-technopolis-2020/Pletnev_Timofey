import actionsBar from "./actions-bar";
import taskViewer from "./tasksViewer";

export class Task {
    #id;
    #text;
    #isCompleted;
    #isRemoved;

    #item;

    #itemView;
    #checkBoxItem;
    #deleteButton;

    #inputEditField;

    static #VIEW_MODE = true;

    #mode = Task.#VIEW_MODE;


    constructor(id, text) {
        this.#id = id;
        this.#text = text;
        this.#item = this.#taskItem(id, text);
        this.#isCompleted = false;
        this.#isRemoved = false;
    }

    get text() {
        return this.#text;
    }

    set text(text) {
        this.#text = text;
        this.#item = this.#taskItem(this.#id, text);
    }

    get item() {
        return this.#item;
    }

    get isRemoved() {
        return this.#isRemoved;
    }

    set setCompleted(isCompleted) {
        this.#isCompleted = isCompleted;
    }

    get isCompleted() {
        return this.#isCompleted;
    }

    #changeMode() {
        this.#mode = !this.#mode;
        if (this.#mode === Task.#VIEW_MODE) {
            let newText = this.#inputEditField.value.toString();
            this.#text = newText;
            this.#inputEditField.setAttribute('aria-label', 'Edit task: ' + this.#text);
            this.#deleteButton.setAttribute('aria-label', 'Delete task: ' + this.#text);
            let aria;
            if (this.#isCompleted) {
                aria = 'Completed task: ' + this.#text;
            } else {
                aria = 'Not completed task: ' + this.#text;
            }
            this.#checkBoxItem.setAttribute('aria-label', aria);
        }
    }

    makeCompleted() {
        this.#checkBoxItem.checked = true;
        this.#isCompleted = true;
        this.#checkBoxItem.setAttribute('aria-label', 'Completed task: ' + this.#text);
    }

    #removeTask() {
        this.#isRemoved = true;
        if (!this.isCompleted) {
            actionsBar.counterDecrement();
        }
        this.#item.outerHTML = "";
    }

    #taskItem(id, text, isCompleted) {
        const li = document.createElement('li');

        this.#itemView = document.createElement('div');
        this.#itemView.classList.add('task-item__view');

        this.#checkBoxItem = this.#checkBox(id, text, isCompleted);
        this.#checkBoxItem.addEventListener('click', () => {
            taskViewer.renderTasks();
            if (this.isCompleted) {
                actionsBar.counterDecrement();
            } else {
                actionsBar.counterIncrement();
            }
        });

        this.#inputEditField = this.#inputEdit(id, text);
        this.#inputEditField.addEventListener('focusin', () => this.#changeMode());
        this.#inputEditField.addEventListener('focusout', () => this.#changeMode());

        const span = document.createElement('span');
        span.setAttribute("for", id.toString());
        span.classList.add('task-item__span');
        span.append(this.#inputEditField);
        this.#itemView.append(this.#checkBoxItem, span);

        this.#deleteButton = this.#button(text);

        li.dataset.id = id;
        li.classList.add('todo-app__task-list', 'task-item', 'js-task-item');
        li.append(this.#itemView, this.#deleteButton);
        return li;
    }

    #checkBox (id, text, isCompleted) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = isCompleted;
        checkBox.classList.add('task-item__status');
        checkBox.addEventListener('click', () =>  {this.#isCompleted = !this.#isCompleted});
        let aria;
        if (isCompleted) {
            aria = 'Completed task: ' + text;
        } else {
            aria = 'Not completed task: ' + text;
        }
        checkBox.setAttribute('aria-label', aria);
        checkBox.id = id.toString();
        return checkBox;
    }

    #button(text) {
        const button = document.createElement('button');
        button.classList.add('task-item__delete');
        button.setAttribute('aria-label', 'Delete task: ' + text);
        button.addEventListener('click', () => {
            this.#removeTask();
        })
        return button;
    }

    #inputEdit(id, text) {
        const inputEdit = document.createElement('input');
        inputEdit.setAttribute("for", id.toString());
        inputEdit.type = 'text';
        inputEdit.value = text;
        inputEdit.classList.add('task-item__input');
        inputEdit.setAttribute('aria-label', 'Edit task: ' + text);
        return inputEdit;
    }
}