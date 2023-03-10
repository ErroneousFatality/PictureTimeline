import Picture from "./Models/Picture.js";
import PicturePlacement from "./Models/PicturePlacement.js";
import TimelineSegmentContent from "./Models/TimelineSegmentContent.js";

export const PictureTag = {
    Student: "Student",
    National: "National"
};

/** @type {Picture[]}*/
export const pictures = [
    new Picture("Sekiro", "https://i.pinimg.com/236x/4e/03/c6/4e03c646553426caa92d3d7dc996282b.jpg", PictureTag.Student, "Opcioni opis fotografije"),
    new Picture("Mob", "https://i.pinimg.com/564x/b1/19/9a/b1199a678e877b10f1d61f13709fb6ec.jpg", PictureTag.National),
    new Picture("Mr. Robot", "https://i.pinimg.com/564x/4f/1c/0c/4f1c0c8b827a6d12c6dffa5ff615b370.jpg", [PictureTag.National, PictureTag.Student], "Najbolja serija ikada"),
    new Picture("Zaraki", "https://i.pinimg.com/736x/ab/1c/91/ab1c91932009b859e8603eea842938d3.jpg", PictureTag.National),
    new Picture("Alphonse", "https://i.pinimg.com/564x/06/2f/23/062f237f4cd1e8b23aba33e6c47d522b.jpg", PictureTag.National, ":)"),
    new Picture("Edward", "https://i.pinimg.com/564x/fe/8b/d1/fe8bd11470f34bca0a972066d6e4b4c7.jpg", PictureTag.Student, ":(")
];

export const AspectRatio = 16 / 9;

/**
 * 
 * @param {Map<string, Picture>} pictureMap
 * @returns {Object.<number, TimelineSegmentContent>}
 */
export function configureSegments(pictureMap) {
    return {
        10: new TimelineSegmentContent(
            [
                new PicturePlacement(pictureMap.get("Sekiro"), 20, 8, 20)
            ],
            "Opcioni opis segmenta"
        ),
        20: new TimelineSegmentContent(
            [
                new PicturePlacement(pictureMap.get("Zaraki"), 60, 0, 20)
            ]
        ),
        30: new TimelineSegmentContent(
            [
                new PicturePlacement(pictureMap.get("Zaraki"), 55, 1, 30),
                new PicturePlacement(pictureMap.get("Mr. Robot"), 40, 5, 30)
            ]
        ),
        40: new TimelineSegmentContent(
            [
                new PicturePlacement(pictureMap.get("Zaraki"), 65, 10, 10),
                new PicturePlacement(pictureMap.get("Mr. Robot"), 40, 30, 15),
                new PicturePlacement(pictureMap.get("Mob"), 5, 20, 30)
            ],
            "Cela banda na okupu"
        ),
        60: new TimelineSegmentContent(
            [
                new PicturePlacement(pictureMap.get("Zaraki"), 45, 15, 50),
                new PicturePlacement(pictureMap.get("Mob"), 5, 20, 30)
            ]
        ),
        80: new TimelineSegmentContent(
            [
                new PicturePlacement(pictureMap.get("Zaraki"), 40, 20, 60)
            ]
        ),
        90: new TimelineSegmentContent([]),
        99: new TimelineSegmentContent(
            [
                new PicturePlacement(pictureMap.get("Alphonse"), 0, 0, 33),
                new PicturePlacement(pictureMap.get("Edward"), 28, 10, 33),
                new PicturePlacement(pictureMap.get("Alphonse"), 45, 0, 33),
                new PicturePlacement(pictureMap.get("Edward"), 5, 85, 33),
                new PicturePlacement(pictureMap.get("Alphonse"), 35, 85, 33),
                new PicturePlacement(pictureMap.get("Edward"), 65, 85, 33),
            ],
            "AL!"
        )
    };
}