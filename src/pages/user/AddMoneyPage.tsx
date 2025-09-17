import { AddMoneyForm } from "@/components/modules/user/AddMoneyForm";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import successImage from "../../assets/images/accept.png";
import failedImage from "../../assets/images/failed.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AddMoneyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  const tran_id = queryParams.get("transactionId");
  const amount = queryParams.get("amount");
  const message = queryParams.get("message");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status) {
      setShowModal(true);
    }
  }, [status]);

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/user/dashboard/overview");
  };
  return (
    <Card className="rounded-md max-w-2xl min-w-[340px] mx-auto">
      <CardContent>
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="w-[20rem] rounded-md">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription className="flex flex-col gap-2">
                {status === "success" ? (
                  <img src={successImage} className="h-10 w-10 mx-auto" alt="" />
                ) : <img src={failedImage} className="h-10 w-10 mx-auto" alt="" />}
                <span className="text-center">{message}</span>
              </DialogDescription>
              <div className="flex flex-col justify-start p-0 mt-5">
                <span className="text-start">
                  <span className="font-bold">Amount: </span>{" "}
                  <span>{amount}</span>
                </span>
                <span className="text-start">
                  <span className="font-bold">Tnx Id: </span>{" "}
                  <span>{tran_id}</span>
                </span>
              </div>
            </DialogHeader>
            <Button
              onClick={handleConfirm}
              type="submit"
              className="hover:cursor-pointer"
            >
              Back to Home
            </Button>
          </DialogContent>
        </Dialog>
        <AddMoneyForm />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
