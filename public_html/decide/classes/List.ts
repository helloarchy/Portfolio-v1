/**
 * List.ts
 * This class defines a single list for containing Fields.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class List {
    private readonly _previousList: List;
    private _nextList: List;
    private _fields: FieldArray;
    private readonly _parentID: string;
    private readonly _ID: number;
    private static _globalID: number = 0;
    private _title: string;

    /**
     *
     * @param parentID
     * @param previousList
     * @param title
     */
    constructor(parentID: string, previousList: List = null, title: string) {
        this._parentID = parentID;
        this._previousList = previousList;
        this._title = title;
        this._fields = new FieldArray();
        this._ID = List._globalID;
        List._globalID++;

        // create HTML
        this.createHTML()
    }


    /**
     *
     */
    private createHTML() {
        /* Create a div with the list ID, and place it inside parent div. */
        let parent = document.getElementById(this._parentID);
        let child = document.createElement('div');
        child.setAttribute('id', 'list-' + this._ID);
        parent.appendChild(child);

    }


    /**
     * Delete List and all HTML
     */
    public deleteList() {
        // Delete html
        let parent = document.getElementById(this._parentID);
        let child = document.getElementById("list-" + this._ID);
        parent.removeChild(child); // IE friendly

        // Remove self from previous list. (Cannot be called if a next List exists)
        this._previousList.nextList = null;
    }


    /**
     *
     * @returns {FieldArray}
     */
    get fields(): FieldArray {
        return this._fields;
    }


    /**
     * Add an empty field for the user to add their field to.
     */
    public addEmpty() {
        let field: Field = new Field(this);

        console.log("List-" + this.ID + " adding empty field-" + field.ID);
        console.log("List-" + this.ID + " fields count = " + this._fields.length());

        this._fields.add(field);

        console.log("List-" + this.ID + " fields count = " + this._fields.length());
    }


    /**
     * Add an existing field field from another list, ie, a shortlisted field.
     * @param {Field} field
     */
    public addExisting(field: Field) {
        // TODO: DEBUG
        console.log("List-" + this.ID + " adding existing field-" + field.ID);
        console.log("List-" + this.ID + " fields count = " + this._fields.length());

        this._fields.add(field);

        console.log("List-" + this.ID + " fields count = " + this._fields.length());
    }


    /**
     *
     * @param {Field} field
     */
    public remove(field: Field) {
        // TODO DEBUG
        console.log("List-" + this.ID + " removing field-" + field.ID);
        console.log("List-" + this.ID + " fields count = " + this._fields.length());

        this._fields.remove(field);
        // Delete the list if no fields left.
        if (!(this._fields.length() > 0)) {
            this.deleteList();
        }

        console.log("List-" + this.ID + " fields count = " + this._fields.length());
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


    /**
     *
     * @returns {List}
     */
    get previousList(): List {
        return this._previousList;
    }


    /**
     *
     * @returns {List}
     */
    get nextList(): List {
        return this._nextList;
    }
}