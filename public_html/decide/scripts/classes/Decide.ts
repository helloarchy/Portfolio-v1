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
        /* Create a new array with all of the fields which contain a value. */
        let decidableFields: Field[] = null;
        for (let f of list.fields.array) {
            if (f.value != null && f.value != "") {
                decidableFields.push(f);
            }
        }
        /* Choose a random item from the decidable list. */
        let randomIndex = Math.floor(Math.random() * decidableFields.length);
        return decidableFields[randomIndex];
    }
}