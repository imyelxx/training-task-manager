export interface TaskModel {
    id: number;
    name: string;
    description: string;
    status: string;
    completionRate: number;
    created: Date;
    modified: Date;
}