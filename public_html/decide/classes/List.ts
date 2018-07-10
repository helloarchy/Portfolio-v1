/**
 * List.ts
 * This class defines a single list for containing Fields.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class List {
    private _fields: FieldArray;
    private _counter: number;
    private _parent: string;
    private readonly _ID: number;
    private static _globalID: number = 0;


    /**
     *
     * @param {string} parent
     */
    constructor(parent: string) {
        this._fields = new FieldArray();
        this._counter = 0;
        this._parent = parent;
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

    }


    /**
     *
     * @returns {Field[]}
     */
    get fields(): Field[] {
        return this._fields.fieldArray;
    }


    /**
     * Add an empty field for the user to add their field to.
     */
    public addEmpty() {
        this._counter++;
        let field: Field = new Field();
        this._fields.add(field);

        // Now create the field
        this.addField(field);

    }


    /**
     * Add an existing field field from another list, ie, a shortlisted field.
     * @param {Field} field
     */
    public addExisting(field: Field) {
        this._counter++;

        // Now create the field
        this.addField(field);
    }


    /**
     *
     * @param {Field} field
     */
    public remove(field: Field) {
        this._counter--;
        this._fields.remove(field);
    }


    /**
     * Get the lists ID.
     * @returns {number}
     * @constructor
     */
    get ID(): number {
        return this._ID;
    }
}