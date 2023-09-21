export enum TaskStatus {
    IN_PROGRESS = 'in progress',
    DONE = 'done',
    OPENED = 'open',
    FREEZE = 'freeze',
    BLOCKED = 'blocked',
    CLOSED = 'closed',
    WAIT = 'waiting'
}

export enum TaskSortParams {
    GROUP = 'group',
    STATUS = 'status',
}

export enum ItemTypes {
    TASK = 'task'
}

export enum FirebaseDoc {
    STATUS = 'status',
}