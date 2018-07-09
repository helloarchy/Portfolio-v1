/**
 * List.ts
 * This class defines a single list for containing Choices.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class List {
    private _choices: Choice[];


    constructor(choices: Choice[]) {
        this._choices = choices;
    }

    get choices(): Choice[] {
        return this._choices;
    }


    public add(choice: Choice) {

    }
}