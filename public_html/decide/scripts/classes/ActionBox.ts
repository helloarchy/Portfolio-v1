/**
 * ActionBox.ts
 * This class defines the action box contained at the base of each List. It holds
 * the decide buttons along with the decision banner animation. Once a decision
 * is made, several choices can be made. This class handles these choices and
 * provides the feedback to the user.
 * @author Robert Hardy
 * @since 2018-07-13
 * Part of the rarh.io project.
 */
class ActionBox {
    private _parent_list: List;
    private _decided_field: Field;
    private _decide_button;
    private _reject_button;
    private _demote_button;
    private _promote_button;
    private _banner;

    /**
     *
     * @param {List} parent_list
     */
    constructor(parent_list: List) {
        this._parent_list = parent_list;
    }

    public createHTML() {

    }

    private addEventHandlers() {

    }
}