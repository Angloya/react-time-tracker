import * as React from 'react';
import { DocumentData } from 'firebase/firestore';
import { TaskStatus, TaskSortParams, ItemTypes } from './enums';

export interface AuthEmailData {
    email: string
    password: string
}

export interface DropdownItem {
    name: string
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
    restOfTime?: number
    periods: Period[]
    workTime?: number
}

export type WorkTimeDb = {
    month: number
    isStarted: boolean
} & DayWorkTimeDb

export interface FormattedPeriod extends DocumentData, DayWorkTimeDb {
    day: number
    month: number
    year: number
    startTime: number,
    isStarted?: boolean
}

export interface FormattedCaledarDay {
    date: number
    fullHour: number
    periods: Period[]
}

export interface FormattedCaledar extends DocumentData {
    [key: number]: {
        [key: number]: {
            [key: number]: FormattedCaledarDay
        }
    }
}

export interface PublicHoliday {
    date: string
    localName: string
    name: string
    countryCode: string
    fixed: boolean
    global: boolean
    counties: string[]
    launchYear: number
    types: string[]
}

export interface CountryInfo {
    countryCode: string
    name: string
}

export interface ReactChildren {
    children: React.ReactNode
}

export interface TabItem {
    name: string
    url?: string
    id: string | number
}

export interface UiTabsProps<TItem> {
    tabClick: (item: TItem) => void
    isNav?: boolean
    list: TItem[]
    selectedTab: TItem
}

export interface TaskItem {
    [TaskSortParams.GROUP]: string
    title: string
    spendTime: number
    fullTime: number
    text?: string
    [TaskSortParams.STATUS]: TaskStatus
    id: number
}

export interface TaskItemWithPosition extends TaskItem {
    position: number
}

export interface TaskDraggableItem {
    index: number
    item: TaskItem
    type: ItemTypes
    currentColumnName: string
}

export interface TaskCollection {
    items: TaskItem[]
    count: number
}

export interface GroupsCollection {
    groups: string[]
}

export interface TaskItemDropResult {
    dropEffect?: string
    name: TaskStatus
    dragIndex: number
    hoverIndex: number
}

export interface ChangeTaskParams {
    dragItem: TaskDraggableItem
    result: TaskItemDropResult
}

export interface FirebaseStatusDoc {
    names: TaskStatus[]
}

export type ChangeTask = (params: ChangeTaskParams) => void
