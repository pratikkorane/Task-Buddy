import React, { useState } from "react";

const faqData = [
  {
    question: "How do I sign up to become a Tasker?",
    answer: "To sign up, visit the Tasker registration page, fill in your details, and submit the required documents. Once approved, you can start offering your services."
  },
  {
    question: "How do I update my profile information?",
    answer: "You can update your profile information by navigating to the 'Profile' section in your dashboard and clicking the 'Edit' button."
  },
  {
    question: "What services can I offer as a Tasker?",
    answer: "You can offer household services, skilled tasks like plumbing or electrical repairs, and on-demand driving or moving services."
  },
  {
    question: "How do I accept a task request?",
    answer: "When a customer books your service, you will receive a notification. Go to your dashboard and accept or decline the request."
  },
  {
    question: "How do I get paid?",
    answer: "All payments will be processed through the platform and transferred to your registered bank account weekly."
  },
  {
    question: "What should I do if I encounter an issue with a customer?",
    answer: "If you face any issues, contact our support team at h.mprathamesh@gmail.com or call +91-9156969632."
  },
  {
    question: "Can I cancel a task after accepting it?",
    answer: "Yes, you can cancel a task if necessary, but frequent cancellations may impact your ratings. Inform the customer in advance if possible."
  },
  {
    question: "How are my ratings calculated?",
    answer: "Your ratings are based on customer feedback and task completion rates. Ensure quality service to maintain high ratings."
  },
  {
    question: "What happens if a customer doesn’t pay?",
    answer: "If a customer doesn’t pay, report the issue to our support team immediately for resolution."
  },
  {
    question: "How do I deactivate my account?",
    answer: "To deactivate your account, go to the 'Settings' section and select the 'Deactivate Account' option."
  }
];

const FAQPage = () => {
  const [visibleAnswerIndex, setVisibleAnswerIndex] = useState(null);

  const toggleAnswerVisibility = (index) => {
    setVisibleAnswerIndex(visibleAnswerIndex === index ? null : index);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        {faqData.map((faq, index) => (
          <div key={index} className="mb-3 border rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{faq.question}</h5>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => toggleAnswerVisibility(index)}
              >
                {visibleAnswerIndex === index ? "Hide Answer" : "Show Answer"}
              </button>
            </div>
            {visibleAnswerIndex === index && (
              <p className="mt-3 text-secondary">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
