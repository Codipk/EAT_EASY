import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Menu = () => {
  const [menu, setMenu] = useState(null);
  const navigate = useNavigate;
  // Dummy data for testing
  const dummyData = {
    monday: {
      breakFast: "Cereal",
      lunch: "Spaghetti",
      snacks: "Fruits",
      dinner: "Curry",
    },
    tuesday: {
      breakFast: "Toast",
      lunch: "Salad",
      snacks: "Yogurt",
      dinner: "Pizza",
    },
    wednesday: {
      breakFast: "Toast",
      lunch: "Salad",
      snacks: "Yogurt",
      dinner: "Pizza",
    },
    thursday: {
      breakFast: "Toast",
      lunch: "Salad",
      snacks: "Yogurt",
      dinner: "Pizza",
    },
    friday: {
      breakFast: "Toast",
      lunch: "Salad",
      snacks: "Yogurt",
      dinner: "Pizza",
    },
    saturday: {
      breakFast: "Toast",
      lunch: "Salad",
      snacks: "Yogurt",
      dinner: "Pizza",
    },
    sunday: {
      breakFast: "Toast",
      lunch: "Salad",
      snacks: "Yogurt",
      dinner: "Pizza",
    },
  };

  useEffect(() => {
    // For testing purposes, set the menu state to the dummy data
    setMenu(dummyData);
  }, []);
  return (
    <>
      <div>
        <div className="container mx-auto my-4">
          <h2 className="text-2xl font-bold mb-4">Mess Menu</h2>
          {menu ? (
            <table className="table table-bordered text-center">
              <thead>
                <tr className="bg-gray-300">
                  <th>Day</th>
                  <th>Breakfast</th>
                  <th>Lunch</th>
                  <th>Snacks</th>
                  <th>Dinner</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(menu).map((day) => (
                  <tr key={day}>
                    <td className="font-bold">{day}</td>
                    <td>{menu[day].breakFast}</td>
                    <td>{menu[day].lunch}</td>
                    <td>{menu[day].snacks}</td>
                    <td>{menu[day].dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Link className="bg-slate-500 p-2 text-white" to="edit-mess-menu" />
      </div>
    </>
  );
};

export default Menu;
