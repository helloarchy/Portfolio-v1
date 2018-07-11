/**
 * Move.ts
 * This utility class provides the functionality for moving Fields around the various
 * lists within the Decider.
 * @author Robert Hardy
 * @since 2018-07-10
 * Part of the rarh.io project.
 */
class Move {
    static _rejectList: List;

    /**
     *
     * @param {Field} field
     * @param {List} parent
     * @returns {undefined}
     */
    public static reject(field: Field, parent: List) : any {
        /* If in reject list, then delete, otherwise add to the reject list */
        if (parent.previousList === null) {
            field.delete();
        } else {
            this.transplant(field, parent, this._rejectList);
        }
    }


    public static setReject(rejectList: List) {
        this._rejectList = rejectList;
    }


    /**
     *
     * @param {Field} field
     * @param {List} parent
     * @returns {undefined}
     */
    public static demote(field: Field, parent: List) : any {


    }


    /**
     *
     * @param {Field} field
     * @param {List} parent
     * @returns {undefined}
     */
    public static promote(field: Field, parent: List) : any {

    }


    /**
     *
     * @param {Field} field
     * @param oldList
     * @param newList
     */
    private static transplant(field: Field, oldList: List, newList: List) {
        /* Add the field to the new list */
        newList.addExisting(field);

        console.log("Why am I being fired when you haven't even clicked?!");
        
        /* Move over HTML by re-parenting */
        //let child = document.getElementById('field-' + field.ID.toString());
        //let newParent = "list-" + newList.ID.toString();
        //document.getElementById(newParent).appendChild(child);
        
        /* Update Field parameters */
        //field.setParent(newList);
        
        /* Delete field from old list */
        //oldList.remove(field);
    }
}