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
    private X_button;
    private L_button;
    private text_box;
    private R_button;

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

        // Test which buttons should be on display
        this.showHideButtons();
    }


    /**
     *
     */
    public createHTML() {
        /* Create a div with the field ID, and place it inside parent div. */
        let parent = document.getElementById(this._parent.ID.toString());
        let child = document.createElement('div');
        child.setAttribute('id', 'field-' + this._ID);
        parent.appendChild(child);

        /* Place X (reject) button in the div  */
        this.X_button = this.createButton(child, "X", "&times;");
        this.X_button.addEventListener('click', Move.reject(this, this._parent));

        /* Place left (demote (un-shortlist)) arrow button in the div */
        this.L_button = this.createButton(child, "L", "&larr");
        this.L_button.addEventListener('click', Move.demote(this, this._parent));

        /* Place input text box (value field) in the div, set the value if exists */
        this.text_box = document.createElement('input');
        this.text_box.setAttribute('type', 'text');
        this.text_box.addEventListener('onchange', this.valueChange());
        if (this._value !== null || this._value !== "") {
            this.text_box.value = this._value;
        }

        /* Place right arrow (promote (shortlist)) button in the div */
        this.R_button = this.createButton(child, "R", "&rarr");
        this.R_button.addEventListener('click', Move.promote(this, this._parent))
    }


    /**
     *
     * @returns
     */
    private valueChange(): any {
        this._value = this.text_box.value;
    }


    /**
     *
     * @param parent
     * @param {String} letter
     * @param {String} symbol
     */
    private createButton(parent, letter: string, symbol: string) {
        let button = document.createElement('button');
        button.setAttribute('id', 'field-' + this._ID + '-' + letter);
        button.innerHTML = symbol;
        parent.appendChild(button);
        return button;
    }


    /**
     *
     */
    public delete() {
        let parent = document.getElementById('list-' + this._parent.ID.toString());
        let child = document.getElementById('field-' + this._ID.toString());
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
     *
     * @returns {boolean}
     */
    get decidable(): boolean {
        return this._decidable;
    }


    /**
     *
     * @param {boolean} value
     */
    set decidable(value: boolean) {
        this._decidable = value;
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
     * Determine which buttons should be on display for user to click/tap
     */
    private showHideButtons() {

    }
}