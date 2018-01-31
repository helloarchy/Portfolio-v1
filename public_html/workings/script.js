/**
 * WORKINGS
 * A roman blind dimension calculator. Used for generating the various measurements needed to make
 * a roman blind, as per the various input parameters. Has many extra options for fine tuning the
 * output blind.
 * Created: 2017/01/30
 * Last modified: 2018/01/31
 * @author Robert Hardy
 * @version 1.2.1
 */



/* GLOBAL VARIABLES/CONSTANTS (not declared with var to make auto global
* Initialised on page load with values, see below onPageLoad(). */
/*var bT = document.getElementById("blindTable"); //Table used for produced blind drawing.*/
/*var stackChoice = $("#selectStack"); // Determines generated stack type.*/
var blind; // blind object
var foldsManualOverwrite = false; // Used for auto calculating values unless user declares.
var ringsManualOverwrite = false;
var DEFAULT_DETAILS_PLACEHOLDER = "________________________";
var DEFAULT_FAB_CUT_WIDTH = 123.5; // cm
var DEFAULT_CUT_WIDTH = 134; // cm
var DEFAULT_FAB_REPEAT = 23.45; // cm
var DEFAULT_RAIL_BATON = 6; // cm
var DEFAULT_RAIL_EVANS = 6; // cm
var DEFAULT_RAIL_HALLIS = 4; // cm
var DEFAULT_WATERFALL_INCREMENT = 2.5; // cm
var DEFAULT_SHOWING_HEM = 2.5; // cm
var DEFAULT_RAILING_TYPE = "Railing";
var DEFAULT_RAILING_DEPTH = 6; // cm
var DEFAULT_POCKET_DEPTH = 3; // cm Half of full pocket (6 cm)
var DEFAULT_RING_MARGIN = 10.5; // cm

/*
 * ON PAGE LOAD:
 */
$(document).ready(function () {
});


/**
 * Collapsible Arrows:
 * Changing the collapse arrow directions on blind input fields.
 */
$(function () {
    /* Trigger all initial page load functions (normally handled by document ready, but need to be able
    * to recall the function again on reset. */
    onPageLoad();

    $("legend").click(function () {
        $(this).parent().find(".fieldContent").slideToggle("slow");
        $(this).children(".arrowDown").toggle();
        $(this).children(".arrowUp").toggle();
    });
});


function onPageLoad() {
    // Listen for form changes
    formValues();

    // send values to functions to update initial values.
    foldsChange($("#sliderFoldsCount").val());
    ringsCountChange($("#ringsCount").val());

    // hide drawing elements
    $("#jobDetails").hide("fast", function () {
    });
    $("#measureDetails").hide("fast", function () {
    });
    $("#disclaimer").hide("fast", function () {
    });

    // Initialise new blind with values.
    blind = new Blind(); // blind object

    /**
     * SUBMIT BUTTON CLICK:
     */
    $("#formBlinds").on("submit", function (e) {
        // Stop submit from refreshing page
        e.preventDefault();

        // Clear the canvas for new drawing
        $("#blindTable").html("");
        $("#fabricMeasures").html("");
        $("#liningMeasures").html("");
        $("#drawingDetailsClient").html("");
        $("#drawingDetailsCustAndRef").html("");
        /*$("#initialCalcs").html("");*/
        $("#initCalcsDropFig").html("");
        $("#initCalcsVelcroFig").html("");
        $("#initCalcsRevealFig").html("");
        $("#initCalcsResultFig").html("");


        // Hide placeholder
        $("#placeHolder").hide("fast", function () {
        });
        $("#centrePlaceHolder").hide("slow", function () {
        });


        // Un-hide drawing elements
        $("#jobDetails").show("fast", function () {
        });
        $("#blindDrawing").show("fast", function () {
        });
        $("#measureDetails").show("fast", function () {
        });
        $("#disclaimer").show("fast", function () {
        });


        // Write client details to drawing:
        writeJobDetails();

        // Write initial calculations:
        writeInitialCalcs();

        // Generate drawing and calculations
        generateBlinds();

        // Write measure details to drawing:
        writeMeasureDetails();

        // Reset folds manual overwrite
        foldsManualOverwrite = false;

        // Reset rings manual overwrite
        ringsManualOverwrite = false;
    });

    $("#resetButton").click(function () {
        $("#waterfall").slideUp("slow");
        $("#showingHem").slideUp("slow");

        // Show the placeholder
        $("#placeHolder").show("fast", function () {
        });
        $("#centrePlaceHolder").show("slow", function () {
        });

        // Hide the existing drawing.
        $("#jobDetails").hide("fast", function () {
        });
        $("#measureDetails").hide("fast", function () {
        });
        $("#disclaimer").hide("fast", function () {
        });
        $("#blindDrawing").hide("fast", function () {
        });

        // Change all values back to defaults.
        // Reset manual overwrites
        foldsManualOverwrite = false;
        ringsManualOverwrite = false;
        formValues();
        onPageLoad();
    });
}


/**
 * Slider value text changes:
 * Two methods for updating slider value text in blinds form.
 */
function foldsChange(value) {
    $("#foldsValueText").text(value);
}

function ringsCountChange(value) {
    $("#ringsCountText").text(value);
}

/**
 * Stack type list:
 * Handle users stack choice, hiding and displaying form elements.
 */
$(function () {
    $("#selectStack").on("change", function () {
        if (this.selectedIndex === 0) {
            // Normal stack: Hide showing hem and water if showing.
            $("#showingHem").slideUp("slow");
            $("#waterfall").slideUp("slow");
        } else if (this.selectedIndex === 1) {
            // Waterfall stack: Show water stuff, hide showing hem if showing.
            $("#waterfall").slideDown("slow");
            $("#showingHem").slideUp("slow");
        } else if (this.selectedIndex === 2) {
            // Showing at hem stack: Show showing stuff, hide water if showing.
            $("#showingHem").slideDown("slow");
            $("#waterfall").slideUp("slow");
        }
        // Lose focus after choice.
        $("#selectStack").blur();
    });
});


/**
 * BLIND CLASS (object declaration)
 */
