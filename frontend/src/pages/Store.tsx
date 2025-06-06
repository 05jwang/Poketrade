import React, { useEffect } from "react";
import "./Store.css";
import "./OpenAnimation.css";

import userIdAtom from "../atoms/userIdAtom";
import { useAtomValue } from "jotai";

import { Carousel } from "react-bootstrap";

import LoginPrompt from "./LoginPrompt";

import Pack from "../types/Pack";
// import Card from "../types/Card";
// import { useAtom } from "jotai";

import pokeball from "../assets/individual_pokeball.svg";

import PackDetails from "../components/PackDetails";

import ApiService from "../services/ApiService";

const Store: React.FC = () => {
  const userId = useAtomValue(userIdAtom);
  const [selectedPack, setSelectedPack] = React.useState<Pack | null>(null);

  const [packs, setPacks] = React.useState<Pack[]>([]);
  const apiService = ApiService.getInstance();

  const handlePackSelect = (pack: Pack) => {
    setSelectedPack(pack);
  };

  const handleCloseOverlay = () => {
    setSelectedPack(null);
  };

  useEffect(() => {
    const fetchData = async() => {
      try{
        const fetchPacks = await apiService.fetchPacks();
        setPacks(fetchPacks);
        console.log(packs);
      } catch(error){
        console.log("failed to fetch packs", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Store</h1>
      {userId ? (
        <div>
          <Carousel
            interval={3000} // Change slide every 3 seconds
            indicators={true} // Show indicators
            controls={true} // Show previous/next controls
            style={{
              width: "min(600px, 90%)",
              margin: "auto",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {packs.map((pack, index) => (
              <Carousel.Item key={index} onClick={() => handlePackSelect(pack)} style={{ cursor: "pointer" }}>
                <div
                  style={{
                    backgroundColor: pack.color,
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={pokeball}
                    alt="Pokeball"
                    style={{ width: "200px", height: "200px", marginBottom: "10px" }}
                  />
                  <h3>{pack.name}</h3>
                  <p>Trade for a chance to get {pack.name} cards!</p>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          {selectedPack && <PackDetails pack={selectedPack} onClose={handleCloseOverlay} />}
        </div>
      ) : (
        <LoginPrompt />
      )}
    </div>
  );
};

export default Store;
