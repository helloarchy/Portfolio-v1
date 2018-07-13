/**
 * DynamicArray.ts
 * This class defines an array abstract data type (ADT) that holds a list of
 * Choice objects. Specific methods implement the means of adding, removing, and
 * expanding the array dynamically. Many functions which aren't supported natively
 * by JavaScripts build in array.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class FieldArray {
    private _fieldArray: Array<Field>;

    /**
     *
     */
    constructor() {
        this._fieldArray = [];
    }


    /**
     *
     * @param field
     */
    public add(field: Field) {
        // if not unique reject!
        if (this._fieldArray === null) {
            this._fieldArray.push(field);
        } else {
            this._fieldArray[this._fieldArray.length] = field;
        }
    }


    /**
     *
     * @returns {Field[]}
     */
    get array(): Array<Field> {
        return this._fieldArray;
    }


    /**
     * Remove a given value from the dynamic array.
     * @param field
     */
    public remove(field: Field) {
        let index: number = 0;
        // Find the choices index in the array, then delete it.
        for (let f of this._fieldArray) {
            if (f.ID === field.ID) {
                this._fieldArray[index] = null;
                this.fixBlanks();
            }
            index++;
        }
    }


    /**
     * Go through all of the fields and evoke their ability to decide which
     * buttons they should be showing.
     */
    public showHideButtons() {
        for (let f of this._fieldArray) {
            f.showHideButtons();
        }
    }


    /**
     * Get rid of any undefined indices in the array, by writing any value
     * found to a new array, and replacing the array with the new once.
     */
    private fixBlanks() {
        let newArray: Array<Field> = [];
        for (let f of this._fieldArray) {
            if (f !== null) {
                newArray.push(f);
            }
        }
        this._fieldArray = newArray;
    }


    /**
     * Get the length of the DynamicArray
     * @returns {number}
     */
    public length() {
        return this._fieldArray.length;
    }
}