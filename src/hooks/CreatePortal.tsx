"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ClientPortalProps = {
  children: ReactNode;
  selector: string;
};

const CreatePortal = ({ children, selector }: ClientPortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
};

export default CreatePortal;
