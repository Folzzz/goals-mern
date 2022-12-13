import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { GoalForm, Spinner, GoalItem } from '../components';
import { getGoals, reset } from "../features/goals/goalSlice";

const Dashboard = () => {
  // initialize navigate
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get states
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

  useEffect(() => {
    // check for error
    if (isError) {
      console.log(message);
      toast.error(message);
    }

    // check for user
    if (!user) {
      navigate('/login');
    }

    // fetch goals from backend
    dispatch(getGoals());

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, dispatch, message])
  

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
      <h1>Welcome { user && <span style={{ color: 'crimson'}}>{user.name}</span>}</h1>
      <p>Goals Dashboard</p>
    </section>

    <GoalForm />

    <div className="content">
      {
        goals.length > 0 ? 
        (
          <div className="goals">
            {
              goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))
            }
          </div>
        ) 
        : 
        (
          <h3>You have not set any goals</h3>
        )
      }
    </div>
    </>
  )
}

export default Dashboard