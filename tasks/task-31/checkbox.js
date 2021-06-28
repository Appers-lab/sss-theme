
module.exports = class CheckBox extends HTMLElement {

    static get observedAttributes() {
        return ["value"];
    }

    connectedCallback() {

        // Regular checkbox has a box that can be checked, etc. custom checkbox has no box and contains any html content as its inner html. Its set/get text methods cannot be used. The component applies no style/class change to custom checkbox and it it entirely up to the external stylesheet to style it
        this.isRegular = !this.hasAttribute("custom");

        // shadow dom only if it's a regular checkbox
        if (this.isRegular)
            this.attachShadow({ mode: "open" });

        // state of the checkbox
        this.state = !!this.getAttribute("value");

        // event handlers
        this.addEventListener("click", this.toggle.bind(this));

        // initial render
        this.render();

        // element refs
        if (this.isRegular)
            this.article = this.shadowRoot.querySelector("article");

        this.updateClass();
    }

    toggle() {
        this.state = !this.state;
        this.updateClass();
        this.dispatchEvent(
            new CustomEvent("change", { detail: { value: this.state } })
        );
    }

    updateClass() {
        if (this.state) {
            this.classList.add("active");
            this.isRegular && this.article.classList.add("active"); // only if it's a regular checkbox
        } else {
            this.classList.remove("active");
            this.isRegular && this.article.classList.remove("active"); // only if it's a regular checkbox
        }
    }

    render() {

        // custom checkbox has its own html contents, no need to generate/render content for it
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
              border: 1px solid var(--box-border);
            }
            #box > div {
              text-align: center;
              display: none;
              margin-top: -2px;
            }
            
            #wrapper.active > #box {
              background-color: var(--box-background-color-checked);
              border: 1px solid var(--box-border-checked);
            }
            
            #wrapper.active > #box > div {
              display: var(--box-content);
              color: var(--box-color-checked);
            }
            
            #wrapper #label {
                cursor: pointer;
                width: fit-content;
            }        
      </style>

      <article id="wrapper">
      
        <div id="box" part="box">
          <div>&#10003;</div>                
        </div>
        
        <label id="label" part="label"><slot></slot></label>
                        
      </article>
      `;
    }

    get value() {
        return this.state;
    }

    set value(val) {
        this.state = !!val;
        this.updateClass();
    }

    get text() {
        if (this.isRegular) return this.innerText;
        else return undefined;
    }

    set text(val) {
        if (this.isRegular) this.innerHTML = val;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "value") {
            this.state = !!newValue;
            this.updateClass();
        }
    }
};
