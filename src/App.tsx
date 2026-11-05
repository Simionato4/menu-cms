import { Navigate, Route, Routes } from "react-router-dom"
import { AppLayout } from "./components/layout/app-layout"
import { CategoriesPage } from "./pages/categories-page"
import { ProductsPage } from "./pages/products-page"
import { SpotsPage } from "./pages/spots-page"
import { GuestChecksPage } from "./pages/guest-checks-page"

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/spots" element={<SpotsPage />} />
        <Route path="/guest-checks" element={<GuestChecksPage />} />
        <Route path="*" element={<Navigate to="/categories" replace />} />
      </Route>
    </Routes>
  )
}

export default App
