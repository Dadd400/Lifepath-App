import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import CareerQuiz from './pages/CareerQuiz.jsx'
import CityFinder from './pages/CityFinder.jsx'
import GlobalCityFinder from './pages/GlobalCityFinder.jsx'
import Intake from './pages/Intake.jsx'
import AppDemo from './pages/AppDemo.jsx'

export default function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Landing />} />
<Route path="/quiz/career" element={<CareerQuiz />} />
<Route path="/quiz/city-us" element={<CityFinder />} />
<Route path="/quiz/city-global" element={<GlobalCityFinder />} />
<Route path="/onboarding" element={<Intake />} />
<Route path="/app" element={<AppDemo />} />
</Routes>
</BrowserRouter>
)
}
