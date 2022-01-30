// calculateBalances
export function calculateBalance(accountings) {
  let totalAmount = 0;
  for (let accounting of accountings) {
    const amount = parseFloat(accounting.amount);
    totalAmount = totalAmount + amount;
  }
  return totalAmount;
}

//Calculate Expenditures
export function calculateExpenditure(accountings) {
  let totalAmount = 0;
  for (let accounting of accountings) {
    const amount = parseFloat(accounting.amount);
    if (amount < 0) {
      totalAmount = totalAmount + amount;
    }
  }
  return totalAmount;
}

//Calculate Revenues
export function calculateRevenue(accountings) {
  let totalAmount = 0;
  for (let accounting of accountings) {
    const amount = parseFloat(accounting.amount);
    if (amount > 0) {
      totalAmount = totalAmount + amount;
    }
  }
  return totalAmount;
}

//Calculate how many unsubscribed Users
export function calculateNone(customers) {
  let number = 0;
  for (let customer of customers) {
    if (!customer.subscriptionType && !customer.subscriptionPaid) {
      number = number + 1;
    }
  }
  return number;
}

//Calculate how many subscribed Users
export function calculatePaid(customers) {
  let number = 0;
  for (let customer of customers) {
    if (customer.subscriptionPaid) {
      number = number + 1;
    }
  }
  return number;
}

//Calculate how many subscribed Users are unpaid
export function calculateUnpaid(customers) {
  let number = 0;
  for (let customer of customers) {
    if (customer.subscriptionType && !customer.subscriptionPaid) {
      number = number + 1;
    }
  }
  return number;
}

//Check if searchQuery is here and export CSV unfiltered or filtered
export function filterAccountings(accountings, searchQuery) {
  return accountings.filter((accounting) => {
    if (searchQuery === "") {
      return accounting;
    } else if (
      accounting.bookingDate
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      accounting.bookingReason.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return accounting;
    }
    return false;
  });
}

//open Accordion of Pricings
export const showPricing = async (id, state) => {
  const accordionToOpen = document.getElementById(id);
  if (accordionToOpen.classList.contains("show")) {
    accordionToOpen.classList.remove("show");
  } else {
    const items = document.getElementsByName("nameID");
    for (let item of items) {
      item.classList.remove("show");
    }
    accordionToOpen.classList.add("show");
    const pricings = state.pricings;
    for (let pricing of pricings) {
      if (pricing.id === id) {
        const editPricingID = id;
        const updatePricing_value = pricing.value;
        return {
          editPricingID,
          updatePricing_value,
        };
      }
    }
  }
};

//open accordion of subscription customers table
export const showCustomer = async (id, state) => {
  const accordionToOpen = document.getElementById(id);
  if (accordionToOpen.classList.contains("show")) {
    accordionToOpen.classList.remove("show");
  } else {
    const items = document.getElementsByName("nameID");
    for (let item of items) {
      item.classList.remove("show");
    }
    accordionToOpen.classList.add("show");
    const customers = state.customers;
    for (let customer of customers) {
      if (customer.id === id) {
        const editCustomerID = id;
        return editCustomerID;
      }
    }
  }
};
