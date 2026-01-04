import { Canvas, defineApp, ThemeProvider, DevTools, resetStore, setLocale } from 'protomobilekit'
import { seedData } from './entities'
import { CustomerApp } from './apps/customer'
import { CourierApp } from './apps/courier'
import { AdminApp } from './apps/admin'
import { ShowcaseApp } from './apps/showcase'

// Set Hebrew locale
setLocale('en')

// Clear old data and seed fresh (one-time fix for id issue)
resetStore()
seedData()

function App() {
  return (
    <ThemeProvider defaultPlatform="android">
      <Canvas
        apps={[
          defineApp({
            id: 'customer',
            name: 'Customer',
            device: 'iphone-14',
            component: () => <CustomerApp />,
          }),
          defineApp({
            id: 'courier',
            name: 'Courier',
            device: 'iphone-14',
            component: () => <CourierApp />,
          }),
          defineApp({
            id: 'admin',
            name: 'Admin',
            device: 'iphone-14',
            component: () => <AdminApp />,
          }),
          defineApp({
            id: 'showcase',
            name: 'UI Showcase',
            device: 'iphone-14',
            component: () => <ShowcaseApp />,
          }),
        ]}
        layout="row"
        gap={24}
        showLabels
      />

      {/* DevTools in corner - always show since this is a prototyping tool */}
      <DevTools position="right" devOnly={false} />
    </ThemeProvider>
  )
}

export default App
