const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database");
const HealthData = require("./models/healthData");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

connectDB();

//----------------------------//
// Seeding some initial data
//----------------------------//

const seedData = async () => {
  try {
    // Check if data already exists
    const existingData = await HealthData.find();
    if (existingData.length === 0) {
      const initialData = [
        {
          date: new Date("2022-01-01"),
          steps: 5000,
          caloriesBurned: 200,
          distanceCovered: 2.5,
          weight: 70,
        },
        {
          date: new Date("2022-01-02"),
          steps: 8000,
          caloriesBurned: 300,
          distanceCovered: 3.2,
          weight: 69,
        },
        // Add more initial data as needed
      ];

      await HealthData.insertMany(initialData);
      console.log("Data seeded successfully.");
    } else {
      console.log("Data already exists. Skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding data:", error.message);
  }
};

seedData();
app.use("/tracks", require("./routes/tracksRoutes"));
app.use("/users", require("./routes/usersRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
