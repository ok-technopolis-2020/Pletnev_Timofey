class MainControls {
    #form;
    #selectAllButton;
    #inputField;

    constructor() {
        this.#form = document.forms["main-controls"];
        this.#selectAllButton = this.#form["select-all-button"];
        this.#inputField = this.#form["new-task-input-field"];
    }

    get form() {
        return this.#form;
    }

    get selectAllButton() {
        return this.#selectAllButton;
    }

    get inputField() {
        return this.#inputField;
    }
}

const mainControls = new MainControls();

export default mainControls;