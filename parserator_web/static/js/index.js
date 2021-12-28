/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */
"use strict"

const addressInput = document.getElementById("address"),
  submitButton = document.getElementById("submit"),
  form = document.getElementById("parserator-form")

submitButton.addEventListener("click", () => parseAddress(addressInput.value))

form.addEventListener("submit", (e) => e.preventDefault())

addressInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    submitButton.click()
  }
})

/**
 * Queries the API for the given address and
 * displays the result.
 *
 * @param {String} address
 *
 */
async function parseAddress (address) {
  const errorElement = document.getElementById("error-message"),
    resultsTable = document.getElementById("address-results")

  if (address === "") {
    displayError(errorElement, resultsTable, "Enter an address!")
    return
  }

  const response = await fetch(`api/parse/?address=${address}`),
    json = await response.json()

  switch (json.address_type) {
    case "Error":
      displayError(errorElement, resultsTable, "Error: Could not parse due to a repeated label.")
      break
  default:
    const resultsTableBody = document.getElementById("address-results-body"),
      parseType = document.getElementById("parse-type")

    clearTable(resultsTableBody)
    parseType.innerHTML = json.address_type
    fillResultsTable(resultsTableBody, json.address_components)
    displayTable(resultsTable, errorElement)
  }
}

/**
 * Clears the result table.
 *
 * @param {HTMLElement} tableBody - the body of the table
 * to be cleared
 *
 */
function clearTable (tableBody) {
  while (tableBody.lastChild) {
    tableBody.removeChild(tableBody.lastChild)
  }
}

/**
 * Displays an error.
 *
 * @param {HTMLElement} errorElement - the div containing the message
 * @param {HTMLElement} resultsTable - the results table
 * @param {String} message - the error message to be displayed
 *
 */
function displayError(errorElement, resultsTable, message) {
  resultsTable.style.display = "none"
  errorElement.style.display = ""
  errorElement.innerHTML = message
}

/**
 * Displays the results table.
 *
 * @param {HTMLElement} resultsTable - the results table
 * @param {HTMLElement} errorElement - the div containing the message
 *
 */
function displayTable(resultsTable, errorElement) {
  resultsTable.style.display = ""
  errorElement.style.display = "none"
}

/**
 * Populates the results table with the output of the
 * API.
 *
 * @param {HTMLElement} resultsTableBody - the body of the results table
 * @param {Object} addressComponents - an object of the
 * form {tag: address-component}.
 *
 */
function fillResultsTable (resultsTableBody, addressComponents) {
  const components = Object.keys(addressComponents)
  components.forEach((name) => {
    let row = document.createElement("tr"),
      nameElement = document.createElement("td"),
      valueElement = document.createElement("td")

    nameElement.innerHTML = name
    valueElement.innerHTML = addressComponents[name]

    row.appendChild(valueElement)
    row.appendChild(nameElement)

    resultsTableBody.appendChild(row)
  })
}
