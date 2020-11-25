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
    #spanItem;
    #deleteButton;

    #itemEdit;
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
            this.#spanItem.style.display = "flex";
            this.#itemView.style.display = "flex";
            this.#itemEdit.style.display = "none";
            let newText = this.#inputEditField.value.toString();
            if (!newText) {
                newText = "________________________";
            }
            this.#text = newText;
            this.#spanItem.innerText = this.#text;

            this.#inputEditField.setAttribute('aria-label', 'Edit task: ' + this.#text);
            this.#deleteButton.setAttribute('aria-label', 'Delete task: ' + this.#text);
            let aria;
            if (this.#isCompleted) {
                aria = 'Completed task: ' + this.#text;
            } else {
                aria = 'Not completed task: ' + this.#text;
            }
            this.#checkBoxItem.setAttribute('aria-label', aria);
        } else {
            this.#spanItem.style.display = "none";
            this.#itemEdit.style.display = "flex";
            this.#itemView.style.display = "none";
            this.#inputEditField.focus();
        }
    }

    makeCompleted() {
        this.#checkBoxItem.checked = true;
        this.#isCompleted = true;
        this.#checkBoxItem.setAttribute('aria-label', 'Completed task: ' + this.#text);
    }

    #removeTask() {
        this.#isRemoved = true;
        actionsBar.counterPlus();
        this.#item.outerHTML = "";
    }


    #taskItem(id, text, isCompleted) {
        const li = document.createElement('li');

        this.#itemView = document.createElement('div');
        this.#itemView.classList.add('task-item__view');

        this.#checkBoxItem = this.#checkBox(id, text, isCompleted);
        const label = this.#label(id, text);
        this.#checkBoxItem.addEventListener('click', () => { taskViewer.renderTasks() });

        this.#spanItem = this.#spanElement();
        this.#spanItem.addEventListener('focusin', () => { this.#changeMode() });

        this.#itemView.append(this.#checkBoxItem, label, this.#spanItem);
        this.#itemEdit = document.createElement('div');
        this.#itemEdit.classList.add('task-item__edit');
        this.#inputEditField = this.#inputEdit(text);
        this.#inputEditField.addEventListener('focusout', () => { this.#changeMode() });
        this.#itemEdit.append(this.#inputEditField);

        this.#deleteButton = this.#button(text);
        li.dataset.id = id;
        li.classList.add('todo-app__task-list', 'task-item');
        li.draggable = true;
        li.append(this.#itemView, this.#itemEdit, this.#deleteButton);

        return li;
    }

    #spanElement() {
        const span = document.createElement('span');
        span.classList.add('task-item__span');
        span.innerText = this.#text;
        span.tabIndex = 0;

        return span;
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

    #label(id, text) {
        const label = document.createElement('label');
        label.classList.add('task-item__text');
        label.setAttribute("for", id.toString());
        return label;
    }

    #button(text) {
        const button = document.createElement('button');
        button.classList.add('task-item__delete');
        button.setAttribute('aria-label', 'Delete task: ' + text);
        button.addEventListener('click', () => this.#removeTask())
        return button;
    }

    #inputEdit(text) {
        const inputEdit = document.createElement('input');
        inputEdit.type = 'text';
        inputEdit.value = text;
        inputEdit.classList.add('task-item__input');
        inputEdit.setAttribute('aria-label', 'Edit task: ' + text);
        return inputEdit;
    }
}