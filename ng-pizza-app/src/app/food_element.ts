export class FoodElement {
    public foodName: string;
    public foodType: string;
    public price: string;
    public description?: string;
    public vegetarian?: number;
    public alcohol?: number;
    public country?: string;
    public personCount?: number;
    public optional_addition?: string;

    constructor(defaultFoodType: string, defaultCounter: string) {
        this.foodName = '',
        this.foodType = defaultFoodType,
        this.price = "0.00",
        this.description = '',
        this.vegetarian = 0,
        this.alcohol = 1,
        this.country = defaultCounter,
        this.personCount = 1,
        this.optional_addition = ''
    }
}
