// export async function GET(request) {
//   // Create a readable stream for Server-Sent Events
//   const stream = new ReadableStream({
//     start(controller) {
//       // Simulate server updates every 30 seconds
//       const updateInterval = setInterval(() => {
//         const randomTimeUpdate = Math.floor(Math.random() * 3600);
//         controller.enqueue(`data: ${randomTimeUpdate}\n\n`);
//       }, 30000);

//       // Initial time
//       controller.enqueue(`data: 3600\n\n`);

//       // Clean up function
//       return () => {
//         clearInterval(updateInterval);
//         controller.close();
//       };
//     }
//   });

//   // Return a response with SSE headers
//   return new Response(stream, {
//     headers: {
//       'Content-Type': 'text/event-stream',
//       'Cache-Control': 'no-cache',
//       'Connection': 'keep-open',
//       'Access-Control-Allow-Origin': '*'
//     }
//   });
// }