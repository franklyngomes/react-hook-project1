import ResponsiveAppBar from "../header/Header.jsx";
export default function Wrapper({ children }) {
    return (
        <>
            <ResponsiveAppBar />
            {children}

        </>
    );
}