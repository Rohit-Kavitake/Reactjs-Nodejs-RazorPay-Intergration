import React from "react";
import logo from "./logo.svg";
import "./App.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function App() {
  async function showRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:1337/razorpay", {
      method: "POST",
    }).then((t) => t.json());

    console.log(data);

    const options = {
			key: "rzp_test_Wdyyoi0X4Wqwqb",
			currency: data.currency,
			amount: data.amount,
			order_id: data.id,
			name: "Material Buy",
			description: "",
			image: "http://localhost:1337/logo.svg",
			handler: function (response) {
				alert(response.razorpay_payment_id);
				alert(response.razorpay_order_id);
				// alert(response.razorpay_signature);

				alert("Transaction successful");
			},
			prefill: {
				name: "Rohit",
				email: "rohit@rohit.com",
				contact : "9899999999",
			},
		};
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Razorpay payment portal </p>
        <button
          className="App-link"
          onClick={showRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pay now
        </button>
      </header>
    </div>
  );
}

export default App;
