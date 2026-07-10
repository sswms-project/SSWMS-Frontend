import { redirect } from 'next/navigation'
import { APP_ROUTES } from '@/routes/app-routes'

export default function Home() {
  redirect(APP_ROUTES.auth.login)
}
