import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Define the path to the PDF file
    const filePath = path.resolve("public/static", "catImage.jpg");

    // Read the file into a buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Return the file buffer as a response
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpg , image/png , image/gif",
        "Content-Disposition": 'attachment; filename="example.jpg"',
      },
    });
  } catch (error) {
    console.error("Error serving IMG:", error);
    return new Response("Error serving IMG", { status: 500 });
  }
}
