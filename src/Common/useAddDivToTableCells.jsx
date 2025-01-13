import { useEffect } from "react";

 
const useAddDivToTableCells = () => {
  useEffect(() => {
    const table = document.querySelector("table");
    if (table) {
     table.classList.add("autotable"); // Appends the "autotable" class
      const thead = table.querySelector("thead");
      const tbody = table.querySelector("tbody");

      const thTexts = Array.from(thead.querySelectorAll("th")).map(th => th.textContent.trim());

      tbody.querySelectorAll("tr").forEach((tr) => {
          tr.querySelectorAll("td").forEach((td, cellIndex) => {
               // Set the data-label attribute
               td.setAttribute("data-label", thTexts[cellIndex]);
             });
      });
    }
  }, []);
};

export default useAddDivToTableCells;
