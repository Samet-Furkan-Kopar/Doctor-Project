// import { useState } from "react";
// import officeData from "../../../services/office-service";
// import { useRouter } from "next/router";
// import toast, { Toaster } from "react-hot-toast";

// const ContactWithAgent = () => {
//   const router = useRouter();
//   const officeId = router.query.id;
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission status

//   const resetForm = () => {
//     setName("");
//     setPhone("");
//     setEmail("");
//     setSubject("");
//     setMessage("");
//     setFormSubmitted(false); // Reset form submission status
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Form verilerini gönder
//       const response = await officeData.sendOfficeContactForm(
//         officeId,
//         name,
//         email,
//         subject,
//         phone,
//         message
//       );

//       console.log("Form gönderildi:", response);
//       toast.success("Form Başarıyla Gönderildi");
//       resetForm();
//       setFormSubmitted(true); // Set form submission status to true on success
//     } catch (error) {
//       console.error("Form gönderimi başarısız:", error);
//       toast.error("Form Başarıyla Gönderildi");
//     }
//   };

//   return (
//     <div>
//       <Toaster
//         position="top-right"
//         containerClassName=""
//         containerStyle={{}}
//         toastOptions={{
//           // Define default options
//           className: "",
//           duration: 5000,
//           style: {
//             background: "#363636",
//             color: "#fff",
//           },

//           // Default options for specific types
//           success: {
//             duration: 3000,
//             theme: {
//               primary: "green",
//               secondary: "black",
//             },
//           },
//         }}
//       />
//       {formSubmitted ? ( // Conditionally render the success message
//         <div className="d-flex flex-column align-items-center justify-content-center">
//           <img src="/assets/images/contact/success.png" alt="" />
//           <div>Formunuz başarıyla gönderildi.</div>
//         </div>
//       ) : (
//         <form action="#" onSubmit={handleSubmit}>
//           <ul className="sasw_list mb0">
//             <li className="search_area">
//               <div className="form-group mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="İsim"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//             </li>
//             {/* End li */}
//             <li className="search_area">
//               <div className="form-group mb-3">
//                 <input
//                   type="number"
//                   className="form-control"
//                   placeholder="Telefon"
//                   required
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </div>
//             </li>{" "}
//             {/* End li */}
//             <li className="search_area">
//               <div className="form-group mb-3">
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </li>{" "}
//             <li className="search_area">
//               <div className="form-group mb-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Konu"
//                   required
//                   value={subject}
//                   onChange={(e) => setSubject(e.target.value)}
//                 />
//               </div>
//             </li>
//             {/* End li */}
//             <li className="search_area">
//               <div className="form-group mb-3">
//                 <textarea
//                   id="form_message"
//                   name="form_message"
//                   className="form-control "
//                   rows="5"
//                   required
//                   placeholder="Mesajınız"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                 ></textarea>
//               </div>
//             </li>{" "}
//             {/* End li */}
//             <li>
//               <div className="search_option_button">
//                 <button type="button" className="btn btn-block btn-thm w-100">
//                   Gönder
//                 </button>
//               </div>
//             </li>{" "}
//             {/* End li */}
//           </ul>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ContactWithAgent;
import Link from "next/link";
import { useRouter } from "next/router";

const ContactWithAgent = () => {
  const route = useRouter();

 

  return (
    <div>
      <div></div>
      <div></div>
      <Link
              href="/mesajlarim"
              className={route.pathname === "/mesajlarim" ? "ui-active" : undefined}
            >
              Mesaj
            </Link>
      
    </div>
  );
};

export default ContactWithAgent;