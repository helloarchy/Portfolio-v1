/**
 * Decide.ts
 * This class defines a static class containing the functionality for making a
 * decision from a given list of choices.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class Decide {
    public static choose(choices: string[]) {
        return choices[Math.floor(Math.random() * choices.length)];
    }
}