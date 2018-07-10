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

    }


    private createHTML() {
        /* Create a div with the field ID, and place it inside parent div. */
        let parent = document.getElementById(this._parent.ID.toString());
        let child = document.createElement('div');
        child.setAttribute('id', 'field-' + this._ID);
        parent.appendChild(child);

        /* Place X (reject) button in the div  */
        this.createButton(child,"X", "&times;");

        /* Place left (demote (un-shortlist)) arrow button in the div */
        this.createButton(child, "L", "&larr");

        /* Place input text box (value field) in the div */
        let text_box = document.createElement('input');
        text_box.setAttribute('type', 'text');

        /* Place right arrow (promote (shortlist)) button in the div */
        this.createButton(child, "R", "&rarr");
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
    }


    /**
     *
     * @param {string} newParent
     */
    public transplant(newParent: List) {
        // Get current container ID and new parent ID.
        let thisNode = document.getElementById(this._ID.toString());
        let newParentID = newParent.ID.toString();

        // Move it as a child to new parent (transplant)
        document.getElementById(newParentID).appendChild(thisNode);

        // Set new parent.
        this._parent = newParent;
    }


    /**
     *
     */
    public hide() {

    }


    /**
     *
     */
    public show() {

    }


    /**
     *
     */
    public delete() {

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
}