import React from "react";
import BentoCard from "./BentoCard";

const DynamicCards = () => {
  return (
    <div className="grid w-5/6 grid-cols-1 gap-4 p-4 md:grid-cols-2">
      <BentoCard
        className="p-4"
        description="This is the best library for creating dynamic cards"
        title="CuiCui"
      >
        You can also add content inside the card
      </BentoCard>
      <BentoCard
        className="p-4"
        description="How fast is it now to create cards"
        title="Just crazy"
      >
        If leave the card empty, it will still look good
      </BentoCard>
      <BentoCard
        description="I just have to copy paste the code and it instantly works"
        title="Amazing"
      />
      <BentoCard
        description="I can't believe how easy it is to use"
        title="Unbelievable"
      />
    </div>
  );
};

export default DynamicCards;
