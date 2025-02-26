import { useSupabase } from "./src/lib/supabase/service.ts";
import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const DB_NAME = "auction_lots";
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(async () => {
  let supabase = await useSupabase();
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    cors: {
      origin: "localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // Socket.IO events
  io.on("connection", async (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Send connection success message
    socket.emit("info", { message: "Connected to Socket.IO CRUD server" });

    // CRUD operations

    // Read all items operation
    socket.on("readAll", async (callback) => {
      try {
        console.log(`Request: readAll from: ${socket.id}`);
        const { data, error } = await supabase
          .from(DB_NAME)
          .select("*")
          .order("id");
        callback?.({
          success: true,
          data,
        });
      } catch (error) {
        console.error("ReadAll error:", error);
        callback?.({
          success: false,
          error: `Error reading all items: ${error.message}`,
        });
      }
    });

    // Update operation
    socket.on("update", async (data, callback) => {
      try {
        if (!data.id || !data.update) {
          return callback?.({
            success: false,
            error: 'Missing "id" or "update" for update operation',
          });
        }

        const result = await collection.updateOne(
          { _id: new ObjectId(data.id) },
          { $set: data.update }
        );

        if (result.matchedCount === 0) {
          return callback?.({
            success: false,
            error: `Item with id ${data.id} not found`,
          });
        }

        // Notify all clients about the update
        io.emit("itemUpdated", {
          id: data.id,
          update: data.update,
        });

        callback?.({
          success: true,
          message: "Item updated successfully",
        });
      } catch (error) {
        console.error("Update error:", error);
        callback?.({
          success: false,
          error: `Error updating item: ${error.message}`,
        });
      }
    });

    // Delete operation
    socket.on("delete", async (data, callback) => {
      try {
        if (!data.id) {
          return callback?.({
            success: false,
            error: 'Missing "id" for delete operation',
          });
        }

        const result = await collection.deleteOne({
          _id: new ObjectId(data.id),
        });

        if (result.deletedCount === 0) {
          return callback?.({
            success: false,
            error: `Item with id ${data.id} not found`,
          });
        }

        // Notify all clients about the deletion
        io.emit("itemDeleted", { id: data.id });

        callback?.({
          success: true,
          message: "Item deleted successfully",
        });
      } catch (error) {
        console.error("Delete error:", error);
        callback?.({
          success: false,
          error: `Error deleting item: ${error.message}`,
        });
      }
    });

    // Disconnect event
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
