import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface Animal {
  _id: string;
  name: string;
  species: string;
  age: number;
  description: string;
}

const AdminPage: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [newAnimal, setNewAnimal] = useState<Partial<Animal>>({ name: '', species: '', age: 0, description: '' });
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get<Animal[]>('http://localhost:5002/api/animals');
        setAnimals(response.data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    fetchAnimals();
  }, []);

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5002/api/animals', newAnimal);
      setAnimals([...animals, response.data]);
      setNewAnimal({ name: '', species: '', age: 0, description: '' });
    } catch (error) {
      console.error('Error creating animal:', error);
    }
  };

  const handleUpdate = async () => {
    if (editingAnimal) {
      try {
        const response = await axios.put(`http://localhost:5002/api/animals/${editingAnimal._id}`, editingAnimal);
        setAnimals(animals.map(animal => (animal._id === editingAnimal._id ? response.data : animal)));
        setEditingAnimal(null);
      } catch (error) {
        console.error('Error updating animal:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5002/api/animals/${id}`);
      setAnimals(animals.filter(animal => animal._id !== id));
    } catch (error) {
      console.error('Error deleting animal:', error);
    }
  };

  return (
    <Container>
      <Title>Admin Page</Title>
      <Form onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
        <FormTitle>Create Animal</FormTitle>
        <Input type="text" value={newAnimal.name} onChange={(e) => setNewAnimal({ ...newAnimal, name: e.target.value })} placeholder="Name" required />
        <Input type="text" value={newAnimal.species} onChange={(e) => setNewAnimal({ ...newAnimal, species: e.target.value })} placeholder="Species" required />
        <Input type="number" value={newAnimal.age} onChange={(e) => setNewAnimal({ ...newAnimal, age: +e.target.value })} placeholder="Age" required />
        <Textarea value={newAnimal.description} onChange={(e) => setNewAnimal({ ...newAnimal, description: e.target.value })} placeholder="Description"></Textarea>
        <Button type="submit">Create</Button>
      </Form>

      {editingAnimal && (
        <Form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          <FormTitle>Edit Animal</FormTitle>
          <Input type="text" value={editingAnimal.name} onChange={(e) => setEditingAnimal({ ...editingAnimal, name: e.target.value })} required />
          <Input type="text" value={editingAnimal.species} onChange={(e) => setEditingAnimal({ ...editingAnimal, species: e.target.value })} required />
          <Input type="number" value={editingAnimal.age} onChange={(e) => setEditingAnimal({ ...editingAnimal, age: +e.target.value })} required />
          <Textarea value={editingAnimal.description} onChange={(e) => setEditingAnimal({ ...editingAnimal, description: e.target.value })}></Textarea>
          <Button type="submit">Update</Button>
          <Button type="button" onClick={() => setEditingAnimal(null)} cancel>Cancel</Button>
        </Form>
      )}

      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Species</Th>
            <Th>Age</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {animals.map(animal => (
            <Tr key={animal._id}>
              <Td>{animal.name}</Td>
              <Td>{animal.species}</Td>
              <Td>{animal.age}</Td>
              <Td>{animal.description}</Td>
              <Td>
                <Button onClick={() => setEditingAnimal(animal)}>Edit</Button>
                <Button onClick={() => handleDelete(animal._id)} delete>Delete</Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPage;

// Styled components

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const FormTitle = styled.h2`
  margin-bottom: 15px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button<{ cancel?: boolean, delete?: boolean }>`
  padding: 10px 15px;
  margin-right: 10px;
  background: ${props => props.cancel ? '#ccc' : props.delete ? '#e74c3c' : '#3498db'};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: ${props => props.cancel ? '#b3b3b3' : props.delete ? '#c0392b' : '#2980b9'};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 10px;
  background: #3498db;
  color: #fff;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: #f2f2f2;
  }
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

