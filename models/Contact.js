const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'], 
    minlength: [3, 'Name must be at least 3 characters'], 
    maxlength: [100, 'Name must be at most 100 characters']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone is required'], 
    match: [/^\+?(\d{1,3})?(\s|\-)?(\d{3})(\s|\-)?(\d{2})(\s|\-)?(\d{2})$/, 'Please provide a valid phone number'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  subject: { 
    type: String, 
    enum: ['Taklif', 'Tanqid', 'Shikoyat'], 
    required: [true, 'Subject is required'] 
  },
  message: { 
    type: String, 
    required: [true, 'Message is required'], 
    minlength: [10, 'Message must be at least 10 characters'], 
    maxlength: [1000, 'Message must be at most 1000 characters']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { versionKey: false });

module.exports = mongoose.model('Contact', contactSchema);