function Blind() {
    // DETAILS:
    this.detailsClient = DEFAULT_DETAILS_PLACEHOLDER;
    this.detailsCustomer = DEFAULT_DETAILS_PLACEHOLDER;
    this.detailsReference = DEFAULT_DETAILS_PLACEHOLDER;

    // DIMENSIONS:
    this.width = 0; //cm
    this.widthUnit = "cm";
    this.height = 0; //cm
    this.heightUnit = "cm";

    // FABRIC:
    this.fabricCutWidth = DEFAULT_FAB_CUT_WIDTH;
    this.fabricRepeat = DEFAULT_FAB_REPEAT;

    // LININGS:
    this.liningInner = "Unspecified";
    this.liningIsInner = false; // Inner linings not always needed.
    this.liningOuter = "Unspecified";
    // outer always needed

    // RAILING:
    this.railingType = DEFAULT_RAILING_TYPE;
    this.railingDepth = DEFAULT_RAILING_DEPTH; //cm

    // STACK:
    this.stackType = "normal";
    this.waterfallIncrement = DEFAULT_WATERFALL_INCREMENT; //cm
    this.showingHemSize = DEFAULT_SHOWING_HEM; //cm
    this.stackFolds = 4;

    // POCKETS:
    this.pocketsDepth = 3; //cm

    // RINGS:
    this.ringsType = "Unspecified";
    this.ringsMargin = DEFAULT_RING_MARGIN;
    this.ringsCount = 5;

    // Misc other T.B.O
    this.hemTurnings = 15;

    // Calculated sizes:
    this.cutLengthLining = 0;
    this.cutLengthFabInner = 0;
    this.pocketsTotalLength = 0;
}


/**
 * FORM VALUES
 * Defaults, replaced and updated every time users changed them.
 */
