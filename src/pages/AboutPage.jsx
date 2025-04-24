import React from 'react';
import Container from 'react-bootstrap/Container';

// --- CORRECTED: Function name changed to AboutPage ---
function AboutPage() {
  return (
    // --- ADDED: mb-5 class for bottom margin ---
    <Container className="mt-4 mb-5">
      <h1>Our Mission: Making "Healthy" Taste Unbelievably Delicious.</h1>
      <p>
        We started Power Snacks because we believe you shouldn't have to choose between treats you love and fuel your body needs. Frustrated by bland health foods and sugary snacks, we challenged ourselves to create something better. That's how our innovative chickpea-based cookie dough was born a way to indulge your cravings with plant-powered, protein-packed goodness that genuinely tastes amazing.
      </p>
      <h2>The Story of Power Snacks: Revolutionizing Snack Time, One Delicious Bite at a Time.</h2>
      <p>
        Why chickpeas? Because we saw an opportunity to turn a humble legume into the base for an incredible, healthier snack. Power Snacks is about innovative thinking and a passion for creating delicious, convenient food that fits your healthy lifestyle. We reimagined cookie dough to be gluten-free, dairy-free, nut-free, packed with benefits, and tasting so good, you'll forget what it's made from!
      </p>
      {/* You can add more content or structure here if needed */}
    </Container>
  );
}

// --- CORRECTED: Export name changed to AboutPage ---
export default AboutPage;