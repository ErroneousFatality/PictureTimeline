import Picture from "./Picture.js";
export default class PicturePlacement {
    // Properties
    Picture;
    X;
    Y;

    /** 
     * @param {Picture} picture
     * @param {number} x
     * @param {number} y
     */
    constructor(picture, x, y) {
        if (picture == null) {
            throw new Error("Picture is missing.");
        }
        this.Picture = picture;

        if (x == null || !Number.isInteger(x) || x < 0) {
            throw new Error("X must be a natural number.");
        }
        this.X = x;

        if (y == null || !Number.isInteger(y) || y < 0) {
            throw new Error("Y must be a natural number.");
        }
        this.Y = y;
    }
}