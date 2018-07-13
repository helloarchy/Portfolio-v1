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
        this.nextList = null;
        this._title = title;
        this._fields = new FieldArray();
        this._ID = List._globalID;
        List._globalID++;

        this.createHTML() // create HTML
    }


    /**
     *
     */
    private createHTML() {
        /* Create a div with the list ID, and place it inside parent div. */
        let parent = document.getElementById(this._parentID);
        let child = document.createElement('div');
        child.setAttribute('id', 'list-' + this._ID);
        child.setAttribute('class', 'list');
        parent.appendChild(child);

        /* Make title */
        this.makeTitle(child);

        /* Make fields container */
        let fields_container = document.createElement('div');
        fields_container.setAttribute('id',
            'list-' + this.ID + '-fields-container');
        child.appendChild(fields_container);

        /* Make bottom buttons box */
        //TODO: MAKE BOTTOM BUTTONS BOX! OWN CLASS?
    }


    /**
     *
     * @param parent
     */
    private makeTitle(parent) {
        /* Make and append containing div */
        let title_box = document.createElement('div');
        title_box.setAttribute('id', 'list-' + this.ID + '-title-box');
        title_box.setAttribute('class', 'list-title-box');
        parent.appendChild(title_box);

        /* Make and append text */
        let title_text = document.createElement('p');
        title_text.setAttribute('id', 'list-' + this.ID + '-title-text');
        title_text.innerHTML = this._title; // Set value to list title
        title_box.appendChild(title_text);
    }


    /**
     * Delete List and all HTML
     */
    public deleteList() {
        // Delete html
        let parent = document.getElementById(this._parentID);
        let child = document.getElementById("list-" + this._ID);
        parent.removeChild(child); // IE friendly
        // Remove self from previous list.
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
        this._fields.add(field);
        this._fields.showHideButtons();
    }


    /**
     * Add an existing field field from another list, ie, a shortlisted field.
     * @param {Field} field
     */
    public addExisting(field: Field) {
        this._fields.add(field);
        this._fields.showHideButtons();
    }


    /**
     *
     * @param {Field} field
     */
    public remove(field: Field) {
        this._fields.remove(field);
        // Delete the list if no fields left and list is a shortlist
        if (!(this._fields.length() > 0) && this._ID >= 2) {
            this.deleteList();
        }
        this._fields.showHideButtons();
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