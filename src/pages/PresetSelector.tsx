export function PresetSelector({ user, presets, value, onChange }: { 
    user: any, 
    presets: any[], 
    value: string, 
    onChange: any 
}) {
    if (!user) {
        return <h3>Sign in to create and manage your own custom session presets.</h3>;
    }

    return (
        <select className="presets" name="preset" value={value} onChange={onChange}>
            {presets.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
            ))}
        </select>
    );
}