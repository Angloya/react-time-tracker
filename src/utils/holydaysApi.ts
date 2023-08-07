const fetchData = async (url: string) => {
    try {
        const result = await fetch(url)
        return await result.json()
    } catch (error) {
        console.error(error)
    }
}

export const holidayApi = {
    getHolydays: fetchData('https://date.nager.at/api/v3/publicholidays/2023/CY')
}