function formValues() {
    // DETAILS
    // Client
    $("#clientTextBox").change(function () {
        /*Use manually entered value if there is one, otherwise use default.*/
        if (!(this.value === "")) {
            blind.detailsClient = this.value;
            console.log("Details client change: " + blind.detailsClient);
        } else {
            blind.detailsClient = DEFAULT_DETAILS_PLACEHOLDER;
            console.log("Details client change, using default (" + DEFAULT_DETAILS_PLACEHOLDER + ")");
        }
    });
    // Customer
    $("#customerTextBox").change(function () {
        /*Use manually entered value if there is one, otherwise use default.*/
        if (!(this.value === "")) {
            blind.detailsCustomer = this.value;
            console.log("Details customer change: " + blind.detailsCustomer);
        } else {
            blind.detailsCustomer = DEFAULT_DETAILS_PLACEHOLDER;
            console.log("Details customer change, using default (" + DEFAULT_DETAILS_PLACEHOLDER + ")");
        }
    });
    // Reference
    $("#referenceTextBox").change(function () {
        /*Use manually entered value if there is one, otherwise use default.*/
        if (!(this.value === "")) {
            blind.detailsReference = this.value;
            console.log("Details reference change: " + blind.detailsReference);
        } else {
            blind.detailsReference = DEFAULT_DETAILS_PLACEHOLDER;
            console.log("Details reference change, using default (" + DEFAULT_DETAILS_PLACEHOLDER + ")");
        }
    });

    // DIMENSIONS
    // Width
    $("#width").change(function () {
        // Required so no validation needed.
        blind.width = +this.value;
        console.log("Blind width change: " + blind.width);
    });
    $("#widthUnit").change(function () { // Width unit used.
        var width = $("#width");
        var widthOld = width.val();
        var widthNew = width.val();

        //Convert width numerical value to cm and log progress to console.
        if (this.value === "in") {
            width.val(round1DP(widthNew *= 2.54));
        } else if (this.value === "mm") {
            width.val(round1DP(widthNew /= 10));
        }
        console.log("Blind width unit change: " + widthOld + this.value + "'s changed to " +
            widthNew + "cm's.");

        // Reset CM as the selected value, update blind width to reflect new value, update console.
        $("#widthUnit").val("cm");
        blind.widthUnit = this.value;
        blind.width = +widthNew;
        console.log("Blind width change: " + blind.width + blind.heightUnit + "'s.");
    });

    // Height
    $("#height").change(function () {
        // Required so no validation needed.
        blind.height = +this.value;
        console.log("Blind height change: " + blind.height);
    });
    $("#heightUnit").change(function () { // Height unit used.
        var height = $("#height");
        var heightOld = height.val();
        var heightNew = height.val();

        // Convert height numerical value to cm and log progress to console.
        if (this.value === "in") {
            height.val(round1DP(heightNew *= 2.54));
        } else if (this.value === "mm") {
            height.val(round1DP(heightNew /= 10));
        }
        console.log("Blind height unit change: " + heightOld + this.value + "'s changed to " +
            heightNew + "cm's.");

        // Reset CM as the selected value, update blind height to reflect new value, update console.
        $("#heightUnit").val("cm");
        blind.heightUnit = this.value;
        blind.height = +heightNew;
        console.log("Blind height change: " + blind.height + blind.heightUnit + "'s.");
    });

    // FABRIC
    // Cut width
    $("#fabricCutWidth").change(function () {
        /*Use manually entered value if there is one, otherwise use default.*/
        if (!(this.value === "")) {
            blind.fabricCutWidth = +this.value;
            console.log("Fabric cut width change: " + blind.fabricCutWidth);
        } else {
            blind.fabricCutWidth = DEFAULT_FAB_CUT_WIDTH;
            console.log("Fabric cut width change, using default (" + DEFAULT_FAB_CUT_WIDTH + ")");
        }
        /**
         * ADD HANDLER FOR CM/INCH
         */
    });
    // Repeat
    $("#fabricRepeat").change(function () {
        /*Use manually entered value if there is one, otherwise use default.*/
        if (!(this.value === "")) {
            blind.fabricRepeat = +this.value;
            console.log("Fabric repeat change: " + blind.fabricRepeat);
        } else {
            blind.fabricRepeat = DEFAULT_FAB_REPEAT;
            console.log("Fabric repeat change, using default (" + DEFAULT_FAB_REPEAT + ")");
        }
        /**
         * ADD HANDLER FOR CM/INCH
         */
    });

    // LININGS
    // Inner
    $("#liningsInner").change(function () {
        blind.liningInner = this.value;
        console.log("Linings inner change " + blind.liningInner);
        /**
         * ADD HANDLER FOR IF EMPTY isLiningsInner BOOLEAN
         */
    });
    // Outer
    $("#liningsOuter").change(function () {
        blind.liningOuter = this.value;
        console.log("Linings outer change: " + blind.liningOuter);
    });

    // RAILING
    // Type
    $("#railingType").on('input', function () {
        blind.railingType = this.value;
        console.log("Railing type change: " + blind.railingType);
        var depthText = $("#railingDepth");

        /*If input type is Baton, Evans or Hallis, use the default railing depth for that type. Else
        * use the manually input type. If no input type given at all, use default.*/
        if (blind.railingType === "Baton") {
            blind.railingDepth = DEFAULT_RAIL_BATON;
            depthText.val(DEFAULT_RAIL_BATON);
            console.log("Railing BATON chosen, using " + DEFAULT_RAIL_BATON + " for depth.");
        } else if (blind.railingType === "Evans") {
            blind.railingDepth = DEFAULT_RAIL_EVANS;
            depthText.val(DEFAULT_RAIL_EVANS);
            console.log("Railing EVANS chosen, using " + DEFAULT_RAIL_EVANS + " for depth.");
        } else if (blind.railingType === "Hallis") {
            blind.railingDepth = DEFAULT_RAIL_HALLIS;
            depthText.val(DEFAULT_RAIL_HALLIS);
            console.log("Railing HALLIS chosen, using " + DEFAULT_RAIL_HALLIS + " for depth.");
        } else {
            /*None of the above so use manually entered value if there is one, otherwise use
            default.*/
            console.log("No railing type chosen so using manual value or default.");
            if (!(this.value === "")) {
                blind.railingDepth = +this.value;
                console.log("Railing depth change: " + blind.railingDepth);
            } else {
                blind.railingDepth = DEFAULT_RAILING_DEPTH;
                console.log("Railing depth change, using default (" + DEFAULT_RAILING_DEPTH + ")");
            }
        }
    });
    // Depth
    $("#railingDepth").change(function () {
        /*If value not empty use it, otherwise user entered a value then deleted it after, so do
        nothing as not to override the defaults above.*/
        if (!(this.value === "")) {
            blind.railingDepth = +this.value;
            console.log("Railing depth change: " + blind.railingDepth);
        } else {
            blind.railingDepth = DEFAULT_RAILING_DEPTH;
            console.log("Railing depth change, using default (" + DEFAULT_RAILING_DEPTH + ")");
        }
        /**
         * ADD HANDLER FOR CM/INCH
         */
    });
    $("#railingUnit").change(function () { // Railing depth unit
        var railingDepth = $("#railingDepth");
        var depthOld = railingDepth.val();
        var depthNew = railingDepth.val();

        // Convert railing depth numerical value to cm and log progress to console.
        if (this.value === "in") {
            railingDepth.val(round1DP(depthNew *= 2.54));
        } else if (this.value === "mm") {
            railingDepth.val(round1DP(depthNew /= 10));
        }
        console.log("Blind railing depth unit change: " + depthOld + this.value + "'s changed to " +
            depthNew + "cm's.");

        // Reset CM as the selected value, update blind railing depth to reflect new value, update console.
        $("#railingUnit").val("cm");
        blind.railingUnit = this.value;
        blind.railingDepth = +depthNew;
        console.log("Blind railing depth change: " + blind.railingDepth + blind.railingUnit + "'s.");
    });


    // STACK
    // Type
    $("#selectStack").change(function () {
        blind.stackType = this.value;
        console.log("Stack type change: " + blind.stackType);
    });
    // Waterfall
    $("#waterfallIncrements").change(function () {
        /*If value not empty use it, otherwise user entered a value then deleted it after, so do
         nothing as not to override the defaults above. Otherwise revert to default.*/
        if (!(this.value === "")) {
            blind.waterfallIncrement = +this.value;
            console.log("Waterfall increment change: " + blind.waterfallIncrement);
        } else {
            blind.waterfallIncrement = DEFAULT_WATERFALL_INCREMENT;
        }
    });
    $("#waterfallUnit").change(function () { // Waterfall/cascade increment unit
        var waterIncrements = $("#waterfallIncrements");
        var incrementsOld = waterIncrements.val();
        var incrementsNew = waterIncrements.val();

        // Convert waterfall increments numerical value to cm and log progress to console.
        if (this.value === "in") {
            waterIncrements.val(round1DP(incrementsNew *= 2.54));
        } else if (this.value === "mm") {
            waterIncrements.val(round1DP(incrementsNew /= 10));
        }
        console.log("Blind waterfall increments unit change: " + incrementsOld + this.value +
            "'s changed to " + incrementsNew + "cm's.");

        /*Reset CM as the selected value, update blind waterfall increments to reflect new value,
        update console.*/
        $("#waterfallUnit").val("cm");
        blind.waterfallIncrementUnit = this.value;
        blind.waterfallIncrement = +incrementsNew;
        console.log("Blind railing depth change: " + blind.waterfallIncrement +
            blind.waterfallIncrementUnit + "'s.");
    });


    // Showing Hem
    $("#showingHemSize").change(function () {
        /*If value not empty use it, otherwise user entered a value then deleted it after, so do
         nothing as not to override the defaults above. Otherwise revert to default.*/
        if (!(this.value === "")) {
            blind.showingHemSize = +this.value;
            console.log("Showing hem size change " + blind.showingHemSize);
        } else {
            blind.showingHemSize = DEFAULT_SHOWING_HEM;
        }
    });
    $("#showingUnit").change(function () { // Showing hem size unit
        var showingSize = $("#showingHemSize");
        var showingOld = showingSize.val();
        var showingNew = showingSize.val();

        // Convert showing hem size numerical value to cm and log progress to console.
        if (this.value === "in") {
            showingSize.val(round1DP(showingNew *= 2.54));
        } else if (this.value === "mm") {
            showingSize.val(round1DP(showingNew /= 10));
        }
        console.log("Blind showing hem size unit change: " + showingOld + this.value +
            "'s changed to " + showingNew + "cm's.");

        /*Reset CM as the selected value, update blind showing hem size to reflect new value,
        update console.*/
        $("#showingUnit").val("cm");
        blind.showingHemUnit = this.value;
        blind.showingHemSize = +showingNew;
        console.log("Blind showing hem size change: " + blind.showingHemSize +
            blind.showingHemUnit + "'s.");
    });


    // Folds count
    $("#sliderFoldsCount").change(function () {
        blind.stackFolds = this.value;
        console.log("Stack folds change: " + blind.stackFolds);

        // Manual overwrite, else value auto generated.
        foldsManualOverwrite = true;
    });

    // POCKETS
    // Depth
    $("#pocketsDepth").change(function () {
        /*Use manually entered value if there is one, otherwise use default.*/
        if (!(this.value === "")) {
            blind.pocketsDepth = +this.value;
            console.log("Pocket depth change: " + blind.pocketsDepth);
        } else {
            blind.pocketsDepth = DEFAULT_POCKET_DEPTH;
            console.log("Pocket depth change, using default (" + DEFAULT_POCKET_DEPTH + ")");
        }
        /**
         * ADD HANDLER FOR CM/INCH
         */
    });

    // RINGS
    // Type
    $("#ringsType").change(function () {
        blind.ringsType = this.value;
        console.log("Rings type change: " + blind.ringsType);
    });
    // Margins
    $("#ringsMargin").change(function () {
        /*Use manually entered value if there is one, otherwise use default.*/
        if (!(this.value === "")) {
            blind.ringsMargin = +this.value;
            console.log("Rings margin change: " + blind.ringsMargin);
        } else {
            blind.ringsMargin = DEFAULT_RING_MARGIN;
            console.log("Rings margin change, using default (" + DEFAULT_RING_MARGIN + ")");
        }
        /**
         * ADD HANDLER FOR CM/INCH
         */
    });
    // Count
    $("#ringsCount").change(function () {
        blind.ringsCount = this.value;
        console.log("Ring count change:" + blind.ringsCount);

        // Manual overwrite, else value auto generated
        ringsManualOverwrite = true;
    })
}


