import React, { useEffect, useState } from 'react';
import MealSection from '../components/meal/MealSection';
import CategoryBar from '../components/meal/CategoryBar';

const MenuPage = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/meals');
        const data = await res.json();
        setMeals(data);
      } catch (err) {
        console.error('錯誤：無法取得餐點資料', err);
      }finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // 萃取分類清單
  const categories = [...new Set(meals.map((m) => m.category))];

  // 依分類分組
  const groupedMeals = categories.map((cat) => ({
    category: cat,
    meals: meals.filter((meal) => meal.category === cat),
  }));

  return (
    <div>
      <CategoryBar categories={categories} />
      {loading && <p className="text-center py-10 text-gray-600">連結資料中...</p>}
      {groupedMeals.map((group) => (
        <MealSection key={group.category} category={group.category} meals={group.meals} />
      ))}
    </div>
  );
};

export default MenuPage;