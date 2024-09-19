import puppeteer from "puppeteer";

export async function GET() {
  const htmlContent = `
    <html>
      <body>
        <h1>Dummy PDF</h1>
      </body>
    </html>
  `;

  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content
    await page.setContent(htmlContent, { waitUntil: "load" });

    // Generate the PDF from the page
    const pdfBuffer = await page.pdf({ format: "A4" });

    // Close the browser
    await browser.close();

    // Return the PDF buffer as a response
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="dummy.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response("Error generating PDF", { status: 500 });
  }
}
