import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Define the path to the PDF file
    const filePath = path.resolve("public/static", "dummy.pdf");

    // Read the file into a buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Return the file buffer as a response
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="example.pdf"',
      },
    });
  } catch (error) {
    console.error("Error serving PDF:", error);
    return new Response("Error serving PDF", { status: 500 });
  }
}
