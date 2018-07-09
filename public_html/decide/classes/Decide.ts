/**
 * Decide.ts
 * This class defines a static class containing the functionality for making a
 * decision from a given list of choices.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class Decide {
    /**
     * Choose a random choice from a given list of Choice objects.
     * @param {Choice[]} choices
     * @returns {Choice} the Choice object at the random index.
     */
    public static choose(choices: Choice[]) {
        return choices[Math.floor(Math.random() * choices.length)];
    }
}