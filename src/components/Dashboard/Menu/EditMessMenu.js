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
  const { user } = useSelector((state) => state.profile);
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
  console.log("editing", editing);
  // console.log("id of the user", user);
  const handleSaveMenu = async () => {
    try {
      console.log("data edit mei jaa rha haiiiii", menuData);
      const updatedMenu = await editMessMenuDetails(
        menuData[0],
        menuData[0]?._id,
        token
      );
      console.log("upadted menu", updatedMenu);
      if (updatedMenu) {
        // Update the Redux state with the updated menu
        setLoading(true);
        dispatch(setMessMenu(updatedMenu));
        setLoading(false);
        toast.success("Mess Menu Updated Successfully");
      }
    } catch (error) {
      console.error("Error updating mess menu:", error.message);
    } finally {
      setEditing(false);
    }
  };

  const handleInputChange = (day, meal, value) => {
    setMenuData((prevMenu) => {
      const newMenu = JSON.parse(JSON.stringify(prevMenu));
      newMenu[0][day][meal] = value;
      return newMenu;
    });
  };
  console.log("MENUDATA", menuData);
  return (
    <>
      {editing ? (
        <>
          {/* {menuData && */}
          {/* // Object.keys(menuData[0]).map((day) => (
          <div key={day}>
            {day === "monday" && (
              <>
                <h3>{day}</h3>
                <input
                  type="text"
                  value={menuData[0][day].breakFast}
                  onChange={(e) =>
                    handleInputChange(day, "breakFast", e.target.value)
                  }
                />
              </>
            )}

            {/* Add similar input fields for lunch, snacks, and dinner */}

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
              {
                <tr>
                  <td className="font-bold">Monday</td>
                  {/* <td>{menuData[0].monday.breakFast}</td> */}
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].monday.breakFast}
                      onChange={(e) =>
                        handleInputChange("monday", "breakFast", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].monday.breakFast}
                      onChange={(e) =>
                        handleInputChange("monday", "breakFast", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].monday.breakFast}
                      onChange={(e) =>
                        handleInputChange("monday", "breakFast", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].monday.breakFast}
                      onChange={(e) =>
                        handleInputChange("monday", "breakFast", e.target.value)
                      }
                    />
                  </td>
                </tr>
              }
              {
                <tr>
                  <td className="font-bold">Tuesday</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].monday.breakFast}
                      onChange={(e) =>
                        handleInputChange("monday", "breakFast", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].monday.breakFast}
                      onChange={(e) =>
                        handleInputChange("monday", "breakFast", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].monday.breakFast}
                      onChange={(e) =>
                        handleInputChange("monday", "breakFast", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].monday.breakFast}
                      onChange={(e) =>
                        handleInputChange("monday", "breakFast", e.target.value)
                      }
                    />
                  </td>
                </tr>
              }
              {
                <tr>
                  <td className="font-bold">Wednesday</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].wednesday.breakFast}
                      onChange={(e) =>
                        handleInputChange(
                          "wednesday",
                          "breakFast",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].wednesday.lunch}
                      onChange={(e) =>
                        handleInputChange("wednesday", "lunch", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].wednesday.snacks}
                      onChange={(e) =>
                        handleInputChange("wednesday", "snacks", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].wednesday.dinner}
                      onChange={(e) =>
                        handleInputChange("wednesday", "dinner", e.target.value)
                      }
                    />
                  </td>
                </tr>
              }
              {
                <tr>
                  <td className="font-bold">Thursday</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].thursday.breakFast}
                      onChange={(e) =>
                        handleInputChange(
                          "thursday",
                          "breakFast",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].thursday.lunch}
                      onChange={(e) =>
                        handleInputChange("thursday", "lunch", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].thursday.snacks}
                      onChange={(e) =>
                        handleInputChange("thursday", "snacks", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].thursday.dinner}
                      onChange={(e) =>
                        handleInputChange("thursday", "dinner", e.target.value)
                      }
                    />
                  </td>
                  thursday
                </tr>
              }
              {
                <tr>
                  <td className="font-bold">Friday</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].friday.breakFast}
                      onChange={(e) =>
                        handleInputChange("friday", "breakFast", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].friday.lunch}
                      onChange={(e) =>
                        handleInputChange("friday", "lunch", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].friday.snacks}
                      onChange={(e) =>
                        handleInputChange("friday", "snacks", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].friday.dinner}
                      onChange={(e) =>
                        handleInputChange("friday", "dinner", e.target.value)
                      }
                      friday
                    />
                  </td>
                </tr>
              }
              {
                <tr>
                  <td className="font-bold">Saturday</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].saturday.breakFast}
                      onChange={(e) =>
                        handleInputChange(
                          "saturday",
                          "breakFast",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].saturday.lunch}
                      onChange={(e) =>
                        handleInputChange("saturday", "lunch", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].saturday.snacks}
                      onChange={(e) =>
                        handleInputChange("saturday", "snacks", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].saturday.dinner}
                      onChange={(e) =>
                        handleInputChange("saturday", "dinner", e.target.value)
                      }
                    />
                  </td>
                </tr>
              }
              {
                <tr>
                  <td className="font-bold">Sunday</td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].sunday.breakFast}
                      onChange={(e) =>
                        handleInputChange("sunday", "breakFast", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].sunday.lunch}
                      onChange={(e) =>
                        handleInputChange("sunday", "lunch", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].sunday.snacks}
                      onChange={(e) =>
                        handleInputChange("sunday", "snacks", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      value={menuData[0].sunday.dinner}
                      onChange={(e) =>
                        handleInputChange("sunday", "dinner", e.target.value)
                      }
                    />
                  </td>
                </tr>
              }
            </tbody>
          </table>

          <button
            onClick={handleSaveMenu}
            className="bg-slate-300 p-3 text-black"
          >
            Save Menu
          </button>
        </>
      ) : (
        <>
          {menuData && menuData[0] ? (
            <div className="container mx-auto my-4">
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
                  {
                    <tr>
                      <td className="font-bold">Monday</td>
                      <td>{menuData[0].monday.breakFast}</td>
                      <td>{menuData[0].monday.lunch}</td>
                      <td>{menuData[0].monday.snacks}</td>
                      <td>{menuData[0].monday.dinner}</td>
                    </tr>
                  }
                  {
                    <tr>
                      <td className="font-bold">Tuesday</td>
                      <td>{menuData[0].tuesday.breakFast}</td>
                      <td>{menuData[0].tuesday.lunch}</td>
                      <td>{menuData[0].tuesday.snacks}</td>
                      <td>{menuData[0].tuesday.dinner}</td>
                    </tr>
                  }
                  {
                    <tr>
                      <td className="font-bold">Wednesday</td>
                      <td>{menuData[0].wednesday.breakFast}</td>
                      <td>{menuData[0].wednesday.lunch}</td>
                      <td>{menuData[0].wednesday.snacks}</td>
                      <td>{menuData[0].wednesday.dinner}</td>
                    </tr>
                  }
                  {
                    <tr>
                      <td className="font-bold">Thursday</td>
                      <td>{menuData[0].thursday.breakFast}</td>
                      <td>{menuData[0].thursday.lunch}</td>
                      <td>{menuData[0].thursday.snacks}</td>
                      <td>{menuData[0].thursday.dinner}</td>
                    </tr>
                  }
                  {
                    <tr>
                      <td className="font-bold">Friday</td>
                      <td>{menuData[0].friday.breakFast}</td>
                      <td>{menuData[0].friday.lunch}</td>
                      <td>{menuData[0].friday.snacks}</td>
                      <td>{menuData[0].friday.dinner}</td>
                    </tr>
                  }
                  {
                    <tr>
                      <td className="font-bold">Saturday</td>
                      <td>{menuData[0].saturday.breakFast}</td>
                      <td>{menuData[0].saturday.lunch}</td>
                      <td>{menuData[0].saturday.snacks}</td>
                      <td>{menuData[0].saturday.dinner}</td>
                    </tr>
                  }
                  {
                    <tr>
                      <td className="font-bold">Sunday</td>
                      <td>{menuData[0].sunday.breakFast}</td>
                      <td>{menuData[0].sunday.lunch}</td>
                      <td>{menuData[0].sunday.snacks}</td>
                      <td>{menuData[0].sunday.dinner}</td>
                    </tr>
                  }
                </tbody>
              </table>
              <button
                onClick={handleEditMenu}
                className="bg-slate-300 p-3 text-black"
              >
                Edit Menu
              </button>
            </div>
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
