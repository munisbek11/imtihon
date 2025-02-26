const Contact = require('../models/Contact');
const contactValidationSchema = require('../validations/contactValidation');

exports.createContact = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    const contact = new Contact({ name, phone, email, subject, message });

    await contact.validate();

    await contact.save();
    res.status(201).send({ message: 'Contact successfully created' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ error: err.message });
    }
    res.status(500).send({ error: 'Internal server error' });
  }
};


exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

exports.getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      const notFoundError = new Error("Bunday murojaat topilmadi");
      notFoundError.statusCode = 404;
      return next(notFoundError);
    }

    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
};
