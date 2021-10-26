/**
 * Clear and populate the left pane with survey language options
 */
function displayLanguageMenu() {
    document.getElementById("left-pane-label").innerText =
        "Select Languages";
    document.getElementById("left-pane-label").hidden = false;

    responsesList.innerHTML = "<h3>Please select a language to get started.</h3>";

    questionsList.innerHTML = `
        <li class="mdl-list__item mdl-list__item"
        onclick="loadQuestions(this)" id="select-english"
        style="cursor: pointer;" value=0>
            <span class="mdl-list__item-primary-content">
            English
            </span>
        </li>
        
        <li class="mdl-list__item mdl-list__item"
        onclick="loadQuestions(this)" id="select-chinese"
        style="cursor: pointer;" value=1>
            <span class="mdl-list__item-primary-content">
            Chinese
            </span>
        </li>
        
        <li class="mdl-list__item mdl-list__item"
        onclick="loadQuestions(this)" id="select-malay"
        style="cursor: pointer;" value=2>
            <span class="mdl-list__item-primary-content">
            Malay
            </span>
        </li>
        
        <li class="mdl-list__item mdl-list__item"
        onclick="loadQuestions(this)" id="select-thai"
        style="cursor: pointer;" value=3>
            <span class="mdl-list__item-primary-content">
            Thai
            </span>
        </li>
    `;

}

/**
 * Adds a back button to the left pane.
 * <br>
 * Note: Implementation only covers navigating back to the
 * language selection.
 */
function appendBackButton() {
    const menuItem = `
        <li class="mdl-list__item mdl-list__item"
        onclick="displayLanguageMenu()" id="select-thai"
        style="cursor: pointer;" value=3>
            <span class="mdl-list__item-primary-content">
                Back to Language Selection
            </span>
        </li>
    `;

    questionsList.innerHTML += menuItem;
}