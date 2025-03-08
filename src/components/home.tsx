import React from "react";
import GreetingCard from "./GreetingCard";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-50 to-purple-100">
      <GreetingCard
        title="Happy Women's Day"
        message="Happy Women's Day!"
        subMessage="С 8 Марта! Пусть весна подарит вам море улыбок, тепла, радости, любви и исполнения самых заветных желаний!"
        petalCount={30}
        petalColors={[
          "#FFD6E0",
          "#FFACC7",
          "#FF8DC7",
          "#FDCEDF",
          "#F8BBD0",
          "#F48FB1",
          "#F06292",
        ]}
      />
    </div>
  );
};

export default Home;
