class ActionsBar {
    #counterLeft;
    #filterAll;
    #filterActivity;
    #filterCompleted;
    #clearCompletedButton;
    #count = 0;

    constructor() {
        this.#counterLeft = document.querySelector('.js-task-counter__text');
        this.#filterAll = document.querySelector('.js-task-filter__input[id="all"]');
        this.#filterActivity = document.querySelector('.js-task-filter__input[id="activity"]');
        this.#filterCompleted = document.querySelector('.js-task-filter__input[id="completed"]');
        this.#clearCompletedButton = document.querySelector('.js-task-clear-completed-btn');

        this.#counterLeft.textContent = this.#count + " items left";
    }

    counterIncrement() {
        this.#counterLeft.textContent = ++this.#count + " items left";
    }

    counterDecrement() {
        this.#counterLeft.textContent = --this.#count + " items left";
    }

    counterClear() {
        this.#count = 0;
        this.#counterLeft.textContent = "0 items left";
    }

    get filterAll() {
        return this.#filterAll;
    }

    get filterActivity() {
        return this.#filterActivity;
    }

    get filterCompleted() {
        return this.#filterCompleted;
    }

    get clearCompletedButton() {
        return this.#clearCompletedButton;
    }
}

const actionsBar = new ActionsBar();
export default actionsBar;