/**
 * Validates user input. Use manually entered value if there is one, otherwise use default.
 * @param text, the generic text value for the item to be changed.
 * @param toSet, the blind attribute to assign validated value to.
 * @param inputVal, the user input given.
 * @param DEFAULT, the value to default back to if input is blank.
 */
function textBoxValidation(text, toSet, inputVal, DEFAULT) {
    if (!(inputVal === "")) {
        toSet = inputVal;
        console.log(text + " change: " + toSet);
    } else {
        toSet = DEFAULT;
        console.log(text + ", using default (" + DEFAULT + ")");
    }
}


/**
 * Auto Calculation of Stack Folds:
 * Value can be overwritten by manual input. If no manual input, the value generated here will be
 * used. Ranges determined by predefined values, hard coded here.
 * @returns {*} value to be used for folds.
 */
function autoCalcFoldCount() {
    var autoFoldResult;
    var value = blind.height;
    if (40 <= value && value <= 59.99) {
        autoFoldResult = 1;
    } else if (60 <= value && value <= 79.99) {
        autoFoldResult = 2;
    } else if (80 <= value && value <= 119.99) {
        autoFoldResult = 3;
    } else if (120 <= value && value <= 159.99) {
        autoFoldResult = 4;
    } else if (160 <= value && value <= 199.99) {
        autoFoldResult = 5;
    } else if (200 <= value && value <= 239.99) {
        autoFoldResult = 6;
    } else if (240 <= value && value <= 279.99) {
        autoFoldResult = 7;
    }

    // Debug
    console.log("Fold count (auto): " + autoFoldResult);

    // Reflect new fold count in form elements
    $("#sliderFoldsCount").val(autoFoldResult);
    $("#foldsValueText").val(autoFoldResult);

    return autoFoldResult;
}


/**
 * RING COUNT AUTO GENERATOR
 * Value can be overwritten by manual input. If no manual input, the value
 * generated here will be used.
 */
function autoCalcRingsCount() {
    /**
     * Match blind width to certain specific sizes for different
     * ring count.
     * All units in cm and require converting from inch/mm beforehand.
     * note: used switch statement but changed to if/else more efficient.
     */
    var autoRingResult;
    var value = blind.width;
    if (26 <= value && value <= 70.99) {
        autoRingResult = 2;
    } else if (71 <= value && value <= 104.99) {
        autoRingResult = 3;
    } else if (105 <= value && value <= 149.99) {
        autoRingResult = 4;
    } else if (150 <= value && value <= 179.99) {
        autoRingResult = 5;
    } else if (180 <= value && value <= 224.99) {
        autoRingResult = 6;
    } else if (225 <= value && value <= 269.99) {
        autoRingResult = 7;
    }

    // Debug
    console.log("Ring count (auto): " + autoRingResult);

    // Reflect new ring count in form elements
    $("#ringsCount").val(autoRingResult);
    $("#ringsCountText").val(autoRingResult);

    return autoRingResult;
}


/**
 * Write Details:
 * Add customer details to the printable drawing.
 */
function writeJobDetails() {
    $("#drawingDetailsClient").html(blind.detailsClient);
    $("#drawingDetailsCustAndRef").html(blind.detailsCustomer + ": " + blind.detailsReference);
}


/**
 * Write initial calculations:
 * Add the initial calculations to the printable drawing. OnSubmit all html is wiped, so can generate
 * only once without worrying about duplication or value changes.
 */
