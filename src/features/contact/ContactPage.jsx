// src/features/contact/ContactPage.jsx
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

const ContactPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Exact 1196px container with Figma padding */}
      <div className="mx-auto px-12 pt-16 pb-12" style={{ maxWidth: '1196px' }}>
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-2 text-gray-500">
            Any question or remarks? Just write us a message!
          </p>
        </div>

        {/* Contact Grid - 48px gap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;