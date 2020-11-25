class ActionsBar {
    #counterLeft;
    #filterAll;
    #filterActivity;
    #filterCompleted;
    #clearCompletedButton;
    #count = 0;

    constructor() {
        this.#counterLeft = document.querySelector('.task-counter__text');
        this.#filterAll = document.querySelector('.task-filter__input[id="all"]');
        this.#filterActivity = document.querySelector('.task-filter__input[id="activity"]');
        this.#filterCompleted = document.querySelector('.task-filter__input[id="completed"]');
        this.#clearCompletedButton = document.querySelector('.task-clear-completed-btn');

        this.#counterLeft.innerHTML = this.#count + " items left";
    }

    counterPlus() {
        this.#counterLeft.innerHTML = ++this.#count + " items left";
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