import { ActivityInterface } from './../interfaces/activity';

export class Activity implements ActivityInterface {
    userId: string;
    title: string;
    author: string;
    category: string;
    description: string;
    additionalInfo: string;
    location: string;
    eventDate: string;
    createdOn: number;
    image: any;
    participants: Array<any>;
    comments: Array<string>;

    constructor(
        userdId: string,
        title: string,
        author: string,
        category: string,
        description: string,
        additionalInfo: string,
        location: string,
        eventDate: string,
        createdOn: number,
        image: any,
        participants: Array<any>,
        comments: Array<string>) {
        this.userId = userdId;
        this.title = title;
        this.author = author;
        this.category = category;
        this.description = description;
        this.additionalInfo = additionalInfo;
        this.location = location;
        this.eventDate = eventDate;
        this.createdOn = createdOn;
        this.image = image;
        this.participants = participants;
        this.comments = comments;
    }
}
