export default class Picture {
    // Properties
    Name;
    Source;
    /** @type {string[]} */
    Tags;
    Description;

    /** 
     * @param {string} name
     * @param {string} source
     * @param {string | string[]} tags
     * @param {string} [description]
     */
    constructor(name, source, tags, description = null) {
        if (name == null || name.length < 1) {
            throw new Error("Picture name is missing.");
        }
        this.Name = name;

        if (source == null || source.length < 1) {
            throw new Error(`Picture "${this.Name}": Source is missing.`);
        }
        this.Source = source;

        if (tags == null || tags.length < 1) {
            throw new Error(`Picture "${this.Name}": tags are missing.`);
        }
        this.Tags = typeof tags === "string"
            ? [tags]
            : tags;
        this.Description = description;
    }
}