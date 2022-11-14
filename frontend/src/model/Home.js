import axios from "axios";
import React, { useState, useEffect } from "react";

export const Home = () => {
  // const url = "https://assetcaredemo.keppelom.com/ah2";
  //const url = "http://localhost:5000/ah2stagingwebservice/";
  const url = process.env.REACT_APP_LOCALHOSTURL;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(url).then(
      (response) => {
        setProduct(response.data);
      },
      [url]
    );
  });
  console.log(product);

  return <div>{product.JIBMAX}</div>;
};