function writeInitialCalcs() {
    // Full drop
    $("#initCalcsDropFig").append(
        "<td>" + round1DP(+blind.height) + "</td><td class='initCalcsLabels'>Drop</td>"
    );
    // Railing
    $("#initCalcsVelcroFig").append(
        "<td>- " + round1DP(+blind.railingDepth) + "</td><td class='initCalcsLabels'>" +
        blind.railingType + "</td>"
    );
    // Add additional calculations if the blind has showing hem, if not, don't show it.
    if (blind.stackType === "showingHem") {
        $("#initCalcsRevealFig").append(
            "<td>- " + round1DP(blind.showingHemSize) + "</td><td class='initCalcsLabels'>Reveal</td>"
        );
        // Result
        $("#initCalcsResultFig").append(
            "<td id='initCalcsResult'>" + round1DP(+blind.height -
            (+blind.railingDepth + +blind.showingHemSize)) + "</td><td id='initCalcsLabelsResult'>"
            + blind.heightUnit + "</td>"
        );
    } else {
        // Result
        $("#initCalcsResultFig").append(
            "<td id='initCalcsResult'>" + round1DP(+blind.height - +blind.railingDepth) +
            "</td><td id='initCalcsLabelsResult'>" + blind.heightUnit + "</td>"
        );
    }
}


/**
 * BLIND GENERATOR
 * This function takes the blind object previously created and generates a full
 * illustration of it in the blindDrawing div. All calculations for measurements
 * are also generated here.
 */
function generateBlinds() {
    var blindTable = $("#blindTable"); // Cache call for optimisation

    // Check if rings and folds have user specified values, if not, auto generate them.
    if (ringsManualOverwrite === false) {
        blind.ringsCount = autoCalcRingsCount();
    }
    if (foldsManualOverwrite === false) {
        blind.stackFolds = autoCalcFoldCount();
    }

    // Initialise images for blind drawing.
    initImgVars();

    /* GET FOLD SIZES:
    If waterfall, use waterfall function, otherwise get from usual function. */
    var stackSizes = []; // Array for stack sizes.
    if (blind.stackType === "normal") {
        // Generate normal stack sizes.
        stackSizes = autoCalcStackNormal();
    } else if (blind.stackType === "waterfall") {
        // Generate waterfall stack sizes.
        stackSizes = autoCalcStackWaterfall();
    } else if (blind.stackType === "showingHem") {
        // Generate showing at hem sizes.
        stackSizes = autoCalcStackShowingHem();
    }
    stackSizes = stackSizes.reverse(); // Reverse array for popping in order written.

    // -- Add sections to drawing --

    /* VELCRO/HEAD RAIL STRIP:
    Add left to drawing, then use loop to add middles and spots, then ultimately right. */
    blindTable.append("<tr id='velcro'><td>" + window.velcroLEFT + "</td>");
    var h = blind.ringsCount; // Velcro width counter
    var labelCounter = 1; // Determines mid section to add label to.
    for (h; h > 0; h--) {
        // If more than one ring, add ring plus spacer. Else add final ring and right edge.
        if (h > 1) {
            if (labelCounter > 0) {
                $("#velcro").append("<td>" + window.velcroMIDDLE + "</td>" + "<td class='labelImg'>"
                    + window.velcroMIDDLE + "<span class='lblImgSmall'>" + round1DP(stackSizes.pop())
                    + "</span></td>");
                labelCounter--;
            } else {
                $("#velcro").append("<td>" + window.velcroMIDDLE + "</td>" +
                    "<td>" + window.velcroMIDDLE + "</td>");
            }
        } else {
            // Draw velcro on right edge
            $("#velcro").append("<td>" + window.velcroMIDDLE + "</td>" + "<td>" + window.velcroRIGHT
                + "</td></tr>");
        }
    }

    /**
     * MID SECTIONS:
     * Iterates for each pocket, terminates when no pockets left. Each loop creates a new pocket
     * div and adds it to html blind drawing. Nested statements create blind elements before,
     * between, and after pockets.
     */
    var verticalCount = blind.stackFolds; //stack folds determines vertical elements.
    var widthCount = blind.ringsCount; // rings count determines width elements.
    var i = verticalCount; // counter for vertical blind elements
    var j = verticalCount; // counter for width elements.
    var k, l, m; // counters for varying inner width elements.
    k = l = m = verticalCount;
    for (i; i > 0; i--) {
        /* BLANK PRE-FOLD:
        Add left to drawing, then use loop to add middles and spots, then ultimately right. */
        if (j > 0) {
            blindTable.append("<tr id='blankA" + j + "'><td>" + window.blankLEFT + "</td>");
            k = widthCount; // set width counter
            for (k; k > 0; k--) {
                // If more than one ring, add ring plus spacer.
                // Else add final ring and right edge.
                if (k > 1) {
                    $("#blankA" + j).append("<td>" + window.blankMIDDLE + "</td>" +
                        "<td>" + window.blankMIDDLE + "</td>");
                } else {
                    // Draw velcro on right edge
                    $("#blankA" + j).append("<td>" + window.blankMIDDLE + "</td>" +
                        "<td>" + window.blankRIGHT + "</td></tr>");
                }
            }
            j--; // counter decrement
        }

        /* FOLD:
        Add left to drawing, then use loop to add middles and spots, then ultimately right. */
        if (l > 0) {
            blindTable.append("<tr id='fold" + l + "'>" +
                "<td>" + window.foldLEFT + "</td>");
            k = widthCount; // set width counter
            labelCounter = 1;
            for (k; k > 0; k--) {
                // Determine amount of middle elements by ring count. Add two
                // middles if still middle, if end add one plus right edge.
                if (k > 1) {
                    if (labelCounter > 0) {
                        $("#fold" + l).append("<td class='labelImg'>" + window.blankMIDDLE +
                            "<span>" + round1DP(stackSizes.pop()) + "</span></td><td>" + window.blankMIDDLE +
                            "</td>");
                        labelCounter--;
                    } else {
                        $("#fold" + l).append("<td>" + window.foldMIDDLE + "</td><td>"
                            + window.foldMIDDLE + "</td>");
                    }
                } else {
                    // Draw fold on right edge
                    $("#fold" + l).append("<td>" + window.foldMIDDLE + "</td>" +
                        "<td>" + window.foldRIGHT + "</td></tr>");
                }
            }
            l--; // counter decrement
        }

        /* BLANK POST-FOLD:
        Add left to drawing, then use loop to add middles, then ultimately right. */
        if (m > 0) {
            blindTable.append("<tr id='blankB" + m + "'>" +
                "<td>" + window.blankLEFT + "</td>");
            k = widthCount; // set width counter
            for (k; k > 0; k--) {
                // Determine amount of middle elements by ring count. Add two
                // middles if still middle, if end add one plus right edge.
                if (k > 1) {
                    $("#blankB" + m).append("<td>" + window.blankMIDDLE + "</td>" +
                        "<td>" + window.blankMIDDLE + "</td>");
                } else {
                    // Draw blank on right edge
                    $("#blankB" + m).append("<td>" + window.blankMIDDLE + "</td>" +
                        "<td>" + window.blankRIGHT + "</td></tr>");
                }
            }
            m--; // counter decrement
        }

        /* POCKETS:
        Add left to drawing, then use loop to add middles and spots, then ultimately right. */
        blindTable.append("<tr id='pocket" + i + "'><td>" + window.pocketLEFT + "</td>");
        k = widthCount; // set width counter
        labelCounter = 1;
        for (k; k > 0; k--) {
            // If more than one ring, add ring plus spacer.
            // Else add final ring and right edge.
            if (k > 1) {
                if (labelCounter > 0) {
                    $("#pocket" + i).append("<td>" + window.pocketRINGSPOT + "</td>" +
                        "<td class='labelImg'>" + window.pocketMIDDLE + "<span class='lblImgSmall'>" +
                        round1DP(stackSizes.pop()) + "</span></td>");
                    labelCounter--;
                } else {
                    $("#pocket" + i).append("<td>" + window.pocketRINGSPOT + "</td>" +
                        "<td>" + window.pocketMIDDLE + "</td>");
                }
            } else {
                // Draw pocket on right edge
                $("#pocket" + i).append("<td>" + window.pocketRINGSPOT + "</td>" +
                    "<td>" + window.pocketRIGHT + "</td></tr>");
            }
        }
    }

    // -- Finally, add bottom pleat --

    /* BLANK SINGLE:
    Add left to drawing, then use loop to add middles, then ultimately right. */
    blindTable.append("<tr id='blankSingle'><td>" + window.blankLEFT + "</td>");
    k = widthCount; // set width counter
    labelCounter = 1;
    for (k; k > 0; k--) {
        // Determine amount of middle elements by ring count. Add two
        // middles if still middle, if end add one plus right edge.
        if (k > 1) {
            if (labelCounter > 0) {
                $("#blankSingle").append("<td class='labelImg'>" + window.blankMIDDLE + "<span>" +
                    round1DP(stackSizes.pop()) + "</span></td><td>" + window.blankMIDDLE + "</td>");
                labelCounter--;
            } else {
                $("#blankSingle").append("<td>" + window.blankMIDDLE + "</td>" +
                    "<td>" + window.blankMIDDLE + "</td>");
            }
        } else {
            // Draw blank on right edge
            $("#blankSingle").append("<td>" + window.blankMIDDLE + "</td>" +
                "<td>" + window.blankRIGHT + "</td></tr>");
        }
    }

    /* HEM/BOTTOM BAR:
    Add left to drawing, then use loop to add middles, then ultimately right. */
    blindTable.append("<tr id='hem'><td>" + window.hemLEFT + "</td>");
    k = widthCount; // set width counter
    labelCounter = 1;
    for (k; k > 0; k--) {
        // Determine amount of middle elements by ring count. Add two
        // middles if still middle, if end add one plus right edge.
        if (k > 1) {
            if (labelCounter > 0) {
                $("#hem").append("<td>" + window.hemMIDDLE + "</td><td class='labelImg'>" +
                    window.hemMIDDLE + "<span class='lblImgSmall'>" + round1DP(stackSizes.pop()) +
                    "</span></td>");
                labelCounter--;
            } else {
                $("#hem").append("<td>" + window.hemMIDDLE + "</td><td>" + window.hemMIDDLE +
                    "</td>");
            }
        } else {
            // Draw blank single on right edge
            $("#hem").append("<td>" + window.hemMIDDLE + "</td><td>" + window.hemRIGHT +
                "</td></tr>");
        }
    }
}


