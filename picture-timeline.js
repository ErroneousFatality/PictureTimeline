import { css, FASTElement, html, Observable, repeat } from "https://cdn.jsdelivr.net/npm/@microsoft/fast-element@1.11.0/dist/fast-element.min.js";
import Constraints from "./constraints.js";
import { dividers, pictures, segments } from "./configuration.js";
import TimelineSegment from "./Models/TimelineSegment.js";

const template = html`
<div id="container">
    <input type="range" id="slider"
        min="${Constraints.Beginning}" 
        max="${Constraints.End}" 
        step="${Constraints.Step}" 
        value="${Constraints.Beginning}" 
        list="markers"
    >
    <datalist id="markers">
        ${repeat(_ => dividers, html`
            <option value="${divider => divider}"></option>
        `)}
    </datalist>

    ${repeat(timeline => timeline.Segment.PicturePlacements, html`
        <img class="picture"
            src="${picturePlacement => picturePlacement.Picture.Source}" 
            alt="${picturePlacement => picturePlacement.Picture.Name}"
            style="left: ${picturePlacement => picturePlacement.X}%; top: ${picturePlacement => picturePlacement.Y}%;"
        >
    `)}

    ${repeat(_ => pictures, html`
        <link rel="prefetch" href="${picture => picture.Source}" />
    `)}
</div>
`;
const styles = css`
#container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
#slider {
    position: absolute;
    width: 50%;
    top: 62.5%;
    left: 25%;
    z-index: 100;
    accent-color: brown;
}
.picture {
    position: absolute;
    z-index: 10;
}
`;

export class PictureTimeline extends FASTElement {
    static definition = {
        name: 'picture-timeline',
        template,
        styles,
        attributes: [
            //{ property: "TemporalPictures", attribute: "temporal-pictures", mode: "fromView", converter: jsonConverter }
        ]
    };

    // Properties
    get Segment() {
        Observable.track(this, "Segment");
        return this.#Segment;
    }

    constructor() {
        super();
        this.#SetSegment(Constraints.Beginning);
    }

    // Framework methods
    connectedCallback() {
        super.connectedCallback();
        this.shadowRoot.getElementById("slider").addEventListener("input", (event) => {
            const position = event.target.value;
            this.#SetSegment(position);
        });
    }

    // Private properties
    /**@type {TimelineSegment} */
    #Segment;

    // Private methods

    /** @param {number} position */
    #SetSegment(position) {
        this.#Segment = position == Constraints.End
            ? segments[segments.length - 1]
            : segments.find(segment => segment.Beginning <= position && position < segment.End);
        Observable.notify(this, "Segment");
    }
}
FASTElement.define(PictureTimeline);