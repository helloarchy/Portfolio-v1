/**
 * List.ts
 * This class defines a single list for containing Choices.
 * @author Robert Hardy
 * @since 2018-07-09
 * Part of the rarh.io project.
 */
class List {
    private _choices: ChoiceArray;
    private _counter: number;
    private _parent: string;


    /**
     *
     * @param {string} parent
     */
    constructor(parent: string) {
        this._choices = new ChoiceArray();
        this._counter = 0;
        this._parent = parent;
    }


    /**
     *
     * @returns {Choice[]}
     */
    get choices(): Choice[] {
        return this._choices.choiceArray;
    }


    /**
     * Add an empty field for the user to add their choice to.
     */
    public addEmpty() {
        this._counter++;
        let choice: Choice = new Choice();
        this._choices.add(choice);

        // Now create the field
        this.addField(choice);

    }


    /**
     * Add an existing choice choice from another list, ie, a shortlisted choice.
     * @param {Choice} choice
     */
    public addExisting(choice: Choice) {
        this._counter++;

        // Now create the field
        this.addField(choice);
    }


    /**
     *
     */
    public addField(choice: Choice) {
        let ID: number = choice.ID;
        /*
        * TODO: Add code for adding html text input, on change update choice value, etc.
        */
    }


    /**
     *
     * @param {Choice} choice
     */
    public remove(choice: Choice) {
        this._counter--;
        this._choices.remove(choice);
    }
}