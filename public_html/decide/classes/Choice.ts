/**
 * Choice.ts
 * This class defines a single choice for the decider, ie, one of many possible
 * options to choose from when making the
 * decision.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class Choice {
    private _value: string;
    private _decidable: boolean;
    private readonly _ID: number;
    private static globalID: number = 0;
    private _field: Field;

    /**
     *
     */
    constructor(field: Field) {
        this._ID = Choice.globalID;
        Choice.globalID++;
        this._field = field;
    }


    /**
     * Get the choices ID.
     * @returns {number}
     * @constructor
     */
    get ID(): number {
        return this._ID;
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
}