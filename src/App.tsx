import {BaseStyles, ThemeProvider} from '@primer/react'
import IntermentList from './components/IntermentList'
import PhotoGallery from './components/PhotoGallery'
import {WindowContextProvider} from './contexts/WindowContext'
import {CemeteryDataContextProvider} from './contexts/CemeteryDataContext'
import {PageContextProvider} from './contexts/PageContext'
import {EnabledFieldsProvider} from './contexts/EnabledFieldsContext'
import {createHashRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom'
import ErrorPage from './components/ErrorPage'
import AppLayout from './components/AppLayout'
import AboutPage from './components/AboutPage'
import '@primer/primitives/dist/css/primitives.css'
import '@primer/primitives/dist/css/functional/themes/light.css'

export function App() {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={<IntermentList />} errorElement={<ErrorPage />} />
        <Route path="/page/:initialPageNumberStr" element={<IntermentList />} errorElement={<ErrorPage />} />
        <Route path="/photos" element={<PhotoGallery />} errorElement={<ErrorPage />} />
        <Route path="/about" element={<AboutPage />} errorElement={<ErrorPage />} />
      </Route>
    )
  )

  return (
    <ThemeProvider>
      <BaseStyles>
        <WindowContextProvider>
          <CemeteryDataContextProvider>
            <PageContextProvider>
              <EnabledFieldsProvider>
                <RouterProvider router={router} />
              </EnabledFieldsProvider>
            </PageContextProvider>
          </CemeteryDataContextProvider>
        </WindowContextProvider>
      </BaseStyles>
    </ThemeProvider>
  )
}
