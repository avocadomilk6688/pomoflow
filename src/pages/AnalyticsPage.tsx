import type { User } from "firebase/auth";
import './AnalyticsPage.css'
import { Header } from "./Header";
import { useState } from "react";

export function AnalyticsPage({ user }: { user: User | null }) {
    const [activeRange, setActiveRange] = useState("All");

    const ranges = ["All", "Yearly", "Monthly", "Weekly", "Daily"];

    return (
        <>
            <Header></Header>
            <div className="analytics-container">
                <h1>Dashboard</h1>
                <div className="insight-range">
                    <ul>
                        {ranges.map((range) => (
                            <li className={activeRange === range ? "active" : ""}
                                onClick={() => setActiveRange(range)}>{range}</li>
                        ))}
                    </ul>
                </div>
                <div className="analytics-content">
                    <div className="barchart">

                    </div>
                    <div className="ai-analyzer">

                    </div>
                </div>
            </div >
        </>
    )
}