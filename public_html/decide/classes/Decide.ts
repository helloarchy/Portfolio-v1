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
     * @returns {Field} the Choice object at the random index.
     * @param list
     */
    public static choose(list: List) {
        /* Create a new array with all of the fields which are decidable. */
        let decidableFields: Field[] = null;
        for (let f of list.fields.array ) {
            if (f.decidable) {
                decidableFields.push(f);
            }
        }
        /* Choose a random item from the decidable list. */
        let randomIndex = Math.floor(Math.random() * decidableFields.length);
        return decidableFields[randomIndex];
    }


    /**
     *
     * @param {List} initialList
     * @param {List} shortlist
     * @param {Field} decidedField
     */
    public static shortlist(initialList: List, shortlist: List, decidedField: Field) {
        /* Check if there is an existing shortlist, otherwise create a new one. */
        if (shortlist !== null) {
            shortlist.addExisting(decidedField);
        } else {
            /* Create a new list, set previous and next lists links accordingly,
            and add the field to the new list. */
            let newList: List = new List("grid-for-lists", initialList);
            initialList.nextList = newList;
            newList.addExisting(decidedField);
        }
        /* Remove the fields from its current list. */
        initialList.remove(decidedField);
    }
}