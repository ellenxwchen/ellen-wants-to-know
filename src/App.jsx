import { useState } from 'react'
import Gate from './components/Gate'
import Form from './components/Form'

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  return unlocked ? <Form /> : <Gate onUnlock={() => setUnlocked(true)} />
}
