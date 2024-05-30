function formatDate(dateStr) {
  // Parsing tanggal dari string
  let dateObj = new Date(dateStr);

  // Mengonversi ke format baru
  let day = String(dateObj.getDate()).padStart(2, "0");
  let month = String(dateObj.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-indexed month
  let year = dateObj.getFullYear();

  return `${day}-${month}-${year}`;
}

module.exports = { formatDate };
