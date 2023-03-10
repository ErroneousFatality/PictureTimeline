import { css, FASTElement, html, Observable, repeat } from "https://cdn.jsdelivr.net/npm/@microsoft/fast-element@1.11.0/dist/fast-element.min.js";
import { configureSegments, pictures } from "./configuration.js";
import Constraints from "./constraints.js";
import TimelineSegment from "./Models/TimelineSegment.js";
import TimelineSegmentContent from "./Models/TimelineSegmentContent.js";

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
        ${repeat(timeline => timeline.Dividers, html`
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

    ${repeat(timeline => timeline.Pictures, html`
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

    /** @returns {Picture[]} */
    get Pictures() { return this.#Pictures; }
    /** @returns {number[]} */
    get Dividers() { return this.#Dividers; }
    /** @returns {TimelineSegment} */
    get Segment() { Observable.track(this, "Segment"); return this.#Segment; }

    // Fields

    /** @type {Picture[]} */
    #Pictures;
    /** @type {number[]} */
    #Dividers;
    /** @type {TimelineSegment[]}*/
    #Segments;
    /** @type {TimelineSegment} */
    #Segment;
    
    constructor() {
        super();
        this.#Initialize();
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

    // Private methods
    #Initialize() {
        this.#Pictures = pictures;
        
        /** @type {Map<string, Picture>}*/
        const pictureMap = new Map();
        for (const picture of pictures) {
            pictureMap.set(picture.Name, picture);
        }
        const segmentConfiguration = configureSegments(pictureMap);

        const dividers = Object.keys(segmentConfiguration)
            .map(key => {
                const divider = parseInt(key);
                if (divider < Constraints.Beginning || divider >= Constraints.End) {
                    throw new Error(`Segment divider must be inside range [${Constraints.Beginning}, ${Constraints.End}).`);
                }
                return divider;
            })
            .sort((a, b) => a - b);
        this.#Dividers = dividers;

        const bounds = this.#Dividers.slice();
        if (bounds.length === 0 || bounds[0] !== Constraints.Beginning) {
            bounds.unshift(Constraints.Beginning);
            segmentConfiguration[Constraints.Beginning] = new TimelineSegmentContent([]);
        }
        bounds.push(Constraints.End);

        /**@type {TimelineSegment[]} */
        const segments = [];
        for (let i = 1; i < bounds.length; i++) {
            const beginning = bounds[i - 1];
            const end = bounds[i];
            const segmentContent = segmentConfiguration[beginning];
            const segment = new TimelineSegment(beginning, end, segmentContent.PicturePlacements, segmentContent.Description);
            segments.push(segment);
        }
        this.#Segments = segments;
    }

    /** @param {number} position */
    #SetSegment(position) {
        this.#Segment = position == Constraints.End
            ? this.#Segments[segments.length - 1]
            : this.#Segments.find(segment => segment.Beginning <= position && position < segment.End);
        Observable.notify(this, "Segment");
    }
}
FASTElement.define(PictureTimeline);