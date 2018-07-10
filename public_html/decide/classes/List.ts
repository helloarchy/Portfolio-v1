/**
 * List.ts
 * This class defines a single list for containing Fields.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class List {
    private _previousList: List;
    private _nextList: List;
    private readonly _fields: DynamicArray;
    private readonly _parentID: string;
    private readonly _ID: number;
    private static _globalID: number = 0;


    /**
     *
     * @param parentID
     * @param previousList
     */
    constructor(parentID: string, previousList: List = null) {
        this._previousList = previousList;
        this._parentID = parentID;
        this._fields = new DynamicArray();
        this._ID = List._globalID;
        List._globalID++;

        // create HTML
        this.createHTML()
    }


    /**
     *
     */
    private createHTML() {


    }


    /**
     * Delete List and all HTML
     */
    public delete() {
        let parent = document.getElementById(this._parentID);
        let child = document.getElementById("list" + this._ID);
        document.getElementById("list" + this.ID).remove();

    }


    /**
     *
     * @returns {DynamicArray}
     */
    get fields(): DynamicArray {
        return this._fields;
    }


    /**
     * Add an empty field for the user to add their field to.
     */
    public addEmpty() {
        let field: Field = new Field(this);
        this._fields.add(field);
    }


    /**
     * Add an existing field field from another list, ie, a shortlisted field.
     * @param {Field} field
     */
    public addExisting(field: Field) {
        field.transplant(this);
        this._fields.add(field);
    }


    /**
     *
     * @param {Field} field
     */
    public remove(field: Field) {
        this._fields.remove(field);
        field.delete();
    }


    /**
     * Get the lists ID.
     * @returns {number}
     * @constructor
     */
    get ID(): number {
        return this._ID;
    }


    /**
     *
     * @param {List} value
     */
    set nextList(value: List) {
        this._nextList = value;
    }
}