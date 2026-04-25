import TableComponent from "./components/TableComponent";
import FormComponent from "./components/FormComponent";
import { useEffect, useState } from "react";
import { update, insert, findAll, remove } from "./services/PersonService";

function App() {
  const [persons, setPersons] = useState([]);
  const [buttonInsert, setButtonInsert] = useState(true);
  const [person, setPerson] = useState({ id: null, name: "", city: "" });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPersons = async () => {
      const data = await findAll();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  const getPerson = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      setPerson({
        ...person,
        [name]: files[0],
        preview: URL.createObjectURL(files[0]),
      });
    } else {
      setPerson({ ...person, [name]: value });
    }
  };

  const insertPerson = async () => {
    setButtonInsert(true);
    const newPerson = await insert(person);
    setPersons([...persons, newPerson]);
    closeForm();
  };

  const updatePerson = async () => {
    const updated = await update(person.id, person);
    setPersons(persons.map((p) => (p.id === updated.id ? updated : p)));
    closeForm();
  };

  const deletePerson = async () => {
    await remove(person.id);
    setPersons(persons.filter((obj) => obj.id !== person.id));
    closeForm();
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
        updatePerson={getPerson}
        insert={insertPerson}
        person={person}
        update={updatePerson}
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
