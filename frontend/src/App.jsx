import "bootstrap/dist/css/bootstrap.min.css";
import TableComponent from "./components/TableComponent";
import FormComponent from "./components/FormComponent";
import { useEffect, useState } from "react";

function App() {
  const [persons, setPersons] = useState([]);
  const [buttonInsert, setButtonInsert] = useState(true);
  const [person, setPerson] = useState({ id: null, name: "", city: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/persons")
      .then((res) => res.json())
      .then((data) => setPersons(data));
  }, []);

  const updatePerson = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const insert = () => {
    setButtonInsert(true);
    fetch("http://localhost:8080/persons", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(person),
    })
      .then((res) => res.json())
      .then((p) => {
        setPersons((vector) => [...vector, p]);
        setPerson({ id: null, name: "", city: "" });
      });
    closeForm();
  };

  const update = () => {
    fetch("http://localhost:8080/persons/" + person.id, {
      method: "PUT",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(person),
    })
      .then((res) => res.json())
      .then((p) => {
        setPersons(persons.map((obj) => (obj.id === p.id ? p : obj)));
        closeForm();
      });
  };

  const deletePerson = () => {
    fetch("http://localhost:8080/persons/" + person.id, {
      method: "DELETE",
    }).then(() => {
      setPersons(persons.filter((obj) => obj.id !== person.id));
      closeForm();
    });
  };

  const selectPerson = (index) => {
    setPerson(persons[index]);
    setButtonInsert(false);
  };

  const openForm = () => {
    setShowModal(true);
  };

  const closeForm = () => {
    setShowModal(false);
    setPerson({ id: null, name: "", city: "" });
    setButtonInsert(true);
  };

  return (
    <>
      <FormComponent
        button={buttonInsert}
        updatePerson={updatePerson}
        insert={insert}
        person={person}
        update={update}
        deletePerson={deletePerson}
        showModal={showModal}
        closeForm={closeForm}
      ></FormComponent>
      <TableComponent
        registries={persons}
        fn={selectPerson}
        openForm={openForm}
      ></TableComponent>
    </>
  );
}

export default App;
