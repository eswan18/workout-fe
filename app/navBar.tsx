import logout from './logout';

export default function NavBar() {
  return (
    <div className="flex flex-col text-center bg-red-400 text-black border-gray-100">
      <p>Ethan&apos;s Workout App</p>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}