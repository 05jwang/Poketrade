import React, { useEffect, useState } from "react";

import userIdAtom from "../atoms/userIdAtom";
import { useAtomValue } from "jotai";
import { Card, ListGroup } from "react-bootstrap";
import PokemonCard from "../types/Card";

import LoginPrompt from "./LoginPrompt";

type OwnedCard = {
  card_details: PokemonCard;
  quantity: number;
  id: number;
}

type User = {
  username: string;
  email: string;
  wallet_balance: number;
  last_claim_date: Date | null;
  can_claim: boolean;
  owned_cards: OwnedCard[];
};

const Profile: React.FC = () => {
  const userId = useAtomValue(userIdAtom);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (userId) {
      fetch(`${import.meta.env.VITE_API_URL}/user/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("User data:", data);
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          alert("Error fetching user data");
        });
    }
  }, [userId]);
  return (
    <div>
      <h1>Profile</h1>
      {userId ? (
        <Card
          style={{
            maxWidth: "min(1000px, 90%)",
            margin: "auto",
            marginTop: "50px",
          }}
        >
          <Card.Body>
            <Card.Title>Profile Information</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Username:</strong> {user?.username}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {user?.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Wallet Balance:</strong> ${user?.wallet_balance}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Last Rewards Claim Date:</strong>{" "}
                {user?.last_claim_date ? new Date(user.last_claim_date).toLocaleDateString() : "Never"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Login Reward:</strong>{" "}
                {user?.can_claim ? (
                  <a href="/loginrewards" style={{ color: "green", textDecorationLine: "underline" }}>
                    Available
                  </a>
                ) : (
                  <span style={{ color: "red" }}>Not Available</span>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Deck:</strong>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "16px",
                  marginTop: "16px"
                }}>
                  {user?.owned_cards.map(owned_card => (
                    <div key={owned_card.id} >
                      <img src={owned_card.card_details.image_url} style={{ width: "100%"}}/> {"Quantity: " + owned_card.quantity}
                    </div>
                  ))}
                </div>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                Deck:
                {user?.owned_cards.map(owned_card => (
                  <div key={owned_card.id}>
                    <img src={owned_card.card_details.image_url}/>
                    {owned_card.quantity}
                  </div>
                ))}
              </ListGroup.Item> */}
            </ListGroup>
          </Card.Body>
        </Card>
      ) : (
        <LoginPrompt />
      )}
    </div>
  );
};

export default Profile;
