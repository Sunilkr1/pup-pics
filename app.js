// DOM Elements
const generateBtn = document.getElementById("generate-btn");
const resultImg = document.getElementById("result");
const loading = document.getElementById("loading");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// API URL
const url = "https://dog.ceo/api/breeds/image/random";

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Generate dog image
generateBtn.addEventListener("click", async () => {
  // Show loading
  loading.style.display = "block";
  generateBtn.disabled = true;

  try {
    let link = await getImg();
    resultImg.setAttribute("src", link);
  } catch (error) {
    console.log("Error fetching image", error);
    resultImg.setAttribute("src", "");
    resultImg.alt = "Failed to load image. Please try again.";
  } finally {
    // Hide loading
    loading.style.display = "none";
    generateBtn.disabled = false;
  }
});

// Get image from API
async function getImg() {
  try {
    let res = await axios.get(url);
    return res.data.message;
  } catch (err) {
    console.log("Image not found", err);
    throw err;
  }
}

// Load initial image
window.addEventListener("DOMContentLoaded", async () => {
  try {
    let link = await getImg();
    resultImg.setAttribute("src", link);
  } catch (error) {
    console.log("Error loading initial image", error);
  }
});
