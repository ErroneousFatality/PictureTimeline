import Picture from "./Picture.js";
export default class PicturePlacement {
    // Properties
    Picture;
    X;
    Y;

    /** 
     * @param {Picture} picture
     * @param {number} x percentage
     * @param {number} y percentage
     * @param {number} width percentage
     */
    constructor(picture, x, y, width) {
        if (picture == null) {
            throw new Error("Picture is missing.");
        }
        this.Picture = picture;

        this.#ValidatePercentage(x, "X");
        this.X = x;

        this.#ValidatePercentage(y, "Y");
        this.Y = y;

        this.#ValidatePercentage(width, "Width");
        this.Width = width;
    }

    // Private methods
    /**
     * 
     * @param {number} percentage
     * @param {string} parameterName
     */
    #ValidatePercentage(percentage, parameterName) {
        if (percentage == null || !Number.isFinite(percentage) || 0 > percentage || percentage > 100) {
            throw new Error(`PicturePlacement for ${this.Picture.Name} has an invalid percentage value for ${parameterName}.`);
        }
    }
}