const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  monday: {
    breakFast: {
      type: String,
    },
    lunch: {
      type: String,
    },
    snacks: {
      type: String,
    },
    dinner: {
      type: String,
    }
  },
  tuesday: {
    breakFast: {
      type: String,
    },
    lunch: {
      type: String,
    },
    snacks: {
      type: String,
    },
    dinner: {
      type: String,
    }
  },
  wednesday: {
    breakFast: {
      type: String,
    },
    lunch: {
      type: String,
    },
    snacks: {
      type: String,
    },
    dinner: {
      type: String,
    }
  },
  thursday: {
    breakFast: {
      type: String,
    },
    lunch: {
      type: String,
    },
    snacks: {
      type: String,
    },
    dinner: {
      type: String,
    }
  },
  friday: {
    breakFast: {
      type: String,
    },
    lunch: {
      type: String,
    },
    snacks: {
      type: String,
    },
    dinner: {
      type: String,
    }
  },
  saturday: {
    breakFast: {
      type: String,
    },
    lunch: {
      type: String,
    },
    snacks: {
      type: String,
    },
    dinner: {
      type: String,
    }
  },
  sunday: {
    breakFast: {
      type: String,
    },
    lunch: {
      type: String,
    },
    snacks: {
      type: String,
    },
    dinner: {
      type: String,
    }
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }


}, { timestamps: true }, { strictPopulate: false });


module.exports = mongoose.model("Menu", menuSchema);