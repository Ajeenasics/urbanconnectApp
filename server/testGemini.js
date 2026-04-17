require('dotenv').config();

async function testGemini() {
    console.log("Key:", process.env.GEMINI_API_KEY ? "EXISTS" : "MISSING");
    const prompt = "Estimate plumbing job to fix a leak";
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
          })
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data.candidates[0].content.parts[0].text.trim());
      } else {
        console.error("Gemini API Error:", await response.text());
      }
}
testGemini();
