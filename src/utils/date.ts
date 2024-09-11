export interface CountdownDate {
    hours: number
    minutes: number
    seconds: number
}

export function countdown(targetDate: Date, referenceDate: Date | null = null): CountdownDate {
    const ref = referenceDate ?? new Date()

    const diff = targetDate.getTime() - ref.getTime()

    if (diff < 0) {
        throw new Error("Target date must be greater than current time")
    }

    const diffSeconds = diff / 1000

    return {
        seconds: Math.floor(diffSeconds % 60),
        minutes: Math.floor(diffSeconds / 60 % 60),
        hours: Math.floor(diffSeconds / 3600 % 99),
    }
}