export class Meal {
    public title: string;
    public author: string;
    public userId: string;
    public createdOn: number;
    public image: string;

    constructor(title: string = '',
    author: string = '',
    userId: string = '',
    createdOn: number = null,
    image: string = '') {
        this.title = title;
        this.author = author;
        this.userId = userId;
        this.createdOn = createdOn;
        this.image = image;
    }
}
