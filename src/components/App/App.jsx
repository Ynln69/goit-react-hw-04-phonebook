import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { useState } from 'react';
import { MainBox, Text } from './App.styled';
import useLocalStorage from 'hooks/useLocalStorage';
import Section from 'components/Section/Section';
import Form from 'components/PhoneForm/PhoneForm';
import initialContact from '../data/contact.json';
import FilterContacts from 'components/Filter/Filter';
import ContactsList from 'components/ContactsList/ContactsList';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', initialContact);
  const [filter, setFilter] = useState('');

  const addContact = value => {
    for (const contact of contacts) {
      if (value.name.toLowerCase() === contact.name.toLowerCase()) {
        return alert(`${value.name} is already in contact`);
      } else if (value.number === contact.number) {
        return alert(`${value.number} is already in contact`);
      }
    }
    setContacts([...contacts, { id: nanoid(), ...value }]);
    Notiflix.Notify.success(
      'You have added a new contact to your contact list'
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const handelChangeFind = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = (contacts, filter) => {
    const normalizedFilter = filter ? filter.toLowerCase() : '';
    return contacts && Array.isArray(contacts)
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      : [];
  };

  const visibleContacts = getVisibleContacts(contacts, filter);
  return (
    <MainBox>
      <Section title="Phonebook">
        <Form onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <FilterContacts onChangeFind={handelChangeFind} value={filter} />
        {contacts.length === 0 && (
          <Text>You haven't added any contacts yet</Text>
        )}
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </Section>
    </MainBox>
  );
};
export default App;
