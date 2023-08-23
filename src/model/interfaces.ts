import * as React from 'react';

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
    restOfTime: number
    periods: Period[]
    workTime: number
}

export type WorkTimeDb = {
    month: number
    isStarted: boolean
} & { [key: string]: DayWorkTimeDb }

export type FormattedPeriod = {
    month: number
    isStarted?: boolean
} & { [key: number]: DayWorkTimeDb }

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