/**
 * Calculates stack sizes for a normal blind.
 * @returns {Array} of measurements used by "generateBlind" to build drawing.
 */
function autoCalcStackNormal() {
    var stackSizes = []; // Populate with generated values and returned.
    var totalDepth = +blind.height;
    console.log("Total depth: " + totalDepth); //todo BURN

    // Add railing depth to array. Minus railing depth from blinds total depth.
    stackSizes.push(+blind.railingDepth);
    totalDepth -= +blind.railingDepth;
    console.log("Minus velcro/railing(" + +blind.railingDepth + "): " + totalDepth); //todo BURN

    /* For each fold, add depth from pocket to pocket, plus pocket itself. There are two folds per
    pocket, plus 1 for the bottom pleat. */
    var eachFold = round2DP(totalDepth / ((blind.stackFolds * 2) + 1));
    console.log("Each individual fold: " + eachFold);
    for (var k = 0; k < blind.stackFolds; k++) {

        stackSizes.push(eachFold * 2); // Add full pleat section to array.
        console.log("Adding pleat section: " + round2DP(eachFold * 2)); //todo BURN

        stackSizes.push(blind.pocketsDepth * 2); // Add pocket too.
        console.log("Adding pocket: " + round2DP(blind.pocketsDepth * 2)); //todo BURN

        console.log("Looping: " + k);
    }

    // Add half pleat section to array for bottom of blind.
    stackSizes.push(eachFold);
    console.log("Adding final pleat: " + eachFold);

    // Add final hem turnings to array for bottom of blind.
    stackSizes.push(+blind.hemTurnings);
    console.log("Adding hem turnings: " + blind.hemTurnings);

    blind.cutLengthLining = stackSizes.reduce(getSum);
    blind.cutLengthFabInner = (+blind.height) + (+blind.hemTurnings);
    blind.pocketsTotalLength = (blind.pocketsDepth * 2) * blind.stackFolds;
    console.log("Lining total size (+15 turning allowance): " + +blind.cutLengthLining);
    console.log("Fab Inner total size (+15 turning allowance): " + blind.cutLengthFabInner);
    console.log("Total pockets length: " + blind.pocketsTotalLength);
    return stackSizes;
}


