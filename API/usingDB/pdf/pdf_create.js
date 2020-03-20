const fs = require("fs");
const PDFDocument = require("pdfkit");
import moment from "moment";

function createInvoice(invoice, res) {
  let doc = new PDFDocument({ margin: 50 });
  doc.registerFont("Cardo", "./fonty/Cardo/Cardo-Regular.ttf");
  doc.registerFont("Cardo-Bold", "./fonty/Cardo/Cardo-Bold.ttf");
  doc.registerFont("OpenSans", "./fonty/Open_Sans/OpenSans-Regular.ttf");
  doc.registerFont(
    "OpenSans-SemiBold",
    "./fonty/Open_Sans/OpenSans-SemiBold.ttf"
  );
  doc.registerFont("OpenSans-Bold", "./fonty/Open_Sans/OpenSans-Bold.ttf");
  res.statusCode = 200;
  res.setHeader("Content-type", "application/pdf;charset=UTF-8");
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Header to force download
  res.setHeader("Content-disposition", "attachment; filename=Untitled.pdf");
  generateHeader(doc, invoice);
  // generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.pipe(res);
  doc.end();
  //return resToB64;
  //doc.pipe(fs.createWriteStream(path));
}

const defaultSpacing = {
  header: {
    top: 30,
    addres: 15
  }
};

const pdfHelper = {
  generateHeaderLeftColumn: doc => {
    doc
      .fillColor("#444444")
      .fontSize(13)
      .font("OpenSans-SemiBold")
      .text("B&M Sausages Ltd", 50, defaultSpacing.header.top)
      .text(
        "292-294 Glentanar Rd",
        50,
        defaultSpacing.header.top + defaultSpacing.header.addres
      )
      .text(
        "G22 7XS Glasgow",
        50,
        defaultSpacing.header.top + 2 * defaultSpacing.header.addres
      )
      .moveDown();

    // doc.path('M60,120a50,40 3 3,2 100,0a50,40 3 3,0 -100,2').stroke({lineWidth:3})
    doc
      .lineWidth(3)
      .ellipse(110, 125, 50, 40)
      .stroke();
    doc
      .lineWidth(3)
      .fillColor("#444444")
      .fontSize(13)
      .font("OpenSans-Bold")
      .text("UK", 100, 105)
      .text("1152", 93, 117)
      .text("EC", 102, 129)
      .moveDown();

    doc
      .fillColor("#444444")
      .fontSize(13)
      .font("OpenSans-SemiBold")
      .text("VAT no. 128430232", 50, 170)
      .text("Tel. 07846914473", 50, 187)
      .moveDown();
  },
  generateHeaderRightColumn: (doc, invoice) => {
    doc
      .fillColor("#444444")
      .fontSize(12)
      .text("2020-03-17", 50, 30, { align: "right" });

    doc
      .fillColor("#444444")
      .font("OpenSans-Bold")
      .fontSize(13)
      .text("I   N   V   O   I   C   E", 420, 70)
      .text(invoice.order.order_number, 475, 90);

    doc
      .fillColor("#444444")
      .fontSize(10)
      .font("OpenSans")
      .text("Buyer", 50, 140, { align: "right" })
      .fontSize(12)
      .font("OpenSans-SemiBold")
      .text(invoice.order.client.client_name, 50, 158, { align: "right" })
      .text(invoice.order.client.client_address, 410, 173, { width:150, align: "right" })
      .text(invoice.order.client.client_city, 50, 188, { align: "right" })
      .moveDown();
  },
  generateHeaderCenterColumn: doc => {
    doc
      .fillColor("#444444")
      .fontSize(10)
      .font("OpenSans")
      .text("The finest quality", 35, 30, { align: "center" })
      .text("meat and sausages", 35, 43, { align: "center" })
      .moveDown();

    doc.image("images/brandm.png", 0, 75, {
      fit: [600, 130],
      align: "center",
      valign: "center"
    });
  }
};

