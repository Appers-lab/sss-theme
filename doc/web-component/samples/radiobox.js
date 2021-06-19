
// generator function that creates two classes RadioBox and RadioBoxGroup. These classes will use the closure of this function to communicate with each other.

function controller() {

    /**
     * group name => {groupElement, elements:[]}
     * @type {{}}
     */
    const radioboxes = {}

    function addRadiobox(el) {
        let group = el.group;
        if (!group) return;
        if (!radioboxes[group]) radioboxes[group] = {};
        let gObj = radioboxes[group];

        if (!gObj.elements) gObj.elements = [];

        gObj.elements.push(el);

        if (gObj.groupElement && gObj.groupElement.value === el.value)
            el.checked = true;
    }

    function addRadioboxGroup(el) {

        let group = el.name;
        if (!group) return;
        if (!radioboxes[group]) radioboxes[group] = {};
        let gObj = radioboxes[group];

        gObj.groupElement = el;
    }

    function setRadioboxGroupValue(group, value) {

        let gObj = radioboxes[group];
        //console.log("inside set rgv", gObj);
        if (!gObj || !gObj.elements) return;

        gObj.elements.forEach(box => box.checked = (box.value === value));
        gObj.groupElement.value = value;
    }

    function unsetRadioboxGroup(group, clickedRadio) {
        let gObj = radioboxes[group];
        if (!gObj || !gObj.groupElement || !gObj.groupElement.emptyAllowed) return;
        if (!clickedRadio.emptyAllowed) return;
        setRadioboxGroupValue(group, "");
    }

    // the radio group element: to be called "radio-box-group"
    const RadioBoxGroup = class extends HTMLElement {

        connectedCallback() {

            this._value = this.getAttribute("value") || "";
            this.name = this.getAttribute("name");
            this.emptyAllowed = !this.hasAttribute("no-empty");

            addRadioboxGroup(this);
            setRadioboxGroupValue(this.name, this._value);
        }

        // TODO: remove callback

        get value() {
            return this._value;
        }

        set value(val) {
            let emitChange = (this._value !== val);
            this._value = val;
            if (emitChange)
                this.dispatchEvent(new CustomEvent("change", {detail: {value: val}}));
        }
    };


    // the radio box element: to be called "radio-box"
    const RadioBox = class extends HTMLElement {

        connectedCallback() {

            this.state = false;

            this.emptyAllowed = !this.hasAttribute("no-empty");

            if (!this.hasAttribute("custom")) {
                this.contentType = "default";
                this.labelText = this.getAttribute("label") || this.innerHTML;
            } else {
                this.contentType = "custom";
            }

            this.value = this.getAttribute("value") || "1";
            this.group = this.getAttribute("group") || "default";

            addRadiobox(this);
            this.updateClass();
            this.render();
        }

        // TODO: remove callback

        toggle() {
            if (this.state)
                unsetRadioboxGroup(this.group, this);
            else
                setRadioboxGroupValue(this.group, this.value);
        }

        updateClass() {
            if (this.state)
                this.classList.add("active");
            else
                this.classList.remove("active");
        }

        render() {
            if (this.contentType === "default") {
                this.classList.add("default");
                this.innerHTML = `
                    <div class="d-flex align-items-top">
                        <div>
                            <div>&#10687;</div>                
                        </div>                        
                        <label>${this.labelText}</label>                
                    </div>
                `;
                this.labelElement = this.querySelector("label");
            }
            this.onclick = this.toggle.bind(this);
        }

        get checked() {
            return this.state;
        }

        set checked(val) {
            this.state = !!val;
            this.updateClass();
        }

        get text() {
            if (this.contentType === "default")
                return this.labelText;
            else
                return undefined;
        }

        set text(val) {
            if (this.contentType === "default")
                this.labelElement.innerHTML = val;
        }
    };

    return {
        RadioBoxGroup,
        RadioBox
    }
}

module.exports = controller;
