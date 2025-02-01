document.addEventListener("DOMContentLoaded", function () {
  const jobsContainer = document.getElementById("jobs");

  async function fetchJobs() {
    try {
      const Url = "https://jobs-app-deepseek-proxy.onrender.com/jobs";

      const response = await fetch(Url);

      if (!response.ok) {
        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.data);
      displayJobs(data.data.stellenangebote);
    } catch (error) {
      console.error("Fehler beim Abrufen der Jobs:", error);
      jobsContainer.innerHTML = `<p class="text-red-500">Fehler beim Abrufen der Jobs: ${error.message}</p>`;
    }
  }

  function displayJobs(jobs) {
    jobsContainer.innerHTML = ""; // Clear existing jobs
    jobs.forEach((job) => {
      const jobElement = document.createElement("div");
      jobElement.className = "bg-white p-6 rounded-lg shadow-lg";
      jobElement.innerHTML = `
              <h2 class="text-xl font-semibold mb-2">${job.titel}</h2>
              <p class="text-gray-700 mb-4">${job.arbeitgeber}</p>
              <p class="text-gray-600 mb-4 arbeitsort">${
                job.arbeitsort?.plz ? `${job.arbeitsort.plz}` : ""
              } ${job.arbeitsort.ort}</p>
              <a 
  href="${job.externeUrl}" 
  target="_blank" 
  class="inline-block text-[#ff4d6d] hover:text-[#c9184a] font-medium bg-transparent border border-[#ff4d6d] hover:border-[#c9184a] px-4 py-2 rounded-lg transition-colors"
>
  Mehr erfahren
</a>
          `;
      jobsContainer.appendChild(jobElement);
    });
  }

  fetchJobs();

  function reloadPageDaily() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Setze die Zeit auf Mitternacht

    const timeUntilTomorrow = tomorrow - now;
    setTimeout(() => {
      window.location.reload();
    }, timeUntilTomorrow);
  }

  reloadPageDaily();
});
