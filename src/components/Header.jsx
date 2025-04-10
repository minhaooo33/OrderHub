import React from "react";

const  Header = ({tableNumber}) =>{



  return (
    <header className=" shadow-md px-6 py-4 flex justify-center items-center bg-black">
        <h1 className="text-white text-3xl font-bold">桌號:{tableNumber}</h1>
      </header >
  )
}

export default Header;