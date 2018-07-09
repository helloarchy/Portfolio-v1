/**
 * ChoiceArray.ts
 * This class defines an array abstract data type (ADT) that holds a list of
 * Choice objects. Specific methods implement the means of adding, removing, and
 * expanding the array dynamically. Many functions which aren't supported natively
 * by JavaScripts build in array.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class ChoiceArray {
    private choiceArray: Choice[];


    constructor() {
        this.choiceArray = null;
    }

    public add(choice: Choice) {
        // if not unique reject!
        this.choiceArray[this.choiceArray.length] = choice;
    }

    public remove(choice: Choice) {
        let index: number = 0;
        for (let c of this.choiceArray) {
            index++;
            if (c.value === choice.value) {
                delete this.choiceArray[index];
                // TODO: Test for off-by-one error!
            }
        }
    }
}