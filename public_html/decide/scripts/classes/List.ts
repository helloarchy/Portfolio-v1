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
    private _fields: FieldArray;
    private readonly _parentID: string;
    private readonly _ID: number;
    private static _globalID: number = 0;
    private _title: string;
    private _actionBox: ActionBox;

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

        // Check if list is a Reject List before adding add button and action box
        if (this.previousList != null) {
            // Only initial list may have an add button
            if (this.ID === 1) {
                this.makeAddButton(child);
            }
            // Make action box - the box containing the decide button and decision
            this._actionBox = new ActionBox(this);
        }
    }


    /**
     * Make the HTML and Even handlers for the Add empty field button.
     * @param parent
     */
    public makeAddButton(parent) {
        let list = this;

        /* Make add empty field button container */
        let add_container = document.createElement('div');
        add_container.setAttribute('class', 'add-container');
        parent.appendChild(add_container);

        /* Make add empty field button */
        let add_button = document.createElement('button');
        add_button.setAttribute('id', 'add-button');
        add_button.innerHTML = "&plus;";
        add_container.appendChild(add_button);

        /* Attach on click event handler */
        add_button.onclick = function () {
            console.log("List-" + list.ID + " add field button clicked.");
            list.addEmpty();
        }
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

        /* Check if there is a next list and set links accordingly */
        if (this._nextList != null) {
            this.previousList.nextList = this.nextList;
            this.nextList.previousList = this.previousList;
        } else {
            this._previousList.nextList = null;
        }
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
        /* Update displayed buttons and content */
        this._fields.showHideButtons();
        this._actionBox.showHide();
    }


    /**
     * Add an existing field field from another list, ie, a shortlisted field.
     * @param {Field} field
     */
    public addExisting(field: Field) {
        this._fields.add(field);
        field.setParent(this);
        /* Update displayed buttons and content */
        this._fields.showHideButtons();
        this._actionBox.showHide();
    }


    /**
     * Remove a field from this list only, without deleting the field instance.
     * Remove the field from the FieldsArray, if no fields left and list is
     * a shortlist then delete the list as well. Finally, update remaining
     * fields buttons.
     * @param {Field} field
     */
    public remove(field: Field) {
        this._fields.remove(field);
        if (!(this._fields.length() > 0) && this._ID > 1) {
            this.deleteList();
        }
        /* Update displayed buttons and content */
        this._fields.showHideButtons();
        this._actionBox.showHide();
    }


    /**
     * Delete a field completely, including the instance of the field
     * Remove the field from the FieldsArray, if no fields left and list is
     * a shortlist then delete the list as well. Finally, delete the fields
     * HTML and then update remaining fields buttons.
     * @param {Field} field
     */
    public deleteField(field: Field) {
        this._fields.remove(field);
        if (!(this._fields.length() > 0) && this._ID > 1) {
            this.deleteList();
        }
        field.delete();
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
     * @param {List} value
     */
    set previousList(value: List) {
        this._previousList = value;
    }


    /**
     *
     * @returns {List}
     */
    get nextList(): List {
        return this._nextList;
    }
}