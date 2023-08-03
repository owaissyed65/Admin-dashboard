"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const AlertModal = ({ isOpen, onClose, onConfirm, loading }) => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title={"Are you sure??"}
      description={"This action cannot be undone"}
      isOpen={isOpen}
      onClose={onClose}
      
    >
      <div className="space-x-2 pt-2 flex justify-end items-center">
        <Button variant="outline" disabled={loading} onClick={onConfirm}>Continue</Button>
        <Button variant="destructive" onClick={onClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
