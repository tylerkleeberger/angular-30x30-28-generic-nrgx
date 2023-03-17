import { SecondaryModel } from "../shared/secondary.model";

export class PrimaryModel {
    public name: string;
    public description: string;
    public secondaryItems: SecondaryModel[];

    constructor(
        name: string,
        desc: string,
        secondaryItems: SecondaryModel[]
    ) {
        this.name = name;
        this.description = desc;
        this.secondaryItems = secondaryItems;
    }
}
