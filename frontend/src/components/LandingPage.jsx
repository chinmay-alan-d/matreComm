import React from 'react';
import NavigationBar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <NavigationBar/>
            <br />
            <h1>Welcome to   Library Management System</h1>
            <p>  Library Management System is a powerful tool designed to streamline library operations and enhance user experience. Our system offers a range of features to simplify library management and access to resources.</p>

            <div className="features">
                <h2>Key Features:</h2>
                <ul>
                    <li>Catalog Management: Easily manage your library's collection with intuitive cataloging features. Add, edit, and organize books, journals, multimedia, and more.</li>
                    <li>User Management: Efficiently manage library memberships, user accounts, and borrowing privileges. Keep track of user activities and preferences.</li>
                    <li>Search and Discovery: Empower users to explore your library's resources with advanced search and discovery tools. Enhance access to information and promote learning.</li>
                    <li>Reservation System: Allow users to reserve items in advance, ensuring availability and convenience. Manage reservations efficiently to optimize library resources.</li>
                </ul>
            </div>

            <div className="benefits">
                <h2>Benefits:</h2>
                <ul>
                    <li>Streamline library operations and save time.</li>
                    <li>Enhance user experience and satisfaction.</li>
                    <li>Improve resource utilization and access.</li>
                    <li>Increase visibility and accessibility of library collections.</li>
                    <li>Make informed decisions with data-driven insights.</li>
                </ul>
            </div>

            <div className="cta">
                <h2>Get Started Today!</h2>
                <p>Ready to transform your library experience? Sign up for a demo or contact us to learn more about how   Library Management System can benefit your institution or organization.</p>
                {/* <button className="demo-btn" onClick={()=>{navigate('/signup')}}>Sign Up for Demo</button> */}
                <Button variant="dark"style = {{position : 'relative',minWidth : '114px'}} onClick={()=>{navigate(`/login`)}}>Sign Up</Button>
                {/* <button className="contact-btn">Contact Us</button> */}
            </div>

            <div className="about">
                <h2>About Us:</h2>
                <p>  Library Management System is developed by, a leading provider of library solutions. With years of experience in the industry, we are committed to delivering innovative technology solutions to libraries worldwide.</p>
            </div>
        </div>
    );
}

export default LandingPage;
