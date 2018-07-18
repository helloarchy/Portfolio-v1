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
    private _decidable_fields: Array<Field>;
    private _X_button;
    private _L_button;
    private _R_button;
    private _banner;
    private _decide_button;
    private _hide_class: string = "hide";

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

        /* Make top buttons div */
        let top_buttons = document.createElement('div');
        top_buttons.setAttribute('class', 'action-box-top-box');
        child.appendChild(top_buttons);

        /* Make reject button */
        this.createButton(this._X_button, top_buttons, "X", "&times;", "reject");
        this._X_button = document.getElementById('list-' + parentID +
            '-action-box-X');
        this._X_button.classList.add('action-box-top-buttons');

        /* Make demote button */
        this.createButton(this._L_button, top_buttons, "L", "&larr;", "demote");
        this._L_button = document.getElementById('list-' + parentID +
            '-action-box-L');
        this._L_button.classList.add('action-box-top-buttons');

        /* Make promote button */
        this.createButton(this._R_button, top_buttons, "R", "&rarr;", "promote");
        this._R_button = document.getElementById('list-' + parentID +
            '-action-box-R');
        this._R_button.classList.add('action-box-top-buttons');

        /* Make banner */
        let banner = document.createElement('div');
        banner.setAttribute('id', 'list-' + parentID +
            '-action-box-banner');
        banner.setAttribute('class', 'action-box-banner');
        child.appendChild(banner);
        this._banner = document.getElementById('list-' + parentID +
            '-action-box-banner');

        /* Make decide button */
        this.createButton(this._decide_button, child, "D", "Decide");
        this._decide_button = document.getElementById('list-' + parentID +
            '-action-box-D');

        /* Attach event listeners */
        this.attachEvents();
    }


    /**
     * Create and apply the HTML for the Actions Boxes buttons.
     * @param param the Action Box classes field for this button
     * @param parent the HTML container to append the button to
     * @param identifier the letter to uniquely identify this button by
     * @param text the symbol or text for the buttons main display
     * @param description the small optional subtitle for some buttons.
     */
    private createButton(param, parent, identifier: string, text: string, description: string = null) {
        param = document.createElement('button');
        param.setAttribute('id', 'list-' + this._parent.ID +
            '-action-box-' + identifier);
        param.setAttribute('class', 'action-box-' +
            identifier + '-button');
        // Add description/subtitle if there is one.
        if (description != null) {
            param.innerHTML = "<span>" + text + "</span><span>" + description + "</span>";
        } else {
            param.innerHTML = "<span>" + text + "</span>";
        }
        parent.appendChild(param);
    }


    /**
     * Attach all event listeners to the fields HTML elements.
     */
    private attachEvents() {
        let actionBox = this;
        // Add X Button click event
        this._X_button.onclick = function () {
            Move.reject(actionBox._decided);
            actionBox.removeBannerStyling();
        };
        /* Add Left button click event */
        this._L_button.onclick = function () {
            Move.demote(actionBox._decided);
            actionBox.removeBannerStyling();
        };
        // Add Right button click event
        this._R_button.onclick = function () {
            Move.promote(actionBox._decided);
            actionBox.removeBannerStyling();
        };
        // Add Decide button click event
        this._decide_button.onclick = function () {
            Decide.choose(actionBox._parent, actionBox);
            actionBox.removeBannerStyling();
        }
    }


    /**
     * Remove the banner list specific styling, ie, green/gold background colour,
     * to give the impression the banner list is hidden while decisions are not
     * being made.
     */
    private removeBannerStyling() {
        // Remove banner styling
        this._banner.classList.remove('decided');
        this._banner.classList.remove('choices');
    }


    /**
     *
     */
    public displayDecision() {
        /* Make the list of banner items, then set the classes for the banner. */
        let banner_list = this.makeBannerList();
        let banner = this._banner;
        banner.classList.remove('decided');
        banner.classList.add('choices');

        /* Iterate through each element in the banner-list one at a time,
        pausing for set interval between each to give the illusion of a banner */
        let decided = this._decided;
        let interval_time = 333; // Milliseconds
        let i = 0; // Interval loop counter
        let display_decision = window.setInterval(function () {
            if (i < banner_list.length) {
                /* Display one of the entries from the banner list */
                banner.classList.remove('decided');
                banner.classList.add('choices');
                banner.innerHTML = banner_list[i].value;
                i++;
            } else {
                /* Display the final decision and exit interval loop */
                banner.classList.remove('choices');
                banner.classList.add('decided');
                banner.innerHTML = decided.value;
                window.clearInterval(display_decision);
            }
        }, interval_time);
        // Prompt user for next course of action.
        this.decisionActionPrompt();
    }


    /**
     *
     * @returns {Array<Field>}
     */
    private makeBannerList() {
        /* Pad out the list depending on how many items there are to iterate
        through. If only a couple, then list through them a couple times with
        a 0.5 second interval. If many, then display each once with a shorter
        interval. Always aiming for a 3-second animation. */
        let length: number = this.decidable_fields.length;
        let banner_list: Array<Field> = [];
        if (length <= 3) { // Show each field three times
            for (let i = 0; i < 3; i++) {
                for (let f of this.decidable_fields) {
                    banner_list.push(f);
                }
            }
        } else if (length <= 6) { // Show each field twice
            for (let j = 0; j < 2; j++) {
                for (let f of this.decidable_fields) {
                    banner_list.push(f);
                }
            }
        } else if (length <= 9) { // Show each field once
            for (let f of this.decidable_fields) {
                banner_list.push(f);
            }
        } else if (length >= 13) { // Show a limited selection of fields
            let skip_n_fields = Math.ceil(length / 9);
            let counter = skip_n_fields;
            for (let f of this.decidable_fields) {
                if (counter < skip_n_fields) {
                    banner_list.push(f);
                    counter++;
                } else {
                    counter = 0;
                }
            }
        }
        return banner_list;
    }


    /**
     * Handle the moving of the chosen field.
     */
    private decisionActionPrompt() {
        /* Decision made, show all buttons depending on which list this is,
        it is already established that a Reject list will never have an
        action box. */
        if (this._parent.previousList.ID === 0) {
            /* This is an initial list, so no left arrow. */
            this._X_button.classList.remove(this._hide_class);
            this._L_button.classList.add(this._hide_class); // Hide
            this._R_button.classList.remove(this._hide_class);
            this._decide_button.classList.remove(this._hide_class);
        } else {
            /* show all */
            this._X_button.classList.remove(this._hide_class); // show all
            this._L_button.classList.remove(this._hide_class);
            this._R_button.classList.remove(this._hide_class);
            this._decide_button.classList.remove(this._hide_class);
        }
    }


    /**
     *
     */
    public showHide() {
        /* If there are at least 2 fields with value, then show decide button,
         * otherwise hide everything. */
        if (Decide.getDecidable(this._parent).length > 1) {
            this._X_button.classList.add(this._hide_class);
            this._L_button.classList.add(this._hide_class);
            this._R_button.classList.add(this._hide_class);
            this._decide_button.classList.remove(this._hide_class); // Show only me
        } else {
            this._X_button.classList.add(this._hide_class); // Hide all
            this._L_button.classList.add(this._hide_class);
            this._R_button.classList.add(this._hide_class);
            this._decide_button.classList.add(this._hide_class);
        }
        /* Hide the banner */
        this._banner.innerHTML = "";
    }


    /**
     *
     * @param {Field} value
     */
    set decided(value: Field) {
        this._decided = value;
    }


    /**
     *
     * @returns {List}
     */
    get decidable_fields(): Array<Field> {
        return this._decidable_fields;
    }


    /**
     *
     * @param fields
     */
    set decidable_fields(fields: Array<Field>) {
        this._decidable_fields = fields;
    }
}