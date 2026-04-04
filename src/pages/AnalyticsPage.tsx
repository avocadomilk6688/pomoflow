import { processChartData } from '../utils/chartLogic';
import { fetchSessions } from '../utils/firestore';
import './AnalyticsPage.css'
import { Header } from "./Header";
import { useEffect, useMemo, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export function AnalyticsPage({
    user,
    refreshTime,
    setRefreshTime,
    isAutoStart,
    setIsAutoStart,
    isAutoResume,
    setIsAutoResume
}: any) {
    const [activeRange, setActiveRange] = useState("Daily");
    const ranges = ["All", "Yearly", "Monthly", "Weekly", "Daily"];
    const [rawSessions, setRawSessions] = useState<any[]>([]);

    useEffect(() => {
        if (user?.uid) {
            fetchSessions(user.uid).then(data => {
                setRawSessions(data || []);
            })
        }
    }, [user])

    const chartData = useMemo(() => {
        return processChartData(rawSessions, activeRange);
    }, [rawSessions, activeRange]);

    return (
        <>
            <Header
                user={user}
                bgColor="#121212"
                refreshTime={refreshTime}
                setRefreshTime={setRefreshTime}
                isAutoStart={isAutoStart}
                setIsAutoStart={setIsAutoStart}
                isAutoResume={isAutoResume}
                setIsAutoResume={setIsAutoResume}
            />

            <div className="analytics-container">
                <h1>Dashboard</h1>
                <div className="insight-range">
                    <ul>
                        {ranges.map((range) => (
                            <li
                                key={range}
                                className={activeRange === range ? "active" : ""}
                                onClick={() => setActiveRange(range)}
                            >
                                {range}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="analytics-content">
                    <div className="barchart">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={chartData} margin={{ top: 40, right: 30, left: 0, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                                <XAxis
                                    dataKey="label"
                                    stroke="#121212"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    interval={activeRange === "Monthly" ? 4 : 0}
                                    dy={10}
                                />
                                <YAxis
                                    label={{
                                        value: 'mins',
                                        position: 'top',
                                        offset: 15,
                                        fill: '#121222',
                                        fontSize: 12,
                                        fontFamily: 'Inter'
                                    }}
                                    stroke="#121212"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Bar
                                    dataKey="minutes"
                                    fill="#121212"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    )
}