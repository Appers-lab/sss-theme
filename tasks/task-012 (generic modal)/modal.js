
const DEFAULT_ZINDEX = 100;

const   S_CLOSE = 1,
        S_CLOSING = 2,
        S_OPEN = 3,
        S_OPENING = 4;


class Modal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.status = S_CLOSE;
    }

    connectedCallback() {

        this.shadowRoot.innerHTML = `
            
            <style>
                #wrapper {                    
                    position:fixed; 
                    width:100%; 
                    height:100%; 
                    top:0; 
                    left:0; 
                    display:flex;
                
                    background-color: var(--bg-color, transparent);
                    align-items: var(--align-y);
                    justify-content: var(--align-x);
                    padding: var(--padding);
                }
                
                .open-animation {                    
                    animation: var(--open-animation);
                }
                
                .close-animation {                    
                    animation: var(--close-animation);
                }
                
                @keyframes slide-in-left {
                    from {
                        left: -100%;                        
                    }
                    to {
                        left: 0;
                    }
                }
                
                @keyframes slide-out-left {
                    from {
                        left: 0;                        
                    }
                    to {
                        left: -100%;
                    }
                }
                
                @keyframes slide-in-right {
                    from {
                        left: 100%;                        
                    }
                    to {
                        left: 0;
                    }
                }
                
                @keyframes slide-out-right {
                    from {
                        left: 0;                        
                    }
                    to {
                        left: 100%;
                    }
                }
                
                @keyframes slide-in-bottom {
                    from {
                        top: 100%;                        
                    }
                    to {
                        left: 0;
                    }
                }
                
                @keyframes slide-out-bottom {
                    from {
                        top: 0;                        
                    }
                    to {
                        top: 100%;
                    }
                }
                
                @keyframes slide-in-top {
                    from {
                        top: -100%;                        
                    }
                    to {
                        left: 0;
                    }
                }
                
                @keyframes slide-out-top {
                    from {
                        top: 0;                        
                    }
                    to {
                        top: -100%;
                    }
                }
                
                @keyframes fade-in {
                    from {
                        opacity:0;
                        transform: translate(0, -50px);                        
                    }
                    to {
                        opacity:1;
                        transform: translate(0, 0);                                    }
                }
                
                @keyframes fade-out {
                    from {
                        opacity:1;
                        transform: translate(0, 0);                    
                    }
                    to {
                        opacity:0;
                        transform: translate(0, -50px);
                    }
                }
                
            </style>

            <div id="wrapper" style="display:none">
                <div>
                    <slot></slot>
                </div>                
            </div>
        `;

        this.wrapper = this.shadowRoot.querySelector("#wrapper");

        this.wrapper.addEventListener("animationend", this.onAnimationEnded.bind(this));
    }

    open(options) {

        // weird case!
        if (this.status !== S_CLOSE)
            return;

        this.status = S_OPENING;

        this.wrapper.style.zIndex = options.zIndex || DEFAULT_ZINDEX;
        this.wrapper.style.display = "";

        if (options.noAnimation)
            this.onAnimationEnded();
        else
            this.wrapper.classList.add("open-animation");
    }

    close(options) {

        // weird case!
        if (this.status !== S_OPEN)
            return;

        this.status = S_CLOSING;

        if (options.noAnimation)
            this.onAnimationEnded();
        else
            this.wrapper.classList.add("close-animation");
    }

    onAnimationEnded() {

        if (this.status === S_OPENING) {
            //console.log("Open animation ended, time to shoot open event");
            this.wrapper.classList.remove("open-animation");
            this.status = S_OPEN;
            this.dispatchEvent(new Event("open"));
        }
        else if (this.status === S_CLOSING) {
            //console.log("Close animation ended, time to shoot close event");
            this.wrapper.classList.remove("close-animation");
            this.wrapper.style.display = "none";
            this.status = S_CLOSE;
            this.dispatchEvent(new Event("close"));
        }
    }
}

customElements.define("mo-dal", Modal);