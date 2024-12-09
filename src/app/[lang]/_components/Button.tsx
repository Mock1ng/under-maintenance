"use client";

import { Button } from "@/components/ui/button";

const ButtonClient = () => {
  return (
    <Button
      variant={"primary"}
      className="text-sm md:text-xl"
      onClick={() => location.reload()}
    >
      Refresh
    </Button>
  );
};

export default ButtonClient;
