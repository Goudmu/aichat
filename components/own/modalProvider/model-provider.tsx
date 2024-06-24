"use client";

import React, { useEffect, useState } from "react";
import ProModal from "../proModal/pro-modal";

const ModalProvider = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
  }, []);
  if (!isMounted) {
    return;
  }
  return (
    <>
      <ProModal />
    </>
  );
};

export default ModalProvider;
