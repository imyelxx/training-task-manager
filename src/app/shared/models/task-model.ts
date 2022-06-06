export interface TaskModel {
    id: number;
    name: string;
    description: string;
    status: string;
    completionRate: number;
    created: Date;
    modified: Date;
    tags: ITags[];
}
export interface ITags {
    id: number;
    name: string;
    created: Date;
    modified: Date;
}