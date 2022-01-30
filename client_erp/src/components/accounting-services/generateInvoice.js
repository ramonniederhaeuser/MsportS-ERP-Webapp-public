import { jsPDF } from "jspdf";
import logo from "../../images/logo.png";

export const generateInvoice = async (receiptData) => {
  const {
    id,
    userid,
    firstname,
    lastname,
    zip_city,
    adress,
    subscriptionPaid,
    subscriptionType,
    amount,
  } = receiptData;

  const doc = new jsPDF("portrait", "px", "a4", "false");

  doc.addImage(logo, "PNG", 10, 10, 90, 90);

  doc.setFontSize(30);
  doc.text("Quittung", 435, 35, { align: "right" });

  doc.setFontSize(15);
  doc.setFont("Helvetica", "bold");
  doc.text("MsportS", 435, 65, { align: "right" });
  doc.setFont("Helvetica", "normal");
  doc.text("Langfurristrasse 2", 435, 78, { align: "right" });
  doc.text("9526 Märwil", 435, 91, { align: "right" });
  doc.text("Schweiz", 435, 104, { align: "right" });

  doc.line(10, 140, 435, 140);

  doc.setFont("Helvetica", "bold");
  doc.text(firstname + " " + lastname, 10, 165, { align: "left" });
  doc.setFont("Helvetica", "normal");
  doc.text(adress, 10, 178, { align: "left" });
  doc.text(zip_city, 10, 191, { align: "left" });
  doc.text("Schweiz", 10, 204, { align: "left" });
  doc.text("Kundennummer " + userid, 10, 217, { align: "left" });

  doc.setFont("Helvetica", "bold");
  doc.text("QuittungNr :", 320, 165, { align: "right" });
  doc.text("Erstellt am :", 320, 178, { align: "right" });
  doc.text("Bezahlt am :", 320, 191, { align: "right" });

  doc.setFont("Helvetica", "normal");
  doc.text(id, 325, 165, { align: "left" });
  doc.text(new Date().toJSON().slice(0, 10).replace(/-/g, `-`), 325, 178, {
    align: "left",
  });
  doc.text(subscriptionPaid, 325, 191, { align: "left" });

  doc.setFont("Helvetica", "bold");
  doc.text("Produkt", 10, 335, { align: "left" });
  doc.text("Anzahl", 260, 335, { align: "right" });
  doc.text("Preis", 350, 335, { align: "right" });
  doc.text("Total", 435, 335, { align: "right" });

  doc.line(10, 345, 435, 345);

  doc.setFont("Helvetica", "normal");
  doc.text(subscriptionType, 10, 365, { align: "left" });
  doc.text("1", 241, 365, { align: "center" });
  doc.text("CHF " + parseFloat(amount).toFixed(2), 350, 365, {
    align: "right",
  });
  doc.text("CHF " + parseFloat(amount).toFixed(2), 435, 365, {
    align: "right",
  });

  doc.line(10, 380, 435, 380);

  doc.setFont("Helvetica", "bold");
  doc.text("Subtotal:", 350, 450, { align: "right" });
  doc.line(250, 462, 435, 462);
  doc.text("Total:", 350, 480, { align: "right" });

  doc.setFont("Helvetica", "normal");
  doc.text("CHF " + parseFloat(amount).toFixed(2), 435, 450, {
    align: "right",
  });
  doc.text("CHF " + parseFloat(amount).toFixed(2), 435, 480, {
    align: "right",
  });

  doc.text("Besten Dank für dein Vertrauen und Einsatz.", 233, 550, {
    align: "center",
  });

  doc.save("Quittung " + firstname + " " + lastname + ".pdf");
};
