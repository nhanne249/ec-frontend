"use client";
import { Button } from "@nextui-org/button";
import { redirect } from "next/navigation";
const NavigateBtn = ({ link, content }) => {
  return (
    <Button
      color="default"
      variant="solid"
      size="lg"
      className="bg-white text-blue-600 hover:bg-blue-100"
      onClick={() => {
        redirect(link);
      }}
    >
      {content}
    </Button>
  );
};

export default NavigateBtn;
