import './styles/styles.css';

import mainControls from "./modules/main-controls";
import tasksViewer from "./modules/tasksViewer";
import actionsBar from "./modules/actions-bar";

mainControls.form.addEventListener('submit', onFormSubmit);
mainControls.selectAllButton.addEventListener('click', onClickSelectAll);

actionsBar.filterAll.addEventListener('click', () => tasksViewer.renderAll());
actionsBar.filterActivity.addEventListener('click', () => tasksViewer.renderActivity());
actionsBar.filterCompleted.addEventListener('click', () => tasksViewer.renderCompleted());

actionsBar.clearCompletedButton.addEventListener('click', () => tasksViewer.clearCompleted());

function onFormSubmit(event) {
    const text = mainControls.inputField.value.toString();
    event.preventDefault();
    mainControls.form.reset();
    if (!text) {
        return;
    }
    tasksViewer.addTask(text);
}

function onClickSelectAll(event) {
    event.preventDefault();
    tasksViewer.selectAll();
}