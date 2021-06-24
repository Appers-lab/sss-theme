class MinMaxBox extends HTMLElement {
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

    let min = this.minInput.value;
    let max = this.maxInput.value;

    if (!min && !max) return {};
    else if (min && max && min > max) return {};
    else
      return {
        min: min ? min : undefined,
        max: max ? max : undefined,
      };
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

    this.shadowRoot.innerHTML = `
      <style>
        label {
          margin-right: 0.5rem;
        }
        .first-input-wr,
        .second-input-wr {
          margin-right: 1rem;
        }
        input {
          max-width: 120px;
          padding: 0.6rem;
          border-radius: 0.25rem;
          font-size: var(--input-font-size);
          border: 1px solid #aaa;
        }
        button {
          color: var(--button-color);
          border: none;
          background-color: inherit;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          color: var(--button-color-hover);
        }
      </style>

      <div style="display: flex; align-items: center">
        <label>${this.minLabel}</label>
        <div class="first-input-wr">
          <input type="number" placeholder="${this.minPlaceholder}" role="min" ${minExp}>
        </div>
        <label>${this.maxLabel}</label>
        <div class="second-input-wr">
          <input type="number" placeholder="${this.maxPlaceholder}" role="max" ${minExp}>                
        </div>
        <div>
          <button> Clear </button>            
        </div>                        
      </div>
    `;
  }
};

customElements.define("min-max-box", MinMaxBox);