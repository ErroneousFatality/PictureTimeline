import PicturePlacement from "./PicturePlacement.js";

export default class TimelineSegmentContent {
    // Properties
    PicturePlacements;
    Description;

    /**
     * 
     * @param {PicturePlacement[]} picturePlacements
     * @param {string} [description]
     */
    constructor(picturePlacements, description = null) {
        this.PicturePlacements = picturePlacements;
        this.Description = description;
    }
}