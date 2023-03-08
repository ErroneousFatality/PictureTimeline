import Constraints from "../constraints.js";
import PicturePlacement from "./PicturePlacement.js";

export default class TimelineSegment {
    // Properties
    Beginning;
    End;
    PicturePlacements;
    Description;

    /**
     * 
     * @param {number} beginning
     * @param {number} end
     * @param {PicturePlacement[]} picturePlacements
     * @param {string} [description]
     */
    constructor(beginning, end, picturePlacements, description = null) {
        if (beginning >= end) {
            throw new Error("End must be greater than the beginning.");
        }

        if (beginning < Constraints.Beginning) {
            throw new Error(`Beggining must not be lesser than ${Constraints.Beginning}.`);
        }
        this.Beginning = beginning;

        if (end > Constraints.End) {
            throw new Error(`End must not be greater than ${Constraints.End}.`);
        }
        this.End = end;

        this.PicturePlacements = picturePlacements;
        this.Description = description;
    }
}