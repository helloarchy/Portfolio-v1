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
    private _parent: List;
    private _decided: Field;
    private _X_button;
    private _L_button;
    private _R_button;
    private _banner;
    private _decide_button;

    /**
     *
     * @param {List} parent
     */
    constructor(parent: List) {
        this._parent = parent;
        this.createHTML(); // Create the HTML
    }


    /**
     *
     */
    public createHTML() {
        let parentID = this._parent.ID;
        let parent = document.getElementById('list-' + parentID);
        let child = document.createElement('div');
        child.setAttribute('id', 'list-' + parentID +
            '-action-box');
        child.setAttribute('class', 'action-box');
        parent.appendChild(child);

        /* Make reject button */
        this.createButton(this._X_button, child, "X", "&times;");
        this._X_button = document.getElementById('list-' + parentID +
            '-action-box-X');

        /* If list is a Short List, make demote button */
        if (this._parent.previousList.ID >= 1) {
            this.createButton(this._L_button, child, "L", "&larr;");
            this._L_button = document.getElementById('list-' + parentID +
                '-action-box-L');
        }

        /* Make promote button */
        this.createButton(this._R_button, child, "R", "&rarr;");
        this._R_button = document.getElementById('list-' + parentID +
            '-action-box-R');

        /* Make banner */
        let banner = document.createElement('div');
        banner.setAttribute('id', 'list-' + parentID +
            '-action-box-banner');
        banner.setAttribute('class', 'action-box-banner');
        child.appendChild(banner);
        this._banner = document.getElementById('list-' + parentID +
            '-action-box-banner');

        /* Make decide button */
        this.createButton(this._decide_button, child, "Decide", "Decide");
        this._decide_button = document.getElementById('list-' + parentID +
            '-action-box-Decide');

        /* Attach event listeners */
        this.attachEvents();
    }


    /**
     *
     * @param param
     * @param parent
     * @param identifier
     * @param text
     */
    private createButton(param, parent, identifier: string, text: string) {
        param = document.createElement('button');
        param.setAttribute('id', 'list-' + this._parent.ID +
            '-action-box-' + identifier);
        param.innerHTML = text;
        parent.appendChild(param);
    }


    /**
     * Attach all event listeners to the fields HTML elements.
     */
    private attachEvents() {
        let decided = this._decided;
        let list = this._parent;
        let actionBox = this;

        // Add X Button click event
        this._X_button.onclick = function () {
            console.log("Action-box X button click!");
            Move.reject(decided);
        };
        /* Add Left button click event if there is a left button (list is a
        short list) */
        if (this._parent.previousList.ID >= 1) {
            this._L_button.onclick = function () {
                console.log("Action-box Left button click!");
                Move.demote(decided);
            };
        }
        // Add Right button click event
        this._R_button.onclick = function () {
            console.log("Action-box Right click!");
            Move.promote(decided);
        };
        // Add Decide button click event
        this._decide_button.onclick = function() {
            console.log("Action-box Decide-button click!");
            Decide.choose(list, actionBox);
        }
    }


    /**
     *
     * @param {Field} decided
     */
    public displayDecision(decided: Field) {
        this._decided = decided;

        /* Banner animation */

        /* Prompt user action */
    }


    /**
     * Handle the moving of the chosen field.
     */
    private decisionActionPrompt() {
        /* Decision made, show all buttons */

    }


    /**
     *
     */
    public showHide() {
        /* If less than two fields have values show nothing */

        /* At least two values, but no decision made yet, only show decide button */


    }
}