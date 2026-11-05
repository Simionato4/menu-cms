import { NavLink } from "react-router-dom"
import { cn } from "cn"
import logomarca from "@/assets/logomarca.svg"

const NAV_ITEMS = [
    { to: '/categories', label: 'Categorias' },
    { to: '/products', label: 'Produtos' },
    { to: '/spots', label: 'Mesas' },
    { to: '/guest-checks', label: 'Comandas' },
    { to: '/kanban', label: 'Kanban' },
]

export function Header() {
    return (
        <header className="border-b bg-card">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
                <img src={logomarca} alt="Mater Burguer" className="h-auto w-40" />

                <nav className="flex flex-wrap gap-1">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) => cn(
                                'rounded-md px-4 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-brand text-brand-foreground'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                            )}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    )
}