/**
 * Calculates stack sizes for a normal blind.
 * @returns {Array} of measurements used by "generateBlind" to build drawing.
 */
function autoCalcStackWaterfall() {
    var stackSizes = []; // Populate with generated values and returned.
    var totalDepth = +blind.height;
    var WATER_INC = +blind.waterfallIncrement;
    console.log("Calculating WATERFALL Stack with increment: " + WATER_INC);

    var totalHalfFolds = (blind.stackFolds * 2) + 1;
    console.log("Total half folds: " + totalHalfFolds);

    /* This loop sums the total cascade needed for the blind, by adding the cascade for each fold
    and also increasing the cascade by the increment for each pocket in the blind.
     */
    var totalCascade = 0;
    var curCascade = 0;
    var loopTwice = 1;
    for (var i = 0; i < totalHalfFolds; i++) {
        totalCascade += curCascade;
        console.log("Current cascade: " + totalCascade);
        // Increase increment for every other half fold.
        if (!(loopTwice > 0)) {
            curCascade += WATER_INC;
            loopTwice = 1;
        } else {
            loopTwice--;
        }
    }
    console.log(" ==================>  Total cascade: " + totalCascade);

    /* Minus railing from drop */
    console.log("Total depth: " + totalDepth);
    stackSizes.push(+blind.railingDepth); // Add to array
    totalDepth -= +blind.railingDepth; // Minus railing from drop
    console.log("Minus velcro/railing(" + +blind.railingDepth + "): " + totalDepth);

    /* Minus the total cascade from the drop of the blind (which also minuses the railing depth),
     then divide by the half folds needed to get the size of the first fold, then multiply by two
     to get the size of the full fold. */
    var depthAfterCascade = (totalDepth - totalCascade);
    console.log("Total depth after cascade: " + depthAfterCascade);

    var firstFold = (depthAfterCascade / totalHalfFolds) * 2;
    console.log("First fold: " + firstFold);
    stackSizes.push(firstFold);

    /* Loop for remaining full folds, adding increment each time.
    Skip over first fold */
    var curFold = firstFold;
    for (var k = 1; k < blind.stackFolds; k++) {

        // Add pocket.
        stackSizes.push(blind.pocketsDepth * 2);
        console.log("Adding pocket: " + blind.pocketsDepth * 2); //todo BURN

        // Add the increment to the current fold, then push it to array.
        curFold += (WATER_INC * 2);
        stackSizes.push(curFold); // Add full pleat section to array.
        console.log("Adding pleat section: " + curFold); //todo BURN

        console.log("Looping: " + k);
    }

    // Add final pocket.
    stackSizes.push(blind.pocketsDepth * 2);
    console.log("Adding pocket: " + blind.pocketsDepth * 2); //todo BURN

    // Add final half pleat section to array for bottom of blind.
    var finalFold = (curFold + (WATER_INC * 2)) / 2;
    stackSizes.push(finalFold);
    console.log("Adding final pleat: " + finalFold);

    // Add final hem turnings to array for bottom of blind.
    stackSizes.push(blind.hemTurnings);
    console.log("Adding hem turnings: " + blind.hemTurnings);

    blind.cutLengthLining = stackSizes.reduce(getSum);
    blind.cutLengthFabInner = +blind.height + +blind.hemTurnings;
    blind.pocketsTotalLength = (blind.pocketsDepth * 2) * blind.stackFolds;
    console.log("Lining total size (+15 turning allowance): " + blind.cutLengthLining);
    console.log("Fab Inner total size (+15 turning allowance): " + blind.cutLengthFabInner);
    console.log("Total pockets length: " + blind.pocketsTotalLength);
    return stackSizes;
}


/**
 * Calculates the stack of a blind with an additional show at the final pleat.
 * @returns {Array} of measurements used by "generateBlind" to build drawing.
 */
function autoCalcStackShowingHem() {
    var stackSizes = []; // Populate with generated values and returned.
    var totalDepth = +blind.height - +blind.showingHemSize;
    console.log("Total depth (" + blind.height + ") minus showing hem: " + totalDepth); //todo BURN

    // Add railing depth to array. Minus railing depth from blinds total depth.
    stackSizes.push(+blind.railingDepth);
    totalDepth -= +blind.railingDepth;
    console.log("Minus velcro/railing(" + +blind.railingDepth + "): " + totalDepth); //todo BURN

    /* For each fold, add depth from pocket to pocket, plus pocket itself. There are two folds per
     pocket, plus 1 for the bottom pleat. */
    var eachFold = round2DP(totalDepth / ((blind.stackFolds * 2) + 1));
    console.log("Each individual fold: " + eachFold);
    for (var k = 0; k < blind.stackFolds; k++) {

        stackSizes.push(eachFold * 2); // Add full pleat section to array.
        console.log("Adding pleat section: " + round2DP(eachFold * 2)); //todo BURN

        stackSizes.push(blind.pocketsDepth * 2); // Add pocket too.
        console.log("Adding pocket: " + round2DP(blind.pocketsDepth * 2)); //todo BURN

        console.log("Looping: " + k);
    }

    // Add half pleat section to array for bottom of blind. But add back showing hem size.
    var bottomPleat = eachFold + +blind.showingHemSize;
    stackSizes.push(bottomPleat);
    console.log("Adding final pleat: " + bottomPleat);

    // Add final hem turnings to array for bottom of blind.
    stackSizes.push(+blind.hemTurnings);
    console.log("Adding hem turnings: " + blind.hemTurnings);

    blind.cutLengthLining = stackSizes.reduce(getSum);
    blind.cutLengthFabInner = (+blind.height) + (+blind.hemTurnings);
    blind.pocketsTotalLength = (blind.pocketsDepth * 2) * blind.stackFolds;
    console.log("Lining total size (+15 turning allowance): " + +blind.cutLengthLining);
    console.log("Fab Inner total size (+15 turning allowance): " + blind.cutLengthFabInner);
    console.log("Total pockets length: " + blind.pocketsTotalLength);
    return stackSizes;
}


