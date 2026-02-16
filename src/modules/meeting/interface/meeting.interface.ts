export interface IMeeting {
    id: string;
    userId: string; 
    title: string;
    startTime: Date;
    endTime: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date; 
}