import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export const HowToEdit = () => {
  const history = useHistory();
  const [card, setCard] = useState(null);
  const params = useParams();

  const initialCard = {
    user_id: "2", // 2 is admin - only admind can change HT
    title: "",
    category: "",
    content: "",
    id: params.id,
  };

  const [cardToEdit, setCardToEdit] = useState(initialCard);

  const fetchHowTo = (id) => {
    axiosWithAuth()
      .get(`/api/howtos/${id}`)
      .then((res) => setCard(res.data))
      .catch((err) => err);
  };

  useEffect(() => {
    fetchHowTo(params.id);
  }, [params.id]);

  const putHowTo = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/howtos/${params.id}`, cardToEdit)
      .then((res) => {
        setCardToEdit(initialCard);
        history.push("/dashboard");
        console.log(res);
      })
      .catch((err) => alert("LOL Must be an admin", err));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCardToEdit({
      ...cardToEdit,
      [name]: value,
    });
  };

  return (
    <div className="form-container">
      <form className="form-container-bb" onSubmit={putHowTo}>
        <h2>Edit Your How To Player!</h2>
        <input
          name="title"
          placeholder="change the title..."
          type="text"
          value={cardToEdit.title}
          onChange={onChange}
        />
        <input
          name="category"
          placeholder="change the category..."
          type="text"
          value={cardToEdit.category}
          onChange={onChange}
        />
        <input
          name="content"
          placeholder="change the content..."
          type="text"
          value={cardToEdit.content}
          onChange={onChange}
        />
        <button className="edit-button">Save</button>
      </form>
    </div>
  );
};
