import iStep from "./iStep";
import iComment from "./iComment";
import iUser from "./iUser";

export default interface iProject {
    id?: number;
    destination: string;
    exchangeType: string;
    status?: string;
    steps: iStep[];
    comments: iComment[];
    User: iUser;
    createdAt?: Date,
    updatedAt?: Date,
    budget?: number;
    img?: string;
    averageGrade?: number;
    quantComments?: number;
    quantSteps?: number;
    selected?: boolean;
}