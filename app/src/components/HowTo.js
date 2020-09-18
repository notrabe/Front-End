import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { xyz } from "../store";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { HowToEdit } from "./HowToEdit";
import { useParams } from "react-router-dom";
import Modal from "react-awesome-modal";

function HowTo(props) {
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const id = useParams().id;

  useEffect(() => {
    props.xyz(id);
  }, []);

  return (
    <div>
      {props.howTo && (
        <container>
          <h2>{props.howTo.title}</h2>
          <h3>{props.howTo.category}</h3>
          <p>{props.howTo.content}</p>
        </container>
      )}
      <input type="button" value="Edit" onClick={() => openModal()} />
      <Modal
        visible={visible}
        width="400"
        height="300"
        effect="fadeInUp"
        onClickAway={closeModal}
      >
        <HowToEdit />
        <button className="edit-button" onClick={() => closeModal()}>
          Close
        </button>
      </Modal>
    </div>
  )
};

const mapStateToProps = (state) => {
  //step 1
  return {
    howTo: state.howTo,
  };
};

export default connect(mapStateToProps, { xyz })(HowTo);
