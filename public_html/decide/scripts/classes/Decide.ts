/**
 * Decide.ts
 * This class defines a static class containing the functionality for making a
 * decision from a given list of fields.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class Decide {
    /**
     * Choose a random choice from a given list of Field objects.
     * @param list
     * @param actionBox
     */
    public static choose(list: List, actionBox: ActionBox) {
        /* Clear any blank fields */
        let decidableFields = this.getDecidable(list);

        /* Choose a random item from the decidable list. */
        let randomIndex = Math.floor(Math.random() * decidableFields.length);
        let decided = decidableFields[randomIndex];

        /* Find field in original list */
        console.log("Decide: chosen field is " + decided.value);
        actionBox.decided = decided;
        actionBox.displayDecision();
    }


    /**
     * Remove any blank entries
     * @param {List} list
     * @returns {Array<Field>}
     */
    public static getDecidable(list: List) {
        /* Create a new array with all of the fields which contain a value. */
        let decidableFields: Array<Field> = [];
        for (let f of list.fields.array) {
            if (f.value != null && f.value != "") {
                decidableFields.push(f);
            }
        }
        return decidableFields;
    }
}