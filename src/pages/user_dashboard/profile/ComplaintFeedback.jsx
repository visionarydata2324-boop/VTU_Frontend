import React, { useState } from "react";

const ComplaintFeedback = () => {
  const [formData, setFormData] = useState({
    feedbackType: "",
    subject: "",
    message: "",
    attachment: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validation
    if (!formData.feedbackType || !formData.subject || !formData.message) {
      setError("All fields are required.");
      return;
    }

    // Simulate sending data to the server
    setTimeout(() => {
      setMessage("Thank you! Your feedback has been submitted successfully.");
      setFormData({
        feedbackType: "",
        subject: "",
        message: "",
        attachment: null,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Submit a Complaint or Feedback
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Feedback Type */}
          <div className="mb-4">
            <label
              htmlFor="feedbackType"
              className="block text-sm font-medium text-gray-600"
            >
              Feedback Type
            </label>
            <select
              id="feedbackType"
              name="feedbackType"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.feedbackType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a type
              </option>
              <option value="complaint">Complaint</option>
              <option value="feedback">Feedback</option>
              <option value="suggestion">Suggestion</option>
            </select>
          </div>

          {/* Subject */}
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-600"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Enter subject"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Describe your issue or feedback"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {/* Attachment */}
          <div className="mb-4">
            <label
              htmlFor="attachment"
              className="block text-sm font-medium text-gray-600"
            >
              Attach File (optional)
            </label>
            <input
              id="attachment"
              name="attachment"
              type="file"
              accept=".jpg,.png,.pdf"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onChange={handleFileChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="py-2 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Success and Error Messages */}
        {message && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 text-center rounded-lg">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 text-center rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintFeedback;