function generateHeader(doc, invoice) {
  pdfHelper.generateHeaderLeftColumn(doc);
  pdfHelper.generateHeaderCenterColumn(doc);
  pdfHelper.generateHeaderRightColumn(doc, invoice);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 240;

  doc.font("OpenSans");
  generateTableHeader(
    doc,
    invoiceTableTop,
    "Nr.",
    "Product",
    "Use by Date",
    "Qnt kg.",
    "Price per kg.",
    "Total",
    "Comment"
  );
  generateHr(doc, invoiceTableTop);
  doc.font("OpenSans");

  let tableTopChange = invoiceTableTop;
  let spaceToAdd = 30;

  for (let i = 0; i < invoice.orderChild.length; i++) {
    const item = invoice.orderChild[i];

    tableTopChange += spaceToAdd;

    const checkTextWidth = doc.widthOfString(item.comment);
    const rowsInOrder = Math.ceil(checkTextWidth / 100);

    if (rowsInOrder === 1 || rowsInOrder === 0) {
      spaceToAdd = 30;
    }

    if (rowsInOrder > 1) {
      spaceToAdd = rowsInOrder * 20;
    }

    const dateToShow = moment(item.use_by_date).format("DD-MM-YYYY");
    generateTableRow(
      doc,
      tableTopChange,
      i,
      item.product_name,
      dateToShow,
      item.order_amount,
      formatCurrency(item.order_sum / item.order_amount),
      formatCurrency(item.order_sum),
      item.comment
    );

    generateHr(doc, tableTopChange);

    if (i === invoice.orderChild.length - 1) {
      
      let lastRow = Math.ceil(checkTextWidth / 100) * 20;

      if(lastRow === 0) {
        lastRow = 30
      }
     
      generateHr(doc, tableTopChange + lastRow);
      generateTableTotal(doc, tableTopChange + lastRow + 20, "Total", formatCurrency(invoice.order.total))
    }
  }
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      700,
      { align: "center", width: 500 }
    );
}

function generateTableTotal(doc, y, text, amount) {
  doc
  .fontSize(10)
  .text(text, 325, y, { width: 60, align: "center" })
  .text(amount, 380, y, { width: 60, align: "center" })
}

function generateTableHeader(
  doc,
  y,
  index,
  product_name,
  use_date,
  unitCost,
  quantity,
  lineTotal,
  comment
) {
  y = y + 7;
  doc
    .fontSize(10)
    .text(index, 35, y, { width: 57, align: "center" })
    .text(product_name, 60, y, { width: 110, align: "center" })
    .text(use_date, 190, y, { width: 60, align: "center" })
    .text(quantity, 260, y, { width: 60, align: "center" })
    .text(unitCost, 325, y, { width: 60, align: "center" })
    .text(lineTotal, 380, y, { width: 60, align: "center" })
    .text(comment, 470, y, { width: 70, align: "center" });

  generateTd(doc, y - 7);
}

function generateTableRow(
  doc,
  y,
  index,
  product_name,
  use_date,
  unitCost,
  quantity,
  lineTotal,
  comment = ""
) {
  if (product_name.length > 0) {
    index += 1;
    
    const checkTextWidth = Math.ceil(doc.widthOfString(comment) / 100);
    const yChange = checkTextWidth * 10;
    console.log(yChange + '<--yChange')
    generateTd(doc, y, yChange);
  }

  y = y + 7;

  doc
    .fontSize(10)
    .text(index, 35, y, { width: 57, align: "center" })
    .text(product_name, 95, y, { width: 110, align: "left" })
    .text(use_date, 193, y, { width: 55, align: "center" })
    .text(quantity, 260, y, { width: 60, align: "center" })
    .text(unitCost, 325, y, { width: 60, align: "center" })
    .text(lineTotal, 380, y, { width: 60, align: "center" })
    .text(comment, 450, y, { width: 100, align: "left" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("black")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(570, y)
    .stroke();
}

function generateTd(doc, y, addH = 0) {
  const arryWidth = [0, 50, 80, 190, 250, 330, 380, 440, 570];

  for (let i = 0; i <= arryWidth.length - 1; i++) {
    let line = arryWidth[i];

    doc
      .strokeColor("black")
      .lineWidth(1)
      .moveTo(line, y)
      .lineTo(line, y + 30 + addH)
      .stroke();
  }
}

function formatCurrency(cents) {
  const centsToNumber = parseInt(cents);
  return "$" + centsToNumber.toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};
