//open accordion of Customers Table
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
        const updateCustomer_firstname = customer.firstname;
        const updateCustomer_lastname = customer.lastname;
        const updateCustomer_adress = customer.adress;
        const updateCustomer_zip_city = customer.zip_city;
        const updateCustomer_birthdate = customer.birthdate;
        const updateCustomer_phone = customer.phone;
        const updateCustomer_mail = customer.mail;
        const updateCustomer_gender = customer.gender;
        return {
          editCustomerID,
          updateCustomer_firstname,
          updateCustomer_lastname,
          updateCustomer_adress,
          updateCustomer_zip_city,
          updateCustomer_birthdate,
          updateCustomer_phone,
          updateCustomer_mail,
          updateCustomer_gender,
        };
      }
    }
  }
};
