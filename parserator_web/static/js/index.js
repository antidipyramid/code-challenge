/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */
"use strict"

const resultsTable = document.getElementById("address-results"),
  errorMessage = document.getElementById("error-message"),
  parseType = document.getElementById("parse-type"),
  resultsTableBody = document.getElementById("address-results-body"),
  addressInput = document.getElementById("address"),
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
  if (address === "") {
    displayError("Enter an address!")
    return
  }

  const response = await fetch(`api/parse/?address=${address}`),
    json = await response.json()

  switch (json.address_type) {
  case "Error":
    displayError("Error: Could not parse due to a repeated label.")
    break
  default:
    clearTable(resultsTableBody)
    displayTable()
    parseType.innerHTML = json.address_type
    fillResultsTable(json.address_components)
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
 * Displays an error and hides the table.
 *
 * @param {String} message - the error message to be displayed
 *
 */
function displayError (message) {
  resultsTable.style.display = "none"
  errorMessage.style.display = ""
  errorMessage.innerHTML = message
}

/**
 * Hides the error message and displays the results table.
 */
function displayTable () {
  errorMessage.style.display = "none"
  resultsTable.style.display = ""
}

/**
 * Populates the results table with the output of the
 * API.
 *
 * @param {Object} addressComponents - an object of the
 * form {tag: address-component}.
 *
 */
function fillResultsTable (addressComponents) {
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
