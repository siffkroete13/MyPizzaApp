export class FoodElement {

    private static foodTypes : string[] = ['vorspeise', 'pizza', 'doener','dueruem', 'pide', 'lahmacun', 'hauptspeise', 'dessert',
    'getraenk', 'teigwaren', 'antipasti'];

    private static countries : string[] = ['turkey','italy'];

    public foodName: string;
    public foodType: string;
    public price: number;
    public description?: string;
    public vegetarian?: number;
    public alcohol?: number;
    public country?: string;
    public personCount?: number;
    public optional_addition?: string;

    constructor() {
        this.foodName = '',
        this.foodType = FoodElement.foodTypes[0],
        this.price = 0,
        this.description = '',
        this.vegetarian = 0,
        this.alcohol = 1,
        this.country = FoodElement.countries[0],
        this.personCount = 1,
        this.optional_addition = ''
    }
}
