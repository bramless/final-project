import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import './App.css';

function Content() {
  const baseUrl = 'https://api-bootcamp.do.dibimbing.id';
  const apiKey = 'w05KkI9AWhKxzvPFtXotUva-';
  const bearerToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5b0BnbWFpbC5jb20iLCJ1c2VySWQiOiI4ZDE1MGIwOC02ZDg0LTRlMjAtODUyYy03NTc2Mzk4OWE3NGQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODMxOTEyMzB9.N6x9qaAMCCBjWrrgfABkCgL_IrCL2W-DijdZ5GqPUSw';

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/foods`, {
        headers: {
          apikey: apiKey,
        },
      })
      .then(response => {
        setFoods(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleLikeUnlike = (id, isLiked) => {
    const endpoint = isLiked ? 'unlike' : 'like';

    axios
      .post(
        `${baseUrl}/api/v1/${endpoint}`,
        { id: id },
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      )
      .then(response => {
        const updatedFoods = foods.map(food => {
          if (food.id === id) {
            return {
              ...food,
              totalLikes: isLiked ? food.totalLikes - 1 : food.totalLikes + 1,
              isLiked: !isLiked,
            };
          }
          return food;
        });
        setFoods(updatedFoods);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderFoods = () => {
    return foods.map(data => (
      <div className="foodWrapper" key={data.id}>
        <img className="foodImage" src={data.imageUrl} alt={data.name} />
        <div className="foodDetails">
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <ul>
            {data.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>Rating: {data.rating}</p>
          <p>Total Likes: {data.totalLikes}</p>
          <Button variant="outline-primary"
            onClick={() => handleLikeUnlike(data.id, data.isLiked)}
            className={data.isLiked ? 'liked' : ''}
          >
            {data.isLiked ? 'Unlike' : 'Like'}
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <h2>Daftar Makanan</h2>
      {foods.length > 0 ? (
        <div className="foodContainer">{renderFoods()}</div>
      ) : (
        <p>Tidak ada makanan yang ditemukan.</p>
      )}
    </div>
  );
}

export default Content;