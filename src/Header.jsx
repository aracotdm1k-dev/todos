import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Header() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: theme === "dark" ? "#000" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
            padding: "20px"
        }}>
            <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </div>
    )
}

export default Header
