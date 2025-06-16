import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Card, ListGroup } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import "./profile-view.scss";

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday?.slice(0, 10) || "");

  const favoriteMovies = movies.filter((m) =>
    user.favoriteMovies.includes(m._id)
  );

  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`https://movie-app-il-c396ba198e0e.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        birthday: birthday
      })
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        alert("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      })
      .catch(() => alert("Update failed"));
  };

  const handleDeregister = () => {
    if (!confirm("Are you sure you want to delete your account?")) return;

    fetch(`https://movie-app-il-c396ba198e0e.herokuapp.com/users/${user.username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (res.ok) {
          alert("Account deleted");
          localStorage.clear();
          setUser(null);
        } else {
          alert("Failed to delete account");
        }
      });
  };

  return (
    <Col md={8} className="mx-auto">
      <h2 className="my-4">Your Profile</h2>

      <Card className="mb-4">
        <Card.Header as="h4">Account Info</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Username:</strong> {user.username}</ListGroup.Item>
          <ListGroup.Item><strong>Email:</strong> {user.email}</ListGroup.Item>
          <ListGroup.Item><strong>Birthday:</strong> {user.birthday ? user.birthday.slice(0, 10) : "N/A"}</ListGroup.Item>
        </ListGroup>
      </Card>

      <Accordion defaultActiveKey={null} className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Update Your Information</Accordion.Header>
          <Accordion.Body>

            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="formBirthday" className="mb-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
              </Form.Group>

              <Button type="submit" variant="primary" className="me-2 custom-colored-button">Update</Button>
              <Button variant="warning" onClick={handleDeregister}>Deregister</Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <h3 className="mt-5">Favorite Movies</h3>
      <Row>
        {favoriteMovies.length === 0 ? (
          <p>You haven't added any favorite movies yet.</p>
        ) : (
          favoriteMovies.map((movie) => (
            <Col md={4} className="mb-3" key={movie._id}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </Col>
  );
};