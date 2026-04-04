import {
    format, parseISO, isToday, isSameWeek, isSameMonth, isSameYear,
    eachDayOfInterval, startOfWeek, endOfWeek, eachMonthOfInterval,
    startOfYear, endOfYear, getHours, startOfMonth, endOfMonth
} from 'date-fns';

export const processChartData = (sessions: any[], range: string) => {
    const now = new Date();
    let filteredSessions = sessions;
    const aggregated: Record<string, number> = {};

    if (range === "Daily") {
        filteredSessions = sessions.filter(s => isToday(parseISO(s.date)));
        for (let i = 0; i < 24; i++) aggregated[`${i}:00`] = 0;

        filteredSessions.forEach(s => {
            const hour = getHours(parseISO(s.timestamp.toDate ? s.timestamp.toDate().toISOString() : s.timestamp));
            const key = `${hour}:00`;
            aggregated[key] += Number(s.totalFocusTime);
        });

    } else if (range === "Weekly") {
        filteredSessions = sessions.filter(s => isSameWeek(parseISO(s.date), now));
        const days = eachDayOfInterval({ start: startOfWeek(now), end: endOfWeek(now) });
        days.forEach(d => aggregated[format(d, "EEE")] = 0); 

        filteredSessions.forEach(s => {
            const key = format(parseISO(s.date), "EEE");
            aggregated[key] += Number(s.totalFocusTime);
        });

    } else if (range === "Monthly") {
        filteredSessions = sessions.filter(s => isSameMonth(parseISO(s.date), now));
        const days = eachDayOfInterval({ start: startOfMonth(now), end: endOfMonth(now) });
        days.forEach(d => aggregated[format(d, "dd MMM")] = 0);

        filteredSessions.forEach(s => {
            const key = format(parseISO(s.date), "dd MMM");
            aggregated[key] += Number(s.totalFocusTime);
        });

    } else if (range === "Yearly") {
        filteredSessions = sessions.filter(s => isSameYear(parseISO(s.date), now));
        const months = eachMonthOfInterval({ start: startOfYear(now), end: endOfYear(now) });
        months.forEach(m => aggregated[format(m, "MMM")] = 0);

        filteredSessions.forEach(s => {
            const key = format(parseISO(s.date), "MMM");
            aggregated[key] += Number(s.totalFocusTime);
        });

    } else if (range === "All") {
        sessions.forEach(s => {
            const key = format(parseISO(s.date), "yyyy");
            aggregated[key] = (aggregated[key] || 0) + Number(s.totalFocusTime);
        });
    }

    return Object.keys(aggregated).map(key => ({
        label: key,
        minutes: aggregated[key]
    }));
};