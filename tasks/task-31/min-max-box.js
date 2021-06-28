
module.exports = class MinMaxBox extends HTMLElement {

    static get observedAttributes() {
        return ["min-value", "max-value"];
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        this.onBoxChanges = this.onBoxChanges.bind(this);
        this.onClear = this.onClear.bind(this);

        this.minLabel = this.getAttribute("min-label") || "Min";
        this.maxLabel = this.getAttribute("max-label") || "Max";
        this.minPlaceholder = this.getAttribute("min-placeholder") || "";
        this.maxPlaceholder = this.getAttribute("max-placeholder") || "";
        this.noNegative = !this.hasAttribute("negative-allowed");

        this.render();

        this.minInput = this.shadowRoot.querySelector("input[role=min]");
        this.maxInput = this.shadowRoot.querySelector("input[role=max]");

        if (!this.hasAttribute("no-clear-button"))
            this.clearBtn = this.shadowRoot.querySelector("button");

        this.minInput.value = Number(this.getAttribute("min-value")) || "";
        this.maxInput.value = Number(this.getAttribute("max-value")) || "";

        if (this.clearBtn) this.clearBtn.addEventListener("click", this.onClear);

        // event handling
        this.minInput.addEventListener("change", this.onBoxChanges);
        this.maxInput.addEventListener("change", this.onBoxChanges);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        let input = name === "min-value" ? this.minInput : this.maxInput;
        if (!newValue) input.value = "";
        newValue = Number(newValue);
        if (!isNaN(newValue)) input.value = newValue;
    }

    onBoxChanges(event) {
        event.stopPropagation();
        this.dispatchEvent(
            new CustomEvent("change", { detail: { value: this.value } })
        );
    }

    get value() {
        // TODO: handle error cases better

        let min = this.minInput.value || undefined;
        let max = this.maxInput.value || undefined;

        if (!min && !max) return {};
        else if (min && max && min > max) return {};
        else
            return {min, max};
    }

    set value(val) {
        this.minInput.value = val.min || "";
        this.maxInput.value = val.max || "";
    }

    clear() {
        this.value = { min: "", max: "" };
    }

    onClear() {
        this.clear();
        this.dispatchEvent(
            new CustomEvent("change", { detail: { value: this.value } })
        );
    }

    render() {

        let minExp = this.noNegative ? `min="0"` : ``;

        let specificStyles;

        if (getComputedStyle(this).getPropertyValue("--layout").trim()==="row") {
            specificStyles = `
      
      #main-wr {
        display: flex; 
        align-items: center;
      }
      
      #first-input-wr,
      #second-input-wr {
        margin-right: var(--input-sections-gutter-width, 1rem);
      }
      
      label {
        margin-right: var(--input-label-gutter-width, 0.5rem);
      }
      
      `;
        }
        else { //if (this.style.getPropertyValue("--layout")==="column")
            specificStyles = `
      #first-input-wr,
      #second-input-wr {
        margin-bottom: var(--input-sections-gutter-width, 1rem);
        display: flex;
        align-items: center;
      }
      
      input, label {
        display: block;
      }
      
      label {
        width: 3rem;
      }      
      `;
        }

        this.shadowRoot.innerHTML = `
      <style>
        label {
            font-size: var(--text-font-size, inherit);       
            color: var(--text-color, inherit);
        }
        
        input {
          max-width: var(--input-max-width, 120px);
          padding: 0.6rem;
          border-radius: 0.25rem;
          font-size: var(--input-font-size, inherit);
          border: 1px solid #aaa;
        }
        button {
          color: var(--clear-btn-color, inherit);
          background-color: transparent;
          padding: unset;
          font-size: var(--text-font-size, inherit);
          border: none;          
          cursor: pointer;          
        }
        button:hover {
          color: var(--clear-btn-color-hover, inherit);
        }
        
        ${specificStyles}
        
      </style>

      <article id="main-wr">
        
        <div id="first-input-wr">
            <label>${this.minLabel}</label>
            <input type="number" placeholder="${this.minPlaceholder}" role="min" ${minExp}>
        </div>        
        
        <div id="second-input-wr">
            <label>${this.maxLabel}</label>
            <input type="number" placeholder="${this.maxPlaceholder}" role="max" ${minExp}>                
        </div>
        
        <div>
          <button> Clear </button>            
        </div>
                                
      </article>
    `;
    }
};
