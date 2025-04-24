import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import ProductCard from '../components/Products/ProductCard'; 
import chocolateTube from '../assets/chocolateTube.jpg';

function HomePage() {

  // Sample data for the featured product card
  const featuredProduct = {
    id: 1, // Example ID
    name: "Cookie Dough Tube",
    flavor: "Chocolate Chunk",
    type: "Tube",
    price: "5.99",
    description: "Ready-to-bake chocolate chunk cookie dough.",
    displayImage: chocolateTube 
  };

  return (
    <> {/* Use a Fragment <>...</> if returning multiple top-level elements */}
      {/* 1. Prominent Welcome Section */}
      {/* bg-light for background, p-5 for padding, rounded corners, mb-4 for margin bottom, text-center */}
      <div className="bg-light p-5 rounded mb-4 text-center">
        <Container> {/* Optional inner container if you want tighter text width */}
          {/* display-* classes make headings larger */}
          <h1 className="display-4">Welcome to Power Snacks!</h1>
          <h2 className="display-6">Cookie Dough That Powers Your Goals.</h2>
          {/* lead class makes paragraph text slightly larger/stand out */}
          <p className="lead mt-4">
            Meet POWER SNACKS, The high protein, high fiber, and amazing taste cookie dough you've been waiting for. We start with chickpeas to create amazing-tasting treats that are high in protein and fiber, lower in sugar, and completely plant-based. Grab our gluten-free, dairy-free, and nut-free Cookie Dough Bites or Tubes in Chocolate Chunk or Caramel for the perfect boost anytime, anywhere.
          </p>
        </Container>
      </div>

      {/* 2. Featured Product Section */}
      <Container className="mt-5 mb-5"> {/* Add margin top for spacing */}
        <h2 className="text-center mb-4">Featured Product</h2>
        {/* Center the column within the row */}
        <Row className="justify-content-center">
           {/* Define column width (e.g., takes 6/12 on md, 4/12 on lg) */}
          <Col md={6} lg={4}>
             {/* Render the ProductCard with the sample data */}
            <ProductCard product={featuredProduct} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;