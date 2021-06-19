class CheckBox extends HTMLElement {
  static get observedAttributes() {
    return ["value"];
  }

  // componentDidMount()
  connectedCallback() {
    this.state = false;

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    if (!this.hasAttribute("custom")) {
      this.contentType = "default";
      this.labelText = this.getAttribute("label") || this.innerHTML;
    } else {
      this.contentType = "custom";
    }

    this.state = !!this.getAttribute("value");
    this.updateClass();
    this.render();
  }

  toggle() {
    this.state = !this.state;
    this.updateClass();
    this.dispatchEvent(
      new CustomEvent("change", { detail: { value: this.state } })
    );
  }

  updateClass() {
    if (this.state) this.classList.add("active");
    else this.classList.remove("active");

    console.log(this.classList.contains('active'))
  }

  render() {
    if (this.contentType === "default") {
      this.classList.add("default");
      this.shadowRoot.innerHTML = `
        <style>
          .s-check-box {
            width: 1.25rem;
            height: 1.25rem;
            margin-right: var(--gutter-width);
            border: 1px solid var(--box-border);
          }
          .s-check-box > div {
            text-align: center;
            display: none;
            margin-top: -2px;
          }
          label {
            cursor: pointer;
          }
        </style>

        <div style="display: flex; align-items: flex-start;">
          <div class="s-check-box">
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
    if (this.contentType === "default") return this.labelText;
    else return undefined;
  }

  set text(val) {
    if (this.contentType === "default") this.labelElement.innerHTML = val;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value") {
      this.state = !!newValue;
      this.updateClass();
    }
  }
}

customElements.define("check-box", CheckBox);


// Create some CSS to apply to the shadow dom
    // const style = document.createElement('style');
    // if (this.classList.contains('active') == true ) {
      
    //   style.textContent = `
    //     .s-check-box {
    //       background-color: var(--box-background-color-checked);
    //       border: 1px solid var(--box-border-checked);
    //     }
    //     .s-check-box > div {
    //       display: var(--box-content);
    //       color: var(--box-color-checked);
    //     }
    //   `;

    // }
    // this.shadowRoot.appendChild(style);