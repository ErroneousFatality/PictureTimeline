export default class Picture {
    // Properties
    Name;
    Source;
    Description;

    /** 
     * @param {string} name
     * @param {string} source
     * @param {string} [description]
     */
    constructor(name, source, description = null) {
        if (name == null || name.length < 1) {
            throw new Error("Name is missing.");
        }
        this.Name = name;

        if (source == null || source.length < 1) {
            throw new Error("Source is missing.");
        }
        this.Source = source;


        this.Description = description;
    }
}