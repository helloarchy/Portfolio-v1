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
     * @param {Field[]} fields
     * @returns {Field} the Choice object at the random index.
     */
    public static choose(fields: Field[]) {

        // TODO: Iterate through list and write decidable fields to new list.


        return fields[Math.floor(Math.random() * fields.length)];
    }


    public static shortlist(initialList: List, shortlist: List, decidedField: Field) {
        initialList.remove(decidedField);
        shortlist.addExisting(decidedField);
    }
}