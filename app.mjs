import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const API_URL = "https://api.openuv.io/api/v1/uv";
const token = "openuv-6jabnrm17ggb60-io"; // Replace with your actual API key
app.get("/", async (req, res) => {
    const params = {
        lat: 17.69,
        lng: 83.21,
        alt: 100,
        dt: "2024-09-22T13:45:03.473Z", // Optional date/time, remove if not needed
    };

    const options = {
        headers: {
            "x-access-token": token, // Correct header for API key
        },
        params: params, // Pass the params through Axios
    };

    try {
        // Axios request with headers and params
        const response = await axios.get(API_URL, options);
        const uvIndex = response.data.result.uv; // Renamed for clarity

        console.log("API Response: UV Index:", uvIndex);

        // Render the EJS template with the UV data
        res.render('index.ejs', { uvData: uvIndex });
    } catch (error) {
        console.error("Failed request: ", error.response ? error.response.data : error.message);

        // Simulate UV data in case of error (e.g., quota exceeded)
        const mockUvData = 5.5; // Example value for development purposes
        console.log("Using mock data:", mockUvData);

        // Render the EJS template with mock data
        res.render('index.ejs', { uvData: mockUvData });
    }
});

app.listen(3000, function () {
    console.log("Server running on port 3000.");
});