/**
 * Get Sum:
 * For summing numbers in arrays.
 * @param total
 * @param num
 * @returns the sum of the two added.
 */
function getSum(total, num) {
    return total + num;
}


/**
 * Initialise image variables:
 * Initialise variables for each grid image for blind drawing, and size each image to fit bounds.
 * */
function initImgVars() {
    /* Calculate how many images needed by width and height. Width is simply the amount of rings,
    double, then plus the initial side image. Height is pockets count, tripled, then plus 3 for
    velcro and bottom pleat. */
    var MAX_WIDTH = 21.6; // size of table on page in cm (page width = 21.6cm)
    var MAX_HEIGHT = 20; // (page height = 27.94cm)
    var MAX_IMG_SIZE = 1.5; // natural image size in cm, to avoid stretching.
    var gridNumWidth = (blind.ringsCount * 2) + 1;
    var gridNumHeight = (blind.stackFolds * 4) + 3;
    console.log("Grid width: " + gridNumWidth); //Debug
    console.log("Grid height: " + gridNumHeight);

    /* Establish the size of grids needed to fit blind in width wise, and with height wise, then
    use then compare against the images default size. Use smallest of the three to prevent image
    stretching. */
    var gridDivWidth = +MAX_WIDTH / +gridNumWidth;
    var gridDivHeight = +MAX_HEIGHT / +gridNumHeight;
    var imageSize = (Math.min(gridDivWidth, gridDivHeight, MAX_IMG_SIZE)).toFixed(2);
    var imageSizeStyle = "style='width: " + imageSize + "cm'";
    var imageSizeStyleDW = "style='width: " + (imageSize * 2) + "cm'";
    console.log("Image size: " + imageSize + "cm"); //Debug

    // Set table width to fix colspans
    /*$("#blindTable").css("width", (imageSize * gridNumWidth) + "cm");*/

    // VELCRO
    window.velcroLEFT = "<img src= images/blind_img/velcro_LEFT_2.png " + imageSizeStyle + ">";
    window.velcroMIDDLE = "<img src=images/blind_img/velcro_MIDDLE_2.png " + imageSizeStyle + ">";
    window.velcroRIGHT = "<img src=images/blind_img/velcro_RIGHT_2.png " + imageSizeStyle + ">";

    // BLANKS
    window.blankLEFT = "<img src=images/blind_img/blank_LEFT_2.png " + imageSizeStyle + ">";
    window.blankMIDDLE = "<img src=images/blind_img/blank_MIDDLE_2.png " + imageSizeStyle + ">";
    window.blankMIDDLEDW = "<img src=images/blind_img/blank_MIDDLE_DW_2.png " + imageSizeStyleDW + ">";
    window.blankRIGHT = "<img src=images/blind_img/blank_RIGHT_2.png " + imageSizeStyle + ">";
    // FOLDS
    window.foldLEFT = "<img src=images/blind_img/fold_LEFT_2.png " + imageSizeStyle + ">";
    window.foldMIDDLE = "<img src=images/blind_img/fold_MIDDLE_2.png " + imageSizeStyle + ">";
    window.foldRIGHT = "<img src=images/blind_img/fold_RIGHT_2.png " + imageSizeStyle + ">";
    // POCKETS
    window.pocketLEFT = "<img src=images/blind_img/pocket_LEFT_2.png " + imageSizeStyle + ">";
    window.pocketMIDDLE = "<img src=images/blind_img/pocket_MIDDLE_2.png " + imageSizeStyle + ">";
    window.pocketRINGSPOT = "<img src=images/blind_img/pocket_RING_SPOT_2.png " + imageSizeStyle + ">";
    window.pocketRIGHT = "<img src=images/blind_img/pocket_RIGHT_2.png " + imageSizeStyle + ">";
    // HEM
    window.hemLEFT = "<img src=images/blind_img/hem_LEFT_2.png " + imageSizeStyle + ">";
    window.hemMIDDLE = "<img src=images/blind_img/hem_MIDDLE_2.png " + imageSizeStyle + ">";
    window.hemRIGHT = "<img src=images/blind_img/hem_RIGHT_2.png " + imageSizeStyle + ">";
}


/**
 * Write measure details:
 * Write cut length details at bottom of drawing.
 */
function writeMeasureDetails() {
    /* Fabric and Inner linings:
    If there is an inner lining, include it with the fabric cut details. Else, don't. */
    if (blind.liningIsInner) {
        $("#fabricMeasures").append("Fabric:" + round1DP(blind.liningInner) + ":" +
            "<ul>" + "<li>" + round1DP(blind.height) + "</li><li>+" + round1DP(blind.hemTurnings) +
            "</li>" + "<li class='cutSum'>" + round1DP(blind.cutLengthFabInner) + " " +
            blind.widthUnit + "</li></ul>");
    } else {
        $("#fabricMeasures").append("Fabric:<ul><li>" + round1DP(blind.height) + "</li><li>+"
            + round1DP(blind.hemTurnings) + "</li><li class='cutSum'>" +
            round1DP(blind.cutLengthFabInner) + " " + blind.widthUnit + "</li></ul>");
    }
    /* Outer Linings: */
    $("#liningMeasures").append("Lining:<ul><li>" + round1DP(blind.cutLengthFabInner) + "</li><li>+"
        + round1DP(blind.pocketsTotalLength) + "</li><li class='cutSum'>" +
        round1DP(+blind.cutLengthFabInner + +blind.pocketsTotalLength) + " " + blind.widthUnit +
        "<span class='cutSumCalc'> (" + round2DP(blind.cutLengthLining) + ")</span></li></ul>");
}


/**
 * Round2PD rounds numbers up to 2 decimal places.
 * @param value to be rounded.
 * @returns {number} rounded.
 */
function round2DP(value) {
    return Math.round((value) * 100) / 100;
}


/**
 * Round1PD rounds numbers up to 1 decimal place.
 * @param value to be rounded.
 * @returns {number} rounded.
 */
function round1DP(value) {
    return Math.round((value) * 10) / 10;
}
