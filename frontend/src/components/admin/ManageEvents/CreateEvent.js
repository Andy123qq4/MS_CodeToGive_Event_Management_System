import React, { useState } from "react";
import Step1 from "./EventStep1";
import Step2 from "./EventStep2";
import Step3 from "./EventStep3";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateEvent({ onClose }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(""); // Error state

  const [formData, setFormData] = useState({
    eventName: "",
    eventStartDate: "",
    eventStartTime: "",
    eventEndDate: "",
    eventEndTime: "",
    publishDate: "",
    publishTime: "",
    location: "",
    quota: "",
    targetAudience: "",
    eventTags: "",
    uploadImage: "", // Now it can accept either a file or a string URL
    description: "",
    defaultMessage: "",
    additionalMessage: "",
    sections: [{ sectionHeading: "", uploadVideo: "", sectionDescription: "" }],
  });

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSectionChange = (index, input) => (e) => {
    const value = e.target.value;
    const newSections = [...formData.sections];
    newSections[index][input] = value;
    setFormData({ ...formData, sections: newSections });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        { sectionHeading: "", uploadVideo: "", sectionDescription: "" },
      ],
    });
  };

  const removeSection = (index) => {
    const newSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: newSections });
  };

  const validateFields = () => {
    if (
      !formData.eventName ||
      !formData.eventStartDate ||
      !formData.eventStartTime ||
      !formData.eventEndDate ||
      !formData.eventEndTime ||
      !formData.location ||
      !formData.quota ||
      !formData.description
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      setError("Please fill in all required fields."); // Set error message
      return;
    }

    // Ensure targetAudience and eventTags are arrays and not [''] if empty
    const targetAudienceArray = formData.targetAudience
      ? formData.targetAudience.split(",").filter((item) => item.trim() !== "")
      : [];
    const eventTagsArray = formData.eventTags
      ? formData.eventTags.split(",").filter((item) => item.trim() !== "")
      : [];

    const jsonData = {
      isPublished: formData.isPublished || false,
      isAppointment: false,
      isDeleted: false,
      created_by: "a1",
      createState: "published",
      event_details: {
        event_name: formData.eventName,
        image_url: formData.uploadImage, // Now can be a URL or a file
        start_date: formData.eventStartDate,
        start_time: formData.eventStartTime,
        end_date: formData.eventEndDate,
        end_time: formData.eventEndTime,
        location: formData.location,
        description: formData.description,
        quota: formData.quota,
        target_audience: targetAudienceArray,
        event_tags: eventTagsArray,
      },
      training: {
        sections: formData.sections.map((section) => ({
          section_heading: section.sectionHeading,
          video_link: section.uploadVideo, // Now can be a URL or a file
          section_description: section.sectionDescription,
        })),
      },
      reminder: {
        default_message: formData.defaultMessage,
        additional_message: formData.additionalMessage,
      },
      participants: {
        clients: [],
        volunteers: [],
        admins: [],
      },
    };

    try {
      const response = await fetch(
        "/api/events/create",
        {
          // mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        }
      );
      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        toast.success("Event created successfully!", {
          onClose: onClose, // Close the dialog only when the toast is closed
        });
      } else {
        toast.error(`Failed to create event: ${data.description}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={500} />
      {step === 1 && (
        <Step1
          nextStep={nextStep}
          handleChange={handleChange}
          formData={formData}
          error={error} // Pass error state
        />
      )}
      {step === 2 && (
        <Step2
          nextStep={nextStep}
          previousStep={previousStep}
          handleSectionChange={handleSectionChange}
          sections={formData.sections}
          addSection={addSection}
          removeSection={removeSection}
        />
      )}
      {step === 3 && (
        <Step3
          previousStep={previousStep}
          handleChange={handleChange}
          formData={formData}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
