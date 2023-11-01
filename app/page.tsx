import Image from 'next/image'
import Link from 'next/link'
import Session from './_components/Session'

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Session/>
     <Link href={'/api/auth/signin'}>SiginIn</Link>
     <Link href={'/api/auth/signout'}>SignOut</Link>
     <Link href={'/dashboard/admin'}>Admin page</Link>
     <Link href={'/dashboard/user'}>User Page</Link>
    </main>
  )
}
