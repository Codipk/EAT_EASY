import React, { useState, useEffect } from "react";

const MessMenu = () => {
  const [menu, setMenu] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedMenu, setEditedMenu] = useState(null);

  // Dummy data for testing
  const dummyData = {
    monday: {
      breakFast: "aloo",
      lunch: "rajma",
      snacks: "paneerr",
      dinner: " Curry",
    },
    tuesday: {
      breakFast: "chai pani",
      lunch: "Salad",
      snacks: "Kuch nhi",
      dinner: "Pizza",
    },
    // Add data for other days as needed
  };

  useEffect(() => {
    // For testing purposes, set the menu state to the dummy data
    setMenu(dummyData);
    // Initialize editedMenu with the same dummy data
    setEditedMenu(dummyData);
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (day, meal, value) => {
    setEditedMenu((prevMenu) => ({
      ...prevMenu,
      [day]: {
        ...prevMenu[day],
        [meal]: value,
      },
    }));
  };

  const handleUpdateClick = () => {
    // You can implement the logic to send the updated menu to the server here
    // For simplicity, I'll just log the updated menu to the console
    console.log("Updated Menu:", editedMenu);
    setMenu(editedMenu);
    setEditMode(false);
  };

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4">Mess Menu</h2>
      {editMode ? (
        <div>
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
              {Object.keys(editedMenu).map((day) => (
                <tr key={day}>
                  <td className="font-bold">{day}</td>
                  <td>
                    <input
                      type="text"
                      value={editedMenu[day].breakFast}
                      onChange={(e) =>
                        handleInputChange(day, "breakFast", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedMenu[day].lunch}
                      onChange={(e) =>
                        handleInputChange(day, "lunch", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedMenu[day].snacks}
                      onChange={(e) =>
                        handleInputChange(day, "snacks", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedMenu[day].dinner}
                      onChange={(e) =>
                        handleInputChange(day, "dinner", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleUpdateClick}
            className="bg-blue-500 text-white px-4 py-2 mt-4"
          >
            Update Menu
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleEditClick}
            className="bg-green-500 text-white px-4 py-2 mb-4"
          >
            Edit Menu
          </button>
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
      )}
    </div>
  );
};

export default MessMenu;
