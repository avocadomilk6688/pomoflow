export function AiInsight({ quote }: { quote: string }) {
    return (
        <div className="ai-insight-box">
            <p className="motivation-quote">"{quote}"</p>
        </div>
    );
}