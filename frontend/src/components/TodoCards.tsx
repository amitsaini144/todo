interface myprops {
  key?: number;
  label: {
    id: number;
    title: string;
    description: string;
    done: boolean;
    userId: number;
  }
}


export default function TodoCard( {label} : myprops) {
  return <div className="grid grid-cols-12">

    <div className="sm:col-span-10 col-span-12">
      <div className=" m-2 bg-black/40 rounded-t-lg p-2 text-white font-medium mb-0">
        <div>
          {label.title}
        </div>
      </div>
      <div className=" m-2 bg-black/40 rounded-b-lg p-2 text-white text-xs mt-0 pt-0">
        {label.description}
      </div>
    </div>

    <div className="grid sm:col-span-1 col-span-6">
    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 sm:max-h-10 sm:mt-3">Edit</button>

    </div>

    <div className="grid sm:col-span-1 col-span-6">
    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 sm:max-h-10 sm:mt-3">Delete</button>

    </div>


  </div>
}
