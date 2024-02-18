import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import Heart from '../../assets/Heart';
import './Post.css';
import { firestore } from '../../Firebase/config';
import { PostContext } from '../../Store/PostContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([])
  const {setpostDetails} = useContext(PostContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('1');
        const querySnapshot = await getDocs(collection(firestore, "products"));
        const productsData = querySnapshot.docs.map(product => ({
          id: product.id,
          ...product.data()
        }));
        console.log('2');
        setProducts(productsData);
        console.log(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);


   const handleClick =(product) => {
    setpostDetails(product)
    console.log(product)
    navigate('/viewpost')
   }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

       <div className="cards">
  { products && products.map((product) => {
    return (
      <div onClick={()=>handleClick(product)}  key={product.id} className="card">
        <div className="favorite">
          <Heart></Heart>
        </div>
        <div className="image">
          <img src={product.url} alt="" />
        </div>
        <div className="content">
          <p className="rate">&#x20B9; {product.price}</p>
          <span className="kilometer">{product.category}</span>
          <p className="name">{product.name}</p>
        </div>
        <div className="date">
        <span>{product.createdAt.toDate().toLocaleDateString()}</span>        </div>
      </div>
    );
  })}
</div>


      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
