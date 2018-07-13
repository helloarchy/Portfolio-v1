/**
 * Main.js
 * This script gets the ball rolling for the decider, and handles all initialisations
 * and control from the Decider 2.0 index.html.
 * @author Robert Hardy
 * @since 2018-07-11
 * Part of the rarh.io project.
 */
function main() {
    /* Set up the parent container for all the Lists to generate to. */
    let listParent = "lists-container";

    /* Create the reject list and set a reference for Move.js */
    let rejectList = new List(listParent, null, "Rejects");
    Move.setReject(rejectList);
    Move.setListParent(listParent);

    /* Create the initial list, referencing the reject list as its previous list,
     and create 3 empty Fields in it for the user to get started with. */
    let initialList = new List(listParent, rejectList, "Initial List");
    initialList.addEmpty();
    initialList.addEmpty();
    initialList.addEmpty();

//let testList = new List(listParent, initialList, "Test List");
}