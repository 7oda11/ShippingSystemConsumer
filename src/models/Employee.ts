export interface Employee {
    id: number;   
    userName: string;
    password?: string;
    email: string;
    fullName: string;
    branchId: number;
    branchName?: string; 
}