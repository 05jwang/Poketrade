import React, { useState, useEffect } from "react";

import userIdAtom from "../atoms/userIdAtom";
import { useAtomValue, useAtom } from "jotai";
import { Card, Alert } from "react-bootstrap";
import "./OpenAnimation.css";
import pokeball from "../assets/individual_pokeball.svg";

import LoginPrompt from "./LoginPrompt";

const LoginRewards: React.FC = () => {
  const userId = useAtomValue(userIdAtom);

  const [balance, setBalance] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [last_claim_date, setLastClaimDate] = useState<Date | null>(null);
  const [earned, setEarned] = useState(0);
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/user/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Wallet data:", data);
          setBalance(data.wallet_balance);
          setCanClaim(data.can_claim);
          setLastClaimDate(data.last_claim_date);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          alert("Error fetching user data");
        });
    }
  }, [userId]);

  const calculateTimeRemaining = () => {
    if (last_claim_date) {
      const now = new Date();
      const lastClaim = new Date(last_claim_date);

      const millisecondsIn24Hours = 24 * 60 * 60 * 1000;
      const timeDiff = now.getTime() - lastClaim.getTime();

      if (timeDiff >= millisecondsIn24Hours) {
        return "0 hours and 0 minutes";
      }

      // Time remaining until 24 hours have passed
      const timeRemaining = millisecondsIn24Hours - timeDiff;

      const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
      const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));

      return `${hours} hours and ${minutes} minutes`;
    }

    return "0 hours and 0 minutes";
  };

  const handleRewardClaim = () => {
    if (!userId) return;
    fetch(`http://localhost:8000/claim/${userId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Reward claimed:", data);
        setBalance(data.wallet_balance);
        setLastClaimDate(data.last_claim_date);
        setEarned(data.amount_claimed);
      })
      .catch((error) => {
        console.error("Error claiming reward:", error);
        alert("Failed to claim the reward. Please try again later.");
      });
  };

  return (
    <div>
      <h1>Login Reward</h1>
      {userId ? (
        <Card
          style={{
            maxWidth: "min(1000px, 90%)",
            margin: "auto",
            marginTop: "50px",
          }}
        >
          <Card.Body>
            <Card.Title
              style={{
                textAlign: "end",
              }}
            >
              Current Balance:
              {" $" + balance}
            </Card.Title>
            {canClaim ? (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                {earned !== 0 ? (
                  <>
                    <Alert variant="success">Congratulations! You have earned ${earned}!</Alert>
                  </>
                ) : (
                  <>
                    <img
                      className="blinking-image"
                      src={pokeball}
                      alt="Pokeball"
                      width="300"
                      onClick={handleRewardClaim}
                      style={{
                        cursor: "pointer",
                        marginBottom: "30px",
                      }}
                    />
                    <p>Click the pokéball to claim your daily login reward</p>
                  </>
                )}
              </div>
            ) : (
              <Alert variant="danger">You must wait {calculateTimeRemaining()} before claiming your next reward.</Alert>
            )}
          </Card.Body>
        </Card>
      ) : (
        <LoginPrompt />
      )}
    </div>
  );
};

export default LoginRewards;
