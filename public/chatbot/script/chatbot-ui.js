/**
 * Plan is to move UI code here
 */

/**
 * function to display messages onto the chat log by th user
 * @param message - user response
 */
function showMessageReceiver(message) {
    //display user message in given html format
    messages.innerHTML +=
        "<div class='space'>" +
        "<div class='message-container receiver notranslate'>" +
        `<p>${message}</p>` +
        "</div>" +
        "</div>"
}