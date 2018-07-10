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

        // Test which buttons should be on display
        this.showHideButtons();
    }


    /**
     *
     */
    public createHTML() {
        /* Create a div with the field ID, and place it inside parent div. */
        let parent = document.getElementById("list-" + this._parent.ID.toString());
        /* DEBUG */
        console.log("parent ID = list-" + this._parent.ID.toString());
        let child = document.createElement('div');
        child.setAttribute('id', 'field-' + this._ID);
        parent.appendChild(child);

        /* Place X (reject) button in the div  */
        this.createButton(this._X_button, child,"X", "&times;");
        //this._X_button.addEventListener('click', Move.reject(this, this._parent));
        document.getElementById('field-0-X').addEventListener('click', Move.reject(this, this._parent));

        /* Place left (demote (un-shortlist)) arrow button in the div */
        /*this._L_button = this.createButton(child, "L", "&larr");
        this._L_button.addEventListener('click', Move.demote(this, this._parent));*/

        /* Place input text box (value field) in the div, set the value if exists */
        /*this.text_box = document.createElement('input');
        this._text_box.setAttribute('id', 'field-' + this._ID + '-text');
        this._text_box.setAttribute('type', 'text');
        this._text_box.addEventListener('onchange', this.valueChange());
        if (this._value !== null || this._value !== "") {
            this.text_box.value = this._value;
        }*/

        /* Place right arrow (promote (shortlist)) button in the div */
        /*this._R_button = this.createButton(child, "R", "&rarr");
        this._R_button.addEventListener('click', Move.promote(this, this._parent))*/
    }


    /**
     *
     * @param parent
     * @param {String} letter
     * @param {String} symbol
     */
    private createButton(param, parent, letter: string, symbol: string) {
        param = document.createElement('button');
        param.setAttribute('id', 'field-' + this._ID + '-' + letter);
        param.innerHTML = symbol;
        parent.appendChild(param);
        //return button;
    }


    /**
     *
     * @returns
     */
    private valueChange(): any {
        this._value = this._text_box.value;
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