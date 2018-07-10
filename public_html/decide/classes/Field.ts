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