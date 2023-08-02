export interface AuthEmailData {
    email: string
    password: string
}

export interface UserResult {
    name: string | null
    email: string | null
    photoURL: string | null
    uid: string
}

export interface Period {
    start?: number
    finish?: number
}

export interface DayWorkTimeDb {
    restOfTime: number
    periods: Period[]
    workTime: number
}

export type WorkTimeDb = {
    month: number
    isStarted: boolean
} & {[key: string]: DayWorkTimeDb}