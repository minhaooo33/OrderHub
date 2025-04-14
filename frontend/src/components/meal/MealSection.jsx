import React from 'react';
import MealCard from './MealCard';

const MealSection = ({ category, meals }) => {
  return (
    <section id={category} className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4">{category}</h2>
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </section>
  );
};

export default MealSection;