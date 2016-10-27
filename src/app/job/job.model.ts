export class Job {
    constructor(
        public title: string,
        public status: JobStatus, 
        public count: number, 
        public lastRuntime: string, 
        public duration: string,
        public output: string) {
    }

    copy(job:Job):void{
        this.title =job.title;
        this.status = job.status;
        this.count = job.count;
        this.lastRuntime = job.lastRuntime;
        this.duration = job.duration;
        this.output = job.output;
    }

}

export enum JobStatus { NotRun = 0, Success = 1, Running = 2, Failed = 3, Stopped = 4 };
