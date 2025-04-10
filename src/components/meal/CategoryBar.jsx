import React, { useEffect, useState } from 'react';

const CategoryBar = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      for(let cat of categories){
        const section = document.getElementById(cat);
        if(section){
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100){
            setActiveCategory(cat);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  },[categories])

  return (
    <nav className="flex justify-evenly gap-4 px-4 py-5 overflow-x-auto bg-white sticky top-0 z-10 shadow-sm">
      {categories.map((cat) => (
         <a
         key={cat}
         href={`#${cat}`}
         className={`text-base font-semibold whitespace-nowrap hover:text-orange-500 
          ${activeCategory === cat ? 'text-orange-500' : 'text-gray-700'}`}>
          {cat}
        </a>
      ))}
    </nav>
  );
};

export default CategoryBar;