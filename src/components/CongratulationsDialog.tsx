
import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface CongratulationsDialogProps {
  open: boolean;
  onClose: () => void;
}

const CongratulationsDialog = ({ open, onClose }: CongratulationsDialogProps) => {
  useEffect(() => {
    if (open) {
      const timeout = setTimeout(onClose, 2000); // 2 seconds then close
      return () => clearTimeout(timeout);
    }
  }, [open, onClose]);
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Congratulations 🎉</DialogTitle>
          <DialogDescription>
            Your account has been created! Redirecting you to login...
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CongratulationsDialog;
