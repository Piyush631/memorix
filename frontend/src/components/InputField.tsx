interface inputprops{
    placeholder:string
    references:any
}


export function InputField({placeholder,references}:inputprops){
    return (
    <div className="m-2 p-2  rounded-xl ">
<input 
  ref={references} 
  className="py-2 rounded-lg border-2 focus:outline-none border-gray-400 px-2 w-64 bg-gray-200 focus:border-blue-400" 
  type="text" 
  placeholder={placeholder} 
/>    </div>
    )
}