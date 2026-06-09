import { useState } from 'react'
import Gate from './components/Gate'
import Form from './components/Form'
import CursorTrail from './components/CursorTrail'

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  return (
    <>
      <CursorTrail />
      {unlocked ? <Form /> : <Gate onUnlock={() => setUnlocked(true)} />}
    </>
  )
}
