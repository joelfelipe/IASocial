import { Comment } from "./comment.model";

export class PostCompleto {
    public userId!: number;
    public id!: number;
    public title!: string;
    public body!: string;
    public name!: string;
    public comments: Array<Comment> = [];
}