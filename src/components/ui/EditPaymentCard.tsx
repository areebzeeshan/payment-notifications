/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { setDoc, doc } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { toast } from "../utils/swal";
import { Button, Dialog, TextField } from "@mui/material";
import { grayColor, redColor } from "../utils/color";

export const EditPaymentCard = ({
  props,
  fetchUserDocs,
  showModal,
  setShowModal,
}) => {
  const [title, setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.description);
  const [paymentStatus, setPaymentStatus] = useState(props.paymentStatus);
  const [minDate, setMinDate] = useState("");
  const [date, setDate] = useState(() => {
    const givenDate = new Date(props.dueDate?.seconds * 1000);
    const year = givenDate.getFullYear();
    let month: number | string = givenDate.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let day: number | string = givenDate.getDate();
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  });

  useEffect(() => {
    if (!date) return;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month: number | string = currentDate.getMonth() + 1;
    let day: number | string = currentDate.getDate();
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    const minDate = `${year}-${month}-${day}`;
    setMinDate(minDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(false);

    try {
      const changingData = {
        title,
        description: desc,
        paymentStatus,
        dueDate: new Date(date),
      };
      const docRef = doc(database, "payment", props.id);
      await setDoc(docRef, changingData, { merge: true });
      fetchUserDocs();

      toast.fire({
        icon: "success",
        text: "Payment Updated Successfully!",
      });
    } catch (err) {
      console.error(err.message);

      toast.fire({
        icon: "error",
        text: "Failed to update payment details.",
        confirmButtonColor: "#f44336",
      });
    }
  };

  return (
    <div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <Dialog open={showModal}>
                <form
                  className="border-0 rounded-lg shadow-lg relative flex flex-col w-auto max-sm:w-11/12 mx-auto bg-white outline-none focus:outline-none"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  {/*header*/}
                  <div className="text-center p-5 border-b border-solid border-slate-200 rounded-t text-black">
                    <h3 className="text-3xl font-semibold mx-12">
                      Edit Your Payment
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div className="mb-6">
                      <TextField
                        type="text"
                        required
                        label="Title"
                        className="w-full"
                        defaultValue={title}
                        onChange={(e) => setTitle(() => e.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <TextField
                        type="text"
                        required
                        label="Description"
                        className="w-full"
                        defaultValue={desc}
                        onChange={(e) => setDesc(() => e.target.value)}
                      />
                    </div>
                    <div className="mb-6">
                      <TextField
                        type="date"
                        required
                        label="Date"
                        className="w-full"
                        onChange={(e) => setDate(() => e.target.value)}
                        defaultValue={date}
                      />

                      <div className="text-black mt-4 -mb-10 flex content-start items-center gap-1">
                        <input
                          type="checkbox"
                          name="payment"
                          style={{
                            width: "16px",
                            height: "16px",
                          }}
                          onChange={(e) =>
                            setPaymentStatus(() => e.target.checked)
                          }
                          defaultChecked={paymentStatus}
                        />
                        <label htmlFor="payment"> Payment Completed</label>
                      </div>
                      <br></br>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b gap-8">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: redColor,
                        "&:hover": {
                          backgroundColor: redColor,
                        },
                      }}
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: grayColor,
                        "&:hover": {
                          backgroundColor: grayColor,
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </Dialog>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};
