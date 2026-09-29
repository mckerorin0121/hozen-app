import { redirect } from 'next/navigation'

// The app moved to "/"; keep old links and installed PWAs working
export default function MeditationRedirect() {
  redirect('/')
}
