export class Job {

    statusColor: string;
    constructor(public title: string, public status: JobStatus, public count: number) {
        this.setStatusColor(status);
    }

    private setStatusColor(status): void {
        switch (status) {
            case JobStatus.NotRun:
                this.statusColor = "";
                break;

            case JobStatus.Success:
                this.statusColor = "green";
                break;

            case JobStatus.Running:
                this.statusColor = "yellow";
                break;

            case JobStatus.Error:
                this.statusColor = "red";
                break;

        }
    }
}

export enum JobStatus { NotRun = 0, Success = 1, Running = 2, Error = 3 };
