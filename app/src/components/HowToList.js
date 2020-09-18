//SINGLE HOW-TO
// edit / delete functionality here

import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import HowTo from "./HowTo";

const initialCard = {
  title: "",
  author: "",
  category: "",
  id: "",
};

const HowToList = (props) => {
  const [edit, setEdit] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(initialCard);
  const history = useHistory();
  const {howToList, setHowToList} = props;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/howtos")
      .then((response) => {
        setHowToList(response.data.howtos);
      });
    if (localStorage.getItem("isAdmin") === "false") {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, []);

  const deleteCard = (e) => {
    axiosWithAuth()
      .delete(`/api/howtos/${e.id}`)
      .then((res) => {
        let filterHT = howToList.filter(
          (howTos) => howTos.id !== res.data.deletedHowto.id
        );

        console.log(res);
        setEdit(false);
        setCardToEdit(initialCard);
        setHowToList(filterHT);
        console.log('listfiltered', howToList)
        console.log(filterHT)
        // fetchHowToes(); res.data.deletedHowTo.id
      })
      .catch((err) => console.log(err, "lol"));
  };
console.log(howToList)
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post(`/api/howtos`, cardToEdit)
      .then((res) => {
        setCardToEdit(initialCard);
        fetchHowToes();
      })
      .catch((err) => console.log(err));
  };

  const fetchHowToes = () => {
    axiosWithAuth()
      .get(`/api/howtos`)
      .then((res) => {
        setHowToList(res.data.howtos);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchHowToes();
  }, [howToList.length]);

  console.log(isAdmin);

  return (
    <div>
      <div onSubmit={handleSubmit} className="howToListContainer">
        <>
          {howToList.map((ht, toes) => {
            // console.log("Here", ht);
            return (
              <Link id="linksDash" key={ht.id} to={`/howtos/${ht.id}`}>
                <h2>{ht.title}</h2>
                <h3>{ht.category}</h3>

                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteCard(ht);
                    }}
                  >
                    Delete
                  </button>
                )}
              </Link>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default HowToList;
