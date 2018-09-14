export interface RecipeInterface {
    title: string;
    author: string;
    userId: string;
    category: string;
    createdOn: number;
    description: string;
    ingradients: any;
    step1: string;
    step2: string;
    step3: string;
    image: string;
    likes: number;
    userLiked: Array<string>;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    prepareTime: number;
    yields: number;
    comments?: any;
}
