import './AnalyticsPage.css'
import { Header } from "./Header";
import { useState } from "react";

export function AnalyticsPage({ 
    user, 
    refreshTime, 
    setRefreshTime, 
    isAutoStart, 
    setIsAutoStart, 
    isAutoResume, 
    setIsAutoResume 
}: any) {
    const [activeRange, setActiveRange] = useState("All");
    const ranges = ["All", "Yearly", "Monthly", "Weekly", "Daily"];

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
                    <div className="barchart"></div>
                    <div className="ai-analyzer"></div>
                </div>
            </div>
        </>
    )
}