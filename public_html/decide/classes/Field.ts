/**
 * Field.ts
 * This class defines a single field for the decider, ie, one of many possible
 * fields for the user to populate with choices.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class Field {
    private _parent: string;
    private readonly _ID: number;
    private static globalID: number = 0;
    private _value: string;
    private _decidable: boolean;

    /**
     *
     * @param {string} parent
     */
    constructor(parent: string) {
        this._parent = parent;
        this._ID = Field.globalID;
        Field.globalID++;
        this._value = null;
        this._decidable = false;

        // Create html

    }


    /* TODO: FINISH MOVING CHOICE TO ME AND THEN DELETE CHOICE.        /!\      <-------------------          /!\       */


    public hide() {

    }

    public show() {

    }

    public delete() {

    }

    /**
     *
     * @param {string} newParent
     */
    public reparent(newParent: string) {
        // Get current container.
        let thisNode = document.getElementById(this._ID.toString());

        // Move it as a child to new parent.
        document.getElementById(newParent).appendChild(thisNode);

        // Set new parent.
        this._parent = newParent;
    }
}