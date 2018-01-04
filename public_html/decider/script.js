/**
 * Created by Burner on 02/01/2017.
 */

$(document).ready(function(){
    // disable buttons by default
    $("#removeButton").prop("disabled", true);
    $("#decideButton").prop("disabled", true);
    $("#resetButton").prop("disabled", true);

    // When add button clicked call addChoice.
    $("#addButton").click(function () {
        addChoice();
    });

    // When remove button clicked call removeChoice.
    $("#removeButton").click(function () {
        removeChoice();
    });

    // When decide button clicked call decide.
    $("#decideButton").click(function () {
        decide();
    });

    // When reset button clicked call reset.
    $("#resetButton").click(function () {
        reset();
    });

    // If any text box is interacted with, then make decide button available.
    $("#textBoxGroup").on("input propertychange paste", "input[type=text]", function () {
        $("#decideButton").prop("disabled", false);
        $("#resetButton").prop("disabled", false);
    });


    /**
     * Bind keys to behaviours.
     * Up arrow: removes choice.
     * Down arrow: adds choice.
     * Return: decides.
     */
    $(document).keydown(function (e) {
        switch (e.which) {
            case 38: // Up arrow
                // If button isn't disabled, allow
                if (!$("#removeButton").prop("disabled")) {
                    removeChoice();
                }
                break;
            case 40: // Down arrow
                addChoice();
                break;
            case 13: // Return
                // If button isn't disabled, allow
                if (!$("#decideButton").prop("disabled")) {
                    decide();
                }
                break;
            default:
                return; // exit
        }
        // Stop usual arrow key behaviours (moving window etc.).
        e.preventDefault();
    });
});

// GLOBAL VARIABLES:
var counter = 2;

/**
 * Resets all fields back to initial state.
 */
function reset() {
    for (var i = 0; i < counter; i++) {
        $("#TextBoxDiv" + i).remove();
    }
    counter = 2;
    $("#removeButton").prop("disabled", true);
    $('#textbox0').val("");
    $('#textbox1').val("");
    document.getElementById("decisionHeader").innerHTML = "";
    document.getElementById("decisionAnswer").innerHTML = "";
    $('#decideButton').val('Decide');

    $('#decisionAnswer').css('color', 'white');
    $('#decisionAnswer').css('font-size', '20px');
    $('#decisionAnswer').css('backgrounds-color', 'lightsalmon');
    $("#decisionHeader").html("");
    $("#decisionSub").html("");
}



/**
 * Create a new text input field for additional choices.
 * Max input fields of 99, gives message when max reached.
 * No real need for this limit other than stopping memory max out.
 * @returns {boolean}
 */
function addChoice() {
    if (counter > 99) {
        alert("We got 99 choices and 100 aint gonna be one.");
        return false;
    }

    var newTextBoxDiv = $(document.createElement('div'))
        .attr("id", 'TextBoxDiv' + counter);

    newTextBoxDiv.after().html('<label>#' + counter + ' </label>' +
        '<input type="text" name="textbox' + counter +
        '" id="textbox' + counter + '" value="" >');

    newTextBoxDiv.appendTo("#textBoxGroup");
    counter++;
    if (counter > 2) { // enable button
        document.getElementById("removeButton").disabled = false;
    }
    window.scrollBy(0, 31); // Prevent having to scroll when at bottom

    // Enable reset button
    $("#resetButton").prop("disabled", false);
}

/**
 * Removes last text input field till there are only two left.
 * Two are required to perform a decision.
 */
function removeChoice() {
    counter--;
    $("#TextBoxDiv" + counter).remove();
    if (counter <= 2) { // disable button
        document.getElementById("removeButton").disabled = true;
    }
}

/**
 * Makes decision, prints out to user.
 */
function decide() {
    var decisionHeader = $("#decisionHeader");
    var decisionAnswer = $("#decisionAnswer");
    var decisionSub = $("#decisionSub");

    decisionHeader.html("Deciding...");
    decisionAnswer.html("Calculating...");
    decisionSub.html("");

    decisionAnswer.css('color', 'white');
    decisionAnswer.css('font-size', '20px');
    decisionAnswer.css('backgrounds-color', 'lightsalmon');

    // Read through array and omit blank textboxes
    var verifiedChoices = [];
    var buffer = counter;
    do { // do while failed, bug
        // get textbox value of that random choice
        var aChoice = $('#textbox' + buffer).val();
        buffer--;
        // If choice is not a blank text box add it to
        // list of verified choices
        if (!(typeof aChoice === 'undefined' || aChoice === null ||
            aChoice === 0 || aChoice === "")) {
            // debugging:
            console.log("a choice: " + aChoice);
            verifiedChoices.push(aChoice);
        }
    } while (buffer >= 0);

    // Jumble verified values into random extended list


    var randomVerified = Math.floor((Math.random() * verifiedChoices.length));
    console.log("random: " + randomVerified);


    if (verifiedChoices.length <= 1) {
        decisionHeader.html("Error:");
        decisionAnswer.html("Two or more choices required!");
    } else {
        var k = 0;
        var answerPrint = setInterval(function() { // setInterval makes it run repeatedly
            if (k >= verifiedChoices.length){
                decisionHeader.html("The decision:");

                decisionAnswer.css('color', 'black');
                decisionAnswer.css('font-size', '36px');
                decisionAnswer.css('backgrounds-color', 'lightgreen');

                decisionAnswer.html(verifiedChoices[randomVerified]);

                decisionSub.html("If you're unhappy with the choice, hit decide" +
                    " again! But note: truly random results can give the same" +
                    " answer again!");

                clearInterval(answerPrint);
            } else {
                document.getElementById("decisionAnswer").innerHTML =
                    verifiedChoices[k];    // get the item and increment
                console.log("K: " + k);
                k++;
            }
        }, 1000);
    }
}