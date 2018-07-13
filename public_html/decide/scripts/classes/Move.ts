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
    private static _listContainer: string;

    /**
     *
     * @param {Field} field
     * @param {List} parent
     * @returns {undefined}
     */
    public static reject(field: Field): any {
        let parent = field.parent;
        /* If in reject list, then delete, otherwise add to the reject list */
        if (parent.previousList === null) {
            field.delete();
        } else {
            this.transplant(field, parent, this._rejectList);
        }
    }


    /**
     *
     * @param {Field} field
     * @returns {undefined}
     */
    public static demote(field: Field): any {
        let parent = field.parent;
        let newParent = field.parent.previousList;
        this.transplant(field, parent, newParent);
    }


    /**
     *
     * @param {Field} field
     * @returns {undefined}
     */
    public static promote(field: Field): any {
        let parent = field.parent;
        /* Create shortlist if one doesn't exist */
        if (parent.nextList === null) {
            let newList = new List(this._listContainer, parent, "Short List");
            this.transplant(field, parent, newList);
        } else {
            this.transplant(field, parent, parent.nextList);
        }

    }


    /**
     *
     * @param {Field} field
     * @param oldList
     * @param newList
     */
    private static transplant(field: Field, oldList: List, newList: List) {
        let field_copy = field;
        // TODO: DEBUG
        console.log("Move: Transplanting field-" + field.ID +
            " from list-" + oldList.ID +
            " to list-" + newList.ID);

        /* Add the field to the new list */
        newList.addExisting(field_copy);

        /* Move over HTML by re-parenting */
        let child = document.getElementById('field-' + field_copy.ID.toString());
        let newParent = "list-" + newList.ID.toString();
        document.getElementById(newParent).appendChild(child);

        /* Update Field parameters */
        field_copy.setParent(newList);

        /* Delete field from old list */
        oldList.remove(field);
    }


    /**
     *
     * @param {List} rejectList
     */
    public static setReject(rejectList: List) {
        this._rejectList = rejectList;
    }


    /**
     *
     * @param {string} value
     */
    static set listContainer(value: string) {
        this._listContainer = value;
    }
}