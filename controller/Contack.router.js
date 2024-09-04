// Import the Contact model
import Contactt from '../model/UserContact.js';
// Controller function to handle contact form submission
export const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Save the contact form data to the database
        await Contactt.create({ name, email, message });
        res.status(200).json({ message: 'Message received and saved successfully' });
    } catch (err) {
        console.error('Error saving contact form data:', err);
        res.status(500).json({ error: 'Failed to save message' });
    }
};
