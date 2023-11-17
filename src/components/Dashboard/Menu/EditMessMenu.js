// export default MessMenu;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessMenu,
  editMessMenuDetails,
} from "../../../services/operations/MessMenuAPI";
import { setMessMenu } from "../../../slices/messMenuSlice";
import { toast } from "react-hot-toast";
import { setLoading } from "../../../slices/authSlice";

const MessMenuComponent = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [menuData, setMenuData] = useState(null);
  const [editing, setEditing] = useState(false);
  const { loading } = useSelector((state) => state.menu);
  useEffect(() => {
    const getMenu = async () => {
      try {
        // setLoading(true);
        const menu = await fetchMessMenu(token, dispatch);
        console.log("menu previous", menu);
        setMenuData(menu);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching mess menu:", error.message);
      }
    };

    getMenu();
  }, [token, dispatch]);

  const handleEditMenu = () => {
    setEditing(true);
  };

  const handleSaveMenu = async () => {
    try {
      console.log("data edit mei jaa rha haiiiii", menuData);
      const updatedMenu = await editMessMenuDetails({ data: menuData }, token);
      console.log("upadted menu", updatedMenu);
      if (updatedMenu) {
        // Update the Redux state with the updated menu
        // setLoading(true);
        dispatch(setMessMenu(updatedMenu));
        // setLoading(false);
        toast.success("Mess Menu Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating mess menu:", error.message);
    } finally {
      setEditing(false);
    }
  };

  const handleInputChange = (day, meal, value) => {
    setMenuData((prevMenu) => ({
      ...prevMenu,
      [day]: {
        ...prevMenu[day],
        [meal]: value,
      },
    }));
  };
  console.log("MENUDATA", menuData);
  return (
    <>
      {editing ? (
        <>
          {/* Render input fields for each day and meal */}
          {Object.keys(menuData[0]).map((day) => (
            <div key={day}>
              <h3>{day}</h3>
              <input
                type="text"
                value={menuData[0][day].breakFast}
                onChange={(e) =>
                  handleInputChange(day, "breakFast", e.target.value)
                }
              />
              <input
                type="text"
                value={menuData[0][day].lunch}
                onChange={(e) =>
                  handleInputChange(day, "lunch", e.target.value)
                }
              />
              <input
                type="text"
                value={menuData[0][day].snacks}
                onChange={(e) =>
                  handleInputChange(day, "snacks", e.target.value)
                }
              />
              <input
                type="text"
                value={menuData[0][day].dinner}
                onChange={(e) =>
                  handleInputChange(day, "dinner", e.target.value)
                }
              />
              {/* Add similar input fields for lunch, snacks, and dinner */}
            </div>
          ))}
          <button onClick={handleSaveMenu} className="bg-slate-300 text-white">
            Save Menu
          </button>
        </>
      ) : (
        <>
          {menuData[0] ? (
            // ... (render menu details JSX)
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
                <tr>
                  <td className="font-bold">Monday</td>
                  <td>{menuData[0].monday.breakFast}</td>
                  <td>{menuData[0].monday.lunch}</td>
                  <td>{menuData[0].monday.snacks}</td>
                  <td>{menuData[0].monday.dinner}</td>
                </tr>
                {/* Add similar rows for Tuesday, Wednesday, Thursday */}
              </tbody>
            </table>
          ) : (
            // ... (loading state JSX)
            <div>Loading</div>
          )}
        </>
      )}
    </>
  );
};

export default MessMenuComponent;
