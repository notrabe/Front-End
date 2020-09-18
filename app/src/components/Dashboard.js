import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth"
import { fetchHowTos } from "../store/actions"
import HowToList from "./HowToList";
import HowToForm from "./HowToForm"
import { Link, useHistory } from "react-router-dom";

//USER DASHBOARD NO FORM

const Dashboard = (props) => {
  const [howToList, setHowToList] = useState([]);
  const history = useHistory();

  const getHowToList = () => {
    axiosWithAuth()
      .get("/api/howtos")
      .then((response) => setHowToList(response.data.howtos))
      .catch((err) => console.log(err));
  };

  useEffect(() => {// refresh
    getHowToList();
  }, [howToList.length]);

  return (
    <>
      <div>
        <h1>Welcome to your How-To Dashboard</h1>
        <h2>How-Tos:</h2>
            <HowToList howToList={howToList} setHowToList={setHowToList}/>
        <br></br>
        <HowToForm howToList={howToList} setHowToList={setHowToList}/>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    howTos: state.howTos,
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
    user_id: state.user_id,
  };
};

export default connect(mapStateToProps, { fetchHowTos })(Dashboard);
