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
class DynamicArray {
    private _array: any[];

    /**
     *
     */
    constructor() {
        this._array = null;
    }


    /**
     *
     * @param value
     */
    public add(value: any) {
        // if not unique reject!
        this._array[this._array.length] = value;
    }


    /**
     *
     * @returns {any[]}
     */
    get array(): any[] {
        return this._array;
    }


    /**
     * Remove a given value from the dynamic array.
     * @param value
     */
    public remove(value: any) {
        let index: number = 0;
        // Find the choices index in the array, then delete it.
        for (let val of this._array) {
            index++;
            if (val === value) {
                console.log(this._array[index] + " removed!"); // DEBUG

                // TODO: Test for off-by-one error!
                delete this._array[index];

                this.fixBlanks();
            }
        }
    }


    /**
     * Get rid of any undefined indices in the array, by writing any value
     * found to a new array, and replacing the array with the new once.
     */
    private fixBlanks() {
        let newArray: any[] = null;
        for (let val of this._array) {
            newArray[newArray.length] = val;
        }
        this._array = newArray;
    }


    /**
     * Get the length of the DynamicArray
     * @returns {number}
     */
    public length() {
        return this._array.length;
    }
}