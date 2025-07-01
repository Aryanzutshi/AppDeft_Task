export function success() {
    console.log(`Successfully inputted info`);
}
  
export function error(message = "Something went wrong") {
    console.error(`%c❌ Error: ${message}`, "color: red; font-weight: bold;");
}