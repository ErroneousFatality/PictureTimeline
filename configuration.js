import Constraints from "./constraints.js";
import Picture from "./Models/Picture.js";
import PicturePlacement from "./Models/PicturePlacement.js";
import TimelineSegment from "./Models/TimelineSegment.js";
import TimelineSegmentContent from "./Models/TimelineSegmentContent.js";

/**
 * pictures - lista svih fotografije koje planiras da koristis.
 */
/** @type {Picture[]}*/
export const pictures = [
    new Picture("Sekiro", "https://i.pinimg.com/236x/4e/03/c6/4e03c646553426caa92d3d7dc996282b.jpg", "Opcioni opis fotografije"),
    new Picture("Mob", "https://i.pinimg.com/564x/b1/19/9a/b1199a678e877b10f1d61f13709fb6ec.jpg"),
    new Picture("Mr. Robot", "https://i.pinimg.com/564x/4f/1c/0c/4f1c0c8b827a6d12c6dffa5ff615b370.jpg", "Najbolja serija ikada"),
    new Picture("Zaraki", "https://i.pinimg.com/736x/ab/1c/91/ab1c91932009b859e8603eea842938d3.jpg"),
    new Picture("Alphonse", "https://i.pinimg.com/564x/06/2f/23/062f237f4cd1e8b23aba33e6c47d522b.jpg", ":)"),
    new Picture("Edward", "https://i.pinimg.com/564x/fe/8b/d1/fe8bd11470f34bca0a972066d6e4b4c7.jpg", ":(")
];

/**
 * pictureMap - koristi da lako referenciras postojecu istu fotografiju preko njenog imena unutar segmentConfiguration-a, da ne bi vise puta definisali istu fotografiju.
 */
/** @type {Map<string, Picture>}*/
const pictureMap = new Map();
for (const picture of pictures) {
    pictureMap.set(picture.Name, picture);
}

/**
 * segmentConfiguration - Ovde listas sve segmente tako sto levo stavis od koje tacke [0..100) krece i od kojih fotografija na kojim pozicijama se sastoji.
 */
const segmentConfiguration = {
    10: new TimelineSegmentContent(
        [
            new PicturePlacement(pictureMap.get("Sekiro"), 500, 100)
        ],
        "Opcioni opis segmenta"
    ),
    20: new TimelineSegmentContent(
        [
            new PicturePlacement(pictureMap.get("Zaraki"), 1300, 0)
        ]
    ),
    30: new TimelineSegmentContent(
        [
            new PicturePlacement(pictureMap.get("Zaraki"), 1200, 50),
            new PicturePlacement(pictureMap.get("Mr. Robot"), 900, 300)
        ]
    ),
    40: new TimelineSegmentContent(
        [
            new PicturePlacement(pictureMap.get("Zaraki"), 1100, 100),
            new PicturePlacement(pictureMap.get("Mr. Robot"), 900, 300),
            new PicturePlacement(pictureMap.get("Mob"), 100, 200)
        ],
        "Cela banda na okupu"
    ),
    60: new TimelineSegmentContent(
        [
            new PicturePlacement(pictureMap.get("Zaraki"), 1000, 150),
            new PicturePlacement(pictureMap.get("Mob"), 100, 200)
        ]
    ),
    80: new TimelineSegmentContent(
        [
            new PicturePlacement(pictureMap.get("Zaraki"), 900, 200)
        ]
    ),
    90: new TimelineSegmentContent([]),
    99: new TimelineSegmentContent([
        new PicturePlacement(pictureMap.get("Alphonse"), 0, 0),
        new PicturePlacement(pictureMap.get("Edward"), 600, 100),
        new PicturePlacement(pictureMap.get("Alphonse"), 1150, 0),
        new PicturePlacement(pictureMap.get("Edward"), 100, 850),
        new PicturePlacement(pictureMap.get("Alphonse"), 700, 850),
        new PicturePlacement(pictureMap.get("Edward"), 1300, 850),
    ], "AL!")
}



/** @type {number[]}*/
export const dividers = Object.keys(segmentConfiguration)
    .map(key => {
        const divider = parseInt(key);
        if (divider < Constraints.Beginning || divider >= Constraints.End) {
            throw new Error(`Segment divider must be inside range [${Constraints.Beginning}, ${Constraints.End}).`);
        }
        return divider;
    })
    .sort((a, b) => a - b);

const bounds = dividers.slice();
if (bounds.length === 0 || bounds[0] !== Constraints.Beginning) {
    bounds.unshift(Constraints.Beginning);
    segmentConfiguration[Constraints.Beginning] = new TimelineSegmentContent([]);
}
bounds.push(Constraints.End);

/**@type {TimelineSegment[]} */
const _segments = [];
for (let i = 1; i < bounds.length; i++) {
    const beginning = bounds[i - 1];
    const end = bounds[i];
    const segmentContent = segmentConfiguration[beginning];
    const segment = new TimelineSegment(beginning, end, segmentContent.PicturePlacements, segmentContent.Description);
    _segments.push(segment);
}
export const segments = _segments;