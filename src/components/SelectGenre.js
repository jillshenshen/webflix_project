import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchDataByGenre } from '../store'


export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <Select
      onChange={(e) => {
        dispatch(fetchDataByGenre({ genre: e.target.value, type }));
      }}
    >
      {genres.map((genre) => {
        return (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}

const Select = styled.select`
  margin-left:2rem;
`;


  