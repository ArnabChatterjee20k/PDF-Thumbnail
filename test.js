const fs = require("fs");
const { PDFDocument } = require("pdf-lib");
const { fromBuffer, fromPath } = require("pdf2pic");
async function pdfToImage(pdfUrl, imagePath) {
  try {
    // Fetch the PDF file from the URL
    const res = await fetch(pdfUrl);
    const pdfBytes = await res.arrayBuffer();

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get the first page
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Embed the first page as a new PDF
    const embeddedPage = await pdfDoc.embedPage(firstPage);
    const newPdfBytes = await pdfDoc.save();

    // Convert the embedded PDF to an image
    // const pngImageBytes = await embeddedPage.renderToBuffer({ width: 612, height: 792 });

    // Save the image to a file
    fs.writeFileSync(imagePath, newPdfBytes);

    console.log(`Image saved to ${imagePath}`);
  } catch (err) {
    console.error("Error:", err);
  }
}

// Example usage
pdfToImage(
  "https://reminiscent-pony-148.convex.cloud/api/storage/b4703045-cfe5-4df0-82e8-fadc593d7732",
  "image.pdf"
);
