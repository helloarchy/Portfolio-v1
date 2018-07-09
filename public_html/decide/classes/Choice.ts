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
    private _shortlisted: boolean;

    /**
     *
     * @param {string} value
     */
    constructor(value: string) {
        this._value = value;
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
    get shortlisted(): boolean {
        return this._shortlisted;
    }


    /**
     *
     * @param {boolean} value
     */
    set shortlisted(value: boolean) {
        this._shortlisted = value;
    }
}