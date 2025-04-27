import React, { useEffect, useState } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { PersonCircle, Search } from "react-bootstrap-icons";
import userIdAtom from "../atoms/userIdAtom";
import userAtom from "../atoms/userAtom";
import { useAtom } from "jotai";
import { useNavigate, useLocation } from "react-router-dom";

import "../pages/OpenAnimation.css";
import pokeball from "../assets/individual_pokeball.svg";

interface CustomNavbarProps {
  setNavbarExpanded: (expanded: boolean) => void;
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({ setNavbarExpanded }) => {
  const [username, setUsername] = useAtom(userIdAtom);
  const [user, setUser] = useAtom(userAtom);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [messageCount, setMessageCount] = useState(0);
  // const [balance,] = useState(0);
  // const [canClaim,] = useState(false);

  const handleLogout = () => {
    setUsername("");
    setUser(null);
    navigate("/");
  };

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("location:", location.pathname);
  }, [location]);

  useEffect(() => {
    if (username) {
      fetch(`${import.meta.env.VITE_API_URL}/api/messages/${username}/count`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setMessageCount(data.unread_count);
        })
        .catch((error) => {
          console.error("Error fetching message count:", error);
        });
    }
  }),
    [username];

  useEffect(() => {
    if (username) {
      fetch(`${import.meta.env.VITE_API_URL}/user/${username}`)
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
  }, [username]);

  return (
    <Navbar bg="transparent" className="shadow-sm" expand="lg" onToggle={(expanded) => setNavbarExpanded(expanded)}>
      <Navbar.Brand style={{ paddingLeft: "20px" }} href="/">
        Pokétrade
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav" style={{ gap: "5px" }}>
        <Nav className="me-auto">
          <Nav.Link
            style={{
              color: location.pathname === "/marketplace" ? "black" : "#513639",
              textAlign: "center",
            }}
            href="/marketplace"
          >
            Marketplace
          </Nav.Link>
          <Nav.Link
            style={{
              color: location.pathname === "/trade" ? "black" : "#513639",
              textAlign: "center",
            }}
            href="/trade"
          >
            Trade
          </Nav.Link>
          <Nav.Link
            style={{
              color: location.pathname === "/store" ? "black" : "#513639",
              textAlign: "center",
            }}
            href="/store"
          >
            Store
          </Nav.Link>
          <Nav.Link
            style={{
              color: location.pathname === "/creator" ? "black" : "#513639",
              textAlign: "center",
            }}
            href="/creator"
          >
            Creator
          </Nav.Link>
          <Nav.Link
            style={{
              color: location.pathname === "/battles" ? "black" : "#513639",
              textAlign: "center",
            }}
            href="/battles"
          >
            Battles
          </Nav.Link>
          {isMobile && (
            <Nav.Link
              style={{
                color: location.pathname === "/search" ? "black" : "#513639",
                textAlign: "center",
              }}
              href="/search"
            >
              Search
            </Nav.Link>
          )}
          {user?.can_claim && location.pathname != "/loginrewards" && username && (
            <Nav.Link
              style={{
                textAlign: "center",
                padding: "0px",
                margin: "0px",
              }}
              href="/loginrewards"
            >
              <img
                className="blinking-image"
                src={pokeball}
                onClick={() => navigate("/loginrewards")}
                alt="Login Reward"
                style={{
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                  marginLeft: isMobile ? "0px" : "10px",
                  marginTop: isMobile ? "0px" : "3px",
                  marginRight: isMobile ? "10px" : "0px",
                  marginBottom: isMobile ? "10px" : "0px",
                }}
              />
              {isMobile && <>Login Rewards</>}
            </Nav.Link>
          )}
        </Nav>
        {!isMobile && (
          <Search
            style={{
              color: location.pathname === "/search" ? "black" : "#513639",
              textAlign: "center",
              marginRight: "10px",
              marginBottom: "5px",
              cursor: "pointer",
            }}
            size={17}
            onClick={() => navigate("/search")}
          />
        )}

        <div style={{ marginRight: isMobile ? "" : "12px", textAlign: "center" }}>
          {username && (
            <span className="welcome-message" style={{ fontWeight: "bold", textAlign: "center" }}>
              {username} : <span className="text-muted">${user?.wallet_balance}</span>
            </span>
          )}
        </div>
        <Dropdown style={{ marginRight: isMobile ? "" : "10px", width: isMobile ? "" : "auto" }}>
          <Dropdown.Toggle id="dropdown-basic" variant="outline-dark" style={{ width: "100%" }}>
            <PersonCircle />
            {isMobile && (
              <span
                style={{
                  marginLeft: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Profile
              </span>
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu
            align="end"
            style={{
              width: isMobile ? "100%" : "200px",
            }}
          >
            {username ? (
              <>
                <Dropdown.Item href="/messages">
                  Messages
                  {messageCount > 0 && (
                    <span style={{ float: "right", paddingBottom: "2px" }} className="badge bg-danger">
                      {messageCount >= 100 ? "99+" : messageCount}
                    </span>
                  )}
                </Dropdown.Item>
                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item href="/login">Login</Dropdown.Item>
                <Dropdown.Item href="/register">Register</Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
