import { Outlet } from "react-router-dom"
import { Header } from "./header"

export function AppLayout() {
    return (
        <>
            <Header />
            <main className="mx-auto w-full max-w-6xl px-6 py-8">
                <Outlet />
            </main>
        </>
    )
}
