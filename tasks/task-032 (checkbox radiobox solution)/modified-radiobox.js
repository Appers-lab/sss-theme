
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

class RadioBoxGroup extends HTMLElement {

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

class RadioBox extends HTMLElement {

    connectedCallback() {

        this.isRegular = !this.hasAttribute("custom");

        // shadow dom only if it's a regular radiobox
        if (this.isRegular)
            this.attachShadow({ mode: "open" });

        // state of the checkbox
        this.state = false; //!!this.getAttribute("value");

        // event handlers
        this.addEventListener("click", this.toggle.bind(this));

        this.emptyAllowed = !this.hasAttribute("no-empty");

        this.value = this.getAttribute("value") || "1";
        this.group = this.getAttribute("group") || "default";

        addRadiobox(this);

        this.render();

        if (this.isRegular)
            this.article = this.shadowRoot.querySelector("article");

        this.updateClass();
    }

    // TODO: remove callback

    toggle() {
        if (this.state)
            unsetRadioboxGroup(this.group, this);
        else
            setRadioboxGroupValue(this.group, this.value);
    }

    updateClass() {
        if (this.state) {
            this.classList.add("active");
            this.isRegular && this.article.classList.add("active");
        }
        else {
            this.classList.remove("active");
            this.isRegular && this.article.classList.remove("active");
        }
    }

    render() {

        // custom radiobox has its own html contents, no need to generate/render content for it
        if (!this.isRegular) return;

        this.shadowRoot.innerHTML = `
        <style>
            #wrapper {
                display: flex; 
                align-items: flex-start;
                cursor: pointer;
            }   
            
            #box {
                width: 1.25rem;
                height: 1.25rem;
                margin-right: var(--gutter-width);
                border: var(--box-border);
                border-radius: 50%;                 
                color: var(--box-color-checked); 
            }

            #box:hover {
                border: var(--box-border-checked)
            }
            
            #box > svg {      
                display: none;
                width: 100%;
                height: 100%;          
            }
            
            #wrapper.active > #box {
                background-color: var(--box-background-color-checked);
                border: var(--box-border-checked)
            }
            
            #wrapper.active > #box > svg {
                display: block;                  
            }
            
            #wrapper #label {
                cursor: pointer;
                width: fit-content;
            }
        </style>

        <article id="wrapper">
        
        <div id="box" part="box">
            <svg viewBox="0 0 10 10" preserveAspectRatio="xMinYMin meet"><circle r="3" cx="50%" cy="50%" fill="currentColor"/></svg>
        </div>
        
        <label id="label" part="label"><slot></slot></label>
                        
        </article>
        `;
    }

    get checked() {
        return this.state;
    }

    set checked(val) {
        this.state = !!val;
        this.updateClass();
    }

    get text() {
        if (this.isRegular)
            return this.innerText;
        else
            return undefined;
    }

    set text(val) {
        if (this.isRegular)
            this.innerHTML = val;
    }
};

customElements.define("radio-box", RadioBox);
customElements.define("radio-box-group", RadioBoxGroup);