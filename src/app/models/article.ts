export class Article {
    public title: string;
    public author: string;
    public userId: string;
    public createdOn: number;
    public description: string;
    public image: any;

    constructor(title: string = '',
    author: string = '',
    userId: string = '',
    createdOn: number = null,
    description: string = '',
    image: any = null) {
        this.title = title;
        this.author = author;
        this.userId = userId;
        this.createdOn = createdOn;
        this.description = description;
        this.image = image;
    }
}

