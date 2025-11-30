export default function Profile({ fadeIn }: { fadeIn: boolean }) {
  return (
    <div className="bg-stone-950 flex-col gap-10 w-screen h-screen flex justify-center items-center">
      <div className="w-100 h-100 bg-stone-900 flex justify-center items-center rounded-2xl">
        <p className="italic font-bold text-stone-700">dysphoria.</p>
      </div>

      <div className="flex justify-center items-center flex-col">
        <p className="text-stone-600 font-bold text-3xl">when does it all end</p>
        <p className="text-stone-700 italic"> why must it hurt</p>
      </div>
    </div>
  )
}
