// import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchMessMenu } from "../../../services/operations/MessMenuAPI";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import RatingInput from "../../Dashboard/Menu/RatingInput";
import { getAverageRating } from "../../../services/operations/ratingAPI";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import RatingDisplay from "./GetAvgRating";
// import { setMessMenu } from "../../../slices/messMenuSlice";
const Menu = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  // const { loading, error, menu } = useSelector((state) => state.menu);
  const { token } = useSelector((state) => state.auth);
  const [menu, setMessMenu] = useState([]);
  // const [averageRatings, setAverageRatings] = useState({});
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const result = await fetchMessMenu(token, dispatch);
        if (result !== null) {
          console.log("Fetching menu ", result);
          setMessMenu(result);
        } else {
          console.log("Not getting any menu");
        }
      } catch (error) {
        console.error("Error fetching menu:", error.message);
      }
    };
    // const fetchRatings = async () => {
    //   try {
    //     const ratings = await getAverageRating(token);
    //     console.log("ratings", ratings);
    //     setAverageRatings(ratings);
    //   } catch (error) {
    //     console.error("Error fetching average ratings:", error.message);
    //     toast.error("Error fetching average ratings");
    //   }
    // };
    fetchMenu();
    // fetchRatings();
  }, [dispatch, token]);

  // const getMealAverageRating = (mealType) => {
  //   return getAverageRating[mealType] || "N/A";
  // };
  return (
    <>
      <div>
        <div className="container mx-auto my-4">
          <h2 className="text-2xl font-bold mb-4 text-white">Mess Menu</h2>
          {menu[0] ? (
            <table className="table table-bordered text-center">
              <thead>
                <tr className="bg-gray-300">
                  <th>Day</th>
                  <th>Breakfast</th>
                  <th>Lunch</th>
                  <th>Snacks</th>
                  <th>Dinner</th>
                  {/* <th>Rating</th> */}
                </tr>
              </thead>
              <tbody>
                {/* {Object.keys(menu[0]).map((day) => (
                
                ))
                } */}
                {
                  <tr>
                    <td className="font-bold">Monday</td>
                    <td>{menu[0].monday.breakFast}</td>
                    <td>{menu[0].monday.lunch}</td>
                    <td>{menu[0].monday.snacks}</td>
                    <td>{menu[0].monday.dinner}</td>
                    {/* <td>{getMealAverageRating(menu[0].day)}</td> */}
                  </tr>
                }
                {
                  <tr>
                    <td className="font-bold">Tuesday</td>
                    <td>{menu[0].tuesday.breakFast}</td>
                    <td>{menu[0].tuesday.lunch}</td>
                    <td>{menu[0].tuesday.snacks}</td>
                    <td>{menu[0].tuesday.dinner}</td>
                  </tr>
                }
                {
                  <tr>
                    <td className="font-bold">Wednesday</td>
                    <td>{menu[0].wednesday.breakFast}</td>
                    <td>{menu[0].wednesday.lunch}</td>
                    <td>{menu[0].wednesday.snacks}</td>
                    <td>{menu[0].wednesday.dinner}</td>
                  </tr>
                }
                {
                  <tr>
                    <td className="font-bold">Thursday</td>
                    <td>{menu[0].thursday.breakFast}</td>
                    <td>{menu[0].thursday.lunch}</td>
                    <td>{menu[0].thursday.snacks}</td>
                    <td>{menu[0].thursday.dinner}</td>
                  </tr>
                }
                {
                  <tr>
                    <td className="font-bold">Friday</td>
                    <td>{menu[0].friday.breakFast}</td>
                    <td>{menu[0].friday.lunch}</td>
                    <td>{menu[0].friday.snacks}</td>
                    <td>{menu[0].friday.dinner}</td>
                  </tr>
                }
                {
                  <tr>
                    <td className="font-bold">Saturday</td>
                    <td>{menu[0].saturday.breakFast}</td>
                    <td>{menu[0].saturday.lunch}</td>
                    <td>{menu[0].saturday.snacks}</td>
                    <td>{menu[0].saturday.dinner}</td>
                  </tr>
                }
                {
                  <tr>
                    <td className="font-bold">Sunday</td>
                    <td>{menu[0].sunday.breakFast}</td>
                    <td>{menu[0].sunday.lunch}</td>
                    <td>{menu[0].sunday.snacks}</td>
                    <td>{menu[0].sunday.dinner}</td>
                  </tr>
                }
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="mb-3 h-3 ">
          {user?.accountType === ACCOUNT_TYPE.MESS_COMMITEE && (
            <Link
              className="bg-slate-500 p-2  font-semibold text-black mb-2"
              to="edit-mess-menu"
            >
              Edit Mess Menu
            </Link>
          )}
          {user?.accountType === ACCOUNT_TYPE.ACCOUNTANT && (
            <Link
              className="bg-slate-300 p-2  font-semibold text-black mb-2"
              to="edit-mess-menu"
            >
              Edit Mess Menu
            </Link>
          )}
        </div>
        {user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
            <RatingInput />
            <RatingDisplay token={token} />
          </>
        )}
      </div>
    </>
  );
};

export default Menu;
