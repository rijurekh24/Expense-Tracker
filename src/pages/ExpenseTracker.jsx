import React, { useState } from "react";
import "./ExpenseTracker.css";
import { useAddTransaction } from "../hooks/useAddTransaction";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("Expense");

  const { balance, expenses, income } = transactionTotals;

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home">
      <div className="heading">
        <h1
          style={{
            padding: "20px",
            fontSize: "35px",
            color: "#023047",
            fontWeight: "bold",
          }}
        >
          Expense Tracker
        </h1>

        <div className="right">
          <div className="user">
            {profilePhoto && (
              <img className="profile-photo" src={profilePhoto} alt="" />
            )}
            <h4 className="px-2 pt-2">{name}</h4>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button className="sign-out-button" onClick={signUserOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="content container mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="expense-tracker col-lg-5 col-md-10 col-sm-10 col-11 mx-5 p-5">
            <div className="">
              <div className="balance">
                <h4>Current Balance</h4>
                {balance >= 0 ? <h2>₹{balance}</h2> : <h2>-₹{balance * -1}</h2>}
                <br />
              </div>

              <div className="summary">
                <div className="income">
                  <h5>Income</h5>
                  <p>₹{income}</p>
                </div>
                <div className="expenses">
                  <h5>Expenses</h5>
                  <p>₹{expenses}</p>
                </div>
              </div>

              <form action="" className="add-transaction" onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  className="my-3"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={transactionAmount}
                  required
                  onChange={(e) => setTransactionAmount(e.target.value)}
                />
                <br />

                <div className="my-2">
                  <input
                    type="radio"
                    id="Expense"
                    value="Expense"
                    required
                    onChange={(e) => setTransactionType(e.target.value)}
                    checked={transactionType === "Expense"}
                  />
                  <label htmlFor="Expense" className="me-3">
                    Expense
                  </label>
                  <input
                    type="radio"
                    id="Income"
                    value="Income"
                    required
                    onChange={(e) => setTransactionType(e.target.value)}
                    checked={transactionType === "Income"}
                  />
                  <label htmlFor="Income">Income</label>
                </div>
                <br />
                <button type="submit">Add Transaction</button>
              </form>
            </div>
          </div>

          <div className="transactions col-lg-3 col-sm-10 col-md-10 col-11 p-0">
            <h2 className="text-center">Transation History</h2>
            <div className="list">
              <ul>
                {transactions.map((transaction) => {
                  const { description, transactionAmount, transactionType } =
                    transaction;
                  return (
                    <li key={nanoid()}>
                      <h4>{description}</h4>
                      <p>
                        ₹{transactionAmount}.
                        <label
                          style={{
                            color:
                              transactionType === "Expense" ? "red" : "green",
                            fontWeight: "600",
                          }}
                        >
                          {transactionType}
                        </label>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
