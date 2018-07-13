/**
 * Field.ts
 * This class defines a single field for the decider, ie, one of many possible
 * fields for the user to populate with choices.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class Field {
    private _parent: List;
    private readonly _ID: number;
    private static _globalID: number = 0;
    private _value: string;
    private _decidable: boolean;
    private _X_button;
    private _L_button;
    private _text_box;
    private _R_button;

    /**
     *
     * @param {string} parent
     */
    constructor(parent: List) {
        this._parent = parent;
        this._ID = Field._globalID;
        Field._globalID++;
        this._value = null;
        this._decidable = false;

        // Create html
        this.createHTML();
    }


    /**
     * Determine which buttons should be on display for user to click/tap
     */
    public showHideButtons() {
        /* Determine which list this is based on what the previous list is */
        if (this._parent.previousList === null) {
            console.log("Field-" + this.ID + " parent is reject list.");
            /* If in reject list, hide left arrow, show rest */
            this._X_button.classList.remove("hide");
            this._L_button.classList.add("hide");
            this._R_button.classList.remove("hide");
        } else if (this._parent.previousList.ID === 0) {
            console.log("Field-" + this.ID + " parent is initial list.");
            /* Initial list, so hide left arrows and only show right if > 1 field */
            this._X_button.classList.remove("hide");
            this._L_button.classList.add("hide");
            /* Allow shortlisting if there are at least 2 fields */
            console.log("Field length = " + this.parent.fields.length());
            if (this.parent.fields.length() > 1) {
                this._R_button.classList.remove("hide");
            } else {
                this._R_button.classList.add("hide");
            }
        } else if (this._parent.previousList.ID >= 1) {
            console.log("Field-" + this.ID + " parent is a shortlist.");
            /* Short list, show all buttons, but hide right if < 2 fields */
            this._X_button.classList.remove("hide");
            this._L_button.classList.remove("hide");
            if (this.parent.fields.length() > 1) {
                this._R_button.classList.remove("hide");
            } else {
                this._R_button.classList.add("hide");
            }
        }
    }


    /**
     *
     */
    public createHTML() {
        /* Create a div with the field ID, and place it inside parent div. */
        let parent = document.getElementById("list-" +
            this._parent.ID.toString() + "-fields-container");
        let child = document.createElement('div');
        child.setAttribute('id', 'field-' + this._ID);
        child.setAttribute('class', 'field'); // Set the class
        parent.appendChild(child);

        /* Place X (reject) button in the div  */
        this.createButton(this._X_button, child, "X", "&times;");
        this._X_button = document.getElementById('field-' + this._ID + '-X');

        /* Place left (demote (un-shortlist)) arrow button in the div */
        this.createButton(this._L_button, child, "L", "&larr;");
        this._L_button = document.getElementById('field-' + this._ID + '-L');

        /* Place input text box (value field) in the div, set the value if exists */
        this.createTextBox(this._text_box, child);
        this._text_box = document.getElementById('field-' + this._ID + '-text');

        /* Place right arrow (promote (shortlist)) button in the div */
        this.createButton(this._R_button, child, "R", "&rarr;");
        this._R_button = document.getElementById('field-' + this._ID + '-R');

        /* Attach event listeners */
        this.attachEvents();
    }


    /**
     * Create the fields text box html and set the value if the field already
     * has one.
     * @param param
     * @param parent
     */
    private createTextBox(param, parent) {
        /* Place input text box (value field) in the div, set the value if exists */
        param = document.createElement('input');
        param.setAttribute('id', 'field-' + this._ID + '-text');
        param.setAttribute('type', 'text');
        parent.appendChild(param);
        if (this._value !== null || this._value !== "") {
            param = this._value;
        }
    }


    /**
     *
     * @param param
     * @param parent
     * @param {String} letter
     * @param {String} symbol
     */
    private createButton(param, parent, letter: string, symbol: string) {
        param = document.createElement('button');
        param.setAttribute('id', 'field-' + this._ID + '-' + letter);
        param.innerHTML = symbol;
        parent.appendChild(param);
    }


    /**
     * Attach all event listeners to the fields HTML elements.
     */
    private attachEvents() {
        let field = this;

        // Add X Button click event
        this._X_button.onclick = function () {
            console.log("X button on click event fired! Field value = " + field.value);
            Move.reject(field);
        };
        // Add Left button click event
        this._L_button.onclick = function () {
            console.log("Left button on click event fired!");
            Move.demote(field);
        };
        // Add text box value change event
        this._text_box.onchange = function () {
            field.value = field._text_box.value;
            console.log("Text box change event fired! Value = " + field.value);
        };
        // Add Right button click event
        this._R_button.onclick = function () {
            console.log("Right button on click event fired!");
            Move.promote(field);
        };
    }


    /**
     *
     */
    public delete() {
        let parent = document.getElementById('list-' + this._parent.ID.toString() +
            "-fields-container");
        let child = document.getElementById('field-' + this._ID.toString());
        console.log("Field-" + this.ID + " deleting self. list-" + this._parent.ID.toString() +
            " field-" + this._ID.toString());
        parent.removeChild(child);
    }


    /**
     *
     * @returns {string}
     */
    get value(): string {
        return this._value;
    }


    /**
     *
     * @param {string} value
     */
    set value(value: string) {
        this._value = value;
    }


    /**
     * Get the fields ID
     * @returns {number}
     * @constructor
     */
    get ID(): number {
        return this._ID;
    }


    /**
     *
     * Note: named this way because of "lack call signature" bug.
     * @param {List} value
     */
    public setParent(value: List) {
        this._parent = value;
    }


    /**
     *
     * @returns {List}
     */
    get parent(): List {
        return this._parent;
    }


    /**
     *
     * @param {List} value
     */
    set parent(value: List) {
        this._parent = value;
    }
}