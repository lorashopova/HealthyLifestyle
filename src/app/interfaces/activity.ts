export interface ActivityInterface {
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
}
