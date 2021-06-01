
module.exports = class extends HTMLElement {

    static get observedAttributes() { return ["value"]; }

    connectedCallback() {

        this.state = false;

        if (!this.hasAttribute("custom")) {
            this.contentType = "default";
            this.labelText = this.getAttribute("label") || this.innerHTML;
        }
        else {
            this.contentType = "custom";
        }

        this.state = !!this.getAttribute("value");
        this.updateClass();
        this.render();
    }

    toggle() {
        this.state = !this.state;
        this.updateClass();
        this.dispatchEvent(new CustomEvent("change", {detail: {value: this.state}}));
    }

    updateClass() {
        if (this.state)
            this.classList.add("active");
        else
            this.classList.remove("active");
    }

    render() {
        if (this.contentType==="default") {
            this.classList.add("default");
            this.innerHTML = `
            <div class="d-flex align-items-top">
                <div>
                    <div>&#10003;</div>                
                </div>
                
                <label>${this.labelText}</label>                
            </div>
            `;

            this.labelElement = this.querySelector("label");
        }

        this.onclick = this.toggle.bind(this);
    }

    get value() {
        return this.state;
    }

    set value(val) {
        this.state = !!val;
        this.updateClass();
    }

    get text() {
        if (this.contentType==="default")
            return this.labelText;
        else
            return undefined;
    }

    set text(val) {
        if (this.contentType==="default")
            this.labelElement.innerHTML = val;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name==="value") {
            this.state = !!newValue;
            this.updateClass();
        }
    }
};
