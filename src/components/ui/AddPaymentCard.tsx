import { addDoc, collection } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";
import { database } from "../../firebase/firebase";
import { MySwal } from "../utils/swal";
import { Button, TextField } from "@mui/material";
import { grayColor, redColor } from "../utils/color";

export const AddPaymentCard = ({ docId, fetchUserDocs }) => {
  const [showModal, setShowModal] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const paymentRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    if (dateRef.current?.value) return;
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

    const title = titleRef.current?.value;
    const description = descRef.current?.value;
    const paymentStatus = paymentRef.current?.checked;
    const dueDate = dateRef.current?.value
      ? new Date(dateRef.current.value)
      : null;

    try {
      // console.log("title : ", title)
      await addDoc(collection(database, "payment"), {
        title: title,
        description: description,
        paymentStatus: paymentStatus,
        dueDate: dueDate,
        user: `/${docId}`,
        isDeleted: false,
      });
      MySwal.fire("Success", "Payment added successfully", "success");
      fetchUserDocs(false);
    } catch (e) {
      console.error(e);
      MySwal.fire(
        "Error",
        "An error occurred while adding the payment",
        "error"
      );
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: grayColor,
          "&:hover": {
            backgroundColor: grayColor,
          },
        }}
        onClick={() => setShowModal(true)}
      >
        Add payment
      </Button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-auto max-sm:w-11/12 mx-auto bg-white outline-none focus:outline-none"
                onSubmit={(e) => handleSubmit(e)}
              >
                {/*header*/}
                <div className="flex justify-center p-5 border-b border-solid border-slate-200 rounded-t text-black">
                  <h3 className="text-3xl font-semibold mx-10">
                    Create a New Payment
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mb-6">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-black"
                    >
                      Title
                    </label>
                    <input
                      type="title"
                      id="title"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Title for payment"
                      required
                      ref={titleRef}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-black"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Description..."
                      ref={descRef}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="date"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-black"
                    >
                      Due Date
                    </label>
                    <div className="relative max-w-sm">
                      {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div> */}
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                      <input
                        type="date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                        ref={dateRef}
                        min={minDate}
                      />
                    </div>
                    <div className="text-black mt-4 -mb-10 flex content-start items-center gap-1">
                      <input
                        type="checkbox"
                        name="payment"
                        value="paymentStatus"
                        ref={paymentRef}
                        style={{
                          width: "16px",
                          height: "16px",
                        }}
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